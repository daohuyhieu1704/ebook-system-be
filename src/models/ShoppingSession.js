const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class ShoppingSession extends Model {}

ShoppingSession.init(
  {
    id: {
      type: DataTypes.STRING(50),
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

module.exports = ShoppingSession;
