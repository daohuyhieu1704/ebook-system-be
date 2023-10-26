const emp_router = require("./routes/emp");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.raw({ inflate: true, type: "application/json" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const server = app.listen(port, function () {
  console.log("Listening on port: " + port);
});

server.on("error", function (err) {
  console.log(err);
  throw err;
});

server.setTimeout(0);

app.use(cors());
app.use("/emp_role", emp_router);

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
