import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-import-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-report.component.html',
  styleUrls: ['./import-report.component.css']
})
export class ImportReportComponent {
  selectedFileName: string | null = null;
  errorMessage: string | null = null; // <-- Agregado

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileType = file.name.split('.').pop()?.toLowerCase();

      if (fileType === 'csv' || fileType === 'pdf') {
        this.selectedFileName = file.name;
        this.errorMessage = null; // limpiar error
      } else {
        this.selectedFileName = null;
        this.errorMessage = 'Solo se permiten archivos CSV o PDF.';
      }
    }
  }
}



