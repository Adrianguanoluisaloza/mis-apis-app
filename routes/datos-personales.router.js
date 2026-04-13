import { Router } from "express";
import {
  createDatoPersonal,
  deleteDatoPersonal,
  getDatoPersonalById,
  getDatosPersonales,
  updateDatoPersonal,
} from "../controllers/datos-personales.controller.js";

const datosPersonalesRouter = Router();

datosPersonalesRouter.get("/", getDatosPersonales);
datosPersonalesRouter.get("/:id", getDatoPersonalById);
datosPersonalesRouter.post("/", createDatoPersonal);
datosPersonalesRouter.put("/:id", updateDatoPersonal);
datosPersonalesRouter.delete("/:id", deleteDatoPersonal);

export default datosPersonalesRouter;
