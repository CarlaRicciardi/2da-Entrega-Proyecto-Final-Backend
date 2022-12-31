import { Schema, model } from 'mongoose';
const CarritoSchema = new Schema({
  timestamp: {type: String, required: true, max: 100},
  products: { type: Object },
});

export const modelCart = model('carts', CarritoSchema);
