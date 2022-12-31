import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('carts');
  }
}

export default CarritosDaoFirebase;
