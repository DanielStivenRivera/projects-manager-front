import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IInterrogativeModalInterface} from '../../types/components/interogative-modal.interface';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-interrogative-modal',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './interrogative-modal.component.html',
  styleUrl: './interrogative-modal.component.scss'
})
export class InterrogativeModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IInterrogativeModalInterface,
    public dialogRef: MatDialogRef<InterrogativeModalComponent>,
  ) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

}
