const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();

// init middleware
const errorMiddleware = function (err, req, res, next) {
  console.log("errorMiddleware");
  let log = `\n${req.method}: ${req.url} - ${moment().format(
    "DD/MM/YYYY"
  )}: ${JSON.stringify(req.body)} - ${err}`;
  console.log(log);

  return res.status(400).json(HttpResponse.error(err));
};

app.use(bodyParser.raw({ inflate: true, type: "application/json" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use(cors());
app.use(errorMiddleware);

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

// init db
const { countConnection } = require("./helpers/checking.connect");
require("./database/init.mysqldb");
countConnection();

// init routes
app.use("", require("./routes/index"));

// handling errors

module.exports = app;
