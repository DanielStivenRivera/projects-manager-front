import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreationModalComponent} from './creation-modal.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('CreationModalComponent', () => {
  let component: CreationModalComponent;
  let fixture: ComponentFixture<CreationModalComponent>;

  const dialogRef = {
    close: () => {
    },
    disableClose: false,
  }

  const dialogData = {
    title: 'CREAR PROYECTO',
    data: undefined,
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationModalComponent, NoopAnimationsModule],
      providers: [
        {provide: MatDialogRef, useValue: dialogRef},
        {provide: MAT_DIALOG_DATA, useValue: dialogData},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to init edit project modal', async () => {
    component.data.data = {
      id: 1,
      title: 'title',
      description: 'description',
      userId: -1,
      isTasks: false,
    };
    component.ngOnInit();
    expect(Object.keys(component.creationForm.value)).toEqual(['title', 'description']);
  });

  it('should be able to init edit tasks modal', async () => {
    component.data.data = {
      id: 1,
      title: 'title',
      description: 'description',
      userId: -1,
      isTasks: true,
      completed: false,
    };
    component.ngOnInit();
    expect(Object.keys(component.creationForm.value)).toEqual(['title', 'description', 'completed']);
  });

  it('should be able to validate cancel and close modal', async () => {
    await component.cancel();
    const titleInput = fixture.nativeElement.querySelector('[data-test="title"]');
    const descInput = fixture.nativeElement.querySelector('[data-test="description"]');
    titleInput.value = 'title';
    descInput.value = 'title';
    titleInput.dispatchEvent(new Event('input'));
    descInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const spy = spyOn(component['dialogService'], 'openInterrogativeModal').and.resolveTo('yes');
    await component.cancel();
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to validate and save data', async () => {
    const spy = spyOn(component['dialogService'], 'informativeModal').and.resolveTo();
    component.initializeForm();
    await component.save();
    fixture.detectChanges();
    const titleInput = fixture.nativeElement.querySelector('[data-test="title"]');
    const descInput = fixture.nativeElement.querySelector('[data-test="description"]');
    titleInput.value = 'title';
    descInput.value = 'title';
    titleInput.dispatchEvent(new Event('input'));
    descInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    console.log(component.creationForm.value)
    await component.save();
  });

});
