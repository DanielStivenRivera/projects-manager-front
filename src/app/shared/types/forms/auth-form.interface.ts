import {FormControl} from '@angular/forms';

export interface IAuthForm {
  user: FormControl<string>,
  password: FormControl<string>,
}
