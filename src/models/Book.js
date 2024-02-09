const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    author_ID : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    category_ID : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    inventory_ID : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },    
    price: {
      type: DataTypes.INT,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    modelName: "Book",
    tableName: "books",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Book;
