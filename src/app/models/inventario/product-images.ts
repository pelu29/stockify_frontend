// src/app/models/inventario/product-images.ts

export interface ProductImage {
  id: number;
  imagen: string;
}

// Mapeo de ID de producto a su imagen
export const PRODUCT_IMAGES: ProductImage[] = [
  { id: 1, imagen: 'images/productos/bubble-tea-clasico.jpg' },
  { id: 2, imagen: 'images/productos/cafe_americano.jpg' },
  { id: 3, imagen: 'images/productos/bebida-de-uva.jpg' },
  { id: 4, imagen: 'images/productos/te-de-jazmin.jpg' },
  { id: 5, imagen: 'images/productos/mochi-de-mango.jpg' },
  { id: 6, imagen: 'images/productos/galletas-de-arroz.jpg' },
  { id: 7, imagen: 'images/productos/kimbap-clasico.jpg' },
  { id: 8, imagen: 'images/productos/cheesecake-de-frutos-rojos.jpg' },
  { id: 9, imagen: 'images/productos/papitas-onduladas-bbq.jpg' },
  { id: 10, imagen: 'images/productos/pollo-teriyaki-con-arroz.jpg' },
  // Agrega más productos según tu base de datos
];

// Función helper para obtener imagen por ID
export function getProductImage(productId: number): string {
  const product = PRODUCT_IMAGES.find(p => p.id === productId);
  return product ? product.imagen : 'images/productos/default.jpg';
}