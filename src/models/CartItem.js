import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    session_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    book_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INT,
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
    modelName: "CartItem",
    tableName: "cart_items",
    timestamps: false,
    underscored: true,
  }
);

export default CartItem;
