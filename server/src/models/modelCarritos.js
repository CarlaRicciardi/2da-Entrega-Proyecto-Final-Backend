import { Schema, model } from 'mongoose';
const CarritoSchema = new Schema({
  products: { type: [] },
  timestamp: { type: String },
});

export const modelCart = model('cart', CarritoSchema);
