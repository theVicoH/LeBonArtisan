import { IServices } from "common/types";
import ProductService from "./services/productService";

const services: IServices = {
  product: new ProductService(),
};

export default services;
