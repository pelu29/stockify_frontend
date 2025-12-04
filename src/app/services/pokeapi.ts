import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {  // 🔹 CAMBIADO AQUÍ

  http = inject(HttpClient);

  private Pokeapi: string = 'https://pokeapi.co/api/v2/pokemon/';

  ObtenerPokemones(): Observable<any> {
    return this.http.get(this.Pokeapi);
  }

}
