import { Router } from "express";
import ejemploRouter from "./ejemplo.router.js";
import authRouter from "./auth.router.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
	res.json({
		ok: true,
		message: "API funcionando",
		endpoints: ["/api/auth/register", "/api/auth/login", "/api/ejemplo"],
	});
});

indexRouter.use("/auth", authRouter);
indexRouter.use("/ejemplo", ejemploRouter);

export default indexRouter;
