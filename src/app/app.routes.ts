import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryComponent } from './components/inventario/category.component';
import { Register } from '@features/auth/pages/register/register';
import { LoginComponent } from '@features/auth/pages/login/login';
import { ImportReportComponent } from './components/import-report/import-report.component';
import { Dashboard } from './components/dashboard/dashboard';
import { Sidebar } from '@shared/components/sidebar/sidebar';
import { Navbar } from '@shared/components/navbar/navbar';
import { Layout } from './layout/layout/layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path:'',redirectTo:'register',pathMatch:'full'},
  { path: 'register', component: Register },
  { path: 'login', component:LoginComponent},
  { path: 'categorias', component:CategoryComponent},
  { path: 'report', component: ImportReportComponent },
  {path:'sidebar',component:Sidebar},
  {path:'navbar',component:Navbar},
  {
    path:'layout', component:Layout,
    canActivate:[authGuard],
    children:[
      {path:'productos',component:ProductListComponent},
      {path:'',redirectTo:'productos',pathMatch:'full'}
    ]
  }
];
