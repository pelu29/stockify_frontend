import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeCrudService {

  private api = 'https://jsonplaceholder.typicode.com/posts';
  private http = inject(HttpClient);

  // GET: obtener todos
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // POST: crear nuevo
  create(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  // PUT: actualizar
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  // DELETE: eliminar
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}