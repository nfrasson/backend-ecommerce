import { Repository } from "typeorm";
import { AppDataSource } from "../typeorm.connection.mjs";
import { User } from "../../../../domain/entities/user.entity.mjs";
import { UserInterface } from "../../../../domain/interfaces/user.interface.mjs";

export class TypeOrmUserRepository implements UserInterface {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async register(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByID(userId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userId });
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    return this.userRepository.findOneBy({ userEmail });
  }

  async update(user: User, userId: string): Promise<void> {
    await this.userRepository.update({ userId }, user);
  }
}
