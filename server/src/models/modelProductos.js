import { Schema, model } from 'mongoose';
const ProductoSchema = new Schema({
  name: { type: String, require: true, max: 55 },
  timestamp: { type: String, require: true, max: 45 },
  description: { type: String, require: true, max: 100 },
  cod: { type: String, require: true, max: 10 },
  img: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
});

export const modelProduct = model('product', ProductoSchema);
