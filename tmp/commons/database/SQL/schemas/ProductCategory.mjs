import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    CategoryID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    CategoryName: DataTypes.STRING,
    CategoryDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "ProductCategories",
  }
);

export default ProductCategory;
