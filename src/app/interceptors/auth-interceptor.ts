import { HttpInterceptorFn } from '@angular/common/http';
import { Auth } from '../services/usuarios/auth';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();

  console.log('🔵 Interceptor ejecutándose');
  console.log('📍 URL:', req.url);
  console.log('🔑 Token obtenido:', token ? `${token.substring(0, 20)}...` : 'NO HAY TOKEN');

  // ❌ NO enviar header Authorization si no hay token
  // Solo clonar y agregar header si existe el token
  if (!token) {
    console.log('⚠️ No hay token, enviando petición sin header Authorization');
    return next(req);
  }

  // ✅ Solo si hay token, clonar y agregar el header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('✅ Header Authorization agregado:', authReq.headers.get('Authorization'));

  return next(authReq);
};