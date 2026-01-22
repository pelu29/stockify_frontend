import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiPracticeComponent } from './api-practice.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ApiPracticeComponent', () => {
  let component: ApiPracticeComponent;
  let fixture: ComponentFixture<ApiPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiPracticeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});