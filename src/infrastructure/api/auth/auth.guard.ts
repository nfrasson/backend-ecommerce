import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { FastifyRequest } from "fastify";
import { ICacheRepository } from "@domain/interfaces/cache.interface";
import { SKIP_AUTH_KEY } from "../utils/decorators/skip-auth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private cacheManager: ICacheRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (this.SkipAuth(context)) return true;

      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const token = this.extractTokenFromHeader(request);

      if (!token) throw new UnauthorizedException();

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!payload?.userID) throw new UnauthorizedException();

      const cachedToken = await this.cacheManager.get(payload.userID);
      if (!cachedToken || cachedToken !== token)
        throw new UnauthorizedException();

      request["user"] = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }

    return true;
  }

  private SkipAuth(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [_tokenType, token] =
      request?.headers?.authorization?.split(" ") ?? [];

    return token || undefined;
  }
}
