import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pokeapi {

  //declara en una variable el objeto httpclient
  http = inject(HttpClient)

  //declaramos direccion de api
  Pokeapi:string = "https://pokeapi.co/api/v2/pokemon/charizard";

  usuarios:string = "https://randomuser.me/api/?results=1";

  jsonPlaceholder:string = "https://jsonplaceholder.typicode.com/posts";

  //para metodos como delete, patch o put
  placeholderEdit:string = "https://jsonplaceholder.typicode.com/posts/1";

  
  objeto={
    nombre:"yolo"
  }

  ObtenerPokemones():Observable<any>{
    return this.http.get(this.Pokeapi)
  }

  metodoPost():Observable<any>{
    return this.http.post(this.jsonPlaceholder,{mensaje:"hola"});
  }

  metodoDelete():Observable<any>{
    return this.http.delete(this.placeholderEdit);
  }

  metodoUpdate():Observable<any>{
    return this.http.patch(this.placeholderEdit,this.objeto);
  }


}
