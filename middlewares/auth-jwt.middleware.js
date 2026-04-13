import jwt from "jsonwebtoken";

export function validateJwt(req, res, next) {
  const authHeader = req.header("Authorization") || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ ok: false, message: "Token requerido" });
  }

  try {
    const secret = process.env.JWT_SECRET || "dev-secret";
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ ok: false, message: "Token inválido o expirado" });
  }
}
