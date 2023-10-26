const mysql = require("mysql");

const configuration = {
  host: "localhost",
  user: "root",
  password: "",
  database: "slide-kit",
};

module.exports = mysql.createPool(configuration);
