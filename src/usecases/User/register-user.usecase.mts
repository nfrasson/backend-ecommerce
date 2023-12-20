import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/user.entity.mjs";
import { UserInterface } from "../../domain/interfaces/user.interface.mjs";
import { RegisterUserDto } from "../../infrastructure/dto/User/register-user.dto.mjs";

export class RegisterUserUseCase {
  private userRepository: UserInterface;

  constructor(userRepository: UserInterface) {
    this.userRepository = userRepository;
  }

  async execute(user: RegisterUserDto): Promise<User> {
    const userPassword = await bcrypt.hash(user.userPassword, 5);
    user.userPassword = userPassword;

    return this.userRepository.register(user);
  }
}
