import { returnHandler } from "./utils/return-handler.utils.mjs";
import { concatenateData } from "./utils/concatenate-data.utils.mjs";
import { APIFunction } from "../../domain/types/api-function.type.mjs";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { TypeOrmDatabaseConnection } from "../db/typeorm/typeorm.connection.mjs";
import { ClassValidatorValidationMiddleware } from "../utils/class-validator.validation-middleware.mjs";
import { DatabaseConnectionInterface } from "../../domain/interfaces/database-connection.interface.mjs";
import { ValidationMiddlewareInterface } from "../../domain/interfaces/validation-middleware.interface.mjs";

export class LambdaDefaultHandler {
  private dtoEntity: any;
  private handler: APIFunction;
  private databaseConnection: DatabaseConnectionInterface;
  private validationMiddleware: ValidationMiddlewareInterface;

  constructor(handler: APIFunction, dtoEntity?: any) {
    this.dtoEntity = dtoEntity;
    this.handler = handler;
    this.databaseConnection = new TypeOrmDatabaseConnection();
    this.validationMiddleware = new ClassValidatorValidationMiddleware();

    this.handleAPIGatewayEvent = this.handleAPIGatewayEvent.bind(this);
  }

  public async handleAPIGatewayEvent(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    try {
      if (this.databaseConnection) {
        await this.databaseConnection.connect();
      }

      if (event.headers?.["x-iswarmup"]) {
        console.log("WarmUp - Lambda is warm!");
        return returnHandler({ statusCode: 204 });
      }

      const requestBody: typeof this.dtoEntity = concatenateData(event);

      await this.validationMiddleware.validate(requestBody);

      const { statusCode, body } = await this.handler(requestBody);

      return returnHandler({ body, statusCode });
    } catch (error) {
      console.error("Error handling API Gateway event:", error);
      return returnHandler({ body: error, statusCode: 500 });
    }
  }
}
