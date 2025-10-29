import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { PRODUCTS } from '../../models/mock-products';
import { Subject, debounceTime } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;

  allProducts: Product[] = PRODUCTS;
  filteredProducts: Product[] = [];

  searchTerm = '';
  selectedCategory = '';
  private searchSubject = new Subject<string>();

  // UI States
  searchExpanded = false;
  filterExpanded = false;
  exportMenuOpen = false;
  actionMenuOpen: string | null = null;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  ngOnInit(): void {
    // Inicializar productos con estado basado en stock
    this.allProducts = this.allProducts.map((p) => ({
      ...p,
      estado: p.stock > 0 ? 'Active' : 'Inactive',
    }));

    this.filteredProducts = [...this.allProducts];
    this.updatePagination();

    // Debounce para búsqueda
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.filterProducts();
    });
  }

  // Toggle search
  toggleSearch(): void {
    this.searchExpanded = !this.searchExpanded;
    if (this.searchExpanded) {
      setTimeout(() => {
        this.searchInput?.nativeElement.focus();
      }, 100);
    } else {
      this.searchTerm = '';
      this.filterProducts();
    }
  }

  // Toggle filter
  toggleFilter(): void {
    this.filterExpanded = !this.filterExpanded;
    if (!this.filterExpanded) {
      this.selectedCategory = '';
      this.filterProducts();
    }
  }

  // Toggle export menu
  toggleExport(): void {
    this.exportMenuOpen = !this.exportMenuOpen;
  }

  // Toggle action menu
  toggleActionMenu(codigoBarras: string): void {
    this.actionMenuOpen = this.actionMenuOpen === codigoBarras ? null : codigoBarras;
  }

  // Search con debounce
  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  // Filter por categoría
  onCategoryChange(): void {
    this.filterProducts();
  }

  // Aplicar todos los filtros
  filterProducts(): void {
    let result = [...this.allProducts];

    // Filtrar por búsqueda
    if (this.searchTerm.trim()) {
      const search = this.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(search) ||
          p.categoria.toLowerCase().includes(search) ||
          p.codigoBarras.includes(this.searchTerm)
      );
    }

    // Filtrar por categoría
    if (this.selectedCategory) {
      result = result.filter((p) => p.categoria === this.selectedCategory);
    }

    this.filteredProducts = result;
    this.currentPage = 1;
    this.updatePagination();
  }

  // Sort tabla
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredProducts.sort((a, b) => {
      let aValue: any = a[column as keyof Product];
      let bValue: any = b[column as keyof Product];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  // Select all
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.paginatedProducts.forEach((product: any) => {
      product.selected = checked;
    });
  }

  // Productos paginados
  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  // Actualizar paginación
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  // Navegar páginas
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Acciones de productos
  addProduct(): void {
    console.log('Agregar producto');
    // TODO: Implementar modal o redirección para agregar producto
  }

  viewProduct(product: Product): void {
    console.log('Ver producto:', product);
    this.actionMenuOpen = null;
    // TODO: Implementar vista detallada
  }

  editProduct(product: Product): void {
    console.log('Editar producto:', product);
    this.actionMenuOpen = null;
    // TODO: Implementar edición
  }

  deleteProduct(product: Product): void {
    if (confirm(`¿Estás seguro de eliminar "${product.nombre}"?`)) {
      this.allProducts = this.allProducts.filter((p) => p.codigoBarras !== product.codigoBarras);
      this.filterProducts();
      console.log('Producto eliminado:', product);
    }
    this.actionMenuOpen = null;
  }

  toggleStatus(product: Product): void {
    const index = this.allProducts.findIndex((p) => p.codigoBarras === product.codigoBarras);

    if (index !== -1) {
      this.allProducts[index].estado =
        this.allProducts[index].estado === 'Active' ? 'Inactive' : 'Active';
      this.filterProducts();
    }
    this.actionMenuOpen = null;
  }

  // Funciones de exportación
  exportAs(format: string): void {
    this.exportMenuOpen = false;

    switch (format) {
      case 'pdf':
        this.exportToPDF();
        break;
      case 'excel':
        this.exportToExcel();
        break;
      case 'csv':
        this.exportToCSV();
        break;
    }
  }

  private exportToPDF(): void {
    console.log('Exportando a PDF...');
    alert('Exportación a PDF - Por implementar');
    // TODO: Implementar con jsPDF o similar
  }

  private exportToExcel(): void {
    console.log('Exportando a Excel...');
    alert('Exportación a Excel - Por implementar');
    // TODO: Implementar con xlsx o similar
  }

  private exportToCSV(): void {
    console.log('Exportando a CSV...');

    // Implementación básica de CSV
    const headers = [
      'Nombre',
      'Código Barras',
      'Descripción',
      'Categoría',
      'Precio',
      'Stock',
      'Estado',
    ];
    const data = this.filteredProducts.map((p) => [
      p.nombre,
      p.codigoBarras,
      p.descripcion,
      p.categoria,
      p.precio,
      p.stock,
      p.estado || '',
    ]);

    let csv = headers.join(',') + '\n';
    data.forEach((row) => {
      csv += row.map((cell) => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `productos_${new Date().getTime()}.csv`;
    link.click();
  }
  // ✅ trackBy fuera de exportToCSV, al mismo nivel
  trackByCodigo(index: number, product: Product): string {
    return product.codigoBarras;
  }
}
