import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  http = inject(HttpClient);

  api_token: string = "https://stockify-backend-0r7c.onrender.com/api/token/";

  // Login
  ObtenerToken(usuario: object): Observable<any> {
    return this.http.post(this.api_token, usuario);
  }

  // Obtener token de acceso
  getToken(): string | null {
    return localStorage.getItem("access");
  }

  // Guardar tokens en localStorage
  guardarTokenAcces(token: string) {
    localStorage.setItem("access", token);
  }

  guardarTokenRefresh(token: string) {
    localStorage.setItem("refresh", token);
  }

  // Cerrar sesión
  logout() {
    localStorage.clear();
  }

  // Verifica si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem("refresh");
  }
}
