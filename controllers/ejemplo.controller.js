import EjemploModel from "../models/ejemplo.model.js";

export async function getEjemplos(req, res, next) {
  try {
    const data = await EjemploModel.getAll();
    res.json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getEjemploById(req, res, next) {
  try {
    const { id } = req.params;
    const data = await EjemploModel.getById(id);

    if (!data) {
      return res.status(404).json({ ok: false, message: "Registro no encontrado" });
    }

    res.json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function createEjemplo(req, res, next) {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || typeof nombre !== "string") {
      return res
        .status(400)
        .json({ ok: false, message: "El campo nombre es obligatorio" });
    }

    const data = await EjemploModel.create({ nombre, descripcion });
    res.status(201).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateEjemplo(req, res, next) {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    if (!nombre || typeof nombre !== "string") {
      return res
        .status(400)
        .json({ ok: false, message: "El campo nombre es obligatorio" });
    }

    const data = await EjemploModel.updateById(id, { nombre, descripcion });
    if (!data) {
      return res.status(404).json({ ok: false, message: "Registro no encontrado" });
    }

    res.json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteEjemplo(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await EjemploModel.deleteById(id);

    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Registro no encontrado" });
    }

    res.json({ ok: true, message: "Registro eliminado" });
  } catch (error) {
    next(error);
  }
}
