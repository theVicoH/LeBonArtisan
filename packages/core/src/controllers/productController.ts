import { IServices, IProductController, IProductUseCase, Response, HttpResponseCode } from "common/types"
import { ProductUseCase } from "../useCases/productUseCases"
import Product from "../entities/productEntities"

export class ProductController implements IProductController {
  private services: IServices
  private productUseCase: IProductUseCase

  constructor(services: IServices) {
    this.services = services
    this.productUseCase = new ProductUseCase(this.services.product)
  }

  public async getAllProducts(): Promise<Response<Product[]>> {
    try {
      const products = await this.productUseCase.getAllProducts()
      return {
        code: HttpResponseCode.OK,
        body: { message: "Successfully get all products", data: products },
      }
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } }
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } }
      }
    }
  }

  public async getProductById(productId: string): Promise<Response<Product>> {
    try {
      const product = await this.productUseCase.getProductById(productId)
      return {
        code: HttpResponseCode.OK,
        body: { message: "Successfully get product by id", data: product },
      }
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } }
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } }
      }
    }
  }

  public async createProduct(product: Omit<Product, "id">): Promise<Response<string>> {
    try {
      await this.productUseCase.createProduct(product)
      return {
        code: HttpResponseCode.Created,
        body: { message: "Successfully created product" },
      }
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } }
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } }
      }
    }
  }

  public async updateProduct(id: string, product: Omit<Product, "id">): Promise<Response<string>> {
    try {
      await this.productUseCase.updateProduct(id, product)
      return {
        code: HttpResponseCode.Created,
        body: { message: "Successfully update product" },
      }
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } }
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } }
      }
    }
  }

  public async deleteProduct(id: string): Promise<Response<string>> {
    try {
      await this.productUseCase.deleteProduct(id)
      return {
        code: HttpResponseCode.Created,
        body: { message: "Successfully deleted product" },
      }
    } catch (error) {
      if (error instanceof Error) {
        return { code: HttpResponseCode.InternalServerError, body: { message: error.message } }
      } else {
        return { code: HttpResponseCode.InternalServerError, body: { message: "An unknown error occurred" } }
      }
    }
  }
}
