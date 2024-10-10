import {IProject} from '../services/projects.interface';
import {ITask} from '../services/task.interface';

export interface ICard extends IProject {
  completed?: boolean;
  isTasks: boolean;
  userId: number;
}

export interface CardEvent {
  action: 'edit' | 'open' | 'delete';
  id: number;
}
