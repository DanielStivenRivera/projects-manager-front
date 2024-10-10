import {Route, RouterModule} from '@angular/router';
import {ProjectsComponent} from './projects.component';
import {NgModule} from '@angular/core';

const routes: Route[] = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: ':id/tasks',
        loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
