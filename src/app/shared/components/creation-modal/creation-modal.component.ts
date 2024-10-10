import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ICreationForm} from '../../types/forms/creation-form';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInput, MatInputModule} from '@angular/material/input';
import {DialogService} from '../../services/dialog.service';
import {CreationModalInterface} from '../../types/components/creation-modal.interface';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-creation-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatInput,
    ReactiveFormsModule,
    MatCheckbox,
  ],
  templateUrl: './creation-modal.component.html',
  styleUrl: './creation-modal.component.scss'
})
export class CreationModalComponent implements OnInit {

  creationForm: FormGroup<ICreationForm>;

  constructor(
    private dialogRef : MatDialogRef<CreationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreationModalInterface,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.dialogRef.disableClose = true;
    if (this.data.data) {
      this.creationForm.patchValue({
        title: this.data.data.title,
        description: this.data.data.description,
      });
      if (this.data.data.isTasks) {
        this.creationForm.controls.completed!.patchValue(this.data.data.completed);
      }
    }
  }

  initializeForm() {
    if (this.data.data && this.data.data.isTasks === true) {
      this.creationForm = new FormGroup<ICreationForm>({
        title: new FormControl<string>('', [Validators.required]),
        description: new FormControl<string>(''),
        completed: new FormControl(false),
      })
    } else {
      this.creationForm = new FormGroup<ICreationForm>({
        title: new FormControl<string>('', [Validators.required]),
        description: new FormControl<string>('')
      })
    }
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
