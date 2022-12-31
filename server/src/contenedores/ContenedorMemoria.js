class ContenedorMemoria {
  constructor() {
    this.productsList = [
      {
        id: 1,
        name: 'manzana',
        despcription: 'verde',
        cod: 123,
        img: 'xxx',
        price: 50,
        stock: 100,
      },
      {
        id: 2,
        name: 'pera',
        despcription: 'verde',
        cod: 124,
        img: 'xxx',
        price: 80,
        stock: 70,
      },
    ];
    this.cartsList = [
      {
        id: 1,
        productos: [
          {
            id: 1,
            name: 'holaaa',
            description: 'xxx',
            cod: 3245,
            img: 'xx',
            price: 2000,
            stock: 10,
          },
          {
            id: 2,
            name: 'yyy',
            description: 'yyy',
            cod: 3223,
            img: 'yyy',
            price: 1000,
            stock: 15,
          },
        ],
      },
    ];
  }

  getAll(list) {
    if (list == 'products') {
      return this.productsList;
    } else if (list == 'carts') {
      return this.cartsList;
    } else {
      ('no existe la lista');
    }
  }

  getById(id, list) {
    try {
      let lista;
      if (list == 'products') {
        lista = this.productsList;
      } else if (list == 'carts') {
        lista = this.cartsList;
      } else {
        return 'no existe la lista';
      }
      const index = lista.findIndex((object) => object.id == id);
      if (lista[index]) {
        return lista[index];
      } else {
        return 'no existe el id elegido';
      }
    } catch (e) {
      console.log('error!');
      return 'se ha producido un error';
    }
  }

  saveObject(name, description, cod, img, price, stock) {
    try {
      const lista = this.productsList;
      let highestid = Math.max(...lista.map((el) => el.id));
      let id = highestid + 1;
      let newProduct = {
        id: id,
        name: name,
        description: description,
        cod: cod,
        img: img,
        price: price,
        stock: stock,
      };
      this.productsList.push(newProduct);
      return id;
    } catch {
      console.log('error!');
      return 'se ha producido un error';
    }
  }

  updateObject(id, name, description, cod, img, price, stock) {
    try {
      const lista = this.productsList;
      const index = lista.findIndex((object) => object.id == id);
      if (lista[index]) {
        const newProduct = {
          id: id,
          name: name,
          description: description,
          cod: cod,
          img: img,
          price: price,
          stock: stock,
        };
        this.productsList[index] = newProduct;
        return `Se actualizo el producto ${newProduct.name}`;
      } else {
        return 'no existe el numero de id elegido';
      }
    } catch {
      console.log('error!!');
      return 'se ha producido un error';
    }
  }

  deleteObject(id, list) {
    try {
      let lista;
      if (list == 'products') {
        lista = this.productsList;
      } else if (list == 'carts') {
        lista = this.cartsList;
      } else {
        return 'no existe la lista';
      }
      const index = lista.findIndex((object) => object.id == id);
      if (lista[index]) {
        if (list == 'products') {
          this.productsList.splice(index, 1);
          return `Se eliminó con exito`;
        } else if (list == 'carts') {
          this.cartsList.splice(index, 1);
          return `Se eliminó con exito`;
        }
      } else {
        return 'No existe el número de id elegido';
      }
    } catch {
      console.log('error!');
      return 'se ha producido un error';
    }
  }

  async newCart() {
    try {
      const lista = this.cartsList;
      let idCart;
      if (lista.length > 0) {
        let highestid = Math.max(...lista.map((el) => el.id));
        idCart = highestid + 1;
      } else {
        idCart = 1;
      }

      let newCart = {
        id: idCart,
        productos: [],
      };
      this.cartsList.push(newCart);
      return idCart;
    } catch (error) {
      console.log('Se ha producido un error');
      return 'Se ha producido un error';
    }
  }

  async getProductsFromCart(idCart) {
    try {
      const lista = this.cartsList;
      const index = lista.findIndex((object) => object.id == idCart);
      if (lista[index]) {
        return lista[index].productos;
      } else {
        return 'No existe el número de id elegido';
      }
    } catch {
      console.log('Se ha producido un error');
      return 'Se ha producido un error';
    }
  }

  async addProductToCart(idCart, product) {
    const lista = this.cartsList;
    const index = lista.findIndex((object) => object.id == idCart);
    lista[index].productos.push(product);
  }

  async deleteProductFromCart(num, id_prod) {
    const lista = this.cartsList;
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex(
      (object) => object.id == id_prod
    );
    lista[index].productos.splice(indexProduct, 1);
  }
}

export default ContenedorMemoria;
