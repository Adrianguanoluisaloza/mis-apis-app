export function notFoundHandler(req, res) {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada",
    path: req.originalUrl,
  });
}

export function errorHandler(err, req, res, next) {
  console.error("Error no controlado:", err);
  res.status(500).json({
    ok: false,
    message: "Error interno del servidor",
  });
}
