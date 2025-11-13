import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pokeapi {
  // Inyectamos HttpClient con la nueva sintaxis
  http = inject(HttpClient);

  // URL de la API
  apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/pikachu';

  // Método que obtiene los datos
  ObtenerPokemones(): Observable<any> {
    return this.http.get(this.apiUrl); // ✅ CORRECTO
  }
}
