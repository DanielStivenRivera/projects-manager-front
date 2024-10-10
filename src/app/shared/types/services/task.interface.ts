import {ICard} from '../components/card.interface';
import {IProjectCreate} from './projects.interface';

export interface ITask extends ICard {
  userId: number;

}

export interface TasksDictionary {
  [key: number]: ITask[];
}

export interface ITaskCreate extends IProjectCreate {
  completed?: boolean;
}
