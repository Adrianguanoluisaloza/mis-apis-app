import DatosPersonalesModel from "../models/datos-personales.model.js";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(payload) {
  if (!payload.nombres || !payload.apellidos || !payload.email) {
    return "nombres, apellidos y email son obligatorios";
  }

  if (!isValidEmail(payload.email)) {
    return "email no tiene formato válido";
  }

  return null;
}

export async function getDatosPersonales(req, res, next) {
  try {
    const data = await DatosPersonalesModel.getAll();
    res.json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getDatoPersonalById(req, res, next) {
  try {
    const { id } = req.params;
    const data = await DatosPersonalesModel.getById(id);

    if (!data) {
      return res.status(404).json({ ok: false, message: "Registro no encontrado" });
    }

    res.json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function createDatoPersonal(req, res, next) {
  try {
    const errorMessage = validatePayload(req.body);
    if (errorMessage) {
      return res.status(400).json({ ok: false, message: errorMessage });
    }

    const data = await DatosPersonalesModel.create(req.body);
    res.status(201).json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function updateDatoPersonal(req, res, next) {
  try {
    const { id } = req.params;
    const errorMessage = validatePayload(req.body);
    if (errorMessage) {
      return res.status(400).json({ ok: false, message: errorMessage });
    }

    const data = await DatosPersonalesModel.updateById(id, req.body);
    if (!data) {
      return res.status(404).json({ ok: false, message: "Registro no encontrado" });
    }

    res.json({ ok: true, data });
  } catch (error) {
    next(error);
  }
}

export async function deleteDatoPersonal(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await DatosPersonalesModel.deleteById(id);

    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Registro no encontrado" });
    }

    res.json({ ok: true, message: "Registro eliminado" });
  } catch (error) {
    next(error);
  }
}
