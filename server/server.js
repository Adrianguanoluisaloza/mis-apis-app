import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generalRouter from "../routes/index.routes.js";
import { seedDefaultAdmin } from "../database/seed.js";
import {
  errorHandler,
  notFoundHandler,
} from "../middlewares/error.middleware.js";

dotenv.config();

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.apiPath = "/api";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPath, generalRouter);
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  async listen() {
    await seedDefaultAdmin();

    // Ajuste final: backend listo para pruebas manuales.
    return this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
