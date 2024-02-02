const mongoose = require("mongoose");
const config = require("../configs/config.mongodb");

const connectStr = config.db.uri || "mongodb://127.0.0.1:27017";

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(connectStr, {
        maxPoolSize: 50,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error", err);
      });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

const instanceDB = Database.getInstance();

module.exports = instanceDB;
