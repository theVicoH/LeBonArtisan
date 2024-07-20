import Product from "../../../entities/productEntities";

const initialProducts : Product[] = [
  { name: "AC1 Phone1", type: "phone", price: 200.05, rating: 3.8, warrantyYears: 1, available: true },
  { name: "AC2 Phone2", type: "phone", price: 147.21, rating: 1, warrantyYears: 3, available: false },
  { name: "AC3 Phone3", type: "phone", price: 150, rating: 2, warrantyYears: 1, available: true },
  { name: "AC4 Phone4", type: "phone", price: 50.20, rating: 3, warrantyYears: 2, available: true }
];

export default initialProducts;
