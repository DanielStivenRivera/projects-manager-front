import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {IAuthForm} from '../shared/types/forms/auth-form.interface';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  authForm: FormGroup<IAuthForm> = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private router: Router, private toastService: ToastrService) {
  }

  async validateCredentials() {
    this.authForm.markAllAsTouched();
    if (!this.authForm.valid) {
      this.toastService.error('completar los campos obligatorios');
      return;
    }
    const value = this.authForm.value;
    if (value.user === 'user' && value.password === 'password') {
      localStorage.setItem('token', 'user_active');
      await this.router.navigate(['/projects']);
    } else {
      this.authForm.reset();
      this.toastService.error('usuario/contraseña incorrectos');
    }
  }

}

