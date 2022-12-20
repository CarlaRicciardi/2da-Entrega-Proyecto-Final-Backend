import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super('src/db/productos.json');
  }
}

export default ProductosDaoMongoDB;
