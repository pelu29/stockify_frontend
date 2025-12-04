import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ModalFiltroComponent } from './modal-filtro/modal-filtro.component';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalFiltroComponent],
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent {

  mostrarModal = false;
  mostrarForm = false;

  transaccionSeleccionada: any = null;

  transacciones = [
    { id: 1, producto: 'Café Americano', cantidad: 25, tipo: 'entrada', fecha: '2024-11-26' },
    { id: 2, producto: 'Latte', cantidad: 5, tipo: 'salida', fecha: '2024-11-26' },
    { id: 3, producto: 'Jugo de Naranja', cantidad: 40, tipo: 'entrada', fecha: '2024-11-27' },
    { id: 4, producto: 'Tostada Integral', cantidad: 3, tipo: 'salida', fecha: '2024-11-27' },
    { id: 5, producto: 'Pizza Pepperoni', cantidad: 10, tipo: 'entrada', fecha: '2024-11-28' },
    { id: 6, producto: 'Beef Burger', cantidad: 4, tipo: 'salida', fecha: '2024-11-28' }
  ];

  transaccionesFiltradas = [...this.transacciones];

  formTransaccion = new FormGroup({
    producto: new FormControl(''),
    cantidad: new FormControl(0),
    tipo: new FormControl('entrada'),
  });

  // Abrir modal
  openModal() {
    this.mostrarModal = true;
  }

  // Cerrar modal
  closeModal() {
    this.mostrarModal = false;
  }

  // Abrir formulario
  openAdd() {
    this.mostrarForm = true;
  }

  // Cerrar formulario
  closeAdd() {
    this.mostrarForm = false;
    this.formTransaccion.reset({ tipo: 'entrada', cantidad: 0 });
  }

  // Guardar nueva transacción
  guardar() {
    const nueva = {
      id: Date.now(),
      producto: this.formTransaccion.value.producto || '',
      cantidad: this.formTransaccion.value.cantidad || 0,
      tipo: this.formTransaccion.value.tipo || 'entrada',
      fecha: new Date().toISOString().split('T')[0]
    };

    this.transacciones.unshift(nueva);
    this.transaccionesFiltradas = [...this.transacciones];

    this.closeAdd();
  }

  // Buscar
  buscar(event: any) {
    const texto = event.target.value.toLowerCase();

    this.transaccionesFiltradas = this.transacciones.filter(t =>
      t.producto.toLowerCase().includes(texto)
    );
  }

  // Seleccionar fila
  seleccionar(t: any) {
    this.transaccionSeleccionada = t;
  }

  // Exportar solo la transacción seleccionada
  exportar() {
    if (!this.transaccionSeleccionada) {
      alert("Debes seleccionar una transacción antes de exportar.");
      return;
    }

    const t = this.transaccionSeleccionada;

    const columnas = ["ID", "Producto", "Cantidad", "Tipo", "Fecha"];
    const valores = [t.id, t.producto, t.cantidad, t.tipo, t.fecha];

    let csv = columnas.join(",") + "\n" + valores.join(",");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = `transaccion_${t.id}.csv`;
    link.click();
  }
}

