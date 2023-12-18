import { DataTypes } from "sequelize";
import sequelize from "../connectDatabase.mjs";

const Coupon = sequelize.define(
  "Coupon",
  {
    CouponID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    CouponCode: DataTypes.STRING,
    CouponDescription: DataTypes.TEXT,
    CouponDiscountValue: DataTypes.DECIMAL(10, 2),
    CouponDiscountType: DataTypes.ENUM("Percent", "Fixed"),
    CouponValidUntil: DataTypes.DATEONLY,
    CouponDeletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Coupons",
  }
);

export default Coupon;
