import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { modelCart } from '../../models/modelCarritos.js';

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: 'carts', //nombre coleccion
      schema: modelCart.CarritoSchema
    });
  }
}

export default CarritosDaoMongoDB;
