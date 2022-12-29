import express from 'express';
const { Router } = express;
const cartRouter = Router();

import instancia from '../src/daos/index.js';
const cart = new instancia.carrito();


cartRouter.post('/', async (req, res) => {
  const { name, description, cod, img, price, stock, id } = req.body;
  let newCart = await cart.createCart({
    name,
    description,
    cod,
    img,
    price,
    stock,
    id,
  });
  res.json({ idNewCart: newCart });
});

cartRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await cart.deleteCartById(id);
  res.json({ carritoEliminado: id });
});

cartRouter.get('/:id/productos', async (req, res) => {
  const { id } = req.params;
  let productsList = await cart.getAllCart(id);
  productsList
    ? res.json({ productos: productsList })
    : res.json({ error: 'cart not found' });
});

cartRouter.post('/:id/productos', async (req, res) => {
  const { id } = req.params;
  let { id: productId } = req.body;
  const newProduct = await product.getById(productId);
  await cart.addCartbyId(id, newProduct);
});

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id } = req.params;
  const { id_prod } = req.params;
  let deleteCart = await cart.deleteProdCart(id, id_prod);
  deleteCart
    ? res.json({ productos: productsList })
    : res.json({ error: 'cart not found' });
});

export default cartRouter;
