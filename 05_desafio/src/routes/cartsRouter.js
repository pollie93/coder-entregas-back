import { Router } from "express";
import CartManager from "../dao/CartManager.js";
export const router = Router();

const carrito = new CartManager("src/data/cart.json");

router.get("/", (require, response) => {
  try {
    let cart = carrito.getCartFs();
    if (require.query.limit) {
      const limit = Number(require.query.limit);
      if (isNaN(limit)) {
        return res.json({ error: "El limite debe ser un numero" });
      }
      cart = cart.slice(0, limit);
    }
    return response.json(cart);
  } catch {
    return res.json({ error: "Error" });
  }
});
// ruta GET, debe listar todos los productos que pertenecesn al carrito
router.get("/:cid", (require, response) => {
  let cid = require.params.cid;
  cid = Number(cid);
  if (isNaN(cid)) {
    return response.json({ error: "Ingrese un id numerico" });
  }
  try {
    let cart = carrito.getCartById(cid);
    if (!cart) {
      return response.json({ error: `no se encuentra ${cid}` });
    }
    response.json(cart);
  } catch (error) {
    console.log(error);
    return res.json({ error: "Error desconocido...!!!" });
  }
});

//ruta post, tienen que crear un nuevo carrito
//agregar el producto al array de products
router.post("/:cid/product/:pid", async (requiere, response) => {
  let cid = requiere.params.cid;
  cid = Number(cid);
  let id = requiere.params.id;
  id = Number(id);
  let cart = await carrito.addProductInCart(cid, id);
  return response.json(cart);
});
