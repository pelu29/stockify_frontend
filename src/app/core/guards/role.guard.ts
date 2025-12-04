import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
// Asegúrate de que esta ruta sea correcta
import { AuthService } from '../services/auth.service'; 

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const roles: string[] = route.data?.['roles'] || [];

    // 1. Si NO está logueado, redirige al login
    if (!this.auth.isLoggedIn()) {
      // ✅ Solución: Usar la sintaxis explícita de createUrlTree
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    const userRole = this.auth.getUserRole();
    if (userRole && roles.includes(userRole)) {
      return true;
    }

    // 2. Si está logueado pero NO tiene el rol, redirige a /unauthorized
    // ✅ Solución: Usar la sintaxis explícita de createUrlTree
    return this.router.createUrlTree(['/unauthorized']);
  }
}