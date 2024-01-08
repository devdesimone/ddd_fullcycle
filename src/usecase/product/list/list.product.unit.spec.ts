import ListProductUsecase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product1 = ProductFactory.createProduct("Product 1", 100);
const product2 = ProductFactory.createProduct("Product 2", 200);


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test for list product use case", () => {

    it("should list a product", async () => {

        const customerRepository = MockRepository();
        const usecase = new ListProductUsecase(customerRepository);

        const output = await usecase.execute();

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);

    });
})