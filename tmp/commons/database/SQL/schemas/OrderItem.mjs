import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    OrderItemID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    OrderItemOrderID: DataTypes.UUID,
    OrderItemProductID: DataTypes.UUID,
    OrderItemQuantity: DataTypes.INTEGER,
    OrderItemPricePerItem: DataTypes.DECIMAL(10, 2),
    OrderItemDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "OrderItems",
  }
);

export default OrderItem;
