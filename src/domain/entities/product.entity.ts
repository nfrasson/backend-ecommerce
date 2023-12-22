import { randomUUID } from "node:crypto";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryColumn({ default: () => `randomUUID()` })
  productId: string;

  @Column()
  productStock: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  productPrice: number;

  constructor(props: Product) {
    Object.assign(this, props);
    this.productId = props?.productId || randomUUID();
  }

  static dispatchProduct(product: Product, numberOfProductsDispatched: number) {
    if (product.productStock < numberOfProductsDispatched) {
      throw new Error("Product stock is not enough");
    }

    return new Product({
      ...product,
      productStock: product.productStock - numberOfProductsDispatched,
    });
  }

  static renewStock(product: Product, numberOfProducts: number) {
    return new Product({
      ...product,
      productStock: product.productStock + numberOfProducts,
    });
  }
}
