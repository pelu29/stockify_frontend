const products=[
    {name: 'Nitro 5', brand: 'Acer', category: 'Laptop', stock: 20, price: 3500, color: 'Negro', ram: '16', ssd: '1 TB'},
    {name: 'Pavilion', brand: 'Hp', category: 'Laptop', stock: 10, price: 3100, color: 'Gris', ram: '16', ssd: '512 GB'},
    {name: 'TUF', brand: 'Asus', category: 'Laptop', stock: 14, price: 3500, color: 'Negro', ram: '16', ssd: '1 TB'},
    {name: 'Virtus 15', brand: 'Hp', category: 'Laptop', stock: 10, price: 2799, color: 'Gris', ram: '16', ssd: '256 GB'},
    {name: 'Aspire', brand: 'Acer', category: 'Laptop', stock: 12, price: 3200, color: 'Gris', ram: '16', ssd: '512 GB'},
    {name: 'Loq 12', brand: 'Lenovo', category: 'Laptop', stock: 5, price: 3100, color: 'Gris', ram: '16', ssd: '512 GB'},
    {name: 'G203', brand: 'Logitech', category: 'Mouse', stock: 10, price: 120, color: 'Blanco', dpi: '16000'},
    {name: 'Viper mini', brand: 'Razer', category: 'Mouse', stock: 6, price: 120, color: 'Negro', dpi: '16000'}
];

function filterProduct(searchText: string){
    return products.filter( product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase())
    );
}

console.log(filterProduct('Mouse'));
/**output:
  "name": "G203",
  "brand": "Logitech",
  "category": "Mouse",
  "stock": 10,
  "price": 120,
  "color": "Blanco",
  "dpi": "16000"

  "name": "Viper mini",
  "brand": "Razer",
  "category": "Mouse",
  "stock": 6,
  "price": 120,
  "color": "Negro",
  "dpi": "16000"
*/

console.log(filterProduct('Nitro 5'));

/**output:
  "name": "Nitro 5",
  "brand": "Acer",
  "category": "Laptop",
  "stock": 20,
  "price": 3500,
  "color": "Negro",
  "ram": "16",
  "ssd": "1 TB"
*/