import Product from "../entity/product";

export default class ProductService {
  static incrementPrices(products: Product[], percentage: number): void {
    products.forEach((product) => {
      product.changePrice((product.price * percentage/100) + product.price);
    });
  }
}
