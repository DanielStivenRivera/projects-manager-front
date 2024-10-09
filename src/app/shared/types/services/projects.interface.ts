export interface IProjectServerResponse {
  name: string;
  email: string; //used as description
  id: number;
}

export interface IProject {
  title: string;
  description: string;
  id: number;
}

export interface IProjectCreate extends Omit<IProject, 'id'> {}
