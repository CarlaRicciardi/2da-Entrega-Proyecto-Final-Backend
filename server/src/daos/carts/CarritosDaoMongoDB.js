import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super('src/db/productos.json');
  }
}

export default CarritosDaoMongoDB;
