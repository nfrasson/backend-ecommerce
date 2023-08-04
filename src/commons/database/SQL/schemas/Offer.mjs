import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const Offer = sequelize.define(
  "Offer",
  {
    OfferID: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    ProductID: {
      type: DataTypes.UUID,
    },
    OfferDescription: {
      type: DataTypes.STRING,
    },
    DiscountValue: {
      type: DataTypes.NUMBER,
    },
    DiscountType: {
      type: DataTypes.STRING,
    },
    ValidUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Offers",
  },
);

export default Offer;
