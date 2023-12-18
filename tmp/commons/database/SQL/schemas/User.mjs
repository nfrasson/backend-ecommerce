import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const User = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    UserName: DataTypes.STRING,
    UserEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    UserPasswordHash: DataTypes.STRING,
    UserAddress: DataTypes.STRING,
    UserPhone: DataTypes.STRING,
    UserDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Users",
  }
);

export default User;
