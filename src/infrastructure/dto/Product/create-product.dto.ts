import { IsNumber, IsUUID, Min } from "class-validator";

export class CreateProductDto {
  @IsUUID(4)
  productId: string;

  @IsNumber()
  @Min(0)
  productStock: number;

  @IsNumber()
  @Min(0)
  productPrice: number;
}
