import express from "express";
import userRouter from "./user/index.js";
const router = express.Router();

router.use("/v1/api/user", userRouter);
export default router;
