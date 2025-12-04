import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/usuarios/auth';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  if(auth.isLoggedIn()){
    router.navigate(['/layout/dashboard']);
    return false;
  }else{
    return true;
  }
};
