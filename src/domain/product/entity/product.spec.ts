import Product from "./product";

describe("product unit tests", () => {	
    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 100);
        }).toThrowError("Id cannot be empty");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("123", "", 100);
        }).toThrowError("Name cannot be empty");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            new Product("123", "Product 1", -1);
        }).toThrowError("Price cannot be less than zero");
    });

    it("should throw 2 errors when id is empty and name is empty", () => {
        expect(() => {
            new Product("", "", 100);
        }).toThrowError("product: Id cannot be empty, product: Name cannot be empty");
    });

    it("should change name", () => {    
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {    
        const product = new Product("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});