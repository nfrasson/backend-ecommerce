// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Signer } from "@aws-sdk/rds-signer";
import { Sequelize } from "sequelize";

const signer = new Signer({
  region: "us-east-1",
  hostname: process.env.DB_PROXY_ENDPOINT,
  port: process.env.DB_PROXY_PORT,
  username: process.env.DB_USERNAME,
});

const sequelize = new Sequelize({
  database: "ecommerce-schema-dev",
  username: process.env.DB_USERNAME,
  password:  process.env.DB_PASSWORD,
  host: process.env.DB_PROXY_ENDPOINT,
  port: process.env.DB_PROXY_PORT,
  dialect: "mysql",
  dialectOptions: {
    ssl: "Amazon RDS",
    // authPlugins: {
    //   mysql_clear_password: () => () => signer.getAuthToken(),
    // },
  },
});

await sequelize.authenticate();

export default sequelize;
