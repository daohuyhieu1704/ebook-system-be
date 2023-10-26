const express = require("express");
const emp_inf_router = express.Router();
const bodyParser = require("body-parser");
const mylib = require("../../mylib");
const saltedSha256 = require("salted-sha256");
const env = require("../../env.json");

emp_inf_router.use(bodyParser.raw({ inflate: true, type: "application/json" }));
emp_inf_router.use(bodyParser.json());

module.exports = emp_inf_router;
