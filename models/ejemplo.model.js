import { ejemplosDb } from "../database/datastores.js";

export default class EjemploModel {
  static async getAll() {
    return ejemplosDb.find({}).sort({ createdAt: -1 });
  }

  static async getById(id) {
    return ejemplosDb.findOne({ _id: id });
  }

  static async create(payload) {
    const data = {
      nombre: payload.nombre,
      descripcion: payload.descripcion || "",
    };
    return ejemplosDb.insert(data);
  }

  static async updateById(id, payload) {
    const updateData = {
      nombre: payload.nombre,
      descripcion: payload.descripcion || "",
    };

    const updatedCount = await ejemplosDb.update(
      { _id: id },
      { $set: updateData }
    );

    if (!updatedCount) {
      return null;
    }

    return ejemplosDb.findOne({ _id: id });
  }

  static async deleteById(id) {
    const deletedCount = await ejemplosDb.remove({ _id: id }, {});
    return deletedCount > 0;
  }
}
