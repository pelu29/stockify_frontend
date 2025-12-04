import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

export interface Usuario {
  id?: number;
  nombre: string;
  nombre_usuario?: string;
  apellidos?: string;
  email: string;
  telefono?: string;
  rol?: string;
  estado?: string;
  fecha_registro?: string;
  imagen?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // API base corregido: apuntar al recurso de usuarios en el backend
  private apiUrl = 'https://stockify-backend-0r7c.onrender.com/api/usuarios';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getOptions() {
    const token = this.auth.getAccessToken?.() || null;
    if (token) {
      return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
    }
    return {};
  }

  /**
   * GET: Obtener todos los usuarios
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, this.getOptions());
  }

  /**
   * GET: Obtener un usuario por ID
   */
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, this.getOptions());
  }

  /**
   * POST: Crear un nuevo usuario
   */
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    // Aplica un timeout para no dejar la petición colgada indefinidamente
    return this.http.post<Usuario>(this.apiUrl, usuario, this.getOptions()).pipe(
      timeout(10000)
    );
  }

  /**
   * PUT: Actualizar un usuario existente
   */
  actualizarUsuario(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, this.getOptions());
  }

  /**
   * DELETE: Eliminar un usuario
   */
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getOptions());
  }
}
