import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AuthComponent} from './auth.component';
import {DialogService} from '../shared/services/dialog.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [
        {
          provide: DialogService, useValue: {
            informativeModal: async () => {
            }
          }
        }
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to validate credentials', async () => {
    fixture.detectChanges();
    await component.validateCredentials();
    fixture.detectChanges();
    const passInput = fixture.nativeElement.querySelector('[data-test="password"]');
    const userInput = fixture.nativeElement.querySelector('[data-test="user"]');
    userInput.value = 'user';
    userInput.dispatchEvent(new Event('input'));
    passInput.value = 'user';
    passInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await component.validateCredentials();
    const spy = spyOn(component['router'], 'navigate').and.resolveTo(true);
    passInput.value = 'password';
    passInput.dispatchEvent(new Event('input'));
    userInput.value = 'user';
    userInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await component.validateCredentials();
    expect(spy).toHaveBeenCalled();
  });

});
