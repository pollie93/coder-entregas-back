import fs from "fs";

class CartManager {
  static idProduct = 0;

  constructor(routeFile) {
    this.path = routeFile;
  }

  getCartFs() {
    if (fs.existsSync(this.path)) {
      const fileRead = JSON.parse(
        fs.readFileSync(this.path, { encoding: "utf-8" })
      );
      return fileRead;
    } else {
      console.log("El archivo no existe GETPRODUCTSFS:", this.path);
      return [];
    }
  }

  saveCartFs(carts) {
    try {
      if (!Array.isArray(carts) || carts.length === 0) {
        console.log("Array vacio o no es un array saveCartFs");
        return;
      }
      fs.writeFileSync(this.path, JSON.stringify(carts));
      return carts;
    } catch (error) {
      console.log("error al guardar");
    }
  }

  //metodo fn que se aplican a un obj
  addProductInCart(
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnail
  ) {
    if (
      !id ||
      !title ||
      !description ||
      !code ||
      !price ||
      !status ||
      !stock ||
      !category ||
      thumbnail
    )
      return "Todos los campos son requeridos, menos thumbnail";
    try {
      let products = [];
      const file = fs.readFileSync(this.path, { encoding: "utf-8" });
      if (file) products = JSON.parse(file);

      const repeatedCode = products.some((product) => product?.code === code);
      if (repeatedCode) return `Codigo ${code} repetido`;
      const id = ProductManager.idProduct++;

      const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
      };

      products.push(newProduct);
      this.saveProductFs(products);

      fs.writeFileSync(this.path, JSON.stringify(products));
      return "producto de forma agregada exitosa";
    } catch (error) {
      console.log("error al agregar", error);
      return;
    }
  }

  getCart() {
    return JSON.parse(fs.readFileSync(this.path, { encoding: "utf-8" }));
  }

  getCartById(id) {
    const products = this.getCartFs();
    const index = products.findIndex((product) => product.id === id);

    if (index !== -1) {
      return products[index];
    } else {
      return `Producto no existe con el id ${id}`;
    }
  }
}

export default CartManager;
