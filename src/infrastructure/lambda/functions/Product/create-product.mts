import { LambdaDefaultHandler } from "../../lambda-default.handler.mjs";
import { APIFunction } from "../../../../domain/types/api-function.type.mjs";
import { CreateProductUseCase } from "../../../../usecases/Product/create-product.usecase.mjs";
import { CreateProductDto } from "../../../../infrastructure/dto/Product/create-product.dto.mjs";
import { TypeOrmProductRepository } from "../../../../infrastructure/db/typeorm/repositories/typeorm.product.repository.mjs";

const productRepository = new TypeOrmProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);

export const createProduct: APIFunction = async (body: CreateProductDto) => {
  const response = await createProductUseCase.execute(body);

  return {
    statusCode: 201,
    body: response,
  };
};

export const handler = new LambdaDefaultHandler(createProduct, CreateProductDto)
  .handleAPIGatewayEvent;
