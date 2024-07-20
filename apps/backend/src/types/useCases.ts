import Product from "../entities/productEntities"

export interface IProductUseCase {
  getAllProducts: ()=> Promise<Product[]>
  getProductById: (productId: string)=> Promise<Product>
  createProduct: (product: Omit<Product, "id">)=> Promise<void>
  updateProduct: (id: string, product: Omit<Product, "id">) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}
