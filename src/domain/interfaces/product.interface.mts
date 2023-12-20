import { Product } from "../entities/product.entity.mjs";

export interface ProductInterface {
  create(product: Product): Promise<Product>;
  findById(productId: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
}
