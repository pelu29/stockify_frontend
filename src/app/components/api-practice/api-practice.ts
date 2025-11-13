import { Component, OnInit } from '@angular/core';
import { Pokeapi } from 'src/app/services/pokeapi';
import { TitleCasePipe, NgIf, NgFor } from '@angular/common'; // ✅ importa los necesarios

@Component({
  selector: 'app-api-practice',
  standalone: true,
  imports: [TitleCasePipe, NgIf, NgFor], // ✅ agrega los pipes/directivas que usas en el HTML
  templateUrl: './api-practice.html',
  styleUrls: ['./api-practice.css']
})
export class ApiPractice implements OnInit {
  pokemon: any;

  constructor(private pokeApiService: Pokeapi) {}

  ngOnInit(): void {}

  listadoPk(): void {
    this.pokeApiService.ObtenerPokemones().subscribe({
      next: (datos) => (this.pokemon = datos),
      error: (error) => console.error(error)
    });
  }
}
