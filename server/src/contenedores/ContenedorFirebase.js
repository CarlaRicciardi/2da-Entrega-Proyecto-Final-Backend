import admin from 'firebase-admin';

import serviceAccount from '../../../privi.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

import { getFirestore } from 'firebase-admin/firestore';
const db = getFirestore();

function validacionId(array, id) {
  array = array.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class ContenedorFirebase {
  constructor(collectionName) {
    this.collection = db.collection(collectionName);
  }

  async getAll() {
    const result = await this.collection.get();
    let arrayRes = result.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
    return arrayRes;
  }

  async getById(num) {
    const lista = await this.collection.get();
    const validacion = validacionId(lista, num);
    if (validacion) {
      let result = await this.collection.doc(num).get();
      return result.data();
    } else {
      return 'no existe el numero de id elegido';
    }
  }

  async saveObject(name, description, cod, img, price, stock) {
    try {
      let result;
      result = await this.collection.add({
        name: name,
        description: description,
        cod: cod,
        img: img,
        price: price,
        stock: stock,
      });
      return result.id;
    } catch {
      console.log('error!');
      return 'se ha producido un error';
    }
  }

  async updateObject(num, name, description, cod, img, price, stock) {
    const lista = await this.collection.get();
    const validacion = validacionId(lista, id);
    if (validacion) {
      await this.collection.doc(num).update({
        name: name,
        description: description,
        cod: cod,
        img: img,
        price: price,
        stock: stock,
      });
      return `Se actualizo el producto `;
    } else {
      return 'no existe el numero de id elegido';
    }
  }

  async deleteObject(num) {
    const lista = await this.collection.get();
    const validacion = validacionId(lista, id);
    if (validacion) {
      await this.collection.doc(num).delete();
      return `Se elimino con exito`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }
  async newCart() {
    try {
      let res;
      res = await this.coleccion.add({
        productos: [],
      });
      return res.id;
    } catch {
      console.log('Se ha producido un error');
      return 'Se ha producido un error';
    }
  }

  async getProductsFromCart(idCart) {
    let result = await this.coleccion.doc(idCart).get();
    result = result.data();
    return result.productos;
  }

  async addProductToCart(num, product, id_prod) {
    let result = await this.coleccion.doc(num).get();
    result = result.data();
    product['id'] = id_prod;
    result.productos.push(product);
    await this.coleccion.doc(num).update({
      productos: result.productos,
    });
  }
  async deleteProductFromCart(num, id_prod) {
    let result = await this.coleccion.doc(num).get();
    result = result.data();
    const indexProduct = result.productos.findIndex(
      (object) => object.id == id_prod
    );
    result.productos.splice(indexProduct, 1);
    await this.coleccion.doc(num).update({
      productos: result.productos,
    });
  }
}

export default ContenedorFirebase;
