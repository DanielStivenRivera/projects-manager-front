import {Route, RouterModule} from '@angular/router';
import {ProjectsComponent} from './projects.component';
import {NgModule} from '@angular/core';

const routes: Route[] = [
  {
    path: '',
    component: ProjectsComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsModule {
}
