import express from "express";
import { login, register } from "../controller/auth";
import { loginValidator, registerValidator } from "../validator/auth.validator";
import { validateHandler } from "../utils/helper";

const router = express.Router();

router.post("/register", registerValidator(), validateHandler, register);
router.post("/login", loginValidator(), validateHandler, login);

export default router;
