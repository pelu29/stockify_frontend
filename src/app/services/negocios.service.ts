import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  private api = 'https://stockify-backend-0r7c.onrender.com/api/negocios/negocios/';
  private http = inject(HttpClient);

  getNegocios(): Observable<any> {
    return this.http.get(this.api);
  }

  getNegocio(id: number): Observable<any> {
    return this.http.get(`${this.api}${id}/`);
  }

  crearNegocio(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  actualizarNegocio(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}${id}/`, data);
  }

  eliminarNegocio(id: number): Observable<any> {
    return this.http.delete(`${this.api}${id}/`);
  }
}