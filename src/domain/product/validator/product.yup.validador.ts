import ValidatorInterface from "../../@shared/validtor/validator.interface";
import * as yup from "yup";
import Product from "../entity/product";

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required("Id cannot be empty"),
                name: yup.string().required("Name cannot be empty"),
                price: yup.number().moreThan(0, "Price cannot be less than zero"),
            }).validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price,
            }, {abortEarly: false});
        } catch (error) {
            const e = error as yup.ValidationError;
            e.errors.forEach((error: string) => {
                entity.notification.addError({
                    message: error,
                    context: "product",
                });
            });
        }
    }
}