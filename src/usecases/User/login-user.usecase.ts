import { IJwtHandler } from "@domain/interfaces/jwt.interface";
import { IUserRepository } from "@domain/interfaces/user.interface";
import { ICryptoService } from "@domain/interfaces/crypto.interface";
import { ICacheRepository } from "@domain/interfaces/cache.interface";
import { LoginUserInputDto } from "@infrastructure/dto/User/login-user-input.dto";
import { LoginUserResponseDto } from "@infrastructure/dto/User/login-user-response.dto";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtHandler: IJwtHandler,
    private cryptoHandler: ICryptoService,
    private cacheRepository: ICacheRepository
  ) {
    this.jwtHandler = jwtHandler;
    this.cryptoHandler = cryptoHandler;
    this.userRepository = userRepository;
    this.cacheRepository = cacheRepository;
  }

  async execute(input: LoginUserInputDto): Promise<LoginUserResponseDto> {
    const user = await this.userRepository.findByEmail(input.userEmail);

    if (!user) {
      throw new Error("Incorrect credentials");
    }

    const isPasswordCorrect = await this.cryptoHandler.comparePassword(
      input.userPassword,
      user.userPassword
    );

    if (!isPasswordCorrect) {
      throw new Error("Incorrect credentials");
    }

    const token = this.jwtHandler.generateToken({ userId: user.userId });
    await this.cacheRepository.set(user.userId, token, 60 * 60 * 24 * 7);

    return { token };
  }
}
