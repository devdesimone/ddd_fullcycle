import {app, sequelize} from "../express";
import resquest from "supertest";

describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
       const response = await resquest(app)
              .post("/customer")
              .send({
                name: "Customer 1",
                address: {
                     street: "Street 1",
                     number: 1,
                     zip: "Zipcode 1",
                     city: "City 1"
                }
              });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Customer 1");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.number).toBe(1);
        expect(response.body.address.zip).toBe("Zipcode 1");
        expect(response.body.address.city).toBe("City 1");

    });

    it("should not create a customer", async () => {
        const response = await resquest(app)
            .post("/customer")
            .send({
                name: "Customer 1"
            });

        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        const response = await resquest(app)
            .post("/customer")
            .send({
                name: "Customer 1",
                address: {
                    street: "Street 1",
                    number: 1,
                    zip: "Zipcode 1",
                    city: "City 1"
                }
            });

        expect(response.status).toBe(200);

        const response2 = await resquest(app)
            .post("/customer")
            .send({
                name: "Customer 2",
                address: {
                    street: "Street 2",
                    number: 2,
                    zip: "Zipcode 2",
                    city: "City 2"
                }
            });

        expect(response2.status).toBe(200);

        const listResponse = await resquest(app)
            .get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        expect(listResponse.body.customers[0].name).toBe("Customer 1");
        expect(listResponse.body.customers[0].address.street).toBe("Street 1");

        expect(listResponse.body.customers[1].name).toBe("Customer 2");
        expect(listResponse.body.customers[1].address.street).toBe("Street 2");

        const listResponseXml = await resquest(app)
            .get("/customer")
            .set("Accept", "application/xml").send();

        expect(listResponseXml.status).toBe(200);
        expect(listResponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXml.text).toContain(`<name>Customer 1</name>`);
        expect(listResponseXml.text).toContain(`<street>Street 1</street>`);
        expect(listResponseXml.text).toContain(`<name>Customer 2</name>`);
        expect(listResponseXml.text).toContain(`<street>Street 2</street>`);

    });
});