import { Router } from "express";
import { login, profile, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", profile);

export default authRouter;
