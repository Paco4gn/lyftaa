import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import {
  addFoodPhotoResult,
  addMeal,
  authenticate,
  createUser,
  db,
  deleteMeal,
  deleteUser,
  exportUserData,
  getJsonRow,
  getUserByEmail,
  getUserById,
  listMeals,
  migrate,
  setJsonRow,
} from "./database.js";
import { createToken, verifyToken } from "./security.js";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const port = Number(process.env.PORT || 5174);

migrate();

const server = createServer(async (req, res) => {
  try {
    if (req.url?.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }
    await serveStatic(req, res);
  } catch (error) {
    console.error(error);
    json(res, 500, { error: "Error interno del servidor" });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`LiftLab real backend listo en http://127.0.0.1:${port}`);
});

async function handleApi(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (req.method === "GET" && path === "/api/status") {
    json(res, 200, {
      ok: true,
      mode: "local-real-backend",
      database: "sqlite",
      users: db.prepare("SELECT COUNT(*) AS count FROM users WHERE deleted_at IS NULL").get().count,
      note: "HealthKit real requiere app iOS; esta API guarda datos manuales/sincronizados.",
    });
    return;
  }

  if (req.method === "POST" && path === "/api/auth/register") {
    const body = await readJson(req);
    validateEmailPassword(body);
    if (getUserByEmail(body.email)) return json(res, 409, { error: "El email ya existe" });
    const user = createUser(body.email, body.password);
    return json(res, 201, sessionPayload(user));
  }

  if (req.method === "POST" && path === "/api/auth/login") {
    const body = await readJson(req);
    const user = authenticate(body.email, body.password);
    if (!user) return json(res, 401, { error: "Credenciales incorrectas" });
    return json(res, 200, sessionPayload(user));
  }

  if (req.method === "POST" && path === "/api/auth/reset") {
    const body = await readJson(req);
    return json(res, 200, {
      ok: true,
      message: `Flujo preparado para enviar recuperacion segura a ${String(body.email || "").trim()}.`,
    });
  }

  const user = requireUser(req, res);
  if (!user) return;

  if (req.method === "GET" && path === "/api/me") return json(res, 200, publicUser(user));
  if (req.method === "DELETE" && path === "/api/account") {
    deleteUser(user.id);
    return json(res, 200, { ok: true });
  }

  if (req.method === "GET" && path === "/api/export") return json(res, 200, exportUserData(user.id));

  if (await jsonResource(req, res, path, user.id, "/api/profile", "profiles", {})) return;
  if (await jsonResource(req, res, path, user.id, "/api/health", "health_metrics", {})) return;
  if (await jsonResource(req, res, path, user.id, "/api/habits", "habits", [])) return;
  if (await jsonResource(req, res, path, user.id, "/api/routines", "routines", [])) return;

  if (req.method === "GET" && path === "/api/meals") return json(res, 200, listMeals(user.id));
  if (req.method === "POST" && path === "/api/meals") return json(res, 201, addMeal(user.id, await readJson(req)));
  if (req.method === "DELETE" && path.startsWith("/api/meals/")) {
    deleteMeal(user.id, Number(path.split("/").pop()));
    return json(res, 200, { ok: true });
  }

  if (req.method === "POST" && path === "/api/food-photo/analyze") {
    const body = await readJson(req);
    const result = analyzeFoodPhoto(body);
    return json(res, 200, addFoodPhotoResult(user.id, result));
  }

  json(res, 404, { error: "Ruta no encontrada" });
}

async function jsonResource(req, res, path, userId, apiPath, table, fallback) {
  if (path !== apiPath) return false;
  if (req.method === "GET") {
    json(res, 200, getJsonRow(table, userId, fallback));
    return true;
  }
  if (req.method === "PUT") {
    json(res, 200, setJsonRow(table, userId, await readJson(req)));
    return true;
  }
  json(res, 405, { error: "Metodo no permitido" });
  return true;
}

function analyzeFoodPhoto(body) {
  const plate = body.plateSize === "Grande" ? 1.25 : body.plateSize === "Pequeño" ? 0.8 : 1;
  const extraFat = body.extraFat === "Mucho" ? 15 : body.extraFat === "No se ve" ? 7 : 0;
  const items = [
    { name: "Arroz cocido", grams: Math.round(160 * plate), kcal: Math.round(208 * plate), protein: 4.3, carbs: 44.8, fat: 0.5 },
    { name: "Pechuga de pollo", grams: Math.round(170 * plate), kcal: Math.round(281 * plate), protein: 52.7, carbs: 0, fat: 6.1 },
    { name: "Verduras", grams: Math.round(100 * plate), kcal: Math.round(35 * plate), protein: 2.4, carbs: 7.2, fat: 0.4 },
  ];
  if (extraFat) items.push({ name: "Aceite de oliva", grams: extraFat, kcal: Math.round(extraFat * 8.84), protein: 0, carbs: 0, fat: extraFat });
  return {
    approximate: true,
    privacy: "La foto no se guarda salvo consentimiento explicito.",
    warning: "No se puede conocer el peso exacto solo con imagen. Revisa antes de guardar.",
    context: body,
    items,
  };
}

function sessionPayload(user) {
  return { token: createToken(user.id), user: publicUser(user), data: exportUserData(user.id) };
}

function publicUser(user) {
  return { id: user.id, email: user.email, createdAt: user.created_at };
}

function requireUser(req, res) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const payload = verifyToken(token);
  const user = payload ? getUserById(payload.sub) : null;
  if (!user) json(res, 401, { error: "Autenticacion requerida" });
  return user;
}

function validateEmailPassword(body) {
  if (!String(body.email || "").includes("@")) throw Object.assign(new Error("Email invalido"), { status: 400 });
  if (String(body.password || "").length < 6) throw Object.assign(new Error("Contraseña minima de 6 caracteres"), { status: 400 });
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function json(res, status, payload) {
  setCors(res);
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const safePath = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(rootDir, safePath);
  if (!filePath.startsWith(rootDir) || !existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const type = mimeType(extname(filePath));
  res.writeHead(200, { "content-type": type });
  res.end(await readFile(filePath));
}

function mimeType(ext) {
  return {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".json": "application/json; charset=utf-8",
  }[ext] || "application/octet-stream";
}

function setCors(res) {
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type,authorization");
}
