import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryComponent } from './components/inventario/category.component';
import { Register } from '@features/auth/pages/register/register';
import { LoginComponent } from '@features/auth/pages/login/login';
import { ImportReportComponent } from './components/import-report/import-report.component';
import { Dashboard } from './components/dashboard/dashboard';
import { Sidebar } from '@shared/components/sidebar/sidebar';
import { Navbar } from '@shared/components/navbar/navbar';

export const routes: Routes = [
  { path:'',redirectTo:'register',pathMatch:'full'},
  {path:'dashboard',component:Dashboard},
  { path: 'productos', component: ProductListComponent },
  { path: 'register', component: Register },
  { path: 'login', component:LoginComponent},
  { path: 'categorias', component:CategoryComponent},
  { path: 'report', component: ImportReportComponent },
  {path:'sidebar',component:Sidebar},
  {path:'navbar',component:Navbar}
];
