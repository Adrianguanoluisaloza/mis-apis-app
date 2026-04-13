import { exec } from "node:child_process";
import Server from "../server/server.js";

const TEST_PORT = 3020;
process.env.PORT = String(TEST_PORT);
process.env.ADMIN_USER = process.env.ADMIN_USER || "admin";
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
process.env.JWT_SECRET = process.env.JWT_SECRET || "postman-secret";

const serverInstance = new Server();
const httpServer = await serverInstance.listen();

function runNewman() {
  return new Promise((resolve, reject) => {
    const command =
      "npx newman run postman/mis-apis-app.collection.json -e postman/local.environment.json --reporters cli";

    const child = exec(command, { cwd: process.cwd() });

    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);

    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`Newman terminó con código ${code}`));
    });
  });
}

try {
  await runNewman();
  console.log("Postman/Newman OK: colección ejecutada correctamente.");
} catch (error) {
  console.error("Postman/Newman FAIL:", error.message);
  process.exitCode = 1;
} finally {
  httpServer.close();
}
