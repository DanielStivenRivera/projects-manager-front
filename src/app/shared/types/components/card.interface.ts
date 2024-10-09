import {IProject} from '../services/projects.interface';

export interface ICard extends IProject {
  state?: boolean;
  isTasks: boolean;
}
