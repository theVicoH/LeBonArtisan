import { IServices } from "../../types/services";
import ProductService from "./services/productService";

const services: IServices = {
  product: new ProductService(),
};

export default services;
