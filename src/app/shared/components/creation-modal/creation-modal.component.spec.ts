import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationModalComponent } from './creation-modal.component';

describe('CreationModalComponent', () => {
  let component: CreationModalComponent;
  let fixture: ComponentFixture<CreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationModalComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
