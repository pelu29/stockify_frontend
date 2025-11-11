import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditProductDialog, Product } from '../edit-product-dialog/edit-product-dialog';
import { ExportDialog, ExportOptions } from '../export-dialog/export-dialog';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, EditProductDialog, FormsModule, ExportDialog],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private readonly STORAGE_KEY = 'productos_guardados';

  private defaultProducts: Product[] = [
    {
      id: 1,
      name: 'Café Americano',
      category: 'Bebidas Calientes',
      price: 25.50,
      stock: 50,
      description: 'Café negro sin azúcar, tostado medio.',
      barcode: '1234567890123',
      status: 'Activo'
    },
    {
      id: 2,
      name: 'Latte',
      category: 'Bebidas Calientes',
      price: 35.00,
      stock: 30,
      description: 'Café con leche y espuma cremosa.',
      barcode: '9876543210897',
      status: 'Activo'
    },
    {
      id: 3,
      name: 'Tostada integral',
      category: 'Desayunos',
      price: 40.00,
      stock: 20,
      description: 'Pan integral con aguacate y tomate.',
      barcode: '4567890123456',
      status: 'Activo'
    },
    {
      id: 4,
      name: 'Beef Orion Pizza',
      category: 'Pizzas',
      price: 180.00,
      stock: 15,
      description: 'Pizza con cebolla y carne de res',
      barcode: '1234567896942',
      status: 'Activo'
    },
    {
      id: 5,
      name: 'Cheese Pizza',
      category: 'Pizzas',
      price: 150.00,
      stock: 25,
      description: 'Pizza de queso clásico',
      barcode: '2345678901234',
      status: 'Activo'
    },
    {
      id: 6,
      name: 'Chicken Burger',
      category: 'Hamburguesas',
      price: 120.00,
      stock: 35,
      description: 'Hamburguesa de pollo',
      barcode: '3456789012345',
      status: 'Activo'
    }
  ];

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  originalProducts: Product[] = [];

  searchTerm: string = '';

  showDialog = false;
  currentProduct: Product | null = null;
  isEditMode = false;
  hasChanges = false;
  showExportDialog = false;
  exportProducts: Product[] = [];

  ngOnInit(): void {
    this.loadProductsFromStorage();
  }

  private loadProductsFromStorage(): void {
    const savedProducts = localStorage.getItem(this.STORAGE_KEY);
    
    if (savedProducts) {
      try {
        this.allProducts = JSON.parse(savedProducts);
        this.originalProducts = [...this.allProducts];
        this.filteredProducts = [...this.allProducts];
        console.log('Productos cargados desde localStorage:', this.allProducts);
      } catch (error) {
        console.error('Error al cargar productos desde localStorage:', error);
        this.loadDefaultProducts();
      }
    } else {
      this.loadDefaultProducts();
    }
  }

  private loadDefaultProducts(): void {
    this.allProducts = [...this.defaultProducts];
    this.originalProducts = [...this.defaultProducts];
    this.filteredProducts = [...this.defaultProducts];
    console.log('Cargando productos por defecto');
  }

  private saveProductsToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.allProducts));
      console.log('Productos guardados en localStorage:', this.allProducts);
    } catch (error) {
      console.error('Error al guardar productos en localStorage:', error);
      alert('Error al guardar los cambios. Los datos podrían ser demasiado grandes.');
    }
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.allProducts];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    
    this.filteredProducts = this.allProducts.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.barcode?.includes(term) ||
      product.status?.toLowerCase().includes(term) ||
      product.price.toString().includes(term) ||
      product.stock.toString().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredProducts = [...this.allProducts];
  }

  onImageUpload(event: any, product: Product): void {
    const file = event.target.files[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es demasiado grande. El tamaño máximo permitido es 2MB.');
        return;
      }

      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        const index = this.allProducts.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.allProducts[index] = {
            ...this.allProducts[index],
            image: e.target.result,
            imageFile: file
          };
          this.hasChanges = true;
          this.onSearch();
          console.log('Imagen subida para:', product.name);
        }
      };

      reader.onerror = () => {
        alert('Error al leer el archivo de imagen.');
      };

      reader.readAsDataURL(file);
    }
  }

  openAddDialog(): void {
    this.currentProduct = null;
    this.isEditMode = false;
    this.showDialog = true;
  }

  openEditDialog(product: Product): void {
    this.currentProduct = product;
    this.isEditMode = true;
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
    this.currentProduct = null;
  }

  onProductSaved(savedProduct: Product): void {
    if (this.isEditMode && this.currentProduct) {
      const index = this.allProducts.findIndex(p => p.id === this.currentProduct!.id);
      if (index !== -1) {
        const updatedProduct = {
          ...savedProduct,
          image: this.allProducts[index].image,
          imageFile: this.allProducts[index].imageFile
        };
        this.allProducts[index] = updatedProduct;
        this.hasChanges = true;
      }
    } else {
      const newId = this.allProducts.length > 0 ? Math.max(...this.allProducts.map(p => p.id)) + 1 : 1;
      const newProduct = {
        ...savedProduct,
        id: newId
      };
      this.allProducts.push(newProduct);
      this.hasChanges = true;
    }
    
    this.onSearch();
    this.closeDialog();
    console.log('Productos actualizados:', this.allProducts);
  }

  onDialogCancel(): void {
    this.closeDialog();
  }

  deleteProduct(product: Product): void {
    this.allProducts = this.allProducts.filter(p => p.id !== product.id);
    this.hasChanges = true;
    this.onSearch();
    console.log('Producto eliminado:', product.name);
  }

  onSaveAllChanges(): void {
    this.saveProductsToStorage();
    this.originalProducts = [...this.allProducts];
    this.hasChanges = false;
    alert('Todos los cambios han sido guardados exitosamente. Los datos persistirán al recargar la página.');
  }

  onCancelAllChanges(): void {
    if (this.hasChanges) {
      this.allProducts = [...this.originalProducts];
      this.hasChanges = false;
      this.onSearch();
      alert('Todos los cambios han sido cancelados');
    } else {
      alert('No hay cambios pendientes para cancelar');
    }
  }

  // =FUNCIONALIDAD IMPRESIÓN ==

  onPrint(): void {
    const productsToPrint = this.searchTerm ? this.filteredProducts : this.allProducts;
    
    if (productsToPrint.length === 0) {
      alert('No hay productos para imprimir.');
      return;
    }

    this.printProducts(productsToPrint);
  }

  private printProducts(products: Product[]): void {
    try {
      const htmlContent = this.generatePrintHTML(products);
      
      const printWindow = window.open('', '_blank', 'width=900,height=600');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Esperar a que cargue imprimir
        printWindow.onload = () => {
          printWindow.print();
        };
      } else {
        alert('Por favor, permite ventanas emergentes para imprimir.');
      }
      
    } catch (error) {
      console.error('Error al imprimir:', error);
      alert('Error al imprimir. Por favor, intenta de nuevo.');
    }
  }

  private generatePrintHTML(products: Product[]): string {
    const currentDate = new Date().toLocaleString();
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Inventario de Productos - Impresión</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            margin: 20px; 
            line-height: 1.4;
            color: #333;
        }
        .header { 
            text-align: center; 
            margin-bottom: 25px;
            border-bottom: 3px double #333;
            padding-bottom: 15px;
        }
        .title { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 8px;
            color: #2c3e50;
        }
        .subtitle {
            font-size: 16px;
            color: #7f8c8d;
            margin-bottom: 5px;
        }
        .info { 
            font-size: 14px; 
            color: #666; 
            margin-bottom: 20px; 
        }
        .summary {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            border-left: 4px solid #3498db;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 10px;
        }
        .summary-item {
            padding: 8px;
            background: white;
            border-radius: 5px;
            text-align: center;
        }
        .summary-value {
            font-size: 18px;
            font-weight: bold;
            color: #2c3e50;
        }
        .summary-label {
            font-size: 12px;
            color: #7f8c8d;
            text-transform: uppercase;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 25px;
            font-size: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        th { 
            background-color: #2c3e50; 
            color: white; 
            padding: 12px 8px; 
            text-align: left; 
            font-weight: bold;
            border: 1px solid #34495e;
        }
        td { 
            padding: 10px 8px; 
            border: 1px solid #ddd;
            vertical-align: top;
        }
        tr:nth-child(even) { 
            background-color: #f8f9fa; 
        }
        .number {
            text-align: right;
        }
        .center {
            text-align: center;
        }
        .status-active {
            color: #27ae60;
            font-weight: bold;
        }
        .status-inactive {
            color: #e74c3c;
            font-weight: bold;
        }
        .footer { 
            font-size: 12px; 
            color: #95a5a6; 
            text-align: center; 
            margin-top: 30px;
            border-top: 1px solid #bdc3c7;
            padding-top: 15px;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
            .summary { background: #f8f9fa !important; -webkit-print-color-adjust: exact; }
            th { background: #2c3e50 !important; color: white !important; -webkit-print-color-adjust: exact; }
        }
        .print-actions {
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            background: #ecf0f1;
            border-radius: 8px;
        }
        .print-btn {
            padding: 10px 20px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 0 10px;
            font-size: 14px;
        }
        .print-btn:hover {
            background: #2980b9;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">INVENTARIO DE PRODUCTOS</div>
        <div class="subtitle">Sistema de Gestión de Inventarios</div>
        <div class="info">
            Generado: ${currentDate}
        </div>
    </div>
    
    <div class="summary">
        <strong>Resumen del Reporte</strong>
        <div class="summary-grid">
            <div class="summary-item">
                <div class="summary-value">${products.length}</div>
                <div class="summary-label">Total Productos</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">$${totalValue.toFixed(2)}</div>
                <div class="summary-label">Valor Total Inventario</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${new Set(products.map(p => p.category)).size}</div>
                <div class="summary-label">Categorías</div>
            </div>
            <div class="summary-item">
                <div class="summary-value">${products.filter(p => p.status === 'Activo').length}</div>
                <div class="summary-label">Productos Activos</div>
            </div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th width="50">ID</th>
                <th>Nombre del Producto</th>
                <th width="120">Categoría</th>
                <th width="80">Precio</th>
                <th width="70">Stock</th>
                <th width="100">Valor Total</th>
                <th width="80">Estado</th>
                <th>Descripción</th>
                <th width="120">Código Barras</th>
            </tr>
        </thead>
        <tbody>
            ${products.map(product => {
                const productValue = product.price * product.stock;
                return `
                <tr>
                    <td class="center">${product.id}</td>
                    <td><strong>${product.name}</strong></td>
                    <td>${product.category}</td>
                    <td class="number">$${product.price.toFixed(2)}</td>
                    <td class="center">${product.stock}</td>
                    <td class="number">$${productValue.toFixed(2)}</td>
                    <td class="center">
                        <span class="status-${product.status?.toLowerCase() === 'activo' ? 'active' : 'inactive'}">
                            ${product.status || 'Activo'}
                        </span>
                    </td>
                    <td>${product.description || 'Sin descripción'}</td>
                    <td class="center" style="font-family: monospace;">${product.barcode || 'N/A'}</td>
                </tr>
                `;
            }).join('')}
        </tbody>
    </table>
    
    <div class="footer">
        <strong>Sistema de Gestión de Inventarios</strong><br>
        Reporte generado automáticamente el ${currentDate}<br>
        Total de productos listados: ${products.length} | Valor total del inventario: $${totalValue.toFixed(2)}
    </div>
    
    <div class="print-actions no-print">
        <h3>Listo para Imprimir</h3>
        <p>Usa el botón de imprimir de tu navegador o el botón de abajo</p>
        <button class="print-btn" onclick="window.print()">🖨️ Imprimir</button>
        <button class="print-btn" onclick="window.close()" style="background: #e74c3c;">❌ Cerrar</button>
        <p style="font-size: 12px; color: #7f8c8d; margin-top: 10px;">
            <strong>Sugerencia:</strong> En el diálogo de impresión, selecciona "Guardar como PDF" para exportar como PDF
        </p>
    </div>

    <script>
        // Auto-imprimir cuando se cargue la página (opcional)
        // setTimeout(() => { window.print(); }, 1000);
    </script>
</body>
</html>
    `;
  }

  // = FUNCIONALIDAD=

  onExport(): void {
    this.exportProducts = this.searchTerm ? this.filteredProducts : this.allProducts;
    
    if (this.exportProducts.length === 0) {
      alert('No hay productos para exportar.');
      return;
    }

    this.showExportDialog = true;
  }

  onExportConfirmed(options: ExportOptions): void {
    this.showExportDialog = false;
    
    switch (options.format) {
      case 'csv':
        this.exportToCSVTable(this.exportProducts, options);
        break;
      case 'txt':
        this.exportToTXTTable(this.exportProducts, options);
        break;
      case 'json':
        this.exportToJSON(this.exportProducts, options);
        break;
      case 'excel':
        this.exportToExcel(this.exportProducts, options);
        break;
      case 'pdf':
        this.exportToPDF(this.exportProducts, options);
        break;
    }
  }

  onExportCancelled(): void {
    this.showExportDialog = false;
  }

  private exportToCSVTable(products: Product[], options: ExportOptions): void {
    const headers = this.getSelectedHeaders(options.columns);
    const columnWidths = this.calculateColumnWidths(products, options.columns);
    
    const csvContent = this.generateCSVContent(products, headers, columnWidths, options);
    this.downloadFile(csvContent, `${options.fileName}.csv`, 'text/csv');
    
    this.showExportSuccess(products.length, 'CSV');
  }

  private exportToTXTTable(products: Product[], options: ExportOptions): void {
    const headers = this.getSelectedHeaders(options.columns);
    const columnWidths = this.calculateColumnWidths(products, options.columns);
    
    const txtContent = this.generateTXTContent(products, headers, columnWidths, options);
    this.downloadFile(txtContent, `${options.fileName}.txt`, 'text/plain');
    
    this.showExportSuccess(products.length, 'TXT');
  }

  private exportToJSON(products: Product[], options: ExportOptions): void {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalProducts: products.length,
        searchFilter: this.searchTerm || 'Todos los productos',
        includedColumns: Object.keys(options.columns).filter(key => options.columns[key as keyof typeof options.columns])
      },
      products: products.map(product => {
        const exportedProduct: any = { id: product.id };
        if (options.columns.name) exportedProduct.name = product.name;
        if (options.columns.category) exportedProduct.category = product.category;
        if (options.columns.price) exportedProduct.price = product.price;
        if (options.columns.stock) exportedProduct.stock = product.stock;
        if (options.columns.status) exportedProduct.status = product.status;
        if (options.columns.description) exportedProduct.description = product.description;
        if (options.columns.barcode) exportedProduct.barcode = product.barcode;
        if (options.includeImages && product.image) exportedProduct.image = product.image;
        return exportedProduct;
      })
    };

    const jsonContent = JSON.stringify(exportData, null, 2);
    this.downloadFile(jsonContent, `${options.fileName}.json`, 'application/json');
    
    this.showExportSuccess(products.length, 'JSON');
  }

  private exportToExcel(products: Product[], options: ExportOptions): void {
    const headers = this.getSelectedHeaders(options.columns);
    const columnWidths = this.calculateColumnWidths(products, options.columns);
    
    const excelContent = this.generateCSVContent(products, headers, columnWidths, options);
    this.downloadFile(excelContent, `${options.fileName}.xls`, 'application/vnd.ms-excel');
    
    this.showExportSuccess(products.length, 'Excel');
  }

  private exportToPDF(products: Product[], options: ExportOptions): void {
    try {
      const htmlContent = this.generatePDFHTML(products, options);
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        printWindow.onload = () => {
          printWindow.print();
          this.showExportSuccess(products.length, 'PDF');
        };
      } else {
        alert('Por favor, permite ventanas emergentes para generar el PDF.');
      }
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el archivo PDF. Por favor, intenta de nuevo.');
    }
  }

  private generatePDFHTML(products: Product[], options: ExportOptions): string {
    const headers = this.getSelectedHeaders(options.columns);
    const currentDate = new Date().toLocaleString();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Inventario de Productos</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            margin: 20px; 
            line-height: 1.4;
        }
        .header { 
            text-align: center; 
            margin-bottom: 25px;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
        }
        .title { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 8px;
            color: #2c3e50;
        }
        .subtitle {
            font-size: 14px;
            color: #7f8c8d;
            margin-bottom: 5px;
        }
        .info { 
            font-size: 12px; 
            color: #666; 
            margin-bottom: 20px; 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 25px;
            font-size: 12px;
        }
        th { 
            background-color: #3498db; 
            color: white; 
            padding: 10px 8px; 
            text-align: left; 
            font-weight: bold;
            border: 1px solid #2980b9;
        }
        td { 
            padding: 8px; 
            border: 1px solid #ddd;
            vertical-align: top;
        }
        tr:nth-child(even) { 
            background-color: #f8f9fa; 
        }
        tr:hover {
            background-color: #e8f4fd;
        }
        .footer { 
            font-size: 10px; 
            color: #95a5a6; 
            text-align: center; 
            margin-top: 30px;
            border-top: 1px solid #bdc3c7;
            padding-top: 10px;
        }
        .summary {
            background-color: #ecf0f1;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            font-size: 11px;
        }
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
            table { font-size: 10px; }
            .header { margin-bottom: 15px; }
        }
        .column-info {
            font-size: 11px;
            color: #7f8c8d;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">INVENTARIO DE PRODUCTOS</div>
        <div class="subtitle">Sistema de Gestión de Inventarios</div>
        <div class="info">
            Exportado: ${currentDate} | Total de productos: ${products.length}
        </div>
    </div>
    
    <div class="summary">
        <strong>Resumen:</strong> ${products.length} productos encontrados | 
        ${headers.length} columnas exportadas |
        Filtro: ${this.searchTerm || 'Todos los productos'}
    </div>
    
    <div class="column-info">
        <strong>Columnas incluidas:</strong> ${headers.join(', ')}
    </div>
    
    <table>
        <thead>
            <tr>
                ${headers.map(header => `<th>${header}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${products.map(product => `
                <tr>
                    ${options.columns.id ? `<td style="text-align: center;">${product.id}</td>` : ''}
                    ${options.columns.name ? `<td><strong>${product.name}</strong></td>` : ''}
                    ${options.columns.category ? `<td>${product.category}</td>` : ''}
                    ${options.columns.price ? `<td style="text-align: right;">$${product.price.toFixed(2)}</td>` : ''}
                    ${options.columns.stock ? `<td style="text-align: center;">${product.stock}</td>` : ''}
                    ${options.columns.status ? `<td><span style="color: ${product.status === 'Activo' ? '#27ae60' : '#e74c3c'}">${product.status || 'Activo'}</span></td>` : ''}
                    ${options.columns.description ? `<td>${product.description || 'Sin descripción'}</td>` : ''}
                    ${options.columns.barcode ? `<td style="font-family: monospace;">${product.barcode || 'Sin código'}</td>` : ''}
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    <div class="footer">
        Generado automáticamente por Sistema de Inventarios | ${currentDate}
    </div>
    
    <div class="no-print" style="text-align: center; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
        <h3> PDF Listo para Imprimir/Guardar</h3>
        <p>Usa la función de impresión de tu navegador para guardar como PDF</p>
        <button onclick="window.print()" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
            Imprimir/Guardar como PDF
        </button>
        <button onclick="window.close()" style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 5px;">
          Cerrar Ventana
        </button>
        <p style="font-size: 12px; color: #7f8c8d; margin-top: 10px;">
            <strong>Instrucciones:</strong> En el diálogo de impresión, selecciona "Guardar como PDF" como destino
        </p>
    </div>
</body>
</html>
    `;
  }

  // Métodos auxiliares para exportación
  private getSelectedHeaders(columns: any): string[] {
    const headers = [];
    if (columns.id) headers.push('ID');
    if (columns.name) headers.push('Nombre');
    if (columns.category) headers.push('Categoría');
    if (columns.price) headers.push('Precio');
    if (columns.stock) headers.push('Stock');
    if (columns.status) headers.push('Estado');
    if (columns.description) headers.push('Descripción');
    if (columns.barcode) headers.push('Código Barras');
    return headers;
  }

  private calculateColumnWidths(products: Product[], columns: any): number[] {
    const headers = this.getSelectedHeaders(columns);
    
    const widths = headers.map((header, index) => {
      let maxWidth = header.length;
      
      products.forEach(product => {
        let cellContent = '';
        switch (headers[index]) {
          case 'ID': cellContent = product.id.toString(); break;
          case 'Nombre': cellContent = product.name; break;
          case 'Categoría': cellContent = product.category; break;
          case 'Precio': cellContent = `$${product.price}`; break;
          case 'Stock': cellContent = product.stock.toString(); break;
          case 'Estado': cellContent = product.status || 'Activo'; break;
          case 'Descripción': cellContent = this.truncateText(product.description || 'Sin descripción', 30); break;
          case 'Código Barras': cellContent = product.barcode || 'Sin código'; break;
        }
        maxWidth = Math.max(maxWidth, cellContent.length);
      });
      
      return Math.min(maxWidth + 2, 35);
    });
    
    return widths;
  }

  private generateCSVContent(products: Product[], headers: string[], columnWidths: number[], options: ExportOptions): string {
    const separator = headers.map((header, index) => 
      '═'.repeat(columnWidths[index])
    ).join(',');
    
    const csvContent = [
      headers.map((header, index) => 
        this.padCell(header, columnWidths[index])
      ).join(','),
      separator,
    
      ...products.map(product => {
        const row = [];
        if (options.columns.id) row.push(this.padCell(product.id.toString(), columnWidths[headers.indexOf('ID')]));
        if (options.columns.name) row.push(this.padCell(product.name, columnWidths[headers.indexOf('Nombre')]));
        if (options.columns.category) row.push(this.padCell(product.category, columnWidths[headers.indexOf('Categoría')]));
        if (options.columns.price) row.push(this.padCell(`$${product.price}`, columnWidths[headers.indexOf('Precio')]));
        if (options.columns.stock) row.push(this.padCell(product.stock.toString(), columnWidths[headers.indexOf('Stock')]));
        if (options.columns.status) row.push(this.padCell(product.status || 'Activo', columnWidths[headers.indexOf('Estado')]));
        if (options.columns.description) row.push(this.padCell(product.description || 'Sin descripción', columnWidths[headers.indexOf('Descripción')]));
        if (options.columns.barcode) row.push(this.padCell(product.barcode || 'Sin código', columnWidths[headers.indexOf('Código Barras')]));
        return row.join(',');
      }),
      
      separator,
      `Total de productos: ${products.length}`,
      `Exportado: ${new Date().toLocaleString()}`
    ].join('\n');

    return csvContent;
  }

  private generateTXTContent(products: Product[], headers: string[], columnWidths: number[], options: ExportOptions): string {

    const separator = '┌' + columnWidths.map(width => '─'.repeat(width + 2)).join('┬') + '┐';
    const middleSeparator = '├' + columnWidths.map(width => '─'.repeat(width + 2)).join('┼') + '┤';
    const bottomSeparator = '└' + columnWidths.map(width => '─'.repeat(width + 2)).join('┴') + '┘';

    const tableContent = [
      `INVENTARIO DE PRODUCTOS`,
      `Exportado: ${new Date().toLocaleString()}`,
      `Total: ${products.length} productos`,
      '',
      separator,
      
      '│ ' + headers.map((header, index) => 
        this.padCell(header, columnWidths[index], ' ')
      ).join(' │ ') + ' │',
      
      middleSeparator,
      
      ...products.map(product => {
        const row = [];
        if (options.columns.id) row.push(this.padCell(product.id.toString(), columnWidths[headers.indexOf('ID')], ' '));
        if (options.columns.name) row.push(this.padCell(product.name, columnWidths[headers.indexOf('Nombre')], ' '));
        if (options.columns.category) row.push(this.padCell(product.category, columnWidths[headers.indexOf('Categoría')], ' '));
        if (options.columns.price) row.push(this.padCell(`$${product.price}`, columnWidths[headers.indexOf('Precio')], ' '));
        if (options.columns.stock) row.push(this.padCell(product.stock.toString(), columnWidths[headers.indexOf('Stock')], ' '));
        if (options.columns.status) row.push(this.padCell(product.status || 'Activo', columnWidths[headers.indexOf('Estado')], ' '));
        if (options.columns.description) row.push(this.padCell(this.truncateText(product.description || 'Sin descripción', 30), columnWidths[headers.indexOf('Descripción')], ' '));
        if (options.columns.barcode) row.push(this.padCell(product.barcode || 'Sin código', columnWidths[headers.indexOf('Código Barras')], ' '));
        return '│ ' + row.join(' │ ') + ' │';
      }),
      
      bottomSeparator,
      '',
      `Generado automáticamente por Sistema de Inventarios`
    ].join('\n');

    return tableContent;
  }

  private padCell(content: string, width: number, paddingChar: string = ' '): string {
    if (content.length > width) {
      return content.substring(0, width - 3) + '...';
    }
    return content + paddingChar.repeat(width - content.length);
  }

  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  private showExportSuccess(count: number, format: string): void {
    alert(`✅ Exportado exitosamente ${count} productos en formato ${format}`);
  }
  private downloadFile(content: string, filename: string, contentType: string): void {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}