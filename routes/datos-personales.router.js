import { Router } from "express";
import {
  createDatoPersonal,
  deleteDatoPersonal,
  getDatoPersonalById,
  getDatosPersonales,
  updateDatoPersonal,
} from "../controllers/datos-personales.controller.js";
import { validateJwt } from "../middlewares/auth-jwt.middleware.js";

const datosPersonalesRouter = Router();

datosPersonalesRouter.get("/", getDatosPersonales);
datosPersonalesRouter.get("/:id", getDatoPersonalById);
datosPersonalesRouter.post("/", validateJwt, createDatoPersonal);
datosPersonalesRouter.put("/:id", validateJwt, updateDatoPersonal);
datosPersonalesRouter.delete("/:id", validateJwt, deleteDatoPersonal);

export default datosPersonalesRouter;
