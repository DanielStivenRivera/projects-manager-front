import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {IProject, IProjectCreate, IProjectServerResponse} from '../shared/types/services/projects.interface';
import {ICard} from '../shared/types/components/card.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  _projects: ICard[];

  private lastId = 11;

  private url = 'https://jsonplaceholder.typicode.com/users';

  constructor(
    private http: HttpClient,
  ) {
  }

  async getAllProjects() {
    if (!this._projects) {
      const data = await lastValueFrom(this.http.get<IProjectServerResponse[]>(this.url));
      this._projects = data.map(item => {
        return {
          id: item.id,
          title: item.name,
          description: item.email,
          isTasks: false,
          userId: -1,
        }
      });
    }
    return this._projects;
  }

  async createProject(project: IProjectCreate) {
    const data = await lastValueFrom(this.http.post<IProject>(this.url, project));
    this._projects.push({id: this.lastId++, description: data.description, title: data.title, isTasks: false, userId: -1});
  }

  async deleteProject(id: number) {
    await lastValueFrom(this.http.delete(`${this.url}/${id}`));
    const itemId = this._projects.findIndex(project => project.id === id);
    if (itemId === -1) {
      throw Error(`Project with id ${id} not found`);
    }
    this._projects.splice(itemId, 1);
  }

  async getById(id: number) {
    if (!this._projects) {
      await this.getAllProjects();
    }
    return this._projects.find(project => project.id === id);
  }

  async updateProject(project: IProjectCreate, id: number) {
    const response = await lastValueFrom(this.http.patch<IProject>(`${this.url}/${id}`, project));
    const item = this._projects.find(project => project.id === id);
    if (item) {
      item.description = response.description;
      item.title = response.title;
    } else {
      throw Error(`Project with id ${id} not found`);
    }
  }
}

