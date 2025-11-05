import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '@shared/components/sidebar/sidebar';
import { CategoryComponent } from './components/inventario/category.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Sidebar], // <-- quitar ImportReportComponent
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'stockify-frontend';
}
