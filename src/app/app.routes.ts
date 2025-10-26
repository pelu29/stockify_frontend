import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Register } from '@features/auth/pages/register/register';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'register', component: Register }
];
