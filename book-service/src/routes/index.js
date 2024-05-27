import express from "express";
import bookRouter from "./book/index.js";
const router = express.Router();

router.use("/v1/api/book", bookRouter);
export default router;
