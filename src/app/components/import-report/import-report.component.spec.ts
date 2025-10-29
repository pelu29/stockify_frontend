import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportReportComponent } from './import-report.component';

describe('ImportReportComponent', () => {
  let component: ImportReportComponent;
  let fixture: ComponentFixture<ImportReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

