import { Router } from "express";
import {
  createEjemplo,
  deleteEjemplo,
  getEjemploById,
  getEjemplos,
  updateEjemplo,
} from "../controllers/ejemplo.controller.js";

const ejemploRouter = Router();

ejemploRouter.get("/", getEjemplos);
ejemploRouter.get("/:id", getEjemploById);
ejemploRouter.post("/", createEjemplo);
ejemploRouter.put("/:id", updateEjemplo);
ejemploRouter.delete("/:id", deleteEjemplo);

export default ejemploRouter;
