import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CategoryComponent } from './components/inventario/category.component';
import { Register } from '@features/auth/pages/register/register';
import { LoginComponent } from '@features/auth/pages/login/login';
import { ImportReportComponent } from './components/import-report/import-report.component';
import { Sidebar } from '@shared/components/sidebar/sidebar';
import { Navbar } from '@shared/components/navbar/navbar';
import { Layout } from './layout/layout/layout';
import { authGuard } from './guards/auth-guard';
import { Orders } from './components/orders/orders';
import { OrderHistory } from './components/order-history/order-history';
import { DetalleProducto } from './components/detalle-producto/detalle-producto';
import { Formularios } from './components/formularios/formularios';
import { PagesNotFound } from '@features/auth/pages/pages-not-found/pages-not-found';
import { RiderFormComponent } from './components/rider-form/rider-form';
import { noAuthGuard } from './guards/no-auth-guard';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant';


export const routes: Routes = [
  // Temporal: redirigir al dashboard para facilitar depuración en desarrollo
  { path:'',pathMatch:'full',redirectTo:'layout/dashboard'},
  // Compatibilidad: si se abre `/orders` a secas, redirigir al layout donde está definida la ruta
  { path: 'orders', pathMatch: 'full', redirectTo: 'layout/orders' },
  { path: 'register', component: Register,canActivate:[noAuthGuard]},
  { path: 'login', component:LoginComponent, canActivate:[noAuthGuard]},
  // Rutas de utilidad durante desarrollo
  { path: 'api-practice', loadComponent: () => import('./components/api-practice/api-practice').then(c => c.ApiPractice) },
  { path: 'formulario', loadComponent: () => import('./formulario/formulario').then(m => m.FormularioComponent) },
  { path: 'categorias', component:CategoryComponent},
  { path: 'report', component: ImportReportComponent },
  {path:'sidebar',component:Sidebar},
  {path:'navbar',component:Navbar},
  {path:'productos',component:ProductListComponent},
  { path: 'app-formulario', component:Formularios},
  { path: 'rider-form', component: RiderFormComponent },
  { path: 'add-restaurant', component: AddRestaurantComponent },

  {
    path:'layout', component:Layout,  
    canActivate:[authGuard],
    children:[
      { path: 'orders', loadComponent: () => import('./components/orders/orders.component').then(c => c.OrdersComponent), canActivate: [authGuard] },
      {path:'',redirectTo:'dashboard',pathMatch:'full'},

      {path:'productos',component:ProductListComponent},
      {path:'agregar-productos',component:ProductFormComponent},
      {path:'ordenes',component:Orders},
      {path:'historial-ordenes',component:OrderHistory},
      {path:'detalle-producto', component:DetalleProducto},
      {path:'**',component:PagesNotFound},
      { path: 'add-restaurant', component: AddRestaurantComponent }


    ]
  }
];
