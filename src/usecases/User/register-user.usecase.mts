import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/user.entity.mjs";
import { UserInterface } from "../../domain/interfaces/user.interface.mjs";

export class RegisterUserUseCase {
  private userRepository: UserInterface;

  constructor(userRepository: UserInterface) {
    this.userRepository = userRepository;
  }

  async execute(user: User): Promise<User> {
    const userPassword = await bcrypt.hash(user.userPassword, 5);
    user.userPassword = userPassword;

    return this.userRepository.register(user);
  }
}
