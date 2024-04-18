import EmailController from "../../controllers/email.controller.js";
import express from "express";
const router = express.Router();

// User's functions
router.post("/new-template", new EmailController().newTemplate);

export default router;
