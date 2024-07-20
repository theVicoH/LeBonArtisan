import Product from "../entities/productEntities"
import { ResponseController } from "./response"

export interface IProductController {
  getAllProducts: ()=> Promise<ResponseController<Product[]>>
  getProductById: (productId: number)=> Promise<ResponseController<Product>>
  createProduct: (product: Product)=> Promise<ResponseController<string>>
  updateProduct: (id: number, product: Product) => Promise<ResponseController<string>>
  deleteProduct: (id: number) => Promise<ResponseController<string>>
}
