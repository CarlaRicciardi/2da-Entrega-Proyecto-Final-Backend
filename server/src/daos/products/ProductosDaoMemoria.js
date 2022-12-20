import ContenedorMemoria from '../../contenedores/ContenedorMemoria';

class ProductosDaoMemoria extends ContenedorMemoria {
  constructor() {
    super('src/db/productos.json');
  }
}

export default ProductosDaoMemoria;

