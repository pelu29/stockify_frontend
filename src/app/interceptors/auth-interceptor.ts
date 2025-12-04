import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/usuarios/auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let auth = inject(Auth);

  console.log(req.url);
  console.log("Se esta haciendo una peticion HTTP")
  req.clone({
    setHeaders:{
      Authorization:`Bearer ${auth.getToken()}`
    }
  })
  
  return next(req);
};
