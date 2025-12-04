import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonCrudService, Pokemon } from '../services/pokemon-crud.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrls: ['./formulario.css']
})
export class FormularioComponent implements OnInit {
  formulario!: FormGroup;
  pokemones: Pokemon[] = [];
  cargando = false;
  mensaje = '';
  editandoId: number | null = null;
  modo: 'crear' | 'editar' | 'listar' = 'listar';

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonCrudService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.obtenerPokemones();
  }

  /**
   * Inicializar formulario reactivo
   */
  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      tipo: ['', Validators.required],
      favorito: [false]
    });
  }

  /**
   * GET: Obtener lista de Pokémon
   */
  obtenerPokemones(): void {
    this.cargando = true;
    this.pokemonService.obtenerPokemones().subscribe({
      next: (datos) => {
        this.pokemones = datos;
        this.cargando = false;
        this.modo = 'listar';
      },
      error: (err) => {
        console.error('Error al obtener Pokémon:', err);
        this.mensaje = 'Error al cargar los Pokémon';
        this.cargando = false;
      }
    });
  }

  /**
   * POST: Crear nuevo Pokémon
   */
  crearPokemon(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const nuevoPokemon: Pokemon = this.formulario.value;

    this.pokemonService.crearPokemon(nuevoPokemon).subscribe({
      next: (pokemon) => {
        this.pokemones.push(pokemon);
        this.mensaje = `✓ Pokémon "${pokemon.nombre}" creado exitosamente`;
        this.formulario.reset({ favorito: false });
        this.cargando = false;
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => {
        console.error('Error al crear:', err);
        this.mensaje = 'Error al crear el Pokémon';
        this.cargando = false;
      }
    });
  }

  /**
   * PUT: Editar Pokémon existente
   */
  editarPokemon(): void {
    if (this.formulario.invalid || this.editandoId === null) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const pokemonActualizado: Pokemon = this.formulario.value;

    this.pokemonService.editarPokemon(this.editandoId, pokemonActualizado).subscribe({
      next: (pokemon) => {
        const indice = this.pokemones.findIndex(p => p.id === this.editandoId);
        if (indice !== -1) {
          this.pokemones[indice] = pokemon;
        }
        this.mensaje = `✓ Pokémon "${pokemon.nombre}" actualizado exitosamente`;
        this.cancelarEdicion();
        this.cargando = false;
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => {
        console.error('Error al editar:', err);
        this.mensaje = 'Error al editar el Pokémon';
        this.cargando = false;
      }
    });
  }

  /**
   * DELETE: Eliminar Pokémon
   */
  eliminarPokemon(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este Pokémon?')) {
      return;
    }

    this.pokemonService.eliminarPokemon(id).subscribe({
      next: () => {
        this.pokemones = this.pokemones.filter(p => p.id !== id);
        this.mensaje = '✓ Pokémon eliminado exitosamente';
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        this.mensaje = 'Error al eliminar el Pokémon';
      }
    });
  }

  /**
   * Preparar edición de un Pokémon
   */
  abrirEdicion(pokemon: Pokemon): void {
    this.editandoId = pokemon.id || null;
    this.formulario.patchValue(pokemon);
    this.modo = 'editar';
  }

  /**
   * Cancelar edición y volver a listar
   */
  cancelarEdicion(): void {
    this.editandoId = null;
    this.formulario.reset({ favorito: false });
    this.modo = 'listar';
  }

  /**
   * Abrir formulario para crear
   */
  abrirCrear(): void {
    this.formulario.reset({ favorito: false });
    this.modo = 'crear';
  }

  /**
   * Validar campo
   */
  campoEsInvalido(nombreCampo: string): boolean {
    const c = this.formulario.get(nombreCampo);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  /**
   * Volver a la página de listado de Pokémons (api-practice)
   */
  volver(): void {
    this.router.navigate(['/formulario']);
  }
}
