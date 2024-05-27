import express from "express";
import orderRouter from "./order/index.js";
const router = express.Router();

router.use("/v1/api/order", orderRouter);
export default router;
