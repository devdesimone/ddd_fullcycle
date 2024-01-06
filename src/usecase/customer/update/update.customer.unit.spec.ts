import UpdateCustomerUsecase from "./update.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import Notification from "../../../domain/@shared/notification/notification";
const customer = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 1, "Zipcode 1", "City 1"));

const input = {
    id: customer.id,
    name: "Customer 1 Updated",
    address: {
        street: "Street 1 Updated",
        number: 1234,
        zip: "Zipcode 1 Updated",
        city: "City 1 Updated"
    }
};
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test update customer use case", () => {

    it("should update a customer", async () => {

        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUsecase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toStrictEqual(input);
    });

    it("should thrown an error when name is missing", async () => {

        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUsecase(customerRepository);

        const req = Object.assign({}, input);
        req.name = "";

        await expect(usecase.execute(req)).rejects.toThrowError("customer: Name cannot be empty");
    });

    it("should thrown an error when street is missing", async () => {

        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUsecase(customerRepository);
        customer.notification = new Notification();
        const req = Object.assign({}, input);
        req.address.street = "";

        await expect(usecase.execute(req)).rejects.toThrowError("Street is required");
    });
})