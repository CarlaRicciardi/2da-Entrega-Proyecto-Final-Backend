import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';

class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('products'); //nombre coleccion
  }
}

export default ProductosDaoFirebase;
