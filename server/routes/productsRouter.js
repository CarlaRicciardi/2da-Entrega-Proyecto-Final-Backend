import express from 'express';
const { Router } = express;
const productsRouter = Router();
import moment from 'moment';

import instancia from '../src/daos/index.js';
const products = new instancia.producto();

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

productsRouter.get('/', async (req, res) => {
  const productsList = await products.getAll('products');
  res.json(productsList);
});

// GET '/api/productos' -> muestra todos los productos o o devuelve un producto segun id.
productsRouter.get('/:id?', async (req, res) => {
  const { id } = req.params;
  if (id) {
    const productsList = await products.getById(id, 'products');
    res.json({ products: productsList });
  } else {
    const productsList = await products.getAll('products');
    res.json({ productsList });
  }
});

// POST '/api/productos' -> incorpora productos al listado (solo admins)
productsRouter.post('/', middlewareAdmin, async (req, res) => {
  const { body } = req;
  console.log(body);
  const timestamp = moment().format('DD / MM / YYYY, h:mm:ss');
  try {
    let addProduct = await products.save(
      timestamp,
      body.name,
      body.description,
      body.cod,
      body.img,
      body.price,
      body.stock,
    );
    res.json({ success: true, addProduct });
  } catch {
    res.json({ error: true, msg: 'No se pudo guardar el producto' });
  }
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id. (solo admins)
productsRouter.put('/:id', middlewareAdmin, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { body } = req;
  console.log(body);
  const timestamp = moment().format('DD / MM / YYYY, h:mm:ss');
  try {
    let updateProduct = await products.update(
      id,
      timestamp,
      body.name,
      body.description,
      body.cod,
      body.img,
      body.price,
      body.stock
    );
    res.json({ updated: updateProduct });
  } catch (e) {
    console.log(e);
    res.json({ error: true });
  }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id. (solo admins)
productsRouter.delete('/:id', middlewareAdmin, async (req, res) => {
  let { id } = req.params;
  try {
    const result = await products.deleteById(id, 'products');
    res.json(result);
  } catch (e) {
    res.json({ error: true, msg: 'producto no encontrado' });
  }
});

export default productsRouter;
