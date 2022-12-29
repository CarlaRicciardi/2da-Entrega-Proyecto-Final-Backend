import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super('./src/db/carritos.json');
  }
}

export default CarritosDaoArchivo;
