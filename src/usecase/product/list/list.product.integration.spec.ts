import {Sequelize} from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUsecase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {

        const productRepository = new ProductRepository();
        const usecase = new ListProductUsecase(productRepository);
        const product = new Product("123", "Product 1", 100);

        await productRepository.create(product);

        const input = {
            id: "123"
        }

        const output = {
            "products": [{
                id: "123",
                name: "Product 1",
                price: 100
            }]
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);

    });
})