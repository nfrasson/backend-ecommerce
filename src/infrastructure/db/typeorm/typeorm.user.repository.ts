import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/interfaces/user.interface";

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async register(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  findByID(userId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userId });
  }

  findByEmail(userEmail: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userEmail });
  }

  async update(user: User, userId: string): Promise<void> {
    await this.userRepository.update({ userId }, user);
  }
}
