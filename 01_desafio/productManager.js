class ProductManager {
  static idProduct = 0;

  constructor() {
    // defino mis variables que uso a lo largo de toda mi clase
    this.products = []; //variable
  }

  //metodo
  // fn que se aplican a un obj
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      return "Todos los campos son requeridos";

    const repeatedCode = this.products.some(
      (product) => product?.code === code
    );
    // con this hago referencia a una variable que está disponible a lo largo de toda mi clase
    if (repeatedCode) return `Codigo ${code} repetido`;

    //const id = this.products[this.products.length]?.id + 1 || 0;

    const id = ProductManager.idProduct++;

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(newProduct);

    return "Producto agregado correctamente";
  }

  getProducts() {
    //devuelve arreglo con todos los productos creados
    return this.products;
  }

  getProductById(id) {
    const productId = this.products.find((product) => product.id === id);
    if (productId) {
      return productId;
    } else {
      return `Not Found de producto con id ${id}`;
    }
  }
}

module.exports = ProductManager;
