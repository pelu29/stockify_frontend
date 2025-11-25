import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Pokeapi, Pokemon, PokemonListado, UsuarioRandom } from '../../services/pokeapi';

@Component({
  selector: 'app-api-practice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-practice.component.html',
  styleUrls: ['./api-practice.component.css']
})
export class ApiPracticeComponent {

  userData: UsuarioRandom['results'][0] | null = null;
  pokemonData: Pokemon[] = [];

  constructor(private apiService: Pokeapi) {}

  cargarUsuarios() {
    this.apiService.obtenerUsuarioRandom().subscribe(
      (res: UsuarioRandom) => {
        console.log("Usuario recibido:", res);
        this.userData = res.results[0];
      },
      (err: any) => console.error('Error al cargar usuario:', err)
    );
  }

  cargarPokemones() {
    this.apiService.obtenerListadoPokemones().subscribe(
      (res: PokemonListado) => {
        console.log("Listado Pokémon:", res); 
        const urls = res.results.map(p => p.url);

        forkJoin<Pokemon[]>(
          urls.map(url => this.apiService.obtenerPokemonPorUrl(url))
        ).subscribe(
          (pokemonesDetallados: Pokemon[]) => {
            console.log("Pokemones completos:", pokemonesDetallados);
            this.pokemonData = pokemonesDetallados;
          },
          (err: any) => console.error('Error al cargar pokemones:', err)
        );
      },
      (err: any) => console.error('Error al obtener listado de pokemones:', err)
    );
  }
}

