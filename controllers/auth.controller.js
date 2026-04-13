import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsuarioModel from "../models/usuario.model.js";

function buildTokenPayload(user) {
  return {
    uid: user._id,
    username: user.username,
    role: user.role,
  };
}

function signToken(payload) {
  const secret = process.env.JWT_SECRET || "dev-secret";
  const expiresIn = process.env.JWT_EXPIRES_IN || "2h";
  return jwt.sign(payload, secret, { expiresIn });
}

export async function register(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "username y password son obligatorios" });
    }

    const exists = await UsuarioModel.findByUsername(username);
    if (exists) {
      return res.status(409).json({ ok: false, message: "Usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UsuarioModel.create({ username, passwordHash });

    res.status(201).json({
      ok: true,
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "username y password son obligatorios" });
    }

    const user = await UsuarioModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ ok: false, message: "Credenciales inválidas" });
    }

    const token = signToken(buildTokenPayload(user));
    res.json({ ok: true, token });
  } catch (error) {
    next(error);
  }
}

export async function profile(req, res, next) {
  try {
    res.json({ ok: true, user: req.user });
  } catch (error) {
    next(error);
  }
}
