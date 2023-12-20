import bcrypt from "bcryptjs";
import { UserInterface } from "../../domain/interfaces/user.interface.mjs";
import { LoginUserDto } from "../../infrastructure/dto/User/login-user.dto.mjs";

export class LoginUserUseCase {
  private userRepository: UserInterface;

  constructor(userRepository: UserInterface) {
    this.userRepository = userRepository;
  }

  async execute(input: LoginUserDto): Promise<boolean> {
    const user = await this.userRepository.findByEmail(input.userEmail);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      input.userPassword,
      user.userPassword
    );

    if (!isPasswordCorrect) {
      throw new Error("Password incorrect");
    }

    return true;
  }
}
