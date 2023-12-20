import { Repository } from "typeorm";
import { AppDataSource } from "../typeorm.connection.mjs";
import { Product } from "../../../../domain/entities/product.entity.mjs";
import { ProductInterface } from "../../../../domain/interfaces/product.interface.mjs";

export class TypeOrmProductRepository implements ProductInterface {
  private readonly productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async findById(productId: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({ productId });
  }

  async update(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
}
