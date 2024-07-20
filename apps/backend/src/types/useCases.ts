import Product from "../entities/productEntities"

export interface IProductUseCase {
  getAllProducts: ()=> Promise<Product[]>
  getProductById: (productId: number)=> Promise<Product>
  createProduct: (product: Product)=> Promise<void>
  updateProduct: (id: number, product: Product) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
}
