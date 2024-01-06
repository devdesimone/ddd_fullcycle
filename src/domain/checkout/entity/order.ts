import OrderItem from "./order_item";

export default class Order {
  
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  addItem(orderItem: OrderItem) {
    this._items.push(orderItem);
    this._total = this.total();
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id cannot be empty");
    }

    if (this._customerId.length === 0) {
      throw new Error("customerId cannot be empty");
    }

    if (this._items.length === 0) {
      throw new Error("Item qtd must be greater than zero");
    }

    if(this._items.some(item => item.quantity <= 0)) {
      throw new Error("Item qtd must be greater than zero");
    }

    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemPrice, 0);
  }
}
