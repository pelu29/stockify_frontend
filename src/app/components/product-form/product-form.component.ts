import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ProductosService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,               
  imports: [FormsModule , CommonModule],         
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  @ViewChild('inputFoto') inputFoto!: ElementRef<HTMLInputElement>;

  // Campos del formulario
  categoria: string = '';
  codigo: string = '';
  nombre: string = '';
  descripcion: string = '';
  precio: number | null = null;
  stock: number | null = null;

  // imagen solo visual
  fotoUrl: string | null = null;

  mensaje: string = '';

  constructor(private productService: ProductosService) {}

  
  seleccionarFoto() {
    this.inputFoto.nativeElement.click();
  }

  cargarFoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.fotoUrl = reader.result as string; 
    };
    reader.readAsDataURL(file);
  }

  eliminarFoto() {
    this.fotoUrl = null;
    this.inputFoto.nativeElement.value = '';
  }

  
  agregarProducto(form: NgForm) {

    if (form.invalid) {
      this.mensaje = 'Completa todos los campos requeridos.';
      return;
    }

    
    const data = {
      codigo: this.codigo,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio ?? 0,
      stock: this.stock ?? 0,


      stock_minimo: 0,            
      negocio_id: 1,              
      categoria_id: Number(this.categoria) 
    };

    this.productService.crearProducto(data).subscribe({
      next: () => {
        this.mensaje = 'Producto agregado correctamente ✔';

        form.resetForm();
        this.fotoUrl = null;
      },
      error: () => {
        this.mensaje = '❌ Error al agregar el producto';
      }
    });
  }
}
