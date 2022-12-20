import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;

import productsRouter from './server/routes/productsRouter';
import cartRouter from './server/routes/cart';

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/client'));

//routes
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

const cors = require('cors');
app.use(cors({ origin: '*' }));

app.get('/*', (req, res) => {
  res.json({ error: true, descripcion: 'ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Server activo, escuchando en puerto http://localhost:${PORT}`);
});
