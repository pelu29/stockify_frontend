import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  allProducts: Product[] = PRODUCTS;
  filteredProducts: Product[] = [];
  
  searchTerm = '';
  private searchSubject = new Subject<string>();

  // Paginación
  currentPage = 1;
  itemsPerPage = 3
  totalPages = 1;

  ngOnInit(): void {
    this.filteredProducts = [...this.allProducts];
    this.updatePagination();

    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.filterProducts(term);
    });
  }

  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  filterProducts(term: string): void {
    const search = term.toLowerCase();
    this.filteredProducts = this.allProducts.filter(p =>
      p.nombre.toLowerCase().includes(search) ||
      p.categoria.toLowerCase().includes(search)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

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
}
