import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super('./server/src/db/productos.json');
  }
}

export default ProductosDaoArchivo;
