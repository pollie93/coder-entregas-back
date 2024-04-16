import fs from "fs";

class ProductManager {
  static idProduct = 0;

  constructor(routeFile) {
    this.path = routeFile;
  }

  getProductsFs() {
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

  saveProductFs(products) {
    try {
      if (!Array.isArray(products) || products.length === 0) {
        console.log("Array vacio o no es un array saveProductFs");
        return;
      }
      fs.writeFileSync(this.path, JSON.stringify(products));
      return products;
    } catch (error) {
      console.log("error al guardar");
    }
  }

  //metodo fn que se aplican a un obj
  addProduct(
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
      !title ||
      !description ||
      !code ||
      !price ||
      typeof status !== "boolean" ||
      !stock ||
      !category
    )
      return "Todos los campos son requeridos, menos thumbnail";
    try {
      let products = [];
      const file = fs.readFileSync(this.path, { encoding: "utf-8" });
      console.log("aaaaa", file);
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

  getProducts() {
    return JSON.parse(fs.readFileSync(this.path, { encoding: "utf-8" }));
  }

  getProductById(id) {
    const products = this.getProductsFs();
    const index = products.findIndex((product) => product.id === id);
    console.log(index);

    if (index !== -1) {
      return products[index];
    } else {
      return `Producto no existe con el id ${id}`;
    }
  }

  updateProduct(id, updateProduct) {
    const products = this.getProductsFs();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updateProduct };
      this.deleteProduct(products[index].id);
      this.saveProductFs(products);
      return "producto actualizado";
    } else {
      return `Producto no existe con el id ${id}`;
    }
  }

  deleteProduct(id) {
    const products = this.getProductsFs();
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
      products.splice(index, 1);
      this.saveProductFs(products);
      return "producto borrado";
    } else {
      return "producto inexistente";
    }
  }
}

export default ProductManager;
