import { Component } from '@angular/core';
import { Pokeapi } from 'src/app/services/pokeapi';

@Component({
  selector: 'app-pokeapi',
  templateUrl: './pokeapi.html',
  styleUrls: ['./pokeapi.css']
})
export class PokeApiComponent {

  constructor(private pokeApi: Pokeapi) {}

  llamadaPokemones(): void {
    this.pokeApi.obtenerListadoPokemones().subscribe({
      next: (datos) => { console.log(datos); },
      error: (error) => { console.log(error); }
    });
  }
}
