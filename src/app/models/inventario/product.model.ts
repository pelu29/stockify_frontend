export interface Product {
  nombre: string;
  imagen: string;
  codigoBarras: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  estado?: string;
  selected?: boolean;

  rating: number;
  ratingCount: number;
  sales: number;

  sizes: {
    name: string;
    price: number;
  }[];

  reviews: {
    user: string;
    avatar: string;
    stars: number;
    comment: string;
    date: string;
  }[];
}
