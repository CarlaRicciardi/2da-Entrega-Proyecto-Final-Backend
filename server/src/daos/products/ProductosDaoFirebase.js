import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('src/db/productos.json');
  }
}

export default ProductosDaoFirebase;
