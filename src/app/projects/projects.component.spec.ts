import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsComponent} from './projects.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {ProjectsService} from './projects.service';
import {MatIconModule} from '@angular/material/icon';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  const projectService = {
    getAllProjects: async () => [],
    deleteProject: async () => {
    },
    createProject: async () => {
    },
    updateProject: async () => {
    },
    getById: async () => {
      return {
        title: 'project',
        id: 1,
        description: 'project',
      }
    }
  }

  const router = {
    url: 'tasks',
    navigateByUrl: async () => true,
    navigate: async () => true,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      imports: [HttpClientTestingModule, MatIconModule, RouterTestingModule],
      providers: [
        {provide: ProjectsService, useValue: projectService},
        {provide: Router, useValue: router},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should manage error when tray to get all projects', async () => {
    const dialogSpy = spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    spyOn(component['projectService'], 'getAllProjects').and.rejectWith({error: 'error'});
    await component.getAllProjects();
    expect(dialogSpy).toHaveBeenCalled();
    await component.goToProjects();
    await component.logout();
    await component.cardActions({id: 1, action: 'open'});
  });

  it('should be able to delete project', async () => {
    const deleteSpy = spyOn(component['projectService'], 'deleteProject').and.resolveTo();
    spyOn(component['dialogService'], 'openInterrogativeModal').and.resolveTo('yes');
    spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    await component.cardActions({id: 1, action: 'delete'});
    expect(deleteSpy).toHaveBeenCalled();
    deleteSpy.and.stub().and.rejectWith({error: 'error'});
    await component.cardActions({id: 1, action: 'delete'});
  });

  it('should be able to edit project', async () => {
    spyOn(component['dialogService'], 'openCreationModal').and.resolveTo({title: 'title', description: 'description'});
    spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    await component.cardActions({id: 1, action: 'edit'});
    const editSpy = spyOn(component['projectService'], 'updateProject').and.rejectWith({error: 'error'});
    await component.cardActions({id: 1, action: 'edit'});
    expect(editSpy).toHaveBeenCalled();
  });

  it('should be able to create project', async () => {
    spyOn(component['dialogService'], 'openCreationModal').and.resolveTo({title: 'title', description: 'description'});
    spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    await component.openCreationModal();
    const editSpy = spyOn(component['projectService'], 'createProject').and.rejectWith({error: 'error'});
    await component.openCreationModal();
    expect(editSpy).toHaveBeenCalled();
  });

});
