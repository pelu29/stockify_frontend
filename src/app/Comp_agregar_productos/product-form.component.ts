import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  code?: string;
  description?: string;
  category?: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  form: FormGroup;
  products: Product[] = [
    { id: 1, name: 'Papa', code: '123456789012', description: 'Rosada 250g', category: 'tuberculo', price: 2.5, stock: 20 }
  ];
  private nextId = 2;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      description: [''],
      category: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  
      // Cargar productos desde localStorage si existen
      try {
        const raw = localStorage.getItem('stockify_products');
        if (raw) {
          const parsed = JSON.parse(raw) as Product[];
          if (Array.isArray(parsed)) {
            this.products = parsed;
            // calcular nextId
            const maxId = this.products.reduce((m, p) => p.id > m ? p.id : m, 0);
            this.nextId = maxId + 1;
          }
        } else {
          // inicializar con un ejemplo si no hay nada
          this.products = [ { id: 1, name: 'Café Molido', code: '123456789012', description: 'Café arábica 250g', category: 'Bebidas', price: 4.5, stock: 20 } ];
          this.nextId = 2;
          localStorage.setItem('stockify_products', JSON.stringify(this.products));
        }
      } catch (e) {
        console.warn('No se pudo leer localStorage:', e);
        // fallback: dejar products vacío
        if (this.products.length === 0) {
          this.products = [ { id: 1, name: 'Café Molido', code: '123456789012', description: 'Café arábica 250g', category: 'Bebidas', price: 4.5, stock: 20 } ];
          this.nextId = 2;
        }
      }
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;
    const product: Product = {
      id: this.nextId++,
      name: v.name,
      code: v.code,
      description: v.description,
      category: v.category,
      price: Number(v.price),
      stock: Number(v.stock)
    };

    this.products.unshift(product);
    console.log('Producto agregado:', product);
    this.form.reset({ price: 0, stock: 0 });
    // Guardar en localStorage para persistencia simple
    try {
      localStorage.setItem('stockify_products', JSON.stringify(this.products));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }
}
