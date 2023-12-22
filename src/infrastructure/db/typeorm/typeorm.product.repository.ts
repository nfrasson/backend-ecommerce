import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "@domain/entities/product.entity";
import { IProductRepository } from "@domain/interfaces/product.interface";

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

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
