import Product from "core/entities/productEntities";

const initialProducts : Product[] = [
  { id: "1", name: "AC1 Phone1", type: "phone", price: 200.05, rating: 3.8, warrantyYears: 1, available: true },
  { id: "2", name: "AC2 Phone2", type: "phone", price: 147.21, rating: 1, warrantyYears: 3, available: false },
  { id: "3", name: "AC3 Phone3", type: "phone", price: 150, rating: 2, warrantyYears: 1, available: true },
  { id: "4", name: "AC4 Phone4", type: "phone", price: 50.20, rating: 3, warrantyYears: 2, available: true }
];

export default initialProducts;
