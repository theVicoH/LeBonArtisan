import Product from "../entities/productEntities"
import { IProduct } from "../librairies/mongodb/models/productModel"

export interface IProductService {
  getAllProducts: ()=> Promise<IProduct[]>
  getProductById: (productId: number)=> Promise<IProduct | null>
  createProduct: (product: Product)=> Promise<IProduct>
  updateProduct: (id: number, product: Product) => Promise<IProduct | null>
  deleteProduct: (id: number) => Promise<IProduct | null>
}

export interface IServices {
  product: IProductService
}
