const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class RoleHasPermission extends Model {}

RoleHasPermission.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1, // Or DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    role_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    permission_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "RoleHasPermission",
    tableName: "role_has_permissions",
    timestamps: false,
  }
);

module.exports = RoleHasPermission;
