import helmet from "@fastify/helmet";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import fastifyCsrf from "@fastify/csrf-protection";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { level: "warn" } })
  );

  // Helmet
  app.register(helmet);

  // Cors
  app.enableCors();

  // CSRF
  await app.register(fastifyCsrf);

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger config
  if (process.env.NODE_ENV !== "production") {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle("Learning Managment System")
      .setDescription("Nest + Docker + MongoDB")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(3000, "0.0.0.0");
}
bootstrap();
