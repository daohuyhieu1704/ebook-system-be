const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class UserHasRole extends Model {}

UserHasRole.init(
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
    role_ID: {
      type: DataTypes.STRING(50),
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
    modelName: "UserHasRole",
    tableName: "user_has_roles",
    timestamps: false,
  }
);

module.exports = UserHasRole;
