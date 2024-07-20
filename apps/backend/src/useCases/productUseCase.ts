import Product from "../entities/productEntities";
import { IProductService } from "../types/services";
import { IProductUseCase } from "../types/useCases";

export class ProductUseCase implements IProductUseCase {
  constructor(private services: IProductService) {}

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.services.getAllProducts();
    return products.map(product => new Product(
      product._id,
      product.name,
      product.type,
      product.price,
      product.rating,
      product.warrantyYears,
      product.available
    ));
  }

  public async getProductById(id: string) {
    const product = await this.services.getProductById(id);
    if (!product) {
      throw new Error("Can't get product by Id");
    }
    return new Product(
      product._id,
      product.name,
      product.type,
      product.price,
      product.rating,
      product.warrantyYears,
      product.available
    );
  }

  public async createProduct(productData: Omit<Product, "id">) {
    const product = await this.services.createProduct(productData);
    if (!product) {
      throw new Error("No product created");
    }
  }

  public async updateProduct(id: string, productData: Omit<Product, "id">) {
    const updatedProduct = await this.services.updateProduct(id, productData);
    if (!updatedProduct) {
      throw new Error("No product created");
    }
  }

  public async deleteProduct(id: string) {
    const deletedProduct = await this.services.deleteProduct(id);
    if (!deletedProduct) {
      throw new Error("No product created");
    }
  }
}
