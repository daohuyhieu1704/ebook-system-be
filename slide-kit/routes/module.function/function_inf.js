const express = require("express");
const func_inf_router = express.Router();
const bodyParser = require("body-parser");

func_inf_router.use(bodyParser.raw({ inflate: true, type: "application/json" }));
func_inf_router.use(bodyParser.json());

export default func_inf_router;
