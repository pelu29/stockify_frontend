import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExport } from './pdf-export';

describe('PdfExport', () => {
  let component: PdfExport;
  let fixture: ComponentFixture<PdfExport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfExport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfExport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
