import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CategoryComponent, ProductFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { }
