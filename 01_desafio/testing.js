const ProductManager = require("./productManager");

// instanciar mi clase
const producto = new ProductManager();

console.log(
  producto.addProduct("Prueba1", "Texto 1", 1, "no tiene", "abd23", 1)
);
console.log(
  producto.addProduct("Prueba2", "Texto 2", 2, "no tiene", "abd3", 2)
);
console.log(
  producto.addProduct(
    "Prueba3",
    "Texto 3",
    3,
    "https://www.leagueoflegends.com/es-es/news/esports/",
    "abdfdsa5",
    3
  )
);

console.log(
  producto.addProduct(
    "Prueba4",
    "Texto 4",
    4,
    "https://www.leagueoflegends.com/es-es/news/esports/",
    "afdsa5",
    4
  )
);

console.log(
  producto.addProduct(
    "Prueba4",
    "Texto 4",
    4,
    "https://www.leagueoflegends.com/es-es/news/esports/",
    "afdgfdggasa5",
    4
  )
);

console.log(producto.getProducts());
console.log(producto.getProductById());
