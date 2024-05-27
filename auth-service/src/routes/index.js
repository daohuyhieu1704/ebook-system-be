import express from "express";
import authenRouter from "./authen/index.js";
const router = express.Router();

router.use("/v1/api/authen", authenRouter);
export default router;
