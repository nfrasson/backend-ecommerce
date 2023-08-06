import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const Product = sequelize.define(
  "Product",
  {
    ProductID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    ProductName: {
      type: DataTypes.STRING,
    },
    ProductCategoryID: {
      type: DataTypes.UUID,
    },
    ProductDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Products",
  }
);

export default Product;
