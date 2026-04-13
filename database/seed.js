import bcrypt from "bcryptjs";
import { usuariosDb } from "./datastores.js";

export async function seedDefaultAdmin() {
  const username = process.env.ADMIN_USER || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const existing = await usuariosDb.findOne({ username });
  if (existing) {
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await usuariosDb.insert({
    username,
    passwordHash,
    role: "admin",
  });
}
