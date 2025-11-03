import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { PRODUCTS } from '../../models/mock-products';
import { Subject, debounceTime } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;

  allProducts: Product[] = PRODUCTS;
  filteredProducts: Product[] = [];

  searchTerm = '';
  selectedCategory = '';
  selectedCategories: string[] = [];
  private searchSubject = new Subject<string>();

  // UI States
  searchExpanded = false;
  filterExpanded = false;
  exportMenuOpen = false;
  actionMenuOpen: string | null = null;
  // indica si cualquier menú de acción está abierto (permite reglas CSS más simples)
  menuIsOpen = false;
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
    // Si cerramos el panel, no limpiamos las selecciones automáticamente —
    // el usuario puede usar 'Limpiar' si quiere.
    if (!this.filterExpanded) {
      // opcional: aplicar el filtro actual
      this.filterProducts();
    }
  }

  // Toggle category selection (multi-select)
  toggleCategory(category: string, checked: boolean): void {
    if (checked) {
      if (!this.selectedCategories.includes(category)) {
        this.selectedCategories.push(category);
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter((c) => c !== category);
    }
    // aplicar filtro inmediatamente
    this.filterProducts();
  }

  clearCategories(): void {
    this.selectedCategories = [];
    this.filterProducts();
  }

  getCategories(): string[] {
    const set = new Set<string>(this.allProducts.map((p) => p.categoria));
    return Array.from(set);
  }

  isCategoryMatch(product: Product): boolean {
    if (!this.selectedCategories || this.selectedCategories.length === 0) return true;
    return this.selectedCategories.includes(product.categoria);
  }

  // Toggle export menu
  toggleExport(): void {
    this.exportMenuOpen = !this.exportMenuOpen;
  }

  // Toggle action menu
  toggleActionMenu(codigoBarras: string): void {
    this.actionMenuOpen = this.actionMenuOpen === codigoBarras ? null : codigoBarras;
    this.menuIsOpen = this.actionMenuOpen !== null;
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

    // Filtrar por categoría (multi-select)
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      result = result.filter((p) => this.selectedCategories.includes(p.categoria));
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
    this.menuIsOpen = false;
    // TODO: Implementar vista detallada
  }

  editProduct(product: Product): void {
    console.log('Editar producto:', product);
    this.actionMenuOpen = null;
    this.menuIsOpen = false;
    // TODO: Implementar edición
  }

  deleteProduct(product: Product): void {
    if (confirm(`¿Estás seguro de eliminar "${product.nombre}"?`)) {
      this.allProducts = this.allProducts.filter((p) => p.codigoBarras !== product.codigoBarras);
      this.filterProducts();
      console.log('Producto eliminado:', product);
    }
    this.actionMenuOpen = null;
    this.menuIsOpen = false;
  }

  toggleStatus(product: Product): void {
    const index = this.allProducts.findIndex((p) => p.codigoBarras === product.codigoBarras);

    if (index !== -1) {
      this.allProducts[index].estado =
        this.allProducts[index].estado === 'Active' ? 'Inactive' : 'Active';
      this.filterProducts();
    }
    this.actionMenuOpen = null;
    this.menuIsOpen = false;
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
