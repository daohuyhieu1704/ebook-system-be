const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class CollectionDetail extends Model {}

CollectionDetail.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    collection_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    book_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "CollectionDetail",
    tableName: "collection_details",
    timestamps: false,
    underscored: true,
  }
);

module.exports = CollectionDetail;
