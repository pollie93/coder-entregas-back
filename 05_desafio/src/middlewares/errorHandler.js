// Para el manejo de errores del middleware se agrega el arg error
export const errorHandler = (error, req, res, next) => {
  if (error) {
    console.log(error);

    res.setHeader("Content-Type", "application/json");
    return res.status(500).json({
      error: "Error inesperado en el servidor",
    });
  }

  next();
};
