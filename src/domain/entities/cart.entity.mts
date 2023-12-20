import { randomUUID } from "node:crypto";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Cart {
  @PrimaryColumn()
  cartId: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  cartPrice: number;

  @Column()
  cartUserId: string;

  @Column("simple-array")
  cartProductsId: string[];

  constructor(props: Cart) {
    Object.assign(this, props);
    this.cartId = props?.cartId || randomUUID();
  }
}
