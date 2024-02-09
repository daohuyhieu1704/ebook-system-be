import { Model, DataTypes } from "sequelize";
import sequelize from "../database/init.mysqldb.js";

class UserHasRole extends Model {}

UserHasRole.init(
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

export default UserHasRole;
