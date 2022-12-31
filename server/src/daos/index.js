import ProductosDaoArchivo from './products/ProductosDaoArchivo.js';
import ProductosDaoFirebase from './products/ProductosDaoFirebase.js';
import ProductosDaoMemoria from './products/ProductosDaoMemoria.js';
import ProductosDaoMongoDB from './products/ProductosDaoMongoDB.js';
import CarritosDaoArchivo from './carts/CarritosDaoArchivo.js';
import CarritosDaoFirebase from './carts/CarritosDaoFirebase.js';
import CarritosDaoMemoria from './carts/CarritosDaoMemoria.js';
import CarritosDaoMongoDB from './carts/CarritosDaoMongoDB.js';


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

// async function connectMG() {
//   try {
//     await connect(
//       'mongodb+srv://carlaRicciardi:mongoatlas123@cluster0.tdnzcdj.mongodb.net/?retryWrites=true&w=majority',
//       { useNewUrlParser: true }
//     );
//   } catch (e) {
//     console.log(e);
//     throw 'can not connect to the db';
//   }
// }
// if (instancia[0].id == 'mongoDB') {
//   await connectMG();
// }

export default result;
