import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";
import PaymentDetail from "./PaymentDetail.js";

class OrderDetail extends Model {}

OrderDetail.init(
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
    payment_ID: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    voucher_ID: {
      type: DataTypes.STRING(50),
      allowNull: true,
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
OrderDetail.belongsTo(PaymentDetail, { foreignKey: 'payment_ID' })
PaymentDetail.hasOne(OrderDetail, { foreignKey: 'payment_ID' })
export default OrderDetail;
