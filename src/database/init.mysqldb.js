const mysql = require("mysql");

const configuration = {
  host: "localhost",
  user: "root",
  password: "",
  database: "ebook_ecommerce",
};

module.exports = mysql.createPool(configuration);
