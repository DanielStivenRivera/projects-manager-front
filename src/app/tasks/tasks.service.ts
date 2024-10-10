import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {ITask, ITaskCreate, TasksDictionary} from '../shared/types/services/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  _tasks: TasksDictionary = {};

  lastId: number = 201;

  constructor(
    private http: HttpClient
  ) {
  }

  async getAllTasks(id: number) {
    const params = new HttpParams().set('userId', id);
    if (Object.keys(this._tasks).includes(id.toString())) {
      return this._tasks[id];
    } else {
      let tasks = await lastValueFrom(this.http.get<ITask[]>(`${this.url}`, {params}));
      this._tasks[id] = tasks.map(task => {
        return {
          isTasks: true,
          ...task
        }
      });
      return this._tasks[id];
    }
  }

  async createTask(projectId: number, data: ITaskCreate) {
    await lastValueFrom(this.http.post<ITaskCreate>(this.url, data));
    this._tasks[projectId].push({
      isTasks: true,
      id: this.lastId++,
      title: data.title,
      description: data.description,
      completed: false,
      userId: projectId
    });
  }

  async getById(projectId: number, id: number) {
    const item = this._tasks[projectId]?.find(task => task.id === id);
    if (item) {
      return item;
    }
    throw Error(`Task with id ${id} not found`);
  }

  async updateTask(projectId: number, tasksId: number, data: ITaskCreate) {
    const resp = await (lastValueFrom(this.http.patch<ITask>(`${this.url}/${tasksId}`, data)));
    const item = this._tasks[projectId].find(task => task.id === tasksId);
    if (!item) {
      throw Error(`task with id ${tasksId} not found`);
    }
    item.completed = resp.completed;
    item.title = resp.title;
    item.description = resp.description;
  }

  async deleteTask(id: number, projectId: number) {
    await lastValueFrom(this.http.delete<ITask>(`${this.url}/${id}`));
    const indexOf: number | undefined = this._tasks[projectId]?.findIndex(task => task.id === id);
    if (!!indexOf || indexOf === -1) {
      throw Error(`Task with id ${id} not found`);
    }
    this._tasks[projectId].splice(indexOf, 1);
  }

}
