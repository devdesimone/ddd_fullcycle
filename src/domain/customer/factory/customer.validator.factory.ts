import ValidatorInterface from "../../@shared/validtor/validator.interface";
import CustomerYupValidator from "../validator/customer.yup.validador";
import Customer from "../entity/customer";

export default class CustomerValidatorFactory {
    static create() : ValidatorInterface<Customer> {
        return new CustomerYupValidator();
    }
}