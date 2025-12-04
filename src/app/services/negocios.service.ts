import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Negocio {
  id?: number;
  nombre: string;
  descripcion?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  pais?: string;
  website?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  private apiUrl = 'https://stockify-backend-0r7c.onrender.com/api/negocios/negocios';

  constructor(private http: HttpClient) {}

  /**
   * GET: Obtener todos los negocios
   */
  obtenerNegocios(): Observable<Negocio[]> {
    return this.http.get<Negocio[]>(this.apiUrl);
  }

  /**
   * GET: Obtener un negocio por ID
   */
  obtenerNegocioPorId(id: number): Observable<Negocio> {
    return this.http.get<Negocio>(`${this.apiUrl}/${id}`);
  }

  /**
   * POST: Crear un nuevo negocio
   */
  crearNegocio(negocio: Negocio): Observable<Negocio> {
    return this.http.post<Negocio>(this.apiUrl, negocio);
  }

  /**
   * PUT: Actualizar un negocio existente
   */
  actualizarNegocio(id: number, negocio: Negocio): Observable<Negocio> {
    return this.http.put<Negocio>(`${this.apiUrl}/${id}`, negocio);
  }

  /**
   * DELETE: Eliminar un negocio
   */
  eliminarNegocio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
