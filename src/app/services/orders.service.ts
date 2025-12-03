import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

export interface OrderItem {
  productId?: number;
  nombre?: string;
  cantidad?: number;
  precio?: number;
}

export interface Order {
  id?: number;
  order_id?: string;
  date?: string;
  customer?: string;
  total?: number;
  status?: string; // pending, preparing, on_the_way, delivered, cancelled
  items?: OrderItem[];
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  // Ajusta esta URL si tu backend usa otro path
  private apiUrl = 'https://stockify-backend-0r7c.onrender.com/api/pedidos/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getOptions() {
    const token = this.auth.getAccessToken?.() || null;
    if (token) {
      return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
    }
    return {};
  }

  private generarOrdenesMock(): Order[] {
    return [
      {
        id: 1,
        order_id: 'ORD-001',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
        customer: 'Juan García',
        total: 250.50,
        status: 'delivered',
        items: [
          { productId: 1, nombre: 'Hamburguesa Clásica', cantidad: 2, precio: 75.00 },
          { productId: 2, nombre: 'Papas Fritas', cantidad: 1, precio: 35.50 }
        ]
      },
      {
        id: 2,
        order_id: 'ORD-002',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
        customer: 'María López',
        total: 180.75,
        status: 'on_the_way',
        items: [
          { productId: 3, nombre: 'Pizza Pepperoni', cantidad: 1, precio: 120.00 },
          { productId: 4, nombre: 'Bebida Refrescante', cantidad: 2, precio: 30.75 }
        ]
      },
      {
        id: 3,
        order_id: 'ORD-003',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 horas atrás
        customer: 'Carlos Rodríguez',
        total: 95.25,
        status: 'preparing',
        items: [
          { productId: 5, nombre: 'Ensalada César', cantidad: 1, precio: 65.00 },
          { productId: 6, nombre: 'Pan Tostado', cantidad: 1, precio: 30.25 }
        ]
      },
      {
        id: 4,
        order_id: 'ORD-004',
        date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hora atrás
        customer: 'Ana Martínez',
        total: 320.00,
        status: 'pending',
        items: [
          { productId: 7, nombre: 'Costillas BBQ', cantidad: 1, precio: 200.00 },
          { productId: 8, nombre: 'Postre Especial', cantidad: 1, precio: 120.00 }
        ]
      },
      {
        id: 5,
        order_id: 'ORD-005',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
        customer: 'Pedro Sánchez',
        total: 145.00,
        status: 'cancelled',
        items: [
          { productId: 9, nombre: 'Sándwich Premium', cantidad: 2, precio: 72.50 }
        ]
      }
    ];
  }

  obtenerOrdenes(): Observable<Order[]> {
    // Retorna datos simulados con un pequeño delay para simular petición al backend
    console.log('OrdersService: usando datos mock (endpoint real no disponible aún)');
    return of(this.generarOrdenesMock()).pipe(delay(500));
  }

  obtenerOrden(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}${id}/`, this.getOptions());
  }

  crearOrden(orden: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, orden, this.getOptions());
  }

  actualizarOrden(id: number, orden: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}${id}/`, orden, this.getOptions());
  }

  cambiarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}${id}/`, { status: estado }, this.getOptions());
  }
}
