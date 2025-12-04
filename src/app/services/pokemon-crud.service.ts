import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Pokemon {
  id?: number;
  nombre: string;
  tipo: string;
  favorito: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonCrudService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // API simulada
  private pokemones: Pokemon[] = [
    { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', favorito: true },
    { id: 2, nombre: 'Charizard', tipo: 'Fuego', favorito: false },
    { id: 3, nombre: 'Blastoise', tipo: 'Agua', favorito: true }
  ];

  constructor(private http: HttpClient) {}

  /**
   * GET: Obtener todos los Pokémon (simulado localmente)
   */
  obtenerPokemones(): Observable<Pokemon[]> {
    return of([...this.pokemones]).pipe(delay(500));
  }

  /**
   * GET: Obtener un Pokémon por ID
   */
  obtenerPokemonPorId(id: number): Observable<Pokemon | undefined> {
    return of(this.pokemones.find(p => p.id === id)).pipe(delay(300));
  }

  /**
   * POST: Crear un nuevo Pokémon
   */
  crearPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const nuevoId = Math.max(...this.pokemones.map(p => p.id || 0)) + 1;
    const nuevoPokemon = { ...pokemon, id: nuevoId };
    this.pokemones.push(nuevoPokemon);
    return of(nuevoPokemon).pipe(delay(500));
  }

  /**
   * PUT: Editar un Pokémon existente
   */
  editarPokemon(id: number, pokemon: Pokemon): Observable<Pokemon> {
    const indice = this.pokemones.findIndex(p => p.id === id);
    if (indice !== -1) {
      this.pokemones[indice] = { ...pokemon, id };
    }
    return of(this.pokemones[indice]).pipe(delay(500));
  }

  /**
   * DELETE: Eliminar un Pokémon (bonus)
   */
  eliminarPokemon(id: number): Observable<void> {
    this.pokemones = this.pokemones.filter(p => p.id !== id);
    return of(void 0).pipe(delay(300));
  }

  /**
   * Obtener lista local (para debug)
   */
  getListaLocal(): Pokemon[] {
    return this.pokemones;
  }
}
