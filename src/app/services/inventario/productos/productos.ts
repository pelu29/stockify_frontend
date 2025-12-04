import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, expand, toArray } from 'rxjs/operators';

export interface ProductoAPI {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  stock_minimo: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
  negocio_id: number;
  categoria_id: number;
}

export interface CategoriaAPI {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
  fecha_creacion: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'https://stockify-backend-0r7c.onrender.com/api';

  constructor(private http: HttpClient) {}

  // 🔥 Trae TODOS los productos automáticamente paginados
  getProductos(): Observable<ProductoAPI[]> {
    return this.http.get<ApiResponse<ProductoAPI>>(`${this.apiUrl}/productos/`).pipe(
      expand((response) =>
        response.next
          ? this.http.get<ApiResponse<ProductoAPI>>(response.next)
          : EMPTY
      ),
      map((response) => response.results), // cada página → lista de productos
      toArray(),                           // junta todas las páginas en un array de arrays
      map((pages) => pages.flat())         // aplana [[p1,p2],[p3,p4]] → [p1,p2,p3,p4]
    );
  }

  // ✔ Categorías sin paginación
  getCategorias(): Observable<CategoriaAPI[]> {
    return this.http
      .get<ApiResponse<CategoriaAPI>>(`${this.apiUrl}/categorias/`)
      .pipe(map((response) => response.results));
  }
}