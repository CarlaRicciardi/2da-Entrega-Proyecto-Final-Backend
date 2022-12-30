import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super('./server/src/db/carritos.json');
  }
}

export default CarritosDaoArchivo;
