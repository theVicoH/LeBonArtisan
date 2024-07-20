import Product from "../entities/productEntities"
import { ResponseController } from "./response"

export interface IProductController {
  getAllProducts: ()=> Promise<ResponseController<Product[]>>
  getProductById: (productId: string)=> Promise<ResponseController<Product>>
  createProduct: (product: Product)=> Promise<ResponseController<string>>
  updateProduct: (id: string, product: Product) => Promise<ResponseController<string>>
  deleteProduct: (id: string) => Promise<ResponseController<string>>
}
