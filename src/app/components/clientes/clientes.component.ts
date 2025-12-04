import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];
  mensaje: string = '';
  editando = false;
  idEditando: number | null = null;

  formCrear = new FormGroup({
    username: new FormControl(''),
    telefono: new FormControl(''),
    password: new FormControl('')
  });

  formEditar = new FormGroup({
    username: new FormControl(''),
    telefono: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientesService.getClientes().subscribe({
      next: (res: any) => {
        this.clientes = res.results || res || [];
      },
      error: () => {
        this.mensaje = "Error al cargar los clientes.";
      }
    });
  }

  crearCliente() {
    if (this.formCrear.invalid) return;

    this.clientesService.crearCliente(this.formCrear.value).subscribe({
      next: () => {
        this.mensaje = "Cliente creado correctamente.";
        this.formCrear.reset();
        this.obtenerClientes();
      },
      error: () => this.mensaje = "Error al crear cliente."
    });
  }

  editar(cliente: any) {
    this.editando = true;
    this.idEditando = cliente.id;

    this.formEditar.patchValue({
      username: cliente.username,
      telefono: cliente.telefono,
      password: ''
    });
  }

  actualizarCliente() {
    if (!this.idEditando) return;

    const datos: any = { ...this.formEditar.value };

    if (!datos.password) {
      delete datos.password;
    }

    this.clientesService.actualizarCliente(this.idEditando, datos).subscribe({
      next: () => {
        this.mensaje = "Cliente actualizado.";
        this.editando = false;
        this.idEditando = null;
        this.formEditar.reset();
        this.obtenerClientes();
      },
      error: () => this.mensaje = "Error al actualizar cliente."
    });
  }

  eliminarCliente(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este cliente?")) return;

    this.clientesService.eliminarCliente(id).subscribe({
      next: () => {
        this.mensaje = "Cliente eliminado.";
        this.obtenerClientes();
      },
      error: () => this.mensaje = "Error eliminando cliente."
    });
  }

  cancelarEdicion() {
    this.editando = false;
    this.idEditando = null;
    this.formEditar.reset();
  }
}
