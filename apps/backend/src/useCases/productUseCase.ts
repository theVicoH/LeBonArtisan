import Product from "../entities/productEntities";
import { IProductService } from "../types/services";
import { IProductUseCase } from "../types/useCases";

export class ProductUseCase implements IProductUseCase {
  constructor(private services: IProductService) {}
  public async getAllProducts(): Promise<Product[]> {
    const products = await this.services.getAllProducts();
    return products.map(product => new Product(
      product.name,
      product.type,
      product.price,
      product.rating,
      product.warrantyYears,
      product.available
    ));
  }

  public async getProductById(id: number) {
    const product = await this.services.getProductById(id);
    if (!product) {
      throw new Error("Can't get product by Id");
    }
    return new Product(
      product.name,
      product.type,
      product.price,
      product.rating,
      product.warrantyYears,
      product.available
    );
  }

  public async createProduct(productData: Product) {
    const product = await this.services.createProduct(productData);
    if (!product) {
      throw new Error("No product created");
    }
  }

  public async updateProduct(id: number, productData: Product) {
    const updatedProduct = await this.services.updateProduct(id, productData);
    if (!updatedProduct) {
      throw new Error("No product created");
    }
  }

  public async deleteProduct(id: number) {
    const deletedProduct = await this.services.deleteProduct(id);
    if (!deletedProduct) {
      throw new Error("No product created");
    }
  }
}
