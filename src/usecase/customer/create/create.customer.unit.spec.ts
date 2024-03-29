import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "Customer 1",
    address: {
        street: "Street 1",
        number: 1,
        zip: "Zipcode 1",
        city: "City 1"
    }
};
const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test create customer use case", () => {

    it("should create a customer", async () => {

        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        const output = await usecase.execute(input);

        expect(output).toStrictEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city:  input.address.city
            }
        });
    });

    it("should thrown an error when name is missing", async () => {

        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.name = "";

        await expect(usecase.execute(input)).rejects.toThrow("Name cannot be empty");
    });

    it("should thrown an error when street is missing", async () => {

        const customerRepository = MockRepository();
        const usecase = new CreateCustomerUseCase(customerRepository);

        input.address.street = "";

        await expect(usecase.execute(input)).rejects.toThrow("Street is required");
    });
})