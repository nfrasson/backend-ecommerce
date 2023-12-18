import { DataSource } from "typeorm";
import { User } from "../../../domain/entities/user.entity.mjs";

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

export const connectDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("Database connected");
  }
  return AppDataSource;
};
