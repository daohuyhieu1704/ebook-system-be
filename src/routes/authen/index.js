import express from "express";
import AuthenController from "../../controllers/authen.controller.js";

const router = express.Router();

router.post("/shop/login", new AuthenController().postLogin);
router.post("/shop/refresh-token", new AuthenController().postRefreshToken);

export default router;
