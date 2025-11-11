import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  barcode?: string;
  status?: string;
  image?: string; 
  imageFile?: File;
}

@Component({
  selector: 'app-edit-product-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product-dialog.html',
  styleUrl: './edit-product-dialog.css',
})
export class EditProductDialog implements OnInit {
  @Input() data: { product: Product | null, isEdit: boolean } = { product: null, isEdit: false };
  @Output() onSave = new EventEmitter<Product>();
  @Output() onCancel = new EventEmitter<void>();

  productForm: FormGroup;
  isEditMode = false;
  previewImage: string | null = null;
  selectedImageFile: File | null = null;

  categories: string[] = [
    'Bebidas Calientes',
    'Comida Rápida',
    'Pizzas',
    'Hamburguesas',
    'Postres',
    'Bebidas Frías',
    'Desayunos'
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.createForm();
  }

  ngOnInit(): void {
    this.isEditMode = this.data.isEdit;
    
    if (this.isEditMode && this.data.product) {
      this.loadProductData(this.data.product);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      barcode: [''],
      status: ['Activo']
    });
  }

  loadProductData(product: Product): void {
    this.productForm.patchValue({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description || '',
      barcode: product.barcode || '',
      status: product.status || 'Activo'
    });

    if (product.image) {
      this.previewImage = product.image;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido (JPEG, PNG, GIF, etc.).');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es demasiado grande. El tamaño máximo permitido es 2MB.');
        return;
      }

      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.previewImage = null;
    this.selectedImageFile = null;
    const fileInput = document.querySelector('.file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSaveClick(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      
      const savedProduct: Product = {
        id: this.isEditMode && this.data.product ? this.data.product.id : Date.now(),
        name: formValue.name,
        category: formValue.category,
        price: formValue.price,
        stock: formValue.stock,
        description: formValue.description,
        barcode: formValue.barcode,
        status: formValue.status,
        image: this.previewImage || undefined,
        imageFile: this.selectedImageFile || undefined
      };

      console.log('Producto guardado:', savedProduct);
      this.onSave.emit(savedProduct);
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancelClick(): void {
    this.onCancel.emit();
  }

  get name() { return this.productForm.get('name'); }
  get category() { return this.productForm.get('category'); }
  get price() { return this.productForm.get('price'); }
  get stock() { return this.productForm.get('stock'); }
}