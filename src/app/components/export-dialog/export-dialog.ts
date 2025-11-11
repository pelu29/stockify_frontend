import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../edit-product-dialog/edit-product-dialog';

// Agrega esta importación
declare var jsPDF: any;

export interface ExportOptions {
  format: 'csv' | 'txt' | 'json' | 'excel' | 'pdf';
  includeImages: boolean;
  fileName: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  columns: {
    id: boolean;
    name: boolean;
    category: boolean;
    price: boolean;
    stock: boolean;
    status: boolean;
    description: boolean;
    barcode: boolean;
  };
}

@Component({
  selector: 'app-export-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './export-dialog.html',
  styleUrl: './export-dialog.css'
})
export class ExportDialog {
  @Input() products: Product[] = [];
  @Output() onExport = new EventEmitter<ExportOptions>();
  @Output() onCancel = new EventEmitter<void>();

  options: ExportOptions = {
    format: 'csv',
    includeImages: false,
    fileName: 'productos',
    dateRange: {
      start: null,
      end: null
    },
    columns: {
      id: true,
      name: true,
      category: true,
      price: true,
      stock: true,
      status: true,
      description: true,
      barcode: true
    }
  };

  formats = [
    { value: 'csv', label: 'CSV (Excel)', icon: '📊' },
    { value: 'excel', label: 'Excel (XLSX)', icon: '📈' },
    { value: 'txt', label: 'Texto con tabla', icon: '📄' },
    { value: 'json', label: 'JSON', icon: '🔧' },
    { value: 'pdf', label: 'PDF', icon: '📕' }
  ];

  constructor() {
    const timestamp = new Date().toISOString().split('T')[0];
    this.options.fileName = `productos_${timestamp}`;
  }

  get selectedColumns(): string[] {
    const cols = [];
    if (this.options.columns.id) cols.push('ID');
    if (this.options.columns.name) cols.push('Nombre');
    if (this.options.columns.category) cols.push('Categoría');
    if (this.options.columns.price) cols.push('Precio');
    if (this.options.columns.stock) cols.push('Stock');
    if (this.options.columns.status) cols.push('Estado');
    if (this.options.columns.description) cols.push('Descripción');
    if (this.options.columns.barcode) cols.push('Código Barras');
    return cols;
  }

  get totalProducts(): number {
    return this.products.length;
  }

  getSelectedFormatLabel(): string {
    const format = this.formats.find(f => f.value === this.options.format);
    return format ? format.label : 'CSV (Excel)';
  }

  cancel(): void {
    this.onCancel.emit();
  }

  export(): void {
    this.onExport.emit(this.options);
  }

  selectAllColumns(): void {
    Object.keys(this.options.columns).forEach(key => {
      this.options.columns[key as keyof typeof this.options.columns] = true;
    });
  }

  deselectAllColumns(): void {
    Object.keys(this.options.columns).forEach(key => {
      this.options.columns[key as keyof typeof this.options.columns] = false;
    });
  }
}