import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TasksComponent} from './tasks.component';
import {TasksService} from './tasks.service';
import {DialogService} from '../shared/services/dialog.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {ProjectsService} from '../projects/projects.service';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1
      }
    }
  }

  const mockProjectService = {
    getById: async () => {
      return {
        title: 'project',
        id: 1,
      };
    },
  }

  let getAllSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: ProjectsService, useValue: mockProjectService},

      ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    getAllSpy = spyOn(component['taskService'], 'getAllTasks').and.resolveTo([]);
    fixture.detectChanges();
    await new Promise(resolve => setTimeout(resolve, 1));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to validate initialization of component', async () => {
    const routerSpy = spyOn(component['router'], 'navigateByUrl').and.resolveTo(true);
    spyOn(component['projectService'], 'getById').and.resolveTo(null);
    await component.ngOnInit();
    spyOn(component['route'].snapshot.paramMap, 'get').and.returnValue(null);
    await component.ngOnInit();
    expect(routerSpy).toHaveBeenCalledTimes(2);
  });

  it('should be able to manage error when try to get all tasks', async () => {
    const spy = spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    getAllSpy.and.stub().and.rejectWith({error: 'error'});
    await component.getTasks();
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to delete task', async () => {
    spyOn(component['dialogService'], 'openInterrogativeModal').and.resolveTo('yes');
    spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    const deleteSpy = spyOn(component['taskService'], 'deleteTask').and.resolveTo();
    await component.cardActions({id: 1, action: 'delete'});
    expect(deleteSpy).toHaveBeenCalled();
    deleteSpy.and.stub().and.rejectWith({error: 'error'});
    await component.cardActions({id: 1, action: 'delete'});
  });

  it('should be able to edit task', async () => {
    const getByIdSpy = spyOn(component['taskService'], 'getById').and.resolveTo({
      isTasks: true,
      title: 'title',
      description: 'description',
      userId: 1,
      id: 1
    });
    spyOn(component['dialogService'], 'openCreationModal').and.resolveTo({title: 'data', description: 'desc'});
    spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    spyOn(component['taskService'], 'updateTask').and.resolveTo();
    await component.cardActions({id: 1, action: 'edit'});
    getByIdSpy.and.stub().and.rejectWith({error: 'error'});
    await component.cardActions({id: 1, action: 'edit'});
    expect(getByIdSpy).toHaveBeenCalled();
  });

  it('should be able to create task', async () => {
    spyOn(component['dialogService'], 'openCreationModal').and.resolveTo({title: 'data', description: 'desc'});
    spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    const createSpy = spyOn(component['taskService'], 'createTask').and.resolveTo();
    await component.openCreateTasksModal();
    createSpy.and.stub().and.rejectWith({error: 'error'});
    await component.openCreateTasksModal();
  });

});
