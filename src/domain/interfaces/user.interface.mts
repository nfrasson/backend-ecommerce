import { User } from "../entities/user.entity.mjs";

export interface UserInterface {
  register(user: User): Promise<User>;
  findByID(userId: string): Promise<User | null>;
  findByEmail(userEmail: string): Promise<User | null>;
  update(user: User, userId: string): Promise<void>;
}
