import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import {modelCart} from '../../models/modelCarritos.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super(modelCart);
  }
}

export default CarritosDaoMongoDB;
