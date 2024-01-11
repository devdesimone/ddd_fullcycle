import {app, sequelize} from "../express";
import resquest from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
       const response = await resquest(app)
              .post("/product")
              .send({
                name: "Product 1",
                price: 100
              });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(100);

    });

    it("should not create a product", async () => {
        const response = await resquest(app)
            .post("/product")
            .send({
                name: "Product 1"
            });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response = await resquest(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 100
            });

        expect(response.status).toBe(200);

        const response2 = await resquest(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 200
            });

        expect(response2.status).toBe(200);

        const listResponse = await resquest(app)
            .get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        expect(listResponse.body.products[0].name).toBe("Product 1");
        expect(listResponse.body.products[0].price).toBe(100);

        expect(listResponse.body.products[1].name).toBe("Product 2");
        expect(listResponse.body.products[1].price).toBe(200);

        const listResponseXml = await resquest(app)
            .get("/product")
            .set("Accept", "application/xml").send();

        expect(listResponseXml.status).toBe(200);
        expect(listResponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXml.text).toContain(`<name>Product 1</name>`);
        expect(listResponseXml.text).toContain(`<price>100</price>`);
        expect(listResponseXml.text).toContain(`<name>Product 2</name>`);
        expect(listResponseXml.text).toContain(`<price>200</price>`);

    });
});