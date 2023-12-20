import { validate } from "class-validator";
import { ValidationMiddlewareInterface } from "src/domain/interfaces/validation-middleware.interface.mjs";

export class ClassValidatorValidationMiddleware implements ValidationMiddlewareInterface {
  async validate(dto: any): Promise<void> {
    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error("Validation failed");
    }
  }
}
