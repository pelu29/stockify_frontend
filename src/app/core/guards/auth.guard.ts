import { Injectable } from '@angular/core';
// Importamos el tipo UrlTree, que es crítico
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'; 
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  // 💡 USAMOS any PARA EL ESTADO para evitar errores de tipo si es necesario
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    // Dev bypass: si en localStorage existe 'dev_bypass'='true', permitir acceso (útil para desarrollo)
    try {
      const devBypass = localStorage.getItem('dev_bypass');
      if (devBypass === 'true') return true;
    } catch (e) {
      // ignore
    }

    if (this.auth.isLoggedIn()) {
      return true;
    }
    // Usamos parseUrl para la redirección
    return this.router.parseUrl('/login?returnUrl=' + state.url);
  }
}
