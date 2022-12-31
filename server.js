import express from 'express';
import { connect } from 'mongoose';
const app = express();
const PORT = process.env.PORT || 8080;

import productsRouter from './server/routes/productsRouter.js';
app.use('/api/productos', productsRouter);

import cartRouter from './server/routes/cartRouter.js';
app.use('/api/carrito', cartRouter);

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('/public'));

app.get('/', (req, res) => {
  res.send('Bienvenidos! Ingresar la ruta correcta');
});

app.get('/*', (req, res) => {
  res.json({ error: true, description: 'ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Server activo, escuchando en puerto http://localhost:${PORT}`);
});
