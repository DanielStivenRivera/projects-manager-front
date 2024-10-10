import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InformativeModalComponent} from './informative-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

describe('InformativeModalComponent', () => {
  let component: InformativeModalComponent;
  let fixture: ComponentFixture<InformativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformativeModalComponent, MatDialogModule],
      providers: [
        {provide: MatDialogRef, useValue: {disableClose: false}},
        {provide: MAT_DIALOG_DATA, useValue: {message: 'mensaje de error', type: 'error '}}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InformativeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
