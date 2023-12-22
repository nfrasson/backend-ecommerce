import { User } from "@domain/entities/user.entity";
import { IJwtHandler } from "@domain/interfaces/jwt.interface";
import { IUserRepository } from "@domain/interfaces/user.interface";
import { ICryptoService } from "@domain/interfaces/crypto.interface";
import { ICacheRepository } from "@domain/interfaces/cache.interface";
import { RegisterUserInputDto } from "@infrastructure/dto/User/register-user-input.dto";
import { RegisterUserResponseDto } from "@infrastructure/dto/User/register-user-response.dto";

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptoHandler: ICryptoService,
    private jwtHandler: IJwtHandler,
    private cacheRepository: ICacheRepository
  ) {
    this.userRepository = userRepository;
    this.cryptoHandler = cryptoHandler;
    this.jwtHandler = jwtHandler;
    this.cacheRepository = cacheRepository;
  }

  async execute(body: RegisterUserInputDto): Promise<RegisterUserResponseDto> {
    const user = new User(body);

    const hashedPassword = await this.cryptoHandler.hashPassword(
      user.userPassword
    );
    user.userPassword = hashedPassword;

    await this.userRepository.register(user);

    const token = this.jwtHandler.generateToken({ userId: user.userId });
    await this.cacheRepository.set(user.userId, token, 60 * 60 * 24 * 7);

    return { token };
  }
}
