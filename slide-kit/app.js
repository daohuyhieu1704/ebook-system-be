const emp_router = require("./routes/emp");
const func_router = require("./routes/function");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpResponse = require("./core/utils/HttpResponse");
const moment = require("moment");

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

const server = app.listen(port, function () {
  console.log("Listening on port: " + port);
});

server.setTimeout(0);

app.use(cors());
app.use("/emp_role", emp_router);
app.use("/emp_role/funtion", func_router);
app.use(errorMiddleware);
String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  );
};

app.get("/", function (req, res) {
  res.send("Server is running!");
});
