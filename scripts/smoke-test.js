import Server from "../server/server.js";

const TEST_PORT = 3010;

process.env.PORT = String(TEST_PORT);
process.env.JWT_SECRET = process.env.JWT_SECRET || "smoke-secret";
process.env.ADMIN_USER = process.env.ADMIN_USER || "admin";
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const serverInstance = new Server();
const httpServer = await serverInstance.listen();

const baseUrl = `http://127.0.0.1:${TEST_PORT}/api`;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  const health = await fetch(`${baseUrl}/`);
  assert(health.ok, "La ruta base /api debe responder 200");

  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "admin", password: "admin123" }),
  });

  assert(loginRes.ok, "El login del admin por defecto debe funcionar");
  const loginData = await loginRes.json();
  const token = loginData.token;
  assert(Boolean(token), "El login debe devolver token JWT");

  const createRes = await fetch(`${baseUrl}/ejemplo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre: "Registro de prueba", descripcion: "smoke" }),
  });

  assert(createRes.status === 201, "POST /ejemplo debe devolver 201");
  const createData = await createRes.json();
  const id = createData?.data?._id;
  assert(Boolean(id), "El registro creado debe tener _id");

  const updateRes = await fetch(`${baseUrl}/ejemplo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ nombre: "Registro actualizado", descripcion: "smoke-upd" }),
  });
  assert(updateRes.ok, "PUT /ejemplo/:id debe devolver 200");

  const listRes = await fetch(`${baseUrl}/ejemplo`);
  assert(listRes.ok, "GET /ejemplo debe devolver 200");

  const getRes = await fetch(`${baseUrl}/ejemplo/${id}`);
  assert(getRes.ok, "GET /ejemplo/:id debe devolver 200");

  const deleteRes = await fetch(`${baseUrl}/ejemplo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  assert(deleteRes.ok, "DELETE /ejemplo/:id debe devolver 200");

  const createDatoRes = await fetch(`${baseUrl}/datos-personales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombres: "Adrian",
      apellidos: "Guano",
      email: "adrian@example.com",
      telefono: "099000111",
    }),
  });
  assert(createDatoRes.status === 201, "POST /datos-personales debe devolver 201");

  const createDatoData = await createDatoRes.json();
  const datoId = createDatoData?.data?._id;
  assert(Boolean(datoId), "El dato personal creado debe tener _id");

  const updateDatoRes = await fetch(`${baseUrl}/datos-personales/${datoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nombres: "Adrian",
      apellidos: "Guano L",
      email: "adrian@example.com",
      telefono: "098111222",
    }),
  });
  assert(updateDatoRes.ok, "PUT /datos-personales/:id debe devolver 200");

  const getDatoRes = await fetch(`${baseUrl}/datos-personales/${datoId}`);
  assert(getDatoRes.ok, "GET /datos-personales/:id debe devolver 200");

  const listDatoRes = await fetch(`${baseUrl}/datos-personales`);
  assert(listDatoRes.ok, "GET /datos-personales debe devolver 200");

  const deleteDatoRes = await fetch(`${baseUrl}/datos-personales/${datoId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  assert(deleteDatoRes.ok, "DELETE /datos-personales/:id debe devolver 200");

  console.log("Smoke test OK: login + CRUD completo en ejemplo y datos-personales.");
} catch (error) {
  console.error("Smoke test FAIL:", error.message);
  process.exitCode = 1;
} finally {
  httpServer.close();
}
