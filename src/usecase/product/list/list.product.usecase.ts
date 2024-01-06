import {InputListProductDto, OutputListProductDto} from "./list.product.dto";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import Product from "../../../domain/product/entity/product";

export default class ListProductUsecase {
    constructor(private customerRepository: ProductRepositoryInterface) {
    }

    async execute(input?: InputListProductDto): Promise<OutputListProductDto> {
        const produtcs = await this.customerRepository.findAll();
        return OutputMapper.toOutput(produtcs);
    }
}

class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDto {
        return {
            products: product.map((p) => ({
                id: p.id,
                name: p.name,
                price: p.price
            }))
        };
    }
}
