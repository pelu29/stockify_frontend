import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuarios/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class Usuarios {

  usuarios:Usuario[] = [];

  api = "https://pokeapi.co/api/v2/pokemon/ditto";
  http = inject(HttpClient);

  getUsuarios():Observable<any>{
    return this.http.get<any>(this.api);
  }

  agregarUsuario(usuario:Usuario):boolean{
    if(this.usuarios.push(usuario)){
      return true;
    }else{
      return false;
    }
  }

  listarUsuario():Usuario[]{
    return this.usuarios;
  }
  
}
