import { DataSource, Repository } from "typeorm";
import { User } from "../../../../domain/entities/user.entity.mjs";
import { UserInterface } from "../../../../domain/interfaces/user.interface.mjs";

export class UserRepository implements UserInterface {
  private manager: Repository<User>;
  constructor(dataSource: DataSource) {
    this.manager = dataSource.getRepository(User);
  }

  async register(user: User): Promise<User> {
    return this.manager.save(user);
  }

  async findByID(userId: string): Promise<User | null> {
    return this.manager.findOneBy({ userId });
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    return this.manager.findOneBy({ userEmail });
  }

  async update(user: User, userId: string): Promise<void> {
    await this.manager.update({ userId }, user);
  }
}
