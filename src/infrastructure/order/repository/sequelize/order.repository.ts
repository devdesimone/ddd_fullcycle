import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            productId: item.productId,
            quantity: item.quantity,
          };
        }),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customerId: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );

    for (const item of entity.items) {
      await OrderItemModel.findOrCreate({
        where: { id: item.id, orderId: entity.id },
        defaults: {
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
          orderId: entity.id,
        },
      }).then(async ([orderItem, created]) => {
        if (!created) {
          await orderItem.update({
            name: item.name,
            price: item.price,
            productId: item.productId,
            quantity: item.quantity,
          });
        }
      });
    }
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    const order = new Order(
      orderModel.id,
      orderModel.customerId,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity
          )
      )
    );

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();

    const orders = orderModels.map((orderModel) => {
      let order = new Order(
        orderModel.id,
        orderModel.customerId,
        orderModel.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.productId,
              item.quantity
            )
        )
      );
      return order;
    });

    return orders;
  }
}
