import Product from "../../../entities/productEntities";
import { IProductService } from "../../../types/services";
import ProductModel, { IProduct } from "../models/productModel";

export default class ProductService implements IProductService {
  public async getAllProducts(): Promise<IProduct[]> {
    return await ProductModel.find();
  }

  public async getProductById(productId: number): Promise<IProduct | null> {
    return await ProductModel.findById(JSON.stringify(productId));
  }

  public async createProduct(product: Product): Promise<IProduct> {
    const newProduct = new ProductModel(product);
    return await newProduct.save();
  }

  public async updateProduct(id: number, product: Product): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(JSON.stringify(id), product, { new: true });
  }

  public async deleteProduct(id: number): Promise<IProduct | null> {
    return await ProductModel.findByIdAndDelete(JSON.stringify(id));
  }
}

