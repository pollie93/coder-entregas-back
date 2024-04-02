import express from "express";
import { router as productsRouter } from "./routes/productsRouter.js";
import { router as cartsRouter } from "./routes/cartsRouter.js";

const port = 8080;
const app = express();

// INSTRUCCIONES PARA QUE EXPRESS MANEJE COMO JSON LOS DATOS QUE LLEGAN REQUEST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GENERO RUTAS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Escucho el server

app.listen(port, () => {
  console.log(`Start server port ${port}`);
});
