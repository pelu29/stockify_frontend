import { Component, inject } from '@angular/core';
import { Pokeapi2 } from 'src/app/services/poke-api2';
import { CommonModule } from '@angular/common';

interface Pokemon {
  name: string;
  url: string;
  sprites?: {
    front_default: string;
  };
}

@Component({
  selector: 'app-poke-api',
  imports: [CommonModule],
  templateUrl: './poke-api.html',
  styleUrl: './poke-api.css'
})
export class PokeApi {
  
  pokeapiService = inject(Pokeapi2);
  pokemones: Pokemon[] = [];
  
  cargarPokemones() {
    // Nombre de Pokemones
    const pokemonNames = [
      'bulbasaur', 'blastoise', 'caterpie', 'arcanine', 'pidgey',
      'pikachu', 'jigglypuff', 'meowth', 'psyduck', 'snorlax'
    ];

    // Carga Pokemones
    pokemonNames.forEach(name => {
      this.pokeapiService.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .subscribe((data: any) => {
          this.pokemones.push({
            name: data.name.toUpperCase(),
            url: data.sprites.front_default,
            sprites: data.sprites
          });
        });
    });
  }
}