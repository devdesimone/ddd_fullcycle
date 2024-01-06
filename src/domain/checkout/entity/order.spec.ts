import Order from "./order";
import OrderItem from "./order_item";

describe("order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id cannot be empty");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError("customerId cannot be empty");
  });

  it("should throw error when item is empty", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrowError("Item qtd must be greater than zero");
  });

  it("should calculate total", () => {
    const item = new OrderItem("1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 200, "p2", 2);
    const order = new Order("1", "123", [item]);

    let total = order.total();

    expect(total).toBe(200);

    const order2 = new Order("1", "123", [item, item2]);

    total = order2.total();

    expect(total).toBe(600);
  });

  it("should throw error if the item qtd is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("1", "Item 1", 100, "p1", 0);
      const order = new Order("1", "123", [item]);
    }).toThrowError("Item qtd must be greater than zero");
  });
});
