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
}
