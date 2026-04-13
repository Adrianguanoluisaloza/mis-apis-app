import { Router } from "express";
import ejemploRouter from "./ejemplo.router.js";
import authRouter from "./auth.router.js";
import datosPersonalesRouter from "./datos-personales.router.js";

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
	res.json({
		ok: true,
		message: "API funcionando",
		endpoints: [
			"/api/auth/register",
			"/api/auth/login",
			"/api/ejemplo",
			"/api/datos-personales",
		],
	});
});

indexRouter.use("/auth", authRouter);
indexRouter.use("/ejemplo", ejemploRouter);
indexRouter.use("/datos-personales", datosPersonalesRouter);

export default indexRouter;
