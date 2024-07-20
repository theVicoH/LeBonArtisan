class Product {
  public id: number;
  public name: string;
  public type: string;
  public price: number;
  public rating: number;
  public warranty_years: number;
  public available: boolean;

  constructor(
    id: number,
    name: string,
    type: string,
    price: number,
    rating: number,
    warranty_years: number,
    available: boolean
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.rating = rating;
    this.warranty_years = warranty_years;
    this.available = available;
  }
}
