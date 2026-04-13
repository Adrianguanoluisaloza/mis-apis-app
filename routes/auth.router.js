import { Router } from "express";
import { login, profile, register } from "../controllers/auth.controller.js";
import { validateJwt } from "../middlewares/auth-jwt.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/profile", validateJwt, profile);

export default authRouter;
