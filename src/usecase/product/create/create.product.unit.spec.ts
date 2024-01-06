import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 100,
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test create product use case", () => {

        it("should create a product", async () => {

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);

            const output = await usecase.execute(input);

            expect(output).toStrictEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price,
            });
        });

        it("should thrown an error when name is missing", async () => {

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);

            input.name = "";

            await expect(usecase.execute(input)).rejects.toThrow("Name cannot be empty");
        });

        it("should thrown an error when price is missing", async () => {

            const productRepository = MockRepository();
            const usecase = new CreateProductUseCase(productRepository);

            input.name = "Product 1";
            input.price = -10;

            await expect(usecase.execute(input)).rejects.toThrow("Price cannot be less than zero");
        });
});