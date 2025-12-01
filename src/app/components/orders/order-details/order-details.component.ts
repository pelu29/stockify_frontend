import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  imports: [CommonModule]
})
export class OrderDetailsComponent implements OnInit {

  productos: any[] = [];

  loading = true;

  constructor(private productService: ProductService) {}

ngOnInit(): void {

  this.productService.getProductos().subscribe({
    next: (data) => {

      console.log("Respuesta completa del backend:", data); 

      this.productos = data.results;

      console.log("Productos asignados:", this.productos); 

      this.loading = false;
    },
    error: (err) => {
      console.error('Error cargando productos', err);
      this.loading = false;
    }
  });
}}