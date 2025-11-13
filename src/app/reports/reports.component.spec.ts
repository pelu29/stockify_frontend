import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsComponent } from './reports.component';
import { ReportService } from '../services/report.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let reportServiceSpy: jasmine.SpyObj<ReportService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ReportService', ['downloadPDF', 'downloadCSV']);

    await TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      providers: [{ provide: ReportService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    reportServiceSpy = TestBed.inject(ReportService) as jasmine.SpyObj<ReportService>;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar downloadPDF() del servicio al exportar PDF', () => {
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });
    reportServiceSpy.downloadPDF.and.returnValue(of(mockBlob));

    spyOn(component as any, 'saveFile');

    component.downloadFile('pdf');

    expect(reportServiceSpy.downloadPDF).toHaveBeenCalled();
    expect((component as any).saveFile).toHaveBeenCalledWith(mockBlob, 'reporte_stock.pdf');
  });

  it('debería llamar downloadCSV() del servicio al exportar CSV', () => {
    const mockBlob = new Blob(['test'], { type: 'text/csv' });
    reportServiceSpy.downloadCSV.and.returnValue(of(mockBlob));

    spyOn(component as any, 'saveFile');

    component.downloadFile('csv');

    expect(reportServiceSpy.downloadCSV).toHaveBeenCalled();
    expect((component as any).saveFile).toHaveBeenCalledWith(mockBlob, 'reporte_stock.csv');
  });

  it('debería manejar errores al descargar PDF', () => {
    reportServiceSpy.downloadPDF.and.returnValue(throwError(() => new Error('Error al descargar')));
    spyOn(window, 'alert');

    component.downloadFile('pdf');

    expect(window.alert).toHaveBeenCalledWith('Error al descargar PDF.');
  });

  it('deshabilitar el botón mientras descarga', () => {
    component.isDownloadingPDF = true;
    fixture.detectChanges();

    const pdfButton = fixture.debugElement.query(By.css('.btn-pdf')).nativeElement;
    expect(pdfButton.disabled).toBeTrue();
  });
});
