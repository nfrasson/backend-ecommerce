import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const Cart = sequelize.define(
  "Cart",
  {
    CartID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    CartUserID: DataTypes.UUID,
    CartDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Carts",
  }
);

export default Cart;
