import Address from "../value-object/address";
import Customer from "./customer";

describe("customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "John");
    }).toThrowError("customer: Id cannot be empty");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrowError("customer: Name cannot be empty");
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Mary");
    expect(customer.name).toBe("Mary");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345-123", "City 1");
    customer.Address = address;

    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should throw error address is undefined when you activate customer", () => {
    const customer = new Customer("1", "Customer 1");

    expect(() => {
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(100);

    expect(customer.rewardPoints).toBe(100);

    customer.addRewardPoints(200);
    
    expect(customer.rewardPoints).toBe(300);
  });
});
