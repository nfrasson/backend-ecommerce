import { Product } from "../../domain/entities/product.entity.mjs";
import { ProductInterface } from "../../domain/interfaces/product.interface.mjs";
import { CreateProductDto } from "../../infrastructure/dto/Product/create-product.dto.mjs";

export class CreateProductUseCase {
  private productRepository: ProductInterface;

  constructor(productRepository: ProductInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: CreateProductDto): Promise<Product> {
    return this.productRepository.create(input);
  }
}
