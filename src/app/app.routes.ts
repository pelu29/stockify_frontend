import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryComponent } from './components/inventario/category.component';
import { Register } from '@features/auth/pages/register/register';
import { LoginComponent } from '@features/auth/pages/login/login';

export const routes: Routes = [
  { path:'',redirectTo:'register',pathMatch:'full'},
  { path: '', component: ProductListComponent },
  { path: 'register', component: Register },
  { path: 'login', component:LoginComponent},
  { path: 'categorias', component:CategoryComponent}
];
