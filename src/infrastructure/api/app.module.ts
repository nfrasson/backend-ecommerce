import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthGuard } from "./auth/auth.guard";
import { UserModule } from "./User/user.module";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { DefaultController } from "./default.controller";
import { ICacheRepository } from "@domain/interfaces/cache.interface";
import { RedisRepository } from "@infrastructure/db/redis/redis.repository";
import { User } from "@domain/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: false,
      synchronize: true,
      entities: [User],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
  ],
  providers: [
    JwtService,
    RedisRepository,
    {
      provide: APP_GUARD,
      useFactory: (
        jwtService: JwtService,
        reflector: Reflector,
        cacheHandler: ICacheRepository
      ) => {
        return new AuthGuard(jwtService, reflector, cacheHandler);
      },
      inject: [JwtService, Reflector, RedisRepository],
    },
  ],
  controllers: [DefaultController],
})
export class AppModule {}
