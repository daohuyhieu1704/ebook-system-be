const mysql = require("mysql");

const configuration = {
  host: "localhost",
  user: "root",
  password: "",
  database: "slide_kit",
};

module.exports = mysql.createPool(configuration);
