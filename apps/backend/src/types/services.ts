import Product from "../entities/productEntities"
import { IProduct } from "../librairies/mongodb/models/productModel"

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
