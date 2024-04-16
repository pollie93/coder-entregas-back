// aca comienzo a escribir scrip que maneja el front

// liberia a usar de sweet alert (devuelve promesa)
Swal.fire({
  title: "Identifíquese",
  input: "text",
  text: "Ingrese su nikname",
  inputValidator: (value) => {
    return !value && "Debe ingresar su nombre";
  },
  allowOutsideClick: false,
}).then((datos) => {
  let nombre = datos.value;
  document.title = nombre;

  let inputMensaje = document.getElementById("mensaje");
  let divMensajes = document.getElementById("mensajes");
  inputMensaje.focus();
  // va dentro del then xq si no tengo los datos, no es correcto que se ejecuten
  // nos conectamos dentro del socket
  const socket = io();
  // Nos identificamos
  socket.emit("id", nombre);

  socket.on("nuevoUsuario", (nombre) => {
    Swal.fire({
      text: `${nombre} se ha conectado!`,
      toast: true,
      position: "top-right",
    });
  });

  socket.on("mensajesPrevios", (mensajes) => {
    mensajes.array.forEach((mss) => {
      divMensajes.innerHTML += `<span class="mensaje"><strong>${mss.nombre}</strong> dice <i>${mss.mensaje}</i></span><br>`;
      divMensajes.scrollTop = divMensajes.scrollHeight;
    });
  });

  socket.on("saleUsuario", (nombre) => {
    divMensajes.innerHTML += `<span class="mensaje"><strong>${nombre}</strong> se fue del chat.</span><br>`;
  });
  inputMensaje.addEventListener("keyup", (e) => {
    e.preventDefault();
    //console.log(e, e.target.value)
    if (e.code === "Enter" && e.target.value.trim().length > 0) {
      socket.emit("mensaje", nombre, e.target.value.trim());
      e.target.value = "";
      e.target.focus();
    }
  });

  socket.on("nuevoMensaje", (nombre, mensaje) => {
    divMensajes.innerHTML += `<span class="mensaje"><strong>${nombre}</strong> dice: <i>${mensaje}</i></span><br>`;
    divMensajes.scrollTop = divMensajes.scrollHeight;
  });
});
