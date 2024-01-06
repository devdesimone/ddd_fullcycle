import ValidatorInterface from "../../@shared/validtor/validator.interface";
import ProductYupValidator from "../validator/product.yup.validador";
import Product from "../entity/product";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductYupValidator();
    }
}