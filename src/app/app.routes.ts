import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login';
import { ImportReportComponent } from './components/import-report/import-report.component';

export const routes: Routes = [
 { path: '', redirectTo: 'import-report', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'import-report', component: ImportReportComponent }
];
