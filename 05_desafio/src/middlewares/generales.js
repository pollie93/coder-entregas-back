//estructura de middleware
export const middleware1 = (req, res, next) => {
  console.log(`Pasó x middleware 1 - url: ${req.url} - método: ${req.method}`);

  next();
};

// next() indica al middlewar que termino la operacion, y siga

export const middleware2 = (req, res, next) => {
  console.log(`Pasó x middleware 2`);
  next();
};

export const middleware3 = (req, res, next) => {
  console.log(`Pasó x middleware 3`);

  next();
};

//aca coloco script de pruebas, pero cada middlewar tiene script particulares
