import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    PasswordHash: {
      type: DataTypes.STRING,
    },
    Address: {
      type: DataTypes.STRING,
    },
    Phone: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "Users",
  }
);

export default User;
