import ProductosDaoArchivo from './productos/ProductosDaoArchivo.js';
import ProductosDaoFirebase from './productos/ProductosDaoFirebase.js';
import ProductosDaoMemoria from './productos/ProductosDaoMemoria.js';
import ProductosDaoMongoDB from './productos/ProductosDaoMongoDB.js';
import CarritosDaoArchivo from './carritos/CarritosDaoArchivo.js';
import CarritosDaoFirebase from './carritos/CarritosDaoFirebase.js';
import CarritosDaoMemoria from './carritos/CarritosDaoMemoria.js';
import CarritosDaoMongoDB from './carritos/CarritosDaoMongoDB.js';

import { config } from 'dotenv';
config();

const instancias = [
  {
    nombreInstancia: ProductosDaoArchivo,
    id: 'archivo',
    description: 'producto',
  },
  {
    nombreInstancia: CarritosDaoArchivo,
    id: 'archivo',
    description: 'carrito',
  },

  {
    nombreInstancia: ProductosDaoFirebase,
    id: 'firebase',
    description: 'producto',
  },
  {
    nombreInstancia: CarritosDaoFirebase,
    id: 'firebase',
    description: 'carrito',
  },

  {
    nombreInstancia: ProductosDaoMemoria,
    id: 'memoria',
    description: 'producto',
  },
  {
    nombreInstancia: CarritosDaoMemoria,
    id: 'memoria',
    description: 'carrito',
  },

  {
    nombreInstancia: ProductosDaoMongoDB,
    id: 'mongoDB',
    description: 'producto',
  },
  {
    nombreInstancia: CarritosDaoMongoDB,
    id: 'mongoDB',
    description: 'carrito',
  },
];

const instancia = instancias.filter((i) => i.id == process.env.INSTANCIA);

const result = {
  [instancia[0].description]: instancia[0].nombreInstancia,
  [instancia[1].description]: instancia[1].nombreInstancia,
};

export default result;
