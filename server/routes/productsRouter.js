import express from 'express';
const { Router } = express;
const productsRouter = Router();

// const Container = require('../classContenedor');
// const products = new Container('./data/products.json');

import result from '../src/daos/index.js';
const producto = new result.producto();

//middleware
let isAdmin = true;

const middlewareAdmin = (req, res, next) => {
  if (isAdmin) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: true, descripcion: 'Solo para usuarios administradores' });
  }
};

// GET '/api/productos' -> muestra todos los productos o o devuelve un producto segun id.
productsRouter.get('/:id?', async (req, res) => {
  const { id } = req.params;
  if (id) {
    const productsList = await products.getById(id);
    res.json({ products: productsList });
  } else {
    const productsList = await products.getAll();
    res.json({ productsList });
  }
});

// productsRouter.use(middlewareAdmin);

// POST '/api/productos' -> incorpora productos al listado (solo admins)
productsRouter.post('/', middlewareAdmin, async (req, res) => {
  const { name, description, cod, img, price, stock } = req.body;
  try {
    let addProduct = await products.save({
      name,
      timestamp: Date.now(),
      description,
      cod,
      img,
      price,
      stock,
    });
    res.json({ success: true, addProduct });
  } catch {
    res.json({ error: true, msg: 'No se pudo guardar el producto' });
  }
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id. (solo admins)
productsRouter.put('/:id', middlewareAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, cod, img, price, stock } = req.body;
  try {
    let updateProduct = await products.update(
      id,
      name,
      description,
      cod,
      img,
      price,
      stock
    );
    res.json({ updated: updateProduct });
  } catch (e) {
    console.log(e);
    res.json({ error: true });
  }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id. (solo admins)
productsRouter.delete('/:id', middlewareAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await products.deleteById(id);
    res.json({ success: true });
  } catch (e) {
    res.json({ error: true, msg: 'producto no encontrado' });
  }
});

export default productsRouter;
