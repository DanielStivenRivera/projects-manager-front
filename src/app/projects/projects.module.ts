import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import {ProjectsRoutingModule} from './projects-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CardComponent} from '../shared/components/card/card.component';


@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CardComponent,
  ]
})
export class ProjectsModule { }
