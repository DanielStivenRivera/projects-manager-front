import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IInformativeModalInterface} from '../../types/components/informative-modal.interface';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-informative-modal',
  templateUrl: './informative-modal.component.html',
  styleUrl: './informative-modal.component.scss',
  standalone: true,
  imports: [
    MatIcon
  ]
})
export class InformativeModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InformativeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInformativeModalInterface,
  ) {
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

}
