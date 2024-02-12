import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class ShoppingSession extends Model {}

ShoppingSession.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ShoppingSession",
    tableName: "shoping_sessions",
    timestamps: false,
  }
);

export default ShoppingSession;
