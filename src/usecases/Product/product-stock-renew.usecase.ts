import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/interfaces/product.interface";

export class ProductStockRenewUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: string, numberOfProducts: number): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct: Product = Product.renewStock(
      product,
      numberOfProducts
    );

    await this.productRepository.update(updatedProduct);

    return updatedProduct;
  }
}
