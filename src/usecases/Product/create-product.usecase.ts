import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/interfaces/product.interface";
import { CreateProductDto } from "@infrastructure/dto/Product/create-product.dto";

export class CreateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: CreateProductDto): Promise<Product> {
    return this.productRepository.create(input);
  }
}
