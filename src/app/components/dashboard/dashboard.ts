import { Component } from '@angular/core';
import { OrderStats } from '@features/dashboard-stats/components/order-stats/order-stats';
import { Usuarios } from 'src/app/services/usuarios/usuarios';
import { Auth } from 'src/app/services/usuarios/auth';

@Component({
  selector: 'app-dashboard',
  imports: [OrderStats],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private usuario:Usuarios, private auth:Auth){}

  getUsers():void{
    this.usuario.ObtenerUsuarios().subscribe({
      next:(data)=>{console.log(data)},
      error:(err)=>{console.log(err)}
    })
  }

  CerrarSesion():void{
    this.auth.logout();
  }

  CargarEnMemoria(data:string):void{
    this.usuario.CargarDatoEnMemoria(data);
    this.usuario.MostrarDato();
  }
}
