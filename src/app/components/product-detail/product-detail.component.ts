import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/inventario/productos/productos';
import { Product } from '../../models/inventario/product.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],

})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | null> = of(null);
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

ngOnInit(): void {
  console.log('Componente inicializado');

  this.product$ = this.route.paramMap.pipe(

    switchMap(params => {
      const id = params.get('id');
      console.log('ID extraído de la ruta:', id);

      if (!id) {
        this.loading = false;
        this.error = 'No se proporcionó un ID válido.';
        return of(null);
      }

      this.loading = true;
      console.log('Llamando al servicio con ID:', id);

      return this.productService.getProductById(id).pipe(
        catchError(err => {
          console.error('Error en el servicio:', err);
          this.error = 'Error al cargar el producto.';
          this.loading = false;
          return of(null);
        })
      );
    }),

    switchMap(product => {
      this.loading = false;

      if (!product && !this.error) {
        this.error = 'Producto no encontrado.';
      }

      return of(product);
    })
  );
}

}