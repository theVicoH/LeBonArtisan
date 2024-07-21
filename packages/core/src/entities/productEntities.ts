export default class Product {
  public id: string
  public name: string
  public type: string
  public price: number
  public rating: number
  public warrantyYears: number
  public available: boolean

  constructor(id: string, name: string, type: string, price: number, rating: number, warrantyYears: number, available: boolean) {
    this.id = id
    this.name = name
    this.type = type
    this.price = price
    this.rating = rating
    this.warrantyYears = warrantyYears
    this.available = available
  }
}
