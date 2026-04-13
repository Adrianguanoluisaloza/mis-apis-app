import Datastore from "nedb-promises";

export const ejemplosDb = Datastore.create({
  filename: "database/data/ejemplos.db",
  autoload: true,
  timestampData: true,
});

export const usuariosDb = Datastore.create({
  filename: "database/data/usuarios.db",
  autoload: true,
  timestampData: true,
});
