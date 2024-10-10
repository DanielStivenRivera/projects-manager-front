import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InterrogativeModalComponent} from './interrogative-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('InterrogativeModalComponent', () => {
  let component: InterrogativeModalComponent;
  let fixture: ComponentFixture<InterrogativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InterrogativeModalComponent,
        MatDialogModule
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {title: 'title', message: 'title'}},
        {provide: MatDialogRef, useValue: {disableClose: false}},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InterrogativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
