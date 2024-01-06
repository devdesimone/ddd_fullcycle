import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get price(): number {
    return this._price * 2;
  }

  get name(): string {
    return this._name;
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id cannot be empty");
    }

    if (this._name.length === 0) {
      throw new Error("Name cannot be empty");
    }

    if (this._price < 0) {
      throw new Error("Price cannot be less than zero");
    }

    return true;
  }
}
