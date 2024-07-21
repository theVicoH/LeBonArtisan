// import Product from "../entities/productEntities"
// import { IProduct } from "../librairies/mongodb/models/productModel"
import { Document } from "mongoose";
import Product from "core/entities/productEntities"
export interface IProduct extends Document {
  _id: string;
  name: string;
  type: string;
  price: number;
  rating: number;
  warrantyYears: number;
  available: boolean;
}

export interface IProductService {
  getAllProducts: ()=> Promise<IProduct[]>
  getProductById: (productId: string)=> Promise<IProduct | null>
  createProduct: (product: Omit<Product, "id">)=> Promise<IProduct>
  updateProduct: (id: string, product: Omit<Product, "id">) => Promise<IProduct | null>
  deleteProduct: (id: string) => Promise<IProduct | null>
}

export interface IServices {
  product: IProductService
}
