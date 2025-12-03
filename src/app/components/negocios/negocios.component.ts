import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../../services/usuarios.service';

@Component({
  selector: 'app-negocios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {

  usuarios: Usuario[] = [];
  formulario!: FormGroup;
  cargando = false;
  error = '';
  mensaje = '';
  mostrarFormulario = false;
  editandoId: number | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarUsuarios();
  }

  /**
   * Inicializar formulario reactivo
   */
  inicializarFormulario(): void {
    this.formulario = this.fb.group({
      nombre_usuario: [''],
      nombre: [''],
      apellidos: [''],
      email: [''],
      telefono: ['']
    });
  }

  /**
   * GET: Cargar lista de usuarios desde la API
   */
  cargarUsuarios(): void {
    this.cargando = true;
    this.error = '';
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (datos: any) => {
        this.usuarios = datos;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar usuarios:', err);
        this.error = 'Error al cargar los usuarios. Intenta de nuevo más tarde.';
        this.cargando = false;
      }
    });
  }

  /**
   * POST: Crear nuevo usuario
   */
  crearUsuario(): void {
    this.cargando = true;
    const nuevoUsuario: Usuario = this.formulario.value;
    console.log('Intentando crear usuario, payload:', nuevoUsuario);
    // mostrar en UI también (ayuda debug inmediato)
    this.error = '';

    this.usuariosService.crearUsuario(nuevoUsuario).subscribe({
      next: (usuario: any) => {
        this.usuarios.push(usuario);
        this.mensaje = `✓ Usuario "${usuario.nombre}" creado exitosamente`;
        this.formulario.reset();
        this.mostrarFormulario = false;
        this.cargando = false;
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err: any) => {
        console.error('Error al crear usuario:', err);
        this.error = this.formatHttpError(err, 'Error al crear el usuario');
        // si es error de red o timeout puede venir como 'name' o 'message'
        if (!err?.status && (err?.name === 'TimeoutError' || err?.message)) {
          this.error += ` — Detalle: ${err.message || err.name}`;
        }
        this.cargando = false;
      }
    });
  }

  /**
   * PUT: Actualizar usuario existente
   */
  actualizarUsuario(): void {
    if (this.editandoId === null) {
      return;
    }

    this.cargando = true;
    const usuarioActualizado: Usuario = this.formulario.value;

    this.usuariosService.actualizarUsuario(this.editandoId, usuarioActualizado).subscribe({
      next: (usuario: any) => {
        const indice = this.usuarios.findIndex(u => u.id === this.editandoId);
        if (indice !== -1) {
          this.usuarios[indice] = usuario;
        }
        this.mensaje = `✓ Usuario "${usuario.nombre}" actualizado exitosamente`;
        this.cancelarEdicion();
        this.cargando = false;
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err: any) => {
        console.error('Error al actualizar:', err);
        this.error = this.formatHttpError(err, 'Error al actualizar el usuario');
        this.cargando = false;
      }
    });
  }

  /**
   * DELETE: Eliminar usuario
   */
  eliminarUsuario(id: number | undefined): void {
    if (!id) return;
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    this.usuariosService.eliminarUsuario(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.mensaje = '✓ Usuario eliminado exitosamente';
        setTimeout(() => { this.mensaje = ''; }, 3000);
      },
      error: (err: any) => {
        console.error('Error al eliminar:', err);
        this.error = this.formatHttpError(err, 'Error al eliminar el usuario');
      }
    });
  }

  /**
   * Preparar edición de un usuario
   */
  abrirEdicion(usuario: Usuario): void {
    this.editandoId = usuario.id || null;
    // asegurarse de mapear los campos que usamos en el formulario
    this.formulario.patchValue({
      nombre_usuario: (usuario as any).nombre_usuario || '',
      nombre: usuario.nombre || '',
      apellidos: (usuario as any).apellidos || '',
      email: usuario.email || '',
      telefono: usuario.telefono || ''
    });
    this.mostrarFormulario = true;
  }

  /**
   * Formatea errores HTTP para mostrar un mensaje más informativo en la UI
   */
  private formatHttpError(err: any, fallback: string): string {
    try {
      const status = err?.status;
      const statusText = err?.statusText || '';
      // err.error puede ser objeto o string
      const body = err?.error;
      let bodyText = '';
      if (body) {
        if (typeof body === 'string') bodyText = body;
        else bodyText = JSON.stringify(body);
      }
      const parts = [`${fallback}`];
      if (status) parts.push(`Status: ${status} ${statusText}`);
      if (bodyText) parts.push(`Response: ${bodyText}`);
      return parts.join(' — ');
    } catch (e) {
      return fallback;
    }
  }

  /**
   * Cancelar edición y volver a listar
   */
  cancelarEdicion(): void {
    this.editandoId = null;
    this.formulario.reset();
    this.mostrarFormulario = false;
  }

  /**
   * Abrir formulario para crear
   */
  abrirCrear(): void {
    this.formulario.reset();
    this.editandoId = null;
    this.mostrarFormulario = true;
  }

  /**
   * Volver a la página anterior
   */
  volver(): void {
    this.router.navigate(['/']);
  }
}
