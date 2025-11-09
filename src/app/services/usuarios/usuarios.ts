import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class Usuarios {

  usuarios:Usuario[] = [];

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
