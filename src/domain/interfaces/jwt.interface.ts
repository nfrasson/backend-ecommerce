export interface IJwtHandler {
  generateToken(payload: any): string;
  verifyToken(token: string): any;
}
