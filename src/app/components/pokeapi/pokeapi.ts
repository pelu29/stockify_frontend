import { Component } from '@angular/core';
// 1. Importamos con el nombre nuevo
import { PokeapiService } from 'src/app/services/pokeapi';

@Component({
  selector: 'app-pokeapi',
  templateUrl: './pokeapi.html',
  styleUrls: ['./pokeapi.css']
})
export class PokeApiComponent {

  // 2. Inyectamos el servicio con su tipo correcto
  constructor(private pokeService: PokeapiService) {}

  llamadaPokemones(): void {
    this.pokeService.obtenerListadoPokemones().subscribe({
      next: (datos: any) => { console.log(datos); }, // Agregué ': any' para evitar error TS7006
      error: (error: any) => { console.log(error); } // Agregué ': any'
    });
  }
}