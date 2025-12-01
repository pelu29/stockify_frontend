import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { Sidebar } from '@shared/components/sidebar/sidebar';
import { Navbar } from '@shared/components/navbar/navbar';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductFormComponent,Sidebar,Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { }
