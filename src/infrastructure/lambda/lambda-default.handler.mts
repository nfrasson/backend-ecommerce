import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { returnHandler } from "./utils/return-handler.utils.mjs";
import { concatenateData } from "./utils/concatenate-data.utils.mjs";
import { APIFunction } from "../../domain/types/api-function.type.mjs";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export class LambdaDefaultHandler {
  private handler: APIFunction;
  private entity?: any;
  private connectToDatabase?: () => Promise<any>;

  constructor(
    handler: APIFunction,
    entity: any,
    connectToDatabase?: () => Promise<any>
  ) {
    this.handler = handler;
    this.entity = entity;
    this.connectToDatabase = connectToDatabase;

    this.handleAPIGatewayEvent = this.handleAPIGatewayEvent.bind(this);
  }

  public async handleAPIGatewayEvent(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    try {
      if (this.connectToDatabase) {
        await this.connectToDatabase();
      }

      if (event.headers?.["x-iswarmup"]) {
        console.log("WarmUp - Lambda is warm!");
        return returnHandler({ statusCode: 204 });
      }

      const userObject: object = plainToClass(
        this.entity,
        concatenateData(event)
      );
      const errors = await validate(userObject);

      if (errors.length > 0) {
        console.log("fala galera", JSON.stringify(errors));
        throw new Error("Validation failed");
      }

      const { statusCode, body } = await this.handler(
        userObject as typeof this.entity
      );

      return returnHandler({ body, statusCode });
    } catch (error) {
      console.error("Error handling API Gateway event:", error);
      return returnHandler({ body: error, statusCode: 500 });
    }
  }
}
