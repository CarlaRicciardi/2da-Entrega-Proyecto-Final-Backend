import express from 'express';
const { Router } = express;
const cartRouter = Router();
import moment from 'moment';

import instancia from '../src/daos/index.js';
const cart = new instancia.carrito();
const product = new instancia.producto();

cartRouter.get('/', async (req, res) => {
  const lista = await cart.getAll('carts');
  res.json(lista);
});

cartRouter.post('/', async (req, res) => {
  try {
    const timestampCart = moment().format('DD / MM / YYYY, h:mm:ss');
    let idCart = await cart.newCart(timestampCart);
    res.json(`Se creo un carrito nuevo con id ${idCart}`);
  } catch {
    res.json('error!');
  }
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
    //console.log(id, id_prod)
    let productAddedCart = await product.getById(id_prod, 'products');
    // console.log(productAddedCart)
    if (
      (await cart.getById(id, 'carts')) == 'No existe el número de id elegido'
    ) {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productAddedCart == 'No existe el número de id elegido') {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      cart.addProductToCart(id, productAddedCart);
      res.json(`Se añadio el producto ${productAddedCart.name} al carrito`);
    }
  } catch {
    res.json('error');
  }
});

cartRouter.delete('/:id', async (req, res) => {
  let { id } = req.params;
  const result = await cart.deleteById(id, 'carts');
  res.json({ carritoEliminado: id });
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;
    let productoCarrito = await product.getById(id_prod, 'products');
    if (
      (await cart.getById(id, 'carts')) == 'No existe el número de id elegido'
    ) {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productoCarrito == 'No existe el número de id elegido') {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      await cart.deleteProductFromCart(id, id_prod);
      res.json(`Se eliminó el producto del carrito`);
    }
  } catch (e) {
    console.log(e);
    res.json('error');
  }
});

export default cartRouter;
