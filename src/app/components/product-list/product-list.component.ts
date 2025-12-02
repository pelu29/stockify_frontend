import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/inventario/product.model';
import { Subject, debounceTime, forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService, ProductoAPI, CategoriaAPI } from '../../services/inventario/productos/productos';
import { getProductImage } from '../../models/inventario/product-images';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private router: Router,
    private productosService: ProductosService
  ) {}

  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categorias: Map<number, string> = new Map(); // Mapa de ID -> Nombre de categoría
  isLoading = false;
  errorMessage = '';

  searchTerm = '';
  selectedCategory = '';
  selectedCategories: string[] = [];
  private searchSubject = new Subject<string>();

  // UI States
  searchExpanded = false;
  filterExpanded = false;
  exportMenuOpen = false;
  actionMenuOpen: string | null = null;
  menuIsOpen = false;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Paginación
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  ngOnInit(): void {
    this.loadData();

    // Debounce para búsqueda
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.filterProducts();
    });
  }

  // Cargar productos y categorías desde la API
  loadData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // Llamar ambas APIs en paralelo
    forkJoin({
      productos: this.productosService.getProductos(),
      categorias: this.productosService.getCategorias()
    }).subscribe({
      next: ({ productos, categorias }) => {
        // Crear mapa de categorías ID -> Nombre
        categorias.forEach((cat: CategoriaAPI) => {
          this.categorias.set(cat.id, cat.nombre);
        });

        // Mapear productos de la API al formato del componente
        this.allProducts = productos.map((p: ProductoAPI) => ({
          nombre: p.nombre,
          codigoBarras: p.codigo,
          descripcion: p.descripcion,
          categoria: this.categorias.get(p.categoria_id) || 'Sin categoría',
          precio: parseFloat(p.precio),
          stock: p.stock,
          imagen: getProductImage(p.id),
          estado:
          p.stock_minimo === 0
          ? 'Inactive'
          : p.stock > p.stock_minimo
          ? 'Active'
          : 'Inactive',
          selected: false
        }));

        this.filteredProducts = [...this.allProducts];
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.errorMessage = 'Error al cargar los datos. Por favor, intenta de nuevo.';
        this.isLoading = false;
      }
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
    this.filterProducts();
  }

  clearCategories(): void {
    this.selectedCategories = [];
    this.filterProducts();
  }

  getCategories(): string[] {
    const set = new Set<string>(this.allProducts.map((p) => p.categoria));
    return Array.from(set).sort();
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
  addProduct(ruta: string): void {
    this.router.navigate([`/${ruta}`]);
  }

  viewProduct(): void {
    this.router.navigate([`/layout/detalle-producto`]);
  }

  editProduct(product: Product): void {
    console.log('Editar producto:', product);
    this.actionMenuOpen = null;
    this.menuIsOpen = false;
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
  }

  private exportToExcel(): void {
    console.log('Exportando a Excel...');
    alert('Exportación a Excel - Por implementar');
  }

  private exportToCSV(): void {
    console.log('Exportando a CSV...');

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

  trackByCodigo(index: number, product: Product): string {
    return product.codigoBarras;
  }
}