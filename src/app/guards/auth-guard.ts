import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/usuarios/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  try {
    // Dev bypass
    const devBypass = localStorage.getItem('dev_bypass');
    if (devBypass === 'true') return true;
    // Check access token presence
    const token = localStorage.getItem('access_token');
    if (token) return true;
  } catch (e) {
    // ignore
  }
  router.navigate(['/login']);
  return false;
};
