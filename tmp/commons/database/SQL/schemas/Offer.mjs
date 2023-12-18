import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const Offer = sequelize.define(
  "Offer",
  {
    OfferID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    OfferProductID: DataTypes.UUID,
    OfferDescription: DataTypes.TEXT,
    OfferCouponID: DataTypes.UUID,
    OfferValidUntil: DataTypes.DATEONLY,
    OfferDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Offers",
  }
);

export default Offer;
