import express from "express";
import UserController from "../../controllers/user.controller.js";

const router = express.Router();

router.post("/shop/sign-up", new UserController().postSignUp);
// router.post("/shop/update-info", new UserController().postUpdateInfo);

export default router;
