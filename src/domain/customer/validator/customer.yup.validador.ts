import Customer from "../entity/customer";
import ValidatorInterface from "../../@shared/validtor/validator.interface";
import * as yup from "yup";
export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup.object().shape({
                id: yup.string().required("Id cannot be empty"),
                name: yup.string().required("Name cannot be empty"),
            }).validateSync({
                id: entity.id,
                name: entity.name,
            },{ abortEarly: false });
        } catch (error) {
            const e = error as yup.ValidationError;
            e.errors.forEach((error: string) => {
                entity.notification.addError({
                    message: error,
                    context: "customer",
                });
            });
        }
    }
}