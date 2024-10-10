import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CardEvent, ICard} from '../shared/types/components/card.interface';
import {ProjectsService} from './projects.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../shared/services/dialog.service';
import {TasksComponent} from '../tasks/tasks.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  isMobile: boolean = false;

  showSidebar: boolean = true;

  projects: ICard[] = [];

  constructor(
    public router: Router,
    private projectService: ProjectsService,
    private dialogService: DialogService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  resize() {
    this.isMobile = window.innerWidth < 1024;
    this.showSidebar = this.isMobile && this.router.url === '/projects';
  }

  async ngOnInit() {
    this.resize();
    await this.getAllProjects();
    if (this.router.url.includes('tasks')) {
      await this.router.navigateByUrl(`/projects`);
      if (this.isMobile) this.showSidebar = true;
    }
  }

  async getAllProjects() {
    try {
      this.projects = await this.projectService.getAllProjects();
    } catch (e) {
      await this.dialogService.informativeModal('Error al obtener los proyectos', 'error');
    }
  }

  async logout() {
    localStorage.removeItem('token');
    await this.router.navigate(['/auth']);
  }

  async deleteProject(id: number) {
    try {
      const response = await this.dialogService.openInterrogativeModal({
        title: 'ELIMINAR PROYECTO',
        message: 'El proyecto será eliminado. ¿Desea continuar?'
      });
      if (response === 'yes') {
        await this.projectService.deleteProject(id);
        await this.getAllProjects();
        await this.router.navigateByUrl(`/projects`);
        await this.dialogService.informativeModal('El proyecto ha sido eliminado', 'success');
      }
    } catch (e) {
      await this.dialogService.informativeModal('Error al eliminar el proyecto', 'error');
    }
  }

  async cardActions(data: CardEvent) {
    switch (data.action) {
      case 'edit':
        await this.openCreationModal(data.id);
        break;
      case 'open':
        await this.openProject(data.id);
        break;
      case 'delete':
        await this.deleteProject(data.id);
    }
  }

  async openCreationModal(id?: number) {
    try {
      const item = await this.projectService.getById(id);
      const data = await this.dialogService.openCreationModal(id ? 'EDITAR PROYECTO' : 'CREAR PROYECTO', item);
      if (data) {
        if (!id) {
          await this.projectService.createProject(data);

        } else {
          await this.projectService.updateProject(data, id);
        }
        await this.getAllProjects();
        await this.dialogService.informativeModal(`El proyecto ha sido ${id ? 'editado' : 'creado'} correctamente`, 'success');
      }
    } catch (e) {
      await this.dialogService.informativeModal(`Error al ${id ? 'editar' : 'crear'} proyecto`, 'error');
    }

  }

  async openProject(id: number) {
    await this.router.navigateByUrl('/projects/', {skipLocationChange: true});
    await this.router.navigateByUrl(`/projects/${id}/tasks`);
    if (this.isMobile) this.showSidebar = false;
  }

  async goToProjects() {
    await this.router.navigateByUrl(`/projects`);
    if (this.isMobile) this.showSidebar = true;
  }

}
