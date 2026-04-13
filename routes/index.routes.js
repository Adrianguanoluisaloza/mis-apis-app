import { Router } from "express";
import ejemploRouter from "./ejemplo.router.js";

const indexRouter = Router();

indexRouter.use("/ejemplo", ejemploRouter);

export default indexRouter;
