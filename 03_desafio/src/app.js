const express = require("express");
const ProductManager = require("./ProductManager");

const port = 3000;
const app = express();

//instancio mi clase
const producto = new ProductManager("./data/product.json");

app.get("/products", (require, response) => {
  let products = producto.getProductsFs();

  const limit = require.query.limit;
  if (limit && limit > 0) {
    products.slice(0, limit);
  }
  response.json(products);
});

app.get("/products/:id", (require, response) => {
  let id = require.params.id;
  console.log(id, typeof id);
  id = Number(id);
  if (isNaN(id)) {
    return response.json({ error: "ingresar id numerico" });
  }
  let productId = producto.getProductById(id);
  response.json(productId);
});

app.listen(port, () => console.log(`server online ${port}`));
