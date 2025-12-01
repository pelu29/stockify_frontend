import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://stockify-backend-0r7c.onrender.com/api/productos/';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
