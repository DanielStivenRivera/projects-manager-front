import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ICreationForm} from '../../types/forms/creation-form';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInput, MatInputModule} from '@angular/material/input';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-creation-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './creation-modal.component.html',
  styleUrl: './creation-modal.component.scss'
})
export class CreationModalComponent implements OnInit {

  creationForm: FormGroup<ICreationForm> = new FormGroup<ICreationForm>({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('')
  })

  constructor(
    private dialogRef : MatDialogRef<CreationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  async cancel() {
    if(!this.creationForm.dirty) {
      this.dialogRef.close();
      return;
    }
    const response = await this.dialogService.openInterrogativeModal({title: 'CANCELAR CREACIÓN', message: 'Los datos no serán guardados, ¿Desea continuar?'});
    if (response === 'yes') {
      this.dialogRef.close();
    }
  }

  async save() {
    this.creationForm.markAllAsTouched();
    if (this.creationForm.valid) {
      this.dialogRef.close(this.creationForm.value);
    } else {
      await this.dialogService.informativeModal('Complete los datos obligatorios', 'error');
    }
  }

}
