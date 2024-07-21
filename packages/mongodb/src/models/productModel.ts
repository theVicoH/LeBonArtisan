import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  warrantyYears: number;
  available: boolean;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  warrantyYears: { type: Number, required: true },
  available: { type: Boolean, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
