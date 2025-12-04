import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  isDownloadingPDF = false;
  isDownloadingCSV = false;

  constructor(private reportService: ReportService) {}

  downloadFile(type: 'pdf' | 'csv'): void {
    if (type === 'pdf') {
      this.isDownloadingPDF = true;
      this.reportService.downloadPDF().subscribe({
        next: (blob) => this.saveFile(blob, 'reporte_stock.pdf'),
        error: () => alert('Error al descargar PDF.'),
        complete: () => {
          this.isDownloadingPDF = false;
          alert('PDF descargado correctamente.');
        }
      });
    } else {
      this.isDownloadingCSV = true;
      this.reportService.downloadCSV().subscribe({
        next: (blob) => this.saveFile(blob, 'reporte_stock.csv'),
        error: () => alert('Error al descargar CSV.'),
        complete: () => {
          this.isDownloadingCSV = false;
          alert('CSV descargado correctamente.');
        }
      });
    }
  }

  private saveFile(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
