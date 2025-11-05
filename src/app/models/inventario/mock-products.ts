import { Product } from '../inventario/product.model';

/* Mock data for products */
export const PRODUCTS: Product[] = [
  { nombre: 'Café Americano', imagen: 'images/productos/cafe_americano.jpg', codigoBarras: '1234567890123', descripcion: 'Café negro sin azúcar, tostado medio.', categoria: 'Bebidas', precio: 8, stock: 10, estado: 'Active'},
  { nombre: 'Latte', imagen: 'images/productos/latte.jpg', codigoBarras: '9876543210987', descripcion: 'Café con leche y espuma cremosa.', categoria: 'Bebidas', precio: 10, stock: 4, estado: 'Active'},
  { nombre: 'Tostada Integral', imagen: 'images/productos/tostada-integral.jpg', codigoBarras: '4567890123456', descripcion: 'Pan integral con aguacate y tomate.', categoria: 'Snacks', precio: 6, stock: 15, estado: 'Active'},
  { nombre: 'Beef Onion Pizza', imagen: 'images/productos/beef-onion-pizza.jpg', codigoBarras: '1234567896942', descripcion: 'Pizza con cebolla y carne de res',categoria: 'Pizza', precio: 24.0,  stock: 8, estado: 'Active'},
  { nombre: 'Cheese Pizza', imagen: 'images/productos/cheese-pizza.jpg', codigoBarras: '2345678901234', descripcion: 'Pizza de queso clásico', categoria: 'Pizza', precio: 24.0, stock: 0, estado: 'Inactive'},
  { nombre: 'Chicken Burger', imagen: 'images/productos/chicken-burger.jpg', codigoBarras: '3456789012345', descripcion: 'Hamburguesa de pollo', categoria: 'Burger', precio: 24.0, stock: 15, estado: 'Active'}
];
    