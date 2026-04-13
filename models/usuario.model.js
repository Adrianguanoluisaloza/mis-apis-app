import { usuariosDb } from "../database/datastores.js";

export default class UsuarioModel {
  static async findByUsername(username) {
    return usuariosDb.findOne({ username });
  }

  static async create({ username, passwordHash, role = "user" }) {
    return usuariosDb.insert({ username, passwordHash, role });
  }
}
