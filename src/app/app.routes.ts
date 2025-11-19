import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryComponent } from './components/inventario/category.component';
import { Register } from '@features/auth/pages/register/register';
import { LoginComponent } from '@features/auth/pages/login/login';
import { ImportReportComponent } from './components/import-report/import-report.component';
import { Dashboard } from './components/dashboard/dashboard';
import { Sidebar } from '@shared/components/sidebar/sidebar';
import { Navbar } from '@shared/components/navbar/navbar';
import { Layout } from './layout/layout/layout';
import { authGuard } from './guards/auth-guard';
import { Orders } from './components/orders/orders';
import { OrderHistory } from './components/order-history/order-history';
import { DetalleProducto } from './components/detalle-producto/detalle-producto';
import { Formularios } from './components/formularios/formularios';
import { PagesNotFound } from '@features/auth/pages/pages-not-found/pages-not-found';

export const routes: Routes = [
  { path:'',redirectTo:'register',pathMatch:'full'},
  { path: 'register', component: Register },
  { path: 'login', component:LoginComponent},
  { path: 'categorias', component:CategoryComponent},
  { path: 'report', component: ImportReportComponent },
  {path:'sidebar',component:Sidebar},
  {path:'navbar',component:Navbar},
  {path:'productos',component:ProductListComponent},
  { path: 'app-formulario', component:Formularios},

  {
    path:'layout', component:Layout,
    canActivate:[authGuard],
    children:[
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path:'dashboard',component:Dashboard},
      {path:'productos',component:ProductListComponent},
      {path:'agregar-productos',component:ProductFormComponent},
      {path:'ordenes',component:Orders},
      {path:'historial-ordenes',component:OrderHistory},
      {path:'detalle-producto', component:DetalleProducto},
      {path:'**',component:PagesNotFound}
    ]
  }
];
