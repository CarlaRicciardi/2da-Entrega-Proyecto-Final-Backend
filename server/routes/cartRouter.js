import express from 'express';
const { Router } = express;
const cartRouter = Router();

import instancia from '../src/daos/index.js';
const cart = new instancia.carrito();
const product = new instancia.producto();

cartRouter.get('/', async (req, res) => {
  const lista = await cart.getAll('carts');
  res.json(lista);
});

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
    let productAddedCart = await product.getById(id_prod, 'products');
    if ((await cart.getById(id, 'carts')) == 'object not found') {
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
  const result = await cart.deleteObject(id, 'carts');
  res.json({ carritoEliminado: id });
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;
    let productoCarrito = await product.getById(id_prod, 'products');
    if ((await cart.getById(id, 'carts')) == 'no existe el id elegido') {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productoCarrito == 'no existe el id elegido') {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      await cart.deleteProductFromCart(id, id_prod);
      res.json(`Se eliminó el producto del carrito`);
    }
  } catch {
    res.json('error');
  }
});

export default cartRouter;
