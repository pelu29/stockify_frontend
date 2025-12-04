import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private apiUrl = 'https://stockify-backend-0r7c.onrender.com/api/inventario/categorias/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getOptions() {
    const token = this.auth.getAccessToken?.() || null;
    if (token) {
      return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
    }
    return {};
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl, this.getOptions()).pipe(timeout(10000));
  }

  obtenerCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}${id}/`, this.getOptions()).pipe(timeout(10000));
  }
}
