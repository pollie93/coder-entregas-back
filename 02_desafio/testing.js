const ProductManager = require("./ProductManager.js");

// instanciar mi clase
const producto = new ProductManager("./data/product.json");
console.log(producto.getProductsFs());
console.log(producto.saveProductFs());
console.log(
  producto.addProduct("Producto 1", "Texto 1", 1, "no tiene", "dfaf4r", 1)
);
console.log(
  producto.addProduct("Producto 2", "Texto 2", 2, "tiene", "ffasdff43", 2)
);
console.log(
  producto.addProduct(
    "Producto 3",
    "Texto 3",
    3,
    "https://www.leagueoflegends.com/es-es/news/esports/",
    "afadsfa5",
    3
  )
);
console.log(
  producto.addProduct(
    "Producto 4",
    "Texto 4",
    4,
    "https://www.leagueoflegends.com/es-es/news/esports/",
    "fesdffdsafsa",
    4
  )
);
console.log(producto.getProducts());
console.log(producto.getProductById(0));

console.log(producto.updateProduct(0));
console.log(producto.deleteProduct(1));
