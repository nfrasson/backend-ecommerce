import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { IJwtHandler } from "@domain/interfaces/jwt.interface";

@Injectable()
export class JwtHandler implements IJwtHandler {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
