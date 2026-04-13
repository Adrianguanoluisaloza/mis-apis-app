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

  const getRes = await fetch(`${baseUrl}/ejemplo/${id}`);
  assert(getRes.ok, "GET /ejemplo/:id debe devolver 200");

  const deleteRes = await fetch(`${baseUrl}/ejemplo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  assert(deleteRes.ok, "DELETE /ejemplo/:id debe devolver 200");

  console.log("Smoke test OK: login + CRUD básico funcionando.");
} catch (error) {
  console.error("Smoke test FAIL:", error.message);
  process.exitCode = 1;
} finally {
  httpServer.close();
}
