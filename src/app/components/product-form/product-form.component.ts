import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../../models/product.model';
import { PRODUCTS } from '../../models/mock-products';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @ViewChild('inputFoto', { static: false }) inputFoto!: ElementRef<HTMLInputElement>;

  // Variables del formulario
  fotoUrl: string | null = null;
  mensaje: string = '';
  habilitarT: boolean = false;

  // Campos del producto
  categoria: string = '';
  codigoBarras: string = '';
  nombre: string = '';
  descripcion: string = '';
  precio: number | null = null;
  stock: number | null = null;

  // Precios por tamaño
  precioPequeno: number | null = null;
  precioMedio: number | null = null;
  precioGrande: number | null = null;

  seleccionarFoto(): void {
    this.inputFoto.nativeElement.click();
  }

  cargarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const archivo = input.files[0];

      if (!archivo.type.startsWith('image/')) {
        this.mensaje = '❌ El archivo no es una imagen.';
        this.fotoUrl = null;
        return;
      }

      const lector = new FileReader();
      lector.onload = () => {
        this.fotoUrl = lector.result as string;
        this.mensaje = '✅ Imagen cargada correctamente';
      };
      lector.readAsDataURL(archivo);
    } else {
      this.mensaje = 'No se seleccionó ninguna imagen.';
    }
  }

  eliminarFoto(): void {
    this.fotoUrl = null;
    this.mensaje = 'Imagen eliminada.';
    if (this.inputFoto) {
      this.inputFoto.nativeElement.value = '';
    }
  }

  alternarT(): void {
    // Si se desactiva, limpiar precios
    if (!this.habilitarT) {
      this.precioPequeno = null;
      this.precioMedio = null;
      this.precioGrande = null;
    } else {
      this.precio = null; // desactivar precio principal
    }
  }

  agregarProducto(form: NgForm): void {
    if (form.invalid) {
      this.mensaje = '⚠️ Complete todos los campos obligatorios.';
      return;
    }

    const nuevoProducto: Product = {
      nombre: this.nombre,
      imagen: this.fotoUrl || '',
      codigoBarras: this.codigoBarras,
      descripcion: this.descripcion,
      categoria: this.categoria,
      precio: this.habilitarT ? (this.precioMedio ?? 0) : (this.precio ?? 0),
      stock: this.stock ?? 0
    };

    // Simular guardar producto
    PRODUCTS.push(nuevoProducto);
    console.log('✅ Producto agregado correctamente:', nuevoProducto);

    this.mensaje = '✅ Producto agregado correctamente. Revisa la consola.';

    form.resetForm();
    this.fotoUrl = null;
    this.habilitarT = false;
  }
}
