import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ICard} from '../shared/types/components/card.interface';
import {ProjectsService} from './projects.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../shared/services/dialog.service';

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
    private dialog: MatDialog,
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
      const response = await this.dialogService.openInterrogativeModal({title: 'ELIMINAR PROYECTO', message: 'El proyecto será eliminado. ¿Desea continuar?'});
      if (response === 'yes') {
        await this.projectService.deleteProject(id);
        await this.getAllProjects();
        await this.dialogService.informativeModal('El proyecto ha sido eliminado', 'success');
      }
    } catch (e) {
      console.error(e);
    }
  }

  async createProject() {
    try {
      const data = await this.dialogService.openCreationModal('CREAR PROYECTO');
      if (data) {
        await this.projectService.createProject(data);
        await this.getAllProjects();
        await this.dialogService.informativeModal('El proyecto ha sido creado correctamente', 'success');
      }
    } catch (e) {
      await this.dialogService.informativeModal('Error al crear proyecto', 'error');
    }

  }

}
