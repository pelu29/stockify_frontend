import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private api = 'https://stockify-backend-0r7c.onrender.com/api/usuarios/clientes/';

  private http = inject(HttpClient);

  // GET (listado)
  getClientes(): Observable<any> {
    return this.http.get(this.api);
  }

  // GET por ID
  getCliente(id: number): Observable<any> {
    return this.http.get(`${this.api}${id}/`);
  }

  // POST crear
  crearCliente(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  // PUT actualizar
  actualizarCliente(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}${id}/`, data);
  }

  // DELETE eliminar
  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.api}${id}/`);
  }
}