import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "@domain/entities/user.entity";
import { JwtModule } from "../services/jwt/jwt.module";
import { JwtHandler } from "../services/jwt/jwt.service";
import { IJwtHandler } from "@domain/interfaces/jwt.interface";
import { BcryptModule } from "../services/crypto/bcrypt.module";
import { BcryptHandler } from "../services/crypto/bcrypt.service";
import { IUserRepository } from "@domain/interfaces/user.interface";
import { ICryptoService } from "@domain/interfaces/crypto.interface";
import { LoginUserUseCase } from "@usecases/User/login-user.usecase";
import { ICacheRepository } from "@domain/interfaces/cache.interface";
import { RegisterUserUseCase } from "@usecases/User/register-user.usecase";
import { RedisRepository } from "@infrastructure/db/redis/redis.repository";
import { TypeOrmUserRepository } from "@infrastructure/db/typeorm/typeorm.user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User]), BcryptModule, JwtModule],
  providers: [
    UserService,
    RedisRepository,
    TypeOrmUserRepository,
    {
      provide: LoginUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        jwtHandler: IJwtHandler,
        cryptoHandler: ICryptoService,
        cacheRepository: ICacheRepository
      ) => {
        return new LoginUserUseCase(
          userRepository,
          jwtHandler,
          cryptoHandler,
          cacheRepository
        );
      },
      inject: [
        TypeOrmUserRepository,
        JwtHandler,
        BcryptHandler,
        RedisRepository,
      ],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        userRepository: IUserRepository,
        cryptoService: ICryptoService,
        jwtHandler: IJwtHandler,
        cacheRepository: ICacheRepository
      ) => {
        return new RegisterUserUseCase(
          userRepository,
          cryptoService,
          jwtHandler,
          cacheRepository
        );
      },
      inject: [
        TypeOrmUserRepository,
        BcryptHandler,
        JwtHandler,
        RedisRepository,
      ],
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
