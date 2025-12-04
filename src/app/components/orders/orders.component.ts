import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService, Order } from '../../services/orders.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  cargando = false;
  error = '';
  filterStatus: string = 'all';
  statuses = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'preparing', label: 'Being Prepared' },
    { key: 'on_the_way', label: 'On The Way' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' }
  ];

  constructor(private ordersService: OrdersService, private auth: AuthService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.cargando = true;
    this.error = '';
    this.ordersService.obtenerOrdenes().subscribe({
      next: (data) => {
        this.orders = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar órdenes:', err);
        // Mensaje amigable
        if (err?.type === 'NO_ENDPOINT_RESPONDED') {
          this.error = 'No se encontraron endpoints activos para órdenes. Revisa URL del backend.';
        } else {
          const status = err?.status;
          this.error = `Error al cargar órdenes. Revisa autenticación o la URL del backend. (HTTP ${status || '??'})`;
        }
        this.cargando = false;
      }
    });
  }

  cambiarFiltro(status: string) {
    this.filterStatus = status;
  }

  filteredOrders(): Order[] {
    if (this.filterStatus === 'all') return this.orders;
    return this.orders.filter(o => (o.status || '').toLowerCase() === this.filterStatus);
  }

  cambiarEstado(order: Order, nuevoEstado: string) {
    if (!order.id) return;
    order.status = nuevoEstado;
    this.ordersService.cambiarEstado(order.id as number, nuevoEstado).subscribe({
      next: () => {
        // actualizado en backend
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
        this.error = 'No se pudo actualizar el estado. Revisa consola.';
      }
    });
  }

  formatoFecha(date?: string): string {
    if (!date) return '';
    try { return new Date(date).toLocaleString(); } catch { return date; }
  }
}
