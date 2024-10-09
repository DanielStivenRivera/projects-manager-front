import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICard} from '../../types/components/card.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    MatDivider,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input()
  data: ICard;

  @Output()
  changeState: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  open: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  delete: EventEmitter<number> = new EventEmitter<number>();

}
