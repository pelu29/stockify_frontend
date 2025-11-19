import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class Usuarios {

  clientes_api:string = "https://stockify-backend-0r7c.onrender.com/api/usuarios/clientes/";
  http = inject(HttpClient);

  ObtenerUsuarios():Observable<any>{
    return this.http.get<any>(this.clientes_api);
  }

  RegistrarUsuario(usuario:Object):Observable<any>{
    return this.http.post<any>(this.clientes_api,usuario);
  }
  
}
