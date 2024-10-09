import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {IProject, IProjectCreate, IProjectServerResponse} from '../shared/types/services/projects.interface';
import {ICard} from '../shared/types/components/card.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  _projects: ICard[] = [];

  private lastId = 11;

  private url = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient,
  ) {
  }

  async getAllProjects() {
    if (this._projects.length === 0) {
      const data = await lastValueFrom(this.http.get<IProjectServerResponse[]>(this.url));
      this._projects = data.map(item => {
        return {
          id: item.id,
          title: item.name,
          description: item.email,
          isTasks: false
        }
      });
    }
    return this._projects;
  }

  async createProject(project: IProjectCreate) {
    const data = await lastValueFrom(this.http.post<IProject>(this.url, project));
    this._projects.push({id: this.lastId++, description: data.description, title: data.title, isTasks: false});
  }

  async deleteProject(id: number) {
    //await lastValueFrom(this.http.delete(`https://jsonplaceholder.typicode.com/projects/${id}`));
    const itemId = this._projects.findIndex(project => project.id === id);
    if (itemId === -1) {
      throw Error(`Project with id ${id} not found`);
    }
    this._projects.splice(itemId, 1);
  }

}

