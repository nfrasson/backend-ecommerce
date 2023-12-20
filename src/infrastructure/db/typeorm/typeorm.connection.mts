import { DataSource } from "typeorm";
import { User } from "../../../domain/entities/user.entity.mjs";
import { DatabaseConnectionInterface } from "src/domain/interfaces/database-connection.interface.mjs";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_PROXY_ENDPOINT,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "ecommerce",
  entities: [User],
  synchronize: true,
  logging: true,
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
