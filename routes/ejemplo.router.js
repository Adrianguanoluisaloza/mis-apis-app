import { Router } from "express";

const ejemploRouter = Router();

ejemploRouter.get("/", (req, res) => {
  res.json({ mensaje: "GET ejemplo API" });
});

ejemploRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: "GET ejemplo por id", id });
});

ejemploRouter.post("/", (req, res) => {
  const { body } = req;
  res.json({ mensaje: "POST ejemplo", body });
});

ejemploRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  res.json({ mensaje: "PUT ejemplo", id, body });
});

ejemploRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: "DELETE ejemplo", id });
});

export default ejemploRouter;
