import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages-not-found',
  imports: [],
  templateUrl: './pages-not-found.html',
  styleUrl: './pages-not-found.css'
})
export class PagesNotFound {
  constructor(private router:Router){}

  navegar(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }
}
