import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super('src/db/productos.json');
  }
}

export default ProductosDaoMemoria;

