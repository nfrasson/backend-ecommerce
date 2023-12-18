import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const Order = sequelize.define(
  "Order",
  {
    OrderID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    OrderUserID: DataTypes.UUID,
    OrderDate: DataTypes.DATEONLY,
    OrderStatus: DataTypes.ENUM("Pending", "Shipped", "Delivered"),
    OrderTotal: DataTypes.DECIMAL(10, 2),
    OrderDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Orders",
  }
);

export default Order;
