import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Usuarios } from 'src/app/services/usuarios/usuarios';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-api-practice',
  imports: [],
  templateUrl: './api-practice.html',
  styleUrl: './api-practice.css'
})
export class ApiPractice implements OnInit {
  constructor(private usuarios: Usuarios) { }
  private http = inject(HttpClient)
  api = "https://pokeapi.co/api/v2/pokemon/ditto";

  ngOnInit(): void {
    /*this.usuarios.getUsuarios().subscribe({
      next:(res)=>{
        console.log(res)
        console.log("Nombre Pokemon: " + res.name)
        console.log("Poder Pokemon: " + res.weight)
        console.log("ID Pokemon: " + res.id)
      },
      error:(error)=>console.log("Error al llamara a la API: " + error)
    })*/
  }

  PokeAPi(): void {
  }



}
