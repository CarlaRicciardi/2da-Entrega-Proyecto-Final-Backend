import { Schema, model } from 'mongoose';
const CarritoSchema = new Schema({
  products: { type: Object },
});

export const modelCart = model('carts', CarritoSchema);
