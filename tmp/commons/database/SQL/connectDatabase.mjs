import { Sequelize } from "sequelize";
import isTestEnvironment from "../../utils/isTestEnvironment.mjs";

let sequelize;

if (isTestEnvironment()) {
  // Use SQLite in-memory database for tests
  sequelize = new Sequelize({
    logging: false,
    dialect: "sqlite",
    storage: ":memory:",
  });
} else {
  // Use RDS for non-test environments
  sequelize = new Sequelize({
    logging: false,
    dialect: "mysql",
    database: "ecommerce_dev",
    port: process.env.DB_PROXY_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_PROXY_ENDPOINT,
    dialectOptions: {
      ssl: "Amazon RDS",
    },
  });
}

await sequelize.authenticate();

export default sequelize;
