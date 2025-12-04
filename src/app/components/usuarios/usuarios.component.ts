import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando = false;
  error = '';
  mensaje = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
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
   * Volver a la página anterior
   */
  volver(): void {
    this.router.navigate(['/']);
  }

  /**
   * Eliminar un usuario
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
        this.error = 'Error al eliminar el usuario';
      }
    });
  }
}
