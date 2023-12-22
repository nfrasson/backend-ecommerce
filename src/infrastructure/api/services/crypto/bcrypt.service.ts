import * as bcrypt from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { ICryptoService } from "@domain/interfaces/crypto.interface";

@Injectable()
export class BcryptHandler implements ICryptoService {
  constructor() {}

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  }

  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
