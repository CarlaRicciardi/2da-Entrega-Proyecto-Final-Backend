import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import {modelProduct} from '../../models/modelProductos.js';

class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(modelProduct);
  }
}

export default ProductosDaoMongoDB;
