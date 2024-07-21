import Product from "core/entities/productEntities"
import { Response } from "./response"

export interface IProductController {
  getAllProducts: () => Promise<Response<Product[]>>
  getProductById: (productId: string) => Promise<Response<Product>>
  createProduct: (product: Product) => Promise<Response<string>>
  updateProduct: (id: string, product: Product) => Promise<Response<string>>
  deleteProduct: (id: string) => Promise<Response<string>>
}
