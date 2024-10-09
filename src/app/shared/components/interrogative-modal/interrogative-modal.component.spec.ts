import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrogativeModalComponent } from './interrogative-modal.component';

describe('InterrogativeModalComponent', () => {
  let component: InterrogativeModalComponent;
  let fixture: ComponentFixture<InterrogativeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterrogativeModalComponent]
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
