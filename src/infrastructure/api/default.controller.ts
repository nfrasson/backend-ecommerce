import { Controller, Get, HttpCode } from "@nestjs/common";
import { SkipAuth } from "@infrastructure/api/utils/decorators/skip-auth.decorator";

@Controller()
export class DefaultController {
  constructor() {}

  @SkipAuth()
  @Get("healthcheck")
  @HttpCode(204)
  healthCheck(): void {}
}
