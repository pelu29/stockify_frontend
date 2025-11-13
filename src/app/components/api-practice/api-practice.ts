import { Component } from '@angular/core';
import { Pokeapi } from 'src/app/services/pokeapi';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-api-practice',
  imports: [],
  templateUrl: './api-practice.html',
  styleUrl: './api-practice.css'
})
export class ApiPractice implements OnInit{

  ngOnInit(): void {
    
  }

  constructor(private pokeApiService:Pokeapi){}

  listadoPk():void{
    this.pokeApiService.ObtenerPokemones().subscribe({
      next:(datos)=>{console.log(datos)},
      error:(error)=>{console.log(error)}
    })
  }

  confirmacionPost(){
    this.pokeApiService.metodoPost().subscribe({
      next:(res)=>{console.log(res)},
      error:(error)=>{console.log(error)}
    })
  }

  paraEliminar(){
    this.pokeApiService.metodoDelete().subscribe({
      next:(res)=>{console.log(res)},
      error:(error)=>{console.log(error)}
    })
  }

  paraActualizar(){
    this.pokeApiService.metodoUpdate().subscribe({
      next:(res)=>{console.log(res)},
      error:(error)=>{console.log(error)}
    })
  }
}
