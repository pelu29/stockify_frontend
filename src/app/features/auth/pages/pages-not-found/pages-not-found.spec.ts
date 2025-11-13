import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNotFound } from './pages-not-found';

describe('PagesNotFound', () => {
  let component: PagesNotFound;
  let fixture: ComponentFixture<PagesNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagesNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
