import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import {TasksRoutingModule} from './tasks-routing.module';
import {CardComponent} from '../shared/components/card/card.component';
import {MatButton} from '@angular/material/button';



@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    CardComponent,
    MatButton
  ]
})
export class TasksModule { }
