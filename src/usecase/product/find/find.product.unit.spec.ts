import Product from "../../../domain/product/entity/product";
import FindProductUsecase from "./find.product.usecase";

const product = new Product("123", "Customer 1", 100);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find product use case", () => {

    it("should find a product", async () => {

        const productRepository = MockRepository();
        const usecase = new FindProductUsecase(productRepository);


        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Customer 1",
            price: 100
        }

        const result = await usecase.execute(input);

        expect(result).toStrictEqual(output);

    });

    it("should not found a product", async () => {

            const productRepository = MockRepository();
            productRepository.find.mockImplementation(() => {
                throw new Error("product not found");
            });

            const usecase = new FindProductUsecase(productRepository);

            const input = {
                id: "123"
            }

            await expect(() => usecase.execute(input)).rejects.toThrow("product not found");
    });
})