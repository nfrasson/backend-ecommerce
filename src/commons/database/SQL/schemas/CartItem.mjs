import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const CartItem = sequelize.define(
  "CartItem",
  {
    CartItemID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    CartItemCartID: DataTypes.UUID,
    CartItemProductID: DataTypes.UUID,
    CartItemQuantity: DataTypes.INTEGER,
    CartItemDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "CartItems",
  }
);

export default CartItem;
