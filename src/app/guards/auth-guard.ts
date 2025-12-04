import { CanActivateFn } from '@angular/router';
import { Auth } from '../services/usuarios/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if(!auth.isLoggedIn()){
    router.navigate(['/login']);
    return false;
  }else{
    return true;
  }
};
