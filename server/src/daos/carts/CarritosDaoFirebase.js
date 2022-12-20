import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('src/db/productos.json');
  }
}

export default CarritosDaoFirebase;
