import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces para tipado fuerte
export interface Pokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
}

export interface PokemonListado {
  results: { name: string; url: string }[];
}

export interface UsuarioRandom {
  results: {
    name: { first: string; last: string };
    picture: { large: string };
    location: { country: string };
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class Pokeapi {

  http = inject(HttpClient);

  listado: string = "https://pokeapi.co/api/v2/pokemon?limit=10";
  usuarios: string = "https://randomuser.me/api/?results=1";

  constructor() {}

  obtenerListadoPokemones(): Observable<PokemonListado> {
    return this.http.get<PokemonListado>(this.listado);
  }

  obtenerPokemonPorUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  obtenerUsuarioRandom(): Observable<UsuarioRandom> {
    return this.http.get<UsuarioRandom>(this.usuarios);
  }
}