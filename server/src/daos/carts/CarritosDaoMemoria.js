import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';

class CarritosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super('src/db/productos.json');
  }
}

export default CarritosDaoMemoria;
