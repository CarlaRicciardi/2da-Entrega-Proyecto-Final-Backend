import express from 'express';
const { Router } = express;
const cartRouter = Router();

import instancia from '../src/daos/index.js';
const cart = new instancia.carrito();
const product = new instancia.producto();

cartRouter.post('/', async (req, res) => {
  let idCart = await cart.newCart();
  res.json(`Se creo un carrito nuevo con id ${idCart}`);
});

cartRouter.get('/:id/productos', async (req, res) => {
  const { id } = req.params;
  const allProductsFromCart = await cart.getProductsFromCart(id);
  res.json(allProductsFromCart);
});

cartRouter.post('/:id/productos/:id_prod', async (req, res) => {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;
    let productAddedCart = await product.getById(id_prod);
    if ((await cart.getById(id)) == 'object not found') {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productAddedCart == 'object not found') {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      cart.addProductToCart(id, productAddedCart);
      res.json(`Se añadio el producto ${productAddedCart.name} al carrito`);
    }
  } catch (error) {
    res.json('error');
  }
});

cartRouter.delete('/:id', async (req, res) => {
  let { id } = req.params;
  const result = await cart.deleteObject(id);
  res.json({ carritoEliminado: id });
});
//PROBARLO!!!!
cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;
    let productoCarrito = await product.getById(id_prod, 'productos');
    if (
      (await cart.getById(id, 'carritos')) ==
      'No existe el número de id elegido'
    ) {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productoCarrito == 'No existe el número de id elegido') {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      await cart.deleteProductFromCart(id, id_prod);
      res.json(`Se eliminó el producto del carrito`);
    }
  } catch {
    res.json('error');
  }
});

// cartRouter.get('/:id/productos', async (req, res) => {
//   const { id } = req.params;
//   let productsList = await cart.getAllCart(id);
//   productsList
//     ? res.json({ productos: productsList })
//     : res.json({ error: 'cart not found' });
// });

// cartRouter.post('/:id/productos', async (req, res) => {
//   const { id } = req.params;
//   let { id: productId } = req.body;
//   const newProduct = await product.getById(productId);
//   await cart.addCartbyId(id, newProduct);
// });

export default cartRouter;
