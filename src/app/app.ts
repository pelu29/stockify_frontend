import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from './components/inventario/category.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- quitar ImportReportComponent
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'stockify-frontend';
}
