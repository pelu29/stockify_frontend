import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pokeapi2 {
  
  http = inject(HttpClient);

  //Declarando direcciones de APIS
  pokeapi:string = "https://pokeapi.co/api/v2/pokemon/charizard";
  usuarios:string = "https://randomuser.me/api/?result=1";
  jsonPlaceholder:string = "https://jsonplaceholder.typicode.com/posts";

  //Para Metodos para Delete, Patch o Put
  placeholderEdit:string = "https://jsonplaceholder.typicode.com/posts/1";

  objeto={
    nombre:"Neyva"
  }

  ObtenerPokemonCh():Observable<any>{
    return this.http.get(this.pokeapi);
  }

  metodoPost():Observable<any>{
    return this.http.post(this.jsonPlaceholder,{mensaje:"Holi"})};

  metodoDelete():Observable<any>{
    return this.http.delete(this.placeholderEdit);
  }

  metodoUpdate():Observable<any>{
    return this.http.patch(this.placeholderEdit,this.objeto);
  }
}