import { spawn } from "node:child_process";

const port = 5199;
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["server/index.js"], {
  env: { ...process.env, PORT: String(port), LIFTLAB_TOKEN_SECRET: "test-secret" },
  stdio: ["ignore", "pipe", "pipe"],
});

try {
  await waitForServer();
  const email = `test-${Date.now()}@liftlab.local`;
  const register = await post("/api/auth/register", { email, password: "123456" });
  assert(register.token, "register token");
  const token = register.token;
  const profile = await put("/api/profile", { name: "Paco", goal: "Perder grasa", days: 4 }, token);
  assert(profile.name === "Paco", "profile saved");
  const health = await put("/api/health", { steps: 12000, active: 700, resting: 1800, sleep: 7 }, token);
  assert(health.steps === 12000, "health saved");
  const meal = await post("/api/meals", { date: "2026-05-13", totals: { kcal: 500 }, items: [] }, token);
  assert(meal.id, "meal saved");
  const meals = await get("/api/meals", token);
  assert(meals.length >= 1, "meals listed");
  const photo = await post("/api/food-photo/analyze", { plateSize: "Grande", extraFat: "Mucho" }, token);
  assert(photo.approximate && photo.items.length >= 3, "photo analysis");
  const exported = await get("/api/export", token);
  assert(exported.profile.name === "Paco" && exported.health.steps === 12000, "exported data");
  await del("/api/account", token);
  console.log(JSON.stringify({ ok: true, email, mealId: meal.id, photoItems: photo.items.length }, null, 2));
} finally {
  server.kill();
}

async function waitForServer() {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      const status = await get("/api/status");
      if (status.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw new Error("server did not start");
}

async function get(path, token) {
  return request(path, { method: "GET", token });
}

async function post(path, body, token) {
  return request(path, { method: "POST", body, token });
}

async function put(path, body, token) {
  return request(path, { method: "PUT", body, token });
}

async function del(path, token) {
  return request(path, { method: "DELETE", token });
}

async function request(path, { method, body, token } = {}) {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${method} ${path}: ${response.status} ${JSON.stringify(payload)}`);
  return payload;
}

function assert(condition, message) {
  if (!condition) throw new Error(`Assertion failed: ${message}`);
}
