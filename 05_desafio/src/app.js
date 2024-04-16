import express from "express";
import { Server } from "socket.io";
import { router as productsRouter } from "./routes/productsRouter.js";
import { router as cartsRouter } from "./routes/cartsRouter.js";
import { router as viewsRouter } from "./routes/viewsRouter.js";
import { engine } from "express-handlebars";

const port = 8080;
const app = express();

// INSTRUCCIONES PARA QUE EXPRESS MANEJE COMO JSON LOS DATOS QUE LLEGAN REQUEST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Muestro todo lo que tengo dentro de PUBLIC
app.use(express.static("./src/public"));

//////////////////////////////////////////////////////////

// Uso handlebars (Configuracion)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
//////////////////////////////////////////////////////////

// GENERO RUTAS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/handlebars", viewsRouter);
//////////////////////////////////////////////////////////

// guardo los usuarios que se van conectando
let usuarios = [];
let mensajes = [];

// Escucho el server http
const serverHttp = app.listen(port, () => {
  console.log(`Start server port ${port}`);
});

// Escucho server (Websockets) -- coexisten ambos server
const io = new Server(serverHttp);

//////////////////////////////////////////////////////////
// * Genero escuchas de este server websocket
// Back detecta la conexion, si se detecta la conexion, la llamo (socket)
io.on("connection", (socket) => {
  console.log(`Se conecta cliente con id ${socket.id}`);

  // aca saludo al nombre que se identifica desde el front
  socket.on("id", (nombre) => {
    usuarios.push({ id: socket.id, nombre });
    socket.emit("mensajesPrevios", mensajes);
    socket.broadcast.emit(`Bienvenido ${nombre}`);
  });

  // Hago nuevamente escucha
  socket.on("mensaje", (nombre, mensaje) => {
    mensajes.push({ nombre, mensaje });
    //Envio Mensaje a Todos (mando lo que recibi)
    io.emit("nuevoMensaje", nombre, mensaje);
  });

  // Desconexion
  socket.on("disconnect", () => {
    let usuario = usuarios.find((u) => u.id == socket.id);
    if (usuario) {
      io.emit("saleUsuario", usuario.nombre);
    }
  });
});
