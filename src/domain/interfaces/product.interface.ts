import { Product } from "@domain/entities/product.entity";

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(productId: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
}
