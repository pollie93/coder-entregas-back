import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";
export const router = Router();

const producto = new ProductManager("src/data/product.json");

// router.get("/", (req, res) => {
//   let products = producto.getProductsFs();

//   const limit = req.query.limit;
//   if (limit && limit > 0) {
//     products.slice(0, limit);
//   }
//   res.json(products);
// });
///////////////////////////////////////////////

// RUTA DEFAULT
router.get("/", (req, res) => {
  try {
    let productos = producto.getProductsFs();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("home", { productos });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(500)
      .res.json({ Error: "Error 500 - Error inesperado del servidor" });
  }
});

// RUTA DE CHAT WEBSOCKET
router.get("/chatws", (req, res) => {
  try {
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("chat");
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(500)
      .res.json({ Error: "Error del servidor de forma inesperada" });
  }
});
///////////////////////////////////////////////

// RUTA REAL TIME PRODUCTS
router.get("/realtimeproducts", (req, res) => {
  try {
    let productos = producto.getProductsFs();
    res.setHeader("Content-Type", "text/html");
    res.status(200).render("realTimeProducts", { productos });
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(500)
      .res.json({ Error: "Error 500 - Error inesperado del servidor" });
  }
});

// router.post("/", async (req, res) => {
//   let { title, description, code, price, status, stock, category, thumbnails } =
//     req.body;

//   if (
//     !title ||
//     !description ||
//     !code ||
//     !price ||
//     typeof status !== "boolean" ||
//     !stock ||
//     !category
//   ) {
//     res.setHeader("Content-Type", "application/json"); // q es application
//     return res
//       .status(400)
//       .json({ error: `Todos los campos son requeridos, menos thumbnails` });
//   }

//   try {
//     let newProduct = await producto.addProduct(
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails
//     );

//     res.setHeader("Content-Type", "application/json");
//     return res.status(200).json(newProduct);
//   } catch (error) {
//     res.setHeader("Content-Type", "application/json");
//     console.log(error);
//     return res.status(500).json({
//       error: "Error del servidor",
//     });
//   }
// });

// router.put("/:pid", async (req, res) => {
//   let idUpdateProduct = req.params.pid;
//   let { title, description, code, price, status, stock, category, thumbnails } =
//     req.body;

//   idUpdateProduct = Number(idUpdateProduct);
//   if (isNaN(idUpdateProduct)) {
//     return res.json({ error: "Ingresar id numerico" });
//   }

//   try {
//     if ("id" in req.body) {
//       delete req.body.id;
//     }

//     let updateId = await producto.updateProduct(idUpdateProduct, {
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails,
//     });
//     res.setHeader("Content-Type", "application/json");
//     return res.status(200).json(updateId);
//   } catch (error) {
//     console.log(error);
//     return res.json({ error: "Error desconocido...!!!" });
//   }
// });

// router.delete("/:pid", async (req, res) => {
//   let id = req.params.pid;
//   id = Number(id);
//   if (isNaN(id)) {
//     return res.json({ error: `Ingrese un id numérico!` });
//   }

//   try {
//     let deletedIdProduct = await producto.deleteProduct(id);
//     res.setHeader("Content-Type", "application/json");
//     return res.status(200).json(deletedIdProduct);
//   } catch (error) {
//     console.log(error);
//     return res.json({ error: "Error desconocido." });
//   }
// });
