import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from 'src/app/services/usuarios/usuarios';

@Component({
  selector: 'app-pages-not-found',
  imports: [],
  templateUrl: './pages-not-found.html',
  styleUrl: './pages-not-found.css'
})
export class PagesNotFound {
  constructor(private router:Router, private usuario:Usuarios){}

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }

  mostrarDataEnMemoria():void{
    this.usuario.MostrarDato();
  }
}
