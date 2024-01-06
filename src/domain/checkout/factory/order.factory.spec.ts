import {v4 as uuid} from "uuid";
import OrderFactory, { OrderFactoryProps } from "./order.factory";

describe("Order Factory unit test", () => {
    it("should create an order", () => {

        const orderProps: OrderFactoryProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                { 
                    id: uuid(), 
                    name: "Item 1", 
                    productId: uuid(),
                    price: 10,
                    quantity: 1
                     },
            ],
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
    
});