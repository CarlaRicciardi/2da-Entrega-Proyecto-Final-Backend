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

  async saveObject(newObject) {
    try {
      const objects = await this.getAll();
      let id;

      if (!objects || !objects.length) {
        id = 1;
      } else {
        objects.forEach((obj) => {
          id = obj.id;
        });
        id = id + 1;
      }

      const save =
        objects && objects.length
          ? [...objects, { ...newObject, id }]
          : [{ ...newObject, id }];
      await fs.promises.writeFile(this.ruta, JSON.stringify(save), {
        encoding: 'utf-8',
      });
      return 'Saved succesfully!';
    } catch (error) {
      return { error };
    }
  }

  async updateObject(object) {
    try {
      const objects = await this.getAll();
      const object = await this.getById(object.id);

      if (object) {
        const objectUpdated = [...objects, object];
        await fs.promises.writeFile(this.ruta, JSON.stringify(objectUpdated), {
          encoding: 'utf-8',
        });
        return 'Object Updated succesfully';
      } else {
        throw new Error('object not find');
      }
    } catch (error) {
      return { error };
    }
  }

  async deleteObject(id) {
    try {
      const objects = await this.getAll();
      const object = await this.getById(id);

      if (!objects || !objects.length || !object) {
        return { error: 'object not find!' };
      } else {
        const newObjects = objects.filter((obj) => obj.id != object.id);
        console.log(newObjects);
        await fs.promises.writeFile(this.ruta, JSON.stringify(newObjects), {
          encoding: 'utf-8',
        });
        return 'object deleted succesfully';
      }
    } catch (error) {
      return { error };
    }
  }

  async deleteAll() {
    await fs.writeFileSync(this.file, '[]');
    return 'Se han eliminado todos los productos';
  }

  async newCart() {
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
