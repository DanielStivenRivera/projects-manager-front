import {Component, EventEmitter, OnInit} from '@angular/core';
import {ProjectsService} from '../projects/projects.service';
import {TasksService} from './tasks.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../shared/services/dialog.service';
import {ITask, ITaskCreate} from '../shared/types/services/task.interface';
import {CardEvent} from '../shared/types/components/card.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  host: {'class': 'height-100 overflow-hidden'}
})
export class TasksComponent implements OnInit {

  title: string = '';

  tasks: ITask[] = [];

  private projectId: number;

  validate: EventEmitter<string> = new EventEmitter();

  constructor(
    private projectService: ProjectsService,
    private taskService: TasksService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService,
  ) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const data = await this.projectService.getById(parseInt(id));
      if (data) {
        this.title = data.title;
        this.projectId = data.id;
      } else {
        await this.router.navigateByUrl(`/projects`);
      }
    } else {
      await this.router.navigateByUrl(`/projects`);
    }
    await this.getTasks();
  }

  async getTasks() {
    try {
      this.tasks = await this.taskService.getAllTasks(this.projectId);
    } catch (e) {
      await this.dialogService.informativeModal('Error al obtener las tareas del proyecto seleccionado', 'error')
    }
  }

  async cardActions(event: CardEvent) {
    switch (event.action) {
      case "delete":
        await this.deleteTask(event.id);
        break;
      case "edit":
        await this.openCreateTasksModal(event.id);
        break;
    }
  }

  async openCreateTasksModal(id?: number) {
    try {
      let item: ITask;
      if (id) {
        item = await this.taskService.getById(this.projectId, id)
      }
      const response = await this.dialogService.openCreationModal(!id ? 'CREAR TAREA' : 'EDITAR TAREA', item) as ITaskCreate;
      if (response) {
        if (id) {
          await this.taskService.updateTask(this.projectId, id, response);
        } else {
          await this.taskService.createTask(this.projectId, response);
        }
        await this.getTasks();
        await this.dialogService.informativeModal(`La tarea fue ${id ? 'actualizada' : 'creada'} correctamente`, 'success');
      }
    } catch (e) {
      await this.dialogService.informativeModal(`Ha ocurrido un error al ${id ? 'editar' : 'crear'} una tarea`, 'error');
    }
  }

  async deleteTask(id: number) {
    try {
      const resp = await this.dialogService.openInterrogativeModal({title: 'ELIMINAR TAREA', message: 'Los datos serán eliminados permanentemente. ¿Desea continuar?'});
      if (resp === 'yes') {
        await this.taskService.deleteTask(id, this.projectId);
        await this.dialogService.informativeModal('La tarea ha sido eliminada.', 'success');
      }
    } catch (e) {
      console.error(e);
      await this.dialogService.informativeModal('Error al eliminar la tarea', 'error');
    }
  }

}
