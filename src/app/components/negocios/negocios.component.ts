import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NegociosService } from '../../services/negocios.service';

@Component({
  selector: 'app-negocios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './negocios.component.html',
  styleUrls: ['./negocios.component.css']
})
export class NegociosComponent implements OnInit {

  negocios: any[] = [];
  mensaje: string = '';
  editando = false;
  idEditando: number | null = null;

  formCrear = new FormGroup({
    nombre: new FormControl(''),
    ruc: new FormControl(''),
    direccion: new FormControl(''),
    propietario_id: new FormControl(''),
    fecha_creacion: new FormControl(''),
    activo: new FormControl(true),
    fecha_limite_pago: new FormControl(''),
    fecha_ultimo_pago: new FormControl(''),
    estado_pago: new FormControl(''),
    monto: new FormControl(''),
    mensaje_bloqueo: new FormControl('')
  });

  formEditar = new FormGroup({
    nombre: new FormControl(''),
    ruc: new FormControl(''),
    direccion: new FormControl(''),
    propietario_id: new FormControl(''),
    fecha_creacion: new FormControl(''),
    activo: new FormControl(true),
    fecha_limite_pago: new FormControl(''),
    fecha_ultimo_pago: new FormControl(''),
    estado_pago: new FormControl(''),
    monto: new FormControl(''),
    mensaje_bloqueo: new FormControl('')
  });

  constructor(private negociosService: NegociosService) {}

  ngOnInit() {
    this.obtenerNegocios();
  }

  obtenerNegocios() {
    this.negociosService.getNegocios().subscribe((res: any) => {
      this.negocios = res.results;
    });
  }

  crearNegocio() {
    this.negociosService.crearNegocio(this.formCrear.value).subscribe({
      next: () => {
        this.mensaje = "Negocio creado correctamente.";
        this.formCrear.reset();
        this.obtenerNegocios();
      },
      error: () => this.mensaje = "Error al crear negocio."
    });
  }

  editar(n: any) {
    this.editando = true;
    this.idEditando = n.id;
    this.formEditar.patchValue(n);
  }

  actualizarNegocio() {
    if (!this.idEditando) return;

    this.negociosService.actualizarNegocio(this.idEditando, this.formEditar.value).subscribe({
      next: () => {
        this.mensaje = "Negocio actualizado.";
        this.editando = false;
        this.idEditando = null;
        this.obtenerNegocios();
      },
      error: () => this.mensaje = "Error al actualizar negocio."
    });
  }

  eliminarNegocio(id: number) {
    if (!confirm("¿Seguro que desea eliminar este negocio?")) return;

    this.negociosService.eliminarNegocio(id).subscribe({
      next: () => {
        this.mensaje = "Negocio eliminado.";
        this.obtenerNegocios();
      },
      error: () => this.mensaje = "Error al eliminar negocio."
    });
  }
}