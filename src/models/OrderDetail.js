const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class OrderDetail extends Model {}

OrderDetail.init(
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
    payment_ID: {
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
    modelName: "OrderDetail",
    tableName: "order_details",
    timestamps: false,
  }
);

module.exports = OrderDetail;
