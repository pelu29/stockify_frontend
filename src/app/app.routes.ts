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
import { ApiPracticeComponent } from './components/api-practice/api-practice.component';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { PokeApiComponent } from './components/pokeapi/pokeapi';
import { ClientesComponent  } from './components/clientes/clientes.component';
import { NegociosComponent } from './components/negocios/negocios.component';

export const routes: Routes = [

  { path: '', redirectTo: 'api-practice', pathMatch: 'full' },

  { path: 'register', component: Register },
  { path: 'login', component: LoginComponent },
  { path: 'categorias', component: CategoryComponent },
  { path: 'report', component: ImportReportComponent },
  { path: 'sidebar', component: Sidebar },
  { path: 'navbar', component: Navbar },
  { path: 'productos', component: ProductListComponent },
  { path: 'api-practice', component: ApiPracticeComponent },
  { path: 'formularios', component: FormulariosComponent },
  { path: 'api-pokemones', component: PokeApiComponent },
  { path: 'clientes', component: ClientesComponent  },
  { path: 'negocios', component: NegociosComponent },

  {
    path: 'layout',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'productos', component: ProductListComponent },
      { path: 'agregar-productos', component: ProductFormComponent },
      { path: 'ordenes', component: Orders },
      { path: 'historial-ordenes', component: OrderHistory },
      { path: 'detalle-producto', component: DetalleProducto }
    ]
  }
];
