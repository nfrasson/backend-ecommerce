import { DataSource } from "typeorm";
import { DatabaseConnectionInterface } from "../../../domain/interfaces/database-connection.interface.mjs";

export const AppDataSource = new DataSource({
  type: "mysql",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_PROXY_ENDPOINT,
  database: "ecommerce",
  entities: ["../../../domain/entities/*.entity.mjs"],
  logging: false,
  synchronize: true,
});

export class TypeOrmDatabaseConnection implements DatabaseConnectionInterface {
  async connect(): Promise<any> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connected");
    }
    return AppDataSource;
  }

  async disconnect(): Promise<any> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connected");
    }
    return AppDataSource;
  }
}
