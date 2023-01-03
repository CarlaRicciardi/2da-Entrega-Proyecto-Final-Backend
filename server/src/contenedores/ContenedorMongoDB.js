import mongoose from 'mongoose';
import { connect } from 'mongoose';
import { modelCart } from '../models/modelCarritos.js';
import { modelProduct } from '../models/modelProductos.js';

async function connectMG() {
  try {
    await connect(
      'mongodb+srv://carlaRicciardi:mongoatlas123@cluster0.uzjmdzn.mongodb.net/?retryWrites=true&w=majority',
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
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    const result = await this.model.find({});
    console.log("result:", result);
    return result;
  }

  async getById(num) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, num);
    if (validacion) {
      let result = await this.model.find({ _id: num });
      result = result[0];
      return result;
    } else {
      return 'no existe el numero de id elegido';
    }
  }

  async save(timestamp, name, description, cod, img, price, stock) {
    try {
      const newProduct = new modelProduct({
        timestamp: timestamp,
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

  async update(id, timestamp, name, description, cod, img, price, stock) {
    const lista = await modelProduct.find({});
    const validacion = validacionId(lista, id);
    if (validacion) {
      await modelProduct.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            timestamp: timestamp,
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

  async deleteById(id) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, id);
    if (validacion) {
      await this.model.deleteOne({ _id: id });
      return `Se elimino con exito`;
    } else {
      return 'no existe el numero de id elegido';
    }
  }
  //vos agregas eltimestamp como parametro.. que pongo si no lo tengo?
  async newCart(timestamp) {
    try {
      const newCart = new modelCart({
        timestamp: timestamp,
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
    const lista = await this.model.find({});
    const index = lista.findIndex((object) => object.id == idCart);
    return lista[index].productos;
  }

  async addProductToCart(id, product) {
    const lista = await this.model.find({});
    console.log(lista);
    const index = lista.findIndex((object) => object.id == num);
    lista[index].productos.push(product);
    await this.model.updateOne(
      { _id: id },
      {
        $set: {
          productos: lista[index].productos,
        },
      }
    );
  }

  async deleteProductFromCart(id, id_prod) {
    const lista = await this.model.find({});
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex(
      (object) => object.id == id_prod
    );
    lista[index].productos.splice(indexProduct, 1);
    await this.model.updateOne(
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
