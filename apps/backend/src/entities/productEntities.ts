export default class Product {
  public name: string;
  public type: string;
  public price: number;
  public rating: number;
  public warrantyYears: number;
  public available: boolean;

  constructor(
    name: string,
    type: string,
    price: number,
    rating: number,
    warrantyYears: number,
    available: boolean
  ) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.rating = rating;
    this.warrantyYears = warrantyYears;
    this.available = available;
  }
}
