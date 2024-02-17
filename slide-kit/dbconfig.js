const mysql = require("mysql");

const configuration = {
  host: "localhost",
  user: "root",
  password: "",
  database: "slide_kit",
};

export default mysql.createPool(configuration);
