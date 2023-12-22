import { Module } from "@nestjs/common";
import { JwtHandler } from "./jwt.service";

@Module({
  providers: [JwtHandler],
  exports: [JwtHandler],
})
export class JwtModule {}
