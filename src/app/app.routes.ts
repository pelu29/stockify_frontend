import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryComponent } from './components/inventario/category.component';
import { Register } from '@features/auth/pages/register/register';
import { LoginComponent } from '@features/auth/pages/login/login';
import { ImportReportComponent } from './components/import-report/import-report.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  { path:'',redirectTo:'register',pathMatch:'full'},
  { path: 'productos', component: ProductListComponent },
  { path: 'productos/:id', component: ProductDetailComponent },
  { path: 'register', component: Register },
  { path: 'login', component:LoginComponent},
  { path: 'categorias', component:CategoryComponent},
  { path: 'report', component: ImportReportComponent }
];
