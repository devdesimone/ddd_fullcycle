import UpdateProductUsecase from "./update.product.usecase";
import Notification from "../../../domain/@shared/notification/notification";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.createProduct("Product 1", 100);

const input = {
    id: product.id,
    name: "Product 1 Updated",
    price: 100,
};
const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test update product use case", () => {

    it("should update a product", async () => {

        const productRepository = MockRepository();
        const usecase = new UpdateProductUsecase(productRepository);

        const output = await usecase.execute(input);

        expect(output).toStrictEqual(input);
    });

    it("should thrown an error when name is missing", async () => {

        const productRepository = MockRepository();
        const usecase = new UpdateProductUsecase(productRepository);

        const req = Object.assign({}, input);
        req.name = "";

        await expect(usecase.execute(req)).rejects.toThrowError("product: Name cannot be empty");
    });

    it("should thrown an error when price is less than zero", async () => {

        const productRepository = MockRepository();
        const usecase = new UpdateProductUsecase(productRepository);
        product.notification = new Notification();
        const req = Object.assign({}, input);
        req.price = -1;

        await expect(usecase.execute(req)).rejects.toThrowError("Price cannot be less than zero");
    });
})