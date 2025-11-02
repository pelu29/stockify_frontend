import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from 'src/app/models/inventario/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categoryForm: FormGroup;
  categories: Category[] = [];
  private nextId = 1;

  constructor(private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['']
    });
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      const newCategory: Category = {
        id: this.nextId++,
        nombre: this.categoryForm.get('nombre')?.value,
        descripcion: this.categoryForm.get('descripcion')?.value
      };

      // Mostrar en consola
      console.log('Nueva categoría agregada:', newCategory);

      // Agregar al arreglo local
      this.categories.push(newCategory);

      // Limpiar el formulario
      this.categoryForm.reset();

      // Mostrar mensaje de éxito
      console.log('Categoría agregada exitosamente');
    } else {
      console.error('Formulario inválido. Por favor, complete todos los campos requeridos.');
      
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.markAsTouched();
      });
    }
  }

  // Getter para facilitar el acceso a los controles en el template
  get f() {
    return this.categoryForm.controls;
  }

  // Método para eliminar una categoría (opcional)
  deleteCategory(id: number): void {
    this.categories = this.categories.filter(cat => cat.id !== id);
    console.log('Categoría eliminada con ID:', id);
  }
}
