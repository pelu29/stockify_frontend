import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-import-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-report.component.html',
  styleUrls: ['./import-report.component.css']
})
export class ImportReportComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFileName: string | null = null;
  uploadMessage: string | null = null;


  triggerFileInput(type?: string): void {
    const input = this.fileInput.nativeElement;
    let acceptType = '.csv,.pdf,.xlsx';

    if (type === 'pdf') acceptType = '.pdf';
    else if (type === 'excel') acceptType = '.xlsx';
    else if (type === 'csv') acceptType = '.csv';

    input.setAttribute('accept', acceptType);
    input.click(); 
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileType = file.name.split('.').pop()?.toLowerCase();

      if (['csv', 'pdf', 'xlsx'].includes(fileType!)) {
        this.selectedFileName = file.name;
        this.uploadMessage = 'Archivo seleccionado correctamente ✅';
      } else {
        this.uploadMessage = '❌ Solo se permiten archivos CSV, PDF o Excel.';
        this.selectedFileName = null;
      }
    }
  }

  uploadFile(): void {
    if (this.selectedFileName) {
      this.uploadMessage = `📤 Archivo "${this.selectedFileName}" subido correctamente (simulado).`;
      setTimeout(() => (this.uploadMessage = null), 4000);
    }
  }
}



