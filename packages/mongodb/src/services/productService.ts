import Product from "core/entities/productEntities"
import { IProductService } from "common/types"
import ProductModel, { IProduct } from "../models/productModel"

export default class ProductService implements IProductService {
  public async getAllProducts(): Promise<IProduct[]> {
    return await ProductModel.find().select("_id name type price rating warrantyYears available")
  }

  public async getProductById(productId: string): Promise<IProduct | null> {
    return await ProductModel.findById(productId).select("_id name type price rating warrantyYears available")
  }

  public async createProduct(product: Omit<Product, "id">): Promise<IProduct> {
    const newProduct = new ProductModel(product)
    return await newProduct.save()
  }

  public async updateProduct(id: string, product: Omit<Product, "id">): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(id, product, { new: true }).select("_id name type price rating warrantyYears available")
  }

  public async deleteProduct(id: string): Promise<IProduct | null> {
    return await ProductModel.findByIdAndDelete(id).select("_id name type price rating warrantyYears available")
  }
}
