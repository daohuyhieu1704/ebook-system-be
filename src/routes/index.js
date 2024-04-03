import express from "express";
import authenRouter from "./authen/index.js";
import userRouter from "./user/index.js";
import bookRouter from "./book/index.js";
const router = express.Router();

router.use("/v1/api/authen", authenRouter);
router.use("/v1/api/user", userRouter);
router.use("/v1/api/book", bookRouter);
export default router;
