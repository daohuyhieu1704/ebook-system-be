const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/init.mysqldb");

class Message extends Model {}

Message.init(
  {
    // Define schema based on your SQL table structure
    id: {
      type: DataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    sender_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    conversation_ID: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
  },
  {
    // Sequelize options
    sequelize, // Pass the connection instance
    modelName: "Message",
    tableName: "messages", // Explicitly specify the table name
    timestamps: false, // No timestamp columns in your table
  }
);

module.exports = Message;
