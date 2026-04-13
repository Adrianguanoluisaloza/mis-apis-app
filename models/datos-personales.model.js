import { datosPersonalesDb } from "../database/datastores.js";

export default class DatosPersonalesModel {
  static async getAll() {
    return datosPersonalesDb.find({}).sort({ createdAt: -1 });
  }

  static async getById(id) {
    return datosPersonalesDb.findOne({ _id: id });
  }

  static async create(payload) {
    return datosPersonalesDb.insert({
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      email: payload.email,
      telefono: payload.telefono || "",
    });
  }

  static async updateById(id, payload) {
    const updatedCount = await datosPersonalesDb.update(
      { _id: id },
      {
        $set: {
          nombres: payload.nombres,
          apellidos: payload.apellidos,
          email: payload.email,
          telefono: payload.telefono || "",
        },
      }
    );

    if (!updatedCount) {
      return null;
    }

    return datosPersonalesDb.findOne({ _id: id });
  }

  static async deleteById(id) {
    const deletedCount = await datosPersonalesDb.remove({ _id: id }, {});
    return deletedCount > 0;
  }
}
