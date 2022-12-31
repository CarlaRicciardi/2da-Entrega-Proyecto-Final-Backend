import { Schema, model } from 'mongoose';
const ProductoSchema = new Schema({
  timestamp: {type: String, require: true, max: 100},
  name: { type: String, require: true, max: 55 },
  description: { type: String, require: true, max: 100 },
  cod: { type: Number, require: true, max: 10 },
  img: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
});

export const modelProduct = model('products', ProductoSchema);
