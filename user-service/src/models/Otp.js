import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class Otp extends Model {}

Otp.init(
  {
    otp_token: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    otp_email: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    otp_status: {
      type: DataTypes.ENUM("pending", "active", "block"),
      allowNull: false,
      defaultValue: "pending",
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Otp",
    tableName: "otp_collection",
    timestamps: false,
    underscored: true,
  }
);

export default Otp;
