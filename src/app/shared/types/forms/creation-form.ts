import {FormControl} from '@angular/forms';

export interface ICreationForm {
  title: FormControl<string>;
  description: FormControl<string>;
}
