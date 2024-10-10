import {TestBed} from '@angular/core/testing';

import {TasksService} from './tasks.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {ITask} from '../shared/types/services/task.interface';

describe('TasksService', () => {
  let service: TasksService;

  const mockedResponse = [<ITask>{
    id: 1,
    isTasks: true,
    title: 'task 1',
    userId: 1,
    description: 'description',
    completed: false
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get all tasks', async () => {
    const spy = spyOn(service['http'], 'get').and.returnValue(of(mockedResponse));
    await service.getAllTasks(1);
    await service.getAllTasks(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to create task', async () => {
    spyOn(service['http'], 'get').and.returnValue(of(mockedResponse));
    await service.getAllTasks(1);
    const spy = spyOn(service['http'], 'post').and.returnValue(of(mockedResponse));
    await service.createTask(1, {title: 'title', description: 'description'});
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to update task', async () => {
    spyOn(service['http'], 'get').and.returnValue(of(mockedResponse));
    spyOn(service['http'], 'patch').and.returnValue(of(mockedResponse[0]));
    await service.getAllTasks(1);
    try {
      await service.updateTask(1, 2, {title: 'title', description: 'description', completed: true});
    } catch (e) {
      expect(e.toString()).toEqual('Error: task with id 2 not found')
    }
    await service.updateTask(1, 1, {title: 'title', description: 'description', completed: true});
  });

  it('should be able to get task by id', async () => {
    spyOn(service['http'], 'get').and.returnValue(of(mockedResponse));
    await service.getAllTasks(1);
    await service.getById(1, 1);
    try {
      await service.getById(1, 2);
    } catch (e) {
      expect(e.toString()).toEqual('Error: Task with id 2 not found');
    }
  });

  it ('should be able to delete task', async () => {
    spyOn(service['http'], 'get').and.returnValue(of(mockedResponse));
    spyOn(service['http'], 'delete').and.returnValue(of({msg: 'deleted'}));
    await service.getAllTasks(1);
    try {
      await service.deleteTask(2, 1);
    } catch (e) {
      expect(e.toString()).toEqual('Error: Task with id 2 not found');
    }
    await service.deleteTask(1, 1);
  });

});
