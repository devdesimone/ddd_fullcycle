import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUsecase from "./update.product.usecase";

describe("Test update product use case", () => {
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

    it("should update a product", async () => {

        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository)
        const updateProductUseCase = new UpdateProductUsecase(productRepository)

        const product = {
            name: "Product 1",
            price: 100
        }

        const result = await createProductUseCase.execute(product);

        expect(result.name).toEqual(product.name);
        expect(result.price).toEqual(product.price);

        const inputProduct = {
            id: result.id,
            name: "Product 1 Updated",
            price: 100

        }

        const resultUpdated = await updateProductUseCase.execute(inputProduct);

        expect(resultUpdated.name).toEqual(inputProduct.name);
        expect(resultUpdated.price).toEqual(inputProduct.price);

    });
})