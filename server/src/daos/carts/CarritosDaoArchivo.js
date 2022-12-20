import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super('src/db/productos.json');
  }
}

export default CarritosDaoArchivo;
