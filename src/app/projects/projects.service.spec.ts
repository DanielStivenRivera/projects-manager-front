import {TestBed} from '@angular/core/testing';

import {ProjectsService} from './projects.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get all projects', async () => {
    const spy = spyOn(service['http'], 'get').and.returnValue(of([{id: 1, name: 'title', email: 'email@email.com'}]));
    await service.getAllProjects();
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to create project', async () => {
    spyOn(service['http'], 'get').and.returnValue(of([{id: 1, name: 'title', email: 'email@email.com'}]));
    await service.getAllProjects();
    const postSpy = spyOn(service['http'], 'post').and.returnValue(of({id: 2, description: 'desc', title: 'title'}));
    await service.createProject({title: 'title', description: 'description'});
    expect(postSpy).toHaveBeenCalled();
  });

  it('should be able to get project by id', async () => {
    const spy = spyOn(service['http'], 'get').and.returnValue(of([{id: 1, name: 'title', email: 'email@email.com'}]));
    await service.getById(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to update project', async () => {
    spyOn(service['http'], 'get').and.returnValue(of([{id: 1, name: 'title', email: 'email@email.com'}]));
    await service.getAllProjects();
    spyOn(service['http'], 'patch').and.returnValue(of({id: 2, description: 'desc', title: 'title'}));
    await service.updateProject({title: 'title', description: 'desc'}, 1);
    try {
      await service.updateProject({title: 'title', description: 'desc'}, 2);
    } catch (e) {
      expect(e.toString()).toEqual(`Error: Project with id 2 not found`);
    }
  });

  it('should be able to delete project', async () => {
    spyOn(service['http'], 'get').and.returnValue(of([{id: 1, name: 'title', email: 'email@email.com'}]));
    spyOn(service['http'], 'delete').and.returnValue(of([{id: 1, name: 'title', email: 'email@email.com'}]));
    await service.getAllProjects();
    await service.deleteProject(1);
    try {
      await service.deleteProject(1);
    } catch (e) {
      expect(e.toString()).toEqual('Error: Project with id 1 not found');
    }
  });

});
