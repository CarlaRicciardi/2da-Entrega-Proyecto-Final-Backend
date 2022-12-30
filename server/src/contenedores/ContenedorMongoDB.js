import mongoose from 'mongoose';
import { connect } from 'mongoose';
import { modelCart } from '../models/modelCarritos.js';
import { modelProduct } from '../models/modelProductos.js';

async function connectMG() {
  try {
    await connect(
      'mongodb+srv://carlaRicciardi:mongoatlas123@cluster0.tdnzcdj.mongodb.net/?retryWrites=true&w=majority',
      { useNewUrlParser: true }
    );
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

await connectMG();

function validacionId(array, id) {
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class ContenedorMongoDB {
  constructor(name, schema) {
    this.schema = mongoose.model(name, schema);
  }

  async getAll() {
    const result = await this.schema.find({});
    return result;
  }

  async getById(id) {
    const lista = await this.schema.find({});
    const validacion = validacionId(lista, num);
    if (validacion) {
      let result = await this.schema.find({ _id: id });
      result = result[0];
      return result;
    } else {
      return 'no existe el numero de id elegido';
    }
  }

  async saveObject(name, description, cod, img, price, stock) {
    try {
      const newProduct = new modelProduct({
        name: name,
        description: description,
        cod: cod,
        img: img,
        price: price,
        stock: stock,
      });
      await newProduct.save();
      const aux = await modelProduct.find({ name: name });
      const id = aux[0]._id;
      return id;
    } catch {
      console.log('error!');
      return 'se ha producido un error';
    }
  }

  async updateObject(id, name, description, cod, img, price, stock) {
    const lista = await modelProduct.find({});
    const validacion = validacionId(lista, id);
    if (validacion) {
      await modelProduct.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            name: name,
            description: description,
            cod: cod,
            img: img,
            price: price,
            stock: stock,
          },
        }
      );
      const aux = await modelProduct.find({ _id: id });
      return `Se actualizo el producto ${aux[0].name}`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }

  async deleteObject(id) {
    const lista = await this.schema.find({});
    const validacion = validacionId(lista, id);
    if (validacion) {
      await this.schema.deleteOne({ _id: id });
      return `Se elimino con exito`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }
  //vos agregas eltimestamp como parametro.. que pongo si no lo tengo?
  async newCart(timestamp) {
    try {
      const newCart = new modelCart({
        productos: [],
      });
      await newCart.save();
      const aux = await modelCart.find({ timestamp: timestamp });
      const id = aux[0]._id;
      return id;
    } catch {
      console.log('se ha producido un error');
      return 'se ha producido un error';
    }
  }

  async getProductsFromCart(idCart) {
    const lista = await this.schema.find({});
    const index = lista.findIndex((object) => object.id == id);
    return lista[index].productos;
  }

  async addProductToCart(id, product) {
    const lista = await this.schema.find({});
    const index = lista.findIndex((object) => object.id == num);
    lista[index].productos.push(product);
    await this.schema.updateOne(
      { _id: id },
      {
        $set: {
          productos: lista[index].productos,
        },
      }
    );
  }

  async deleteProductFromCart(id, id_prod) {
    const lista = await this.schema.find({});
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex(
      (object) => object.id == id_prod
    );
    lista[index].productos.splice(indexProduct, 1);
    await this.schema.updateOne(
      { _id: id },
      {
        $set: {
          productos: lista[index].productos,
        },
      }
    );
  }
}

export default ContenedorMongoDB;
