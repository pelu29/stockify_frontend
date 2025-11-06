import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },           // Página principal
  { path: 'add-product', component: ProductFormComponent } // Agregar producto
];
