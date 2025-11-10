import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../../models/inventario/product.model'; 
import { PRODUCTS } from '../../../models/inventario/mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {}

  getProductById(id: string): Observable<Product | null> {
    const product = PRODUCTS.find(p => p.codigoBarras === id);
    return of(product || null); 
  }

  getAllProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }
}