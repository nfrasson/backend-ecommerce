import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/interfaces/product.interface";

export class ProductDispatchedStockUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(
    productId: string,
    numberOfProductsDispatched: number
  ): Promise<Product> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct: Product = Product.dispatchProduct(
      product,
      numberOfProductsDispatched
    );

    await this.productRepository.update(updatedProduct);

    return updatedProduct;
  }
}
