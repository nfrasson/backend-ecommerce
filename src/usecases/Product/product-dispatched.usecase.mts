import { Product } from "../../domain/entities/product.entity.mjs";
import { ProductInterface } from "../../domain/interfaces/product.interface.mjs";

export class ProductDispatchedStockUseCase {
  private productRepository: ProductInterface;

  constructor(productRepository: ProductInterface) {
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
