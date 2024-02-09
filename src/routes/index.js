import express from 'express';
import authenRouter from './authen/index.js';
import userRouter from './user/index.js';
const router = express.Router();

// router.use("/v1/api", require("./access"));
router.use("/v1/api/authen", authenRouter);
router.use("/v1/api/user", userRouter);

export default router;