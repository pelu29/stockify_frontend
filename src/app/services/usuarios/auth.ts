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

  guardarTokenAcces(token:string){
    localStorage.setItem("acces",token);
  }

  guardarTokenRefresh(token:string){
    localStorage.setItem("refresh",token);
  }

  logout(){
    localStorage.removeItem("token");
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }
}
