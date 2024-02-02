const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class Inventory extends Model {}

Inventory.init(
  {
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Inventory",
    tableName: "inventorys",
    timestamps: false,
  }
);

module.exports = Inventory;
