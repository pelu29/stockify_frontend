import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { PokeapiService } from '../../services/pokeapi';

@Component({
  selector: 'app-api-practice',
  standalone: true,
  imports: [NgFor, NgIf, UpperCasePipe],
  templateUrl: './api-practice.html',
  styleUrls: ['./api-practice.css']
})
export class ApiPractice implements OnInit {

  pokemones: any[] = [];
  loading = false;

  constructor(private pokeApiService: PokeapiService, private http: HttpClient) {}

  ngOnInit(): void {
    // No cargar automáticamente; el usuario puede pulsar el botón
  }

  obtenerPokemones(): void {
    this.loading = true;
    this.pokemones = [];

    this.pokeApiService.ObtenerPokemones().subscribe({
      next: (datos: any) => {
        const resultados: any[] = datos?.results || [];
        if (resultados.length === 0) {
          this.loading = false;
          return;
        }

        // Pedimos los detalles de los primeros 10 pokemons para tener sprites
        const llamadas = resultados.slice(0, 10).map(r => this.http.get(r.url));
        forkJoin(llamadas).subscribe({
          next: (detalles: any[]) => {
            this.pokemones = detalles;
            this.loading = false;
          },
          error: (err: any) => {
            console.error(err);
            this.loading = false;
          }
        });
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      }
    });
  }
}
