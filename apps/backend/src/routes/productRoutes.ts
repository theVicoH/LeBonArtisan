import { Router } from "express";
import { IServices, ProductRoutes } from "common/types";
import { Request, Response } from "express";
import { HttpResponseCode } from "common/types";
import Product from "core/entities/productEntities";
import { ProductController } from "core/controllers/productController";

const createProductRouter = (services: IServices) => {
  const router = Router();

  const productController = new ProductController(services);

  router.get(ProductRoutes.GetAllProducts, async (_: Request, res: Response) => {
    const result = await productController.getAllProducts();
    res.status(result.code).send(result);
  });

  router.get(ProductRoutes.GetProductById, async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product id");
    }
    const result = await productController.getProductById(id);
    res.status(result.code).send(result);
  });

  router.post(ProductRoutes.CreateProduct, async (req: Request, res: Response) => {
    const { name, type, price, rating, warrantyYears, available } = req.body;
    if (!name) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product name");
    }
    if (!type) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product type");
    }
    if (!price) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product price");
    }
    if (!rating) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product rating");
    }
    if (!warrantyYears) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product warrantyYears");
    }
    if (available === undefined) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product available");
    }

    const parsedPrice = parseFloat(price);
    const parsedRating = parseFloat(rating);
    const parsedWarrantyYears = parseInt(warrantyYears, 10);
    const parsedAvailable = Boolean(available);

    const productData: Omit<Product, "id"> = {
      name: name,
      type: type,
      price: parsedPrice,
      rating: parsedRating,
      warrantyYears: parsedWarrantyYears,
      available: parsedAvailable
    };

    const result = await productController.createProduct(productData);
    res.status(result.code).send(result);
  });

  router.put(ProductRoutes.UpdateProduct, async (req: Request, res: Response) => {
    const { id, name, type, price, rating, warrantyYears, available } = req.body;
    if (!id) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product id");
    }

    if (!name) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product name");
    }
    if (!type) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product type");
    }
    if (!price) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product price");
    }
    if (!rating) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product rating");
    }
    if (!warrantyYears) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product warrantyYears");
    }
    if (available === undefined) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product available");
    }

    const parsedPrice = parseFloat(price);
    const parsedRating = parseFloat(rating);
    const parsedWarrantyYears = parseInt(warrantyYears, 10);
    const parsedAvailable = Boolean(available);

    const productData: Omit<Product, "id"> = {
      name: name,
      type: type,
      price: parsedPrice,
      rating: parsedRating,
      warrantyYears: parsedWarrantyYears,
      available: parsedAvailable
    };

    const result = await productController.updateProduct(id, productData);
    res.status(result.code).send(result);
  });

  router.delete(ProductRoutes.DeleteProduct, async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
      return res.status(HttpResponseCode.BadRequest).send("Missing product id");
    }
    const result = await productController.deleteProduct(id);
    res.status(result.code).send(result);
  });

  return router;
};

export default createProductRouter;
