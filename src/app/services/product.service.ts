import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id?: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stock_minimo: number;
  negocio_id: number;
  categoria_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private http = inject(HttpClient);
  private apiUrl = 'https://stockify-backend-0r7c.onrender.com/api/productos/';

  
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  
  crearProducto(data: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, data);
  }

 
  actualizarProducto(id: number, data: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}${id}/`, data);
  }

  
}
