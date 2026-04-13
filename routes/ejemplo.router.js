import { Router } from "express";
import {
  createEjemplo,
  deleteEjemplo,
  getEjemploById,
  getEjemplos,
  updateEjemplo,
} from "../controllers/ejemplo.controller.js";
import { validateJwt } from "../middlewares/auth-jwt.middleware.js";

const ejemploRouter = Router();

ejemploRouter.get("/", getEjemplos);
ejemploRouter.get("/:id", getEjemploById);
ejemploRouter.post("/", validateJwt, createEjemplo);
ejemploRouter.put("/:id", validateJwt, updateEjemplo);
ejemploRouter.delete("/:id", validateJwt, deleteEjemplo);

export default ejemploRouter;
