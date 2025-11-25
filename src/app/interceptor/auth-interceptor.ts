import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/usuarios/auth';
import { inject, Inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  let auth = inject(Auth)
  console.log('este es la url a la que estas haciendo http:' + request.url)

  request.clone(
    {setHeaders:{
      Authorization:'Bearer ${auth.ObtenerToken}'
    }}
  )
  return next(request);
};
