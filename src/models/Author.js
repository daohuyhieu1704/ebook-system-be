const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: {
        type: DataTypes.TEXT,
        allowNull: false,        
    }
  },
  {
    sequelize,
    modelName: "Author",
    tableName: "authors",
    timestamps: false,
  }
);

module.exports = Author;
