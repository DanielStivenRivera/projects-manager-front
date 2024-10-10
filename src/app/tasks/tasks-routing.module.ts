import {TasksComponent} from './tasks.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path: '',
    component: TasksComponent,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
