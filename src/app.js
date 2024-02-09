import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import moment from "moment";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import router from '../src/routes/index.js';
import "../src/database/init.mysqldb.js"; // init db


const app = express();
const { config } = dotenv;
config();

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


// init routes
app.get("/", function (req, res) {
  res.send("Server is running!");
});

app.use("", router);

// handling errors

export default app;
