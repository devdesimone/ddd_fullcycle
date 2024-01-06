import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    price: number;
    quantity: number;
  }[];
}

export default class OrderFactory {
  public static create(orderProps: OrderFactoryProps): Order {
    const orderItems: OrderItem[] = orderProps.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity
        )
    );
    return new Order(orderProps.id, orderProps.customerId, orderItems);
  }
}
