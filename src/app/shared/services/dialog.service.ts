import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InformativeModalComponent} from '../components/informative-modal/informative-modal.component';
import {IInformativeModalInterface} from '../types/components/informative-modal.interface';
import {lastValueFrom} from 'rxjs';
import {IProjectCreate} from '../types/services/projects.interface';
import {CreationModalComponent} from '../components/creation-modal/creation-modal.component';
import {IInterrogativeModalInterface} from '../types/components/interogative-modal.interface';
import {InterrogativeModalComponent} from '../components/interrogative-modal/interrogative-modal.component';
import {ITask} from '../types/services/task.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) {
  }

  async informativeModal(message: string, type: 'error' | 'success') {
    const dialog = this.dialog.open(InformativeModalComponent, {
      width: '90%',
      maxWidth: '400px',
      height: 'auto',
      panelClass: 'custom-dialog-background',
      data: <IInformativeModalInterface>{
        message,
        type
      }
    });
    await lastValueFrom(dialog.afterClosed());
  }

  async openCreationModal(title: string, data?: ITask): Promise<IProjectCreate | undefined> {
    const dialog = this.dialog.open(CreationModalComponent, {
      width: '90%',
      maxWidth: '500px',
      data: {
        title,
        data
      },
      height: 'auto',
      panelClass: 'custom-dialog-background'
    });
    return await lastValueFrom(dialog.afterClosed());
  }

  async openInterrogativeModal(data: IInterrogativeModalInterface): Promise<'yes' | 'not' | undefined> {
    const dialog = this.dialog.open(InterrogativeModalComponent, {
      width: '90%',
      maxWidth: '500px',
      data: data,
      height: 'auto',
      panelClass: 'custom-dialog-background'
    });
    return await lastValueFrom(dialog.afterClosed());
  }

}
