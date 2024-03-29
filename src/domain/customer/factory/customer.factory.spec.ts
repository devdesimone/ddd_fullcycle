import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("John Doe");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address).toBeUndefined();
    expect(customer.constructor.name).toBe("Customer");
  });

  it("should create a customer with address", () => {
    const address = new Address("Street 1", 12345, "789", "City");
    const customer = CustomerFactory.createWithAddress("John Doe", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.Address.street).toBe("Street 1");
    expect(customer.Address.number).toBe(12345);
    expect(customer.Address.zip).toBe("789");
    expect(customer.Address.city).toBe("City");
    expect(customer.constructor.name).toBe("Customer");
  });
});
