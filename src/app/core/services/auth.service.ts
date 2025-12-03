import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Definición simple de la respuesta de autenticación
interface AuthResponse {
  access?: string;
  refresh?: string;
  token?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userTokenKey = 'id_token';
  private userRoleKey = 'id_role';
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  // Endpoint para obtener access & refresh
  private tokenEndpoint = 'https://stockify-backend-0r7c.onrender.com/api/token/';

  constructor(private router: Router, private http: HttpClient) { 
    // Logic for initialization (Guard handles navigation)
  }

  // Simulated login method
  // Uses email and password, and saves the token.
  login(email: string, password: string): Observable<AuthResponse> {
    // intenta obtener token real del backend usando el endpoint /api/token/
    const payload = { username: email, password };
    return this.http.post<any>(this.tokenEndpoint, payload).pipe(
      tap((res: any) => {
        const access = res?.access || res?.token;
        const refresh = res?.refresh;
        if (access) {
          localStorage.setItem(this.accessTokenKey, access);
        }
        if (refresh) {
          localStorage.setItem(this.refreshTokenKey, refresh);
        }
      }),
      catchError(err => {
        // Fallback para desarrollo: si las credenciales son las del mock, crear token local
        if (email === 'admin@stockify.com' && password === '123456') {
          const mockAccess = 'mock-access-token';
          localStorage.setItem(this.accessTokenKey, mockAccess);
          // devolver observable con formato esperado
          return of({ access: mockAccess });
        }
        return throwError(() => err);
      })
    );
  }

  /**
   * Obtener nuevos tokens mediante refresh token
   */
  refreshToken(refreshToken?: string): Observable<any> {
    const body = { refresh: refreshToken || this.getRefreshToken() };
    return this.http.post<any>(this.tokenEndpoint + 'refresh/', body).pipe(
      tap(res => {
        const access = res?.access;
        if (access) localStorage.setItem(this.accessTokenKey, access);
      })
    );
  }

  // Comprueba si existe el token (isLoggedIn)
  isLoggedIn(): boolean {
    return !!(localStorage.getItem(this.accessTokenKey) || localStorage.getItem(this.userTokenKey));
  }

  // Comprueba si el rol ha sido seleccionado
  isRoleSelected(): boolean {
    return this.isLoggedIn() && !!localStorage.getItem(this.userRoleKey);
  }
  
  // Obtener Rol
  getUserRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // **MÉTODO CORREGIDO 1: setRole**
  setRole(role: string): void {
    if (this.isLoggedIn()) {
      localStorage.setItem(this.userRoleKey, role);
      // Redirige al dashboard apropiado después de la selección exitosa
      const navPath = (role === 'invitado' || role === 'dashboard') ? '/dashboard' : `/${role}`;
      this.router.navigate([navPath]);
    } else {
      console.error("No se puede establecer el rol sin un token de autenticación.");
      this.logout();
    }
  }

  // **MÉTODO CORREGIDO 2: logout**
  logout(): void {
    localStorage.removeItem(this.userTokenKey);
    localStorage.removeItem(this.userRoleKey);
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']);
  }
}