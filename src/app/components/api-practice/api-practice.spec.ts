import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiPractice } from './api-practice';

describe('ApiPractice', () => {
  let component: ApiPractice;
  let fixture: ComponentFixture<ApiPractice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiPractice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiPractice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
