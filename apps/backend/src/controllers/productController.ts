import Product from "../entities/productEntities";
import { IProductController } from "../types/controllers";
import { HttpResponseCode, ResponseController } from "../types/response";
import { IServices } from "../types/services";
import { IProductUseCase } from "../types/useCases";
import { ProductUseCase } from "../useCases/productUseCase";

export class ProductController implements IProductController {
  private services: IServices;
  private productUseCase: IProductUseCase;

  constructor(services: IServices) {
    this.services = services;
    this.productUseCase = new ProductUseCase(this.services.product);
  }

  public async getAllProducts() : Promise<ResponseController<Product[]>> {
    try {
      const products = await this.productUseCase.getAllProducts();
      return {
        code: HttpResponseCode.OK,
        body: { message: "Successfully get all products", data: products },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } };
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } };
      }
    }
  }

  public async getProductById(productId: string) : Promise<ResponseController<Product>> {
    try {
      const product = await this.productUseCase.getProductById(productId);
      return {
        code: HttpResponseCode.OK,
        body: { message: "Successfully get product by id", data: product },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } };
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } };
      }
    }
  }

  public async createProduct(product: Omit<Product, "id">) : Promise<ResponseController<string>> {
    try {
      await this.productUseCase.createProduct(product);
      return {
        code: HttpResponseCode.Created,
        body: { message: "Successfully created product" },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } };
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } };
      }
    }
  }

  public async updateProduct(id: string, product: Omit<Product, "id">) : Promise<ResponseController<string>> {
    try {
      await this.productUseCase.updateProduct(id, product);
      return {
        code: HttpResponseCode.Created,
        body: { message: "Successfully created product" },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } };
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } };
      }
    }
  }

  public async deleteProduct(id: string) : Promise<ResponseController<string>> {
    try {
      await this.productUseCase.deleteProduct(id);
      return {
        code: HttpResponseCode.Created,
        body: { message: "Successfully created product" },
      };
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } };
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } };
      }
    }
  }
}
