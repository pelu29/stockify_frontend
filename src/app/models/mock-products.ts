import { Product } from './product.model';

/* Mock data for products */
export const PRODUCTS: Product[] = [
  { nombre: 'Café Americano', imagen: 'https://i.imgur.com/abcd123.jpg', codigoBarras: '1234567890123', descripcion: 'Café negro sin azúcar, tostado medio.', categoria: 'Bebidas', precio: 8, stock: 10, estado: 'Active'},
  { nombre: 'Latte', imagen: 'https://i.imgur.com/abcd123.jpg', codigoBarras: '9876543210987', descripcion: 'Café con leche y espuma cremosa.', categoria: 'Bebidas', precio: 10, stock: 4, estado: 'Active'},
  { nombre: 'Tostada Integral', imagen: 'https://i.imgur.com/abcd123.jpg', codigoBarras: '4567890123456', descripcion: 'Pan integral con aguacate y tomate.', categoria: 'Snacks', precio: 6, stock: 15, estado: 'Active'},
  { nombre: 'Beef Onion Pizza', imagen: 'https://i.imgur.com/abcd123.jpg', codigoBarras: '1234567890123', descripcion: 'Pizza con cebolla y carne de res',categoria: 'Pizza', precio: 24.0,  stock: 8, estado: 'Active'},
  { nombre: 'Cheese Pizza', imagen: 'https://i.imgur.com/ijkl789.jpg', codigoBarras: '2345678901234', descripcion: 'Pizza de queso clásico', categoria: 'Pizza', precio: 24.0, stock: 0, estado: 'Inactive'},
  { nombre: 'Chicken Burger', imagen: 'https://i.imgur.com/ijkl789.jpg', codigoBarras: '3456789012345', descripcion: 'Hamburguesa de pollo', categoria: 'Burger', precio: 24.0, stock: 15, estado: 'Active'}
];
    