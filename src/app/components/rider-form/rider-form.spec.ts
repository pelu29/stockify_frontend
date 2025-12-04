import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderForm } from './rider-form';

describe('RiderForm', () => {
  let component: RiderForm;
  let fixture: ComponentFixture<RiderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiderForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
