import fs from 'fs';

class ContenedorArchivo {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async getAll() {
    try {
      const lista = fs.readFileSync(this.ruta);
      return JSON.parse(lista);
    } catch {
      console.log('getAll Error');
      return 'getAll Error';
    }
  }

  async getById(num) {
    try {
      const lista = await this.getAll();
      const index = lista.findIndex((object) => object.id == num);
      if (lista[index]) {
        return lista[index];
      } else {
        return 'No existe el número de id elegido';
      }
    } catch {
      console.log('(getById Error) Se ha producido un error');
      return '(getById Error) Se ha producido un error';
    }
  }

  async save(timestamp, name, description, cod, img, price, stock) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.ruta));
      let highestId = Math.max(...lista.map((el) => el.id));
      let id = highestId + 1;
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
        return 'No existe el número de id elegido';
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
        return 'No existe el número de id elegido';
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
    const lista = JSON.parse(fs.readFileSync(this.ruta));
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex(
      (object) => object.id == id_prod
    );
    lista[index].productos.splice(indexProduct, 1)
    await fs.promises.writeFile(this.ruta, JSON.stringify(lista))
  }
}

export default ContenedorArchivo;
