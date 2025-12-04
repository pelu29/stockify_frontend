import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-filtro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-filtro.component.html',
  styleUrls: ['./modal-filtro.component.css']
})
export class ModalFiltroComponent {

  @Output() filtroAplicado = new EventEmitter<any>();
  @Output() cerrarModal = new EventEmitter<void>();

  formFiltro = new FormGroup({
    descripcion: new FormControl(''),
    minimo: new FormControl(null),
    maximo: new FormControl(null)
  });

  aplicar() {
    this.filtroAplicado.emit(this.formFiltro.value);
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}