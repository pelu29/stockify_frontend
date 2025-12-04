import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  http = inject(HttpClient);

  api_token:string = "https://stockify-backend-0r7c.onrender.com/api/token/";

  ObtenerToken(usuario:object):Observable<any>{
    return this.http.post(this.api_token,usuario);
  }

  getToken():string | null{
    return localStorage.getItem('access_token');
  }

  guardarTokenAcces(token:string){
    localStorage.setItem('access_token', token);
  }

  guardarTokenRefresh(token:string){
    localStorage.setItem('refresh_token', token);
  }

  logout(){
    localStorage.clear();
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('access_token') || !!localStorage.getItem('refresh_token');
  }
}
