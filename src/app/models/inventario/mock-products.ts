import { Product } from '../inventario/product.model';

export const PRODUCTS: Product[] = [
  {
    nombre: 'Café Americano',
    imagen: 'images/productos/cafe_americano.jpg',
    codigoBarras: '1234567890123',
    descripcion: 'Café negro sin azúcar, tostado medio.',
    categoria: 'Bebidas',
    precio: 8,
    stock: 10,
    estado: 'Active',

    rating: 4.8,
    ratingCount: 12,
    sales: 30,

    sizes: [
      { name: "Pequeño", price: 6 },
      { name: "Mediano", price: 8 },
      { name: "Grande", price: 10 }
    ],

    reviews: [
      {
        user: "Daniel Ruiz",
        avatar: 'images/productos/perfil.png',
        stars: 5,
        comment: "Excelente café, sabor fuerte.",
        date: "Mon, Oct 21 • 11:10 AM"
      }
    ]
  },

  {
    nombre: 'Latte',
    imagen: 'images/productos/latte.jpg',
    codigoBarras: '9876543210987',
    descripcion: 'Café con leche y espuma cremosa.',
    categoria: 'Bebidas',
    precio: 10,
    stock: 4,
    estado: 'Active',

    rating: 4.9,
    ratingCount: 19,
    sales: 42,

    sizes: [
      { name: "Pequeño", price: 8 },
      { name: "Mediano", price: 10 },
      { name: "Grande", price: 12 }
    ],

    reviews: [
      {
        user: "Laura Torres",
        avatar: 'images/productos/perfil.png',
        stars: 5,
        comment: "Muy suave y delicioso.",
        date: "Tue, Nov 2 • 02:15 PM"
      }
    ]
  },

  {
    nombre: 'Tostada Integral',
    imagen: 'images/productos/tostada-integral.jpg',
    codigoBarras: '4567890123456',
    descripcion: 'Pan integral con aguacate y tomate.',
    categoria: 'Snacks',
    precio: 6,
    stock: 15,
    estado: 'Active',

    rating: 4.7,
    ratingCount: 9,
    sales: 18,

    sizes: [
      { name: "Normal", price: 6 }
    ],

    reviews: [
      {
        user: "Santiago Vega",
        avatar: 'images/productos/perfil.png',
        stars: 4,
        comment: "Muy saludable, buen sabor.",
        date: "Wed, Nov 10 • 09:30 AM"
      }
    ]
  },

  {
    nombre: 'Beef Onion Pizza',
    imagen: 'images/productos/beef-onion-pizza.jpg',
    codigoBarras: '1234567896942',
    descripcion: 'Pizza con cebolla y carne de res.',
    categoria: 'Pizza',
    precio: 24.0,
    stock: 8,
    estado: 'Active',

    rating: 5.0,
    ratingCount: 23,
    sales: 23,

    sizes: [
      { name: "Pequeño", price: 70 },
      { name: "Mediano", price: 80 },
      { name: "Grande", price: 90 }
    ],

    reviews: [
      {
        user: "Joshua Reyna",
        avatar: 'images/productos/perfil.png',
        stars: 5,
        comment: "Es muy buena",
        date: "Fri, Nov 28 • 12:30 PM"
      },
      {
        user: "Gabriel Razo",
        avatar: 'images/productos/perfil.png',
        stars: 5,
        comment: "Me gusta mucho",
        date: "Fri, Nov 28 • 12:30 PM"
      }
    ]
  },

  {
    nombre: 'Cheese Pizza',
    imagen: 'images/productos/cheese-pizza.jpg',
    codigoBarras: '2345678901234',
    descripcion: 'Pizza de queso clásico.',
    categoria: 'Pizza',
    precio: 24.0,
    stock: 0,
    estado: 'Inactive',

    rating: 4.5,
    ratingCount: 10,
    sales: 14,

    sizes: [
      { name: "Mediano", price: 24 }
    ],

    reviews: []
  },

  {
    nombre: 'Chicken Burger',
    imagen: 'images/productos/chicken-burger.jpg',
    codigoBarras: '3456789012345',
    descripcion: 'Hamburguesa de pollo.',
    categoria: 'Burger',
    precio: 24.0,
    stock: 15,
    estado: 'Active',

    rating: 4.9,
    ratingCount: 31,
    sales: 41,

    sizes: [
      { name: "Simple", price: 24 },
      { name: "Combo", price: 32 }
    ],

    reviews: [
      {
        user: "Carlos Morales",
        avatar: 'images/productos/perfil.png',
        stars: 5,
        comment: "Deliciosa, muy buena porción.",
        date: "Sat, Nov 29 • 08:45 PM"
      }
    ]
  }
];
