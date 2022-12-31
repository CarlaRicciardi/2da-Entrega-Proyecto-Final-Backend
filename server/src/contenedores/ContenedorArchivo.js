import fs from 'fs';

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const objs = await fs.promises.readFile(this.ruta, 'utf-8');
      if (objs) {
        const allObjects = await JSON.parse(objs);
        return allObjects;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    const objects = await this.getAll();
    const findObject = objects.find((object) => object.id == id);
    if (findObject) {
      return findObject;
    } else {
      return 'object not found';
    }
  }

  async save(timestamp, name, description, cod, img, price, stock) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.ruta));
      let highestId = Math.max(...lista.map((el) => el.id));
      let id = highestid + 1;
      let newProduct = {
        id: id,
        timestamp: timestamp,
        name: name,
        description: description,
        cod: cod,
        img: img,
        price: price,
        stock: stock,
      };
      lista.push(newProduct);
      console.log(lista);
      await fs.promises.writeFile(this.ruta, JSON.stringify(lista));
      return id;
    } catch (error) {
      console.log('Se ha producido un error');
      return 'Se ha producido un error';
    }
  }
  //falta ver esta funcion y agregar timestamp
  async update(num, timestamp, name, description, cod, img, price, stock) {
    try {
      const lista = await JSON.parse(fs.readFileSync(this.ruta));
      const index = lista.findIndex((object) => object.id == num);
      if (lista[index]) {
        const objectUpdated = {
          id: num,
          timestamp: timestamp,
          name: name,
          description: description,
          cod: cod,
          img: img,
          price: price,
          stock: stock,
        };
        lista[index] = objectUpdated;
        await fs.promises.writeFile(this.ruta, JSON.stringify(lista));
        return `Se actualizó el producto ${objectUpdated.name}`;
      } else {
        return 'no existe el numero de id elegido';
      }
    } catch {
      console.log('se ha producido un error');
      return 'se ha producido un error';
    }
  }

  async deleteById(num) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.ruta));
      const index = lista.findIndex((object) => object.id == num);

      if (lista[index]) {
        lista.splice(index, 1);
        await fs.promises.writeFile(this.ruta, JSON.stringify(lista));
        return `Se eliminó con exito`;
      } else {
        return 'No existe el numero de id elegido';
      }
    } catch {
      console.log('Se ha producido un error');
      return 'Se ha producido un error';
    }
  }

  async newCart(timestampCart) {
    try {
      const allCarts = JSON.parse(fs.readFileSync(this.ruta));
      let idCart;
      if (allCarts.length > 0) {
        let highestid = Math.max(...allCarts.map((el) => el.id));
        idCart = highestid + 1;
      } else {
        idCart = 1;
      }

      let newCart = {
        id: idCart,
        timestampCart: timestampCart,
        productos: [],
      };
      allCarts.push(newCart);
      await fs.promises.writeFile(this.ruta, JSON.stringify(allCarts));
      return idCart;
    } catch (error) {
      console.log('Se ha producido un error', error);
      return 'Se ha producido un error';
    }
  }

  async getProductsFromCart(idCart) {
    try {
      const allCarts = JSON.parse(fs.readFileSync(this.ruta));
      const index = allCarts.findIndex((object) => object.id == idCart);
      if (allCarts[index]) {
        return allCarts[index].productos;
      } else {
        return 'No existe el número de id elegido';
      }
    } catch {
      console.log('Se ha producido un error');
      return 'Se ha producido un error';
    }
  }

  async addProductToCart(idCart, product) {
    const allCarts = JSON.parse(fs.readFileSync(this.ruta));
    console.log(allCarts);
    const index = allCarts.findIndex((object) => object.id == idCart);
    console.log(index);
    allCarts[index].productos.push(product);
    await fs.promises.writeFile(this.ruta, JSON.stringify(allCarts));
  }

  async deleteProductFromCart(num, id_prod) {
    const allCarts = JSON.parse(fs.readFileSync(this.ruta));
    const index = allCarts.findIndex((object) => object.id == num);
    const indexProduct = allCarts[index].products.findIndex(
      (object) => object.id == id_prod
    );
    allCarts[index].products.splice(indexProduct, 1);
    await fs.promises.writeFile(this.ruta, JSON.stringify(allCarts));
  }
}

export default ContenedorArchivo;
