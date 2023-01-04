import { Schema, model } from 'mongoose';
const CarritoSchema = new Schema({
  timestamp: {type: String, required: true, max: 100},
  products: { type: Object },
});
//                              nombre de la coleccion (no de la base de datos!!)
export const modelCart = model('carts', CarritoSchema);
