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
  const otherEmail = `other-${Date.now()}@liftlab.local`;
  const register = await post("/api/auth/register", { email, password: "123456" });
  assert(register.token, "register token");
  const token = register.token;
  const other = await post("/api/auth/register", { email: otherEmail, password: "123456" });
  assert(other.token && other.user.id !== register.user.id, "separate users");
  const profile = await put("/api/profile", { name: "Paco", goal: "Perder grasa", days: 4 }, token);
  assert(profile.name === "Paco", "profile saved");
  const onboarding = await put("/api/onboarding", { name: "Paco", allergies: "lactosa", days: 4 }, token);
  assert(onboarding.allergies === "lactosa", "onboarding saved");
  const privacy = await put("/api/privacy", { publicProfile: false, saveFoodPhotos: false }, token);
  assert(privacy.publicProfile === false, "privacy saved");
  const healthPermissions = await put("/api/health-permissions", { appleHealthConnected: true, read: ["steps", "sleep"], write: ["workouts"] }, token);
  assert(healthPermissions.read.includes("steps"), "health permissions saved");
  const health = await put("/api/health", { steps: 12000, active: 700, resting: 1800, sleep: 7 }, token);
  assert(health.steps === 12000, "health saved");
  await put("/api/routines", [{ day: "Lunes", title: "Full body", blocks: [] }], token);
  const meal = await post("/api/meals", { date: "2026-05-13", totals: { kcal: 500 }, items: [] }, token);
  assert(meal.id, "meal saved");
  const meals = await get("/api/meals", token);
  assert(meals.length >= 1, "meals listed");
  const otherMeals = await get("/api/meals", other.token);
  assert(otherMeals.length === 0, "meals isolated by user");
  const workout = await post("/api/workouts", {
    name: "Full body",
    durationMin: 58,
    exercises: [
      { id: "bench", name: "Press banca", sets: [{ weight: 80, reps: 8, rpe: 8, done: true }] },
      { id: "squat", name: "Sentadilla", sets: [{ weight: 100, reps: 5, rpe: 8.5, done: true }] },
    ],
  }, token);
  assert(workout.id && workout.sets.length === 2 && workout.totalVolume > 0, "workout and sets saved");
  const metric = await post("/api/body-metrics", { weight: 81.5, waist: 84, measuredAt: "2026-05-13T08:00:00.000Z" }, token);
  assert(metric.id && metric.weight === 81.5, "body metric saved");
  const recipe = await post("/api/recipes", { name: "Bowl alto en proteina", kcal: 620, protein: 48 }, token);
  assert(recipe.id, "recipe saved");
  const shopping = await post("/api/shopping-lists", { name: "Semana 1", items: ["pollo", "arroz", "verduras"] }, token);
  assert(shopping.id, "shopping list saved");
  const consent = await post("/api/consents", { type: "apple_health", granted: true, read: ["steps"] }, token);
  assert(consent.id, "consent saved");
  const photo = await post("/api/food-photo/analyze", { plateSize: "Grande", extraFat: "Mucho" }, token);
  assert(photo.approximate && photo.items.length >= 3, "photo analysis");
  const schema = await get("/api/database/schema", token);
  assert(schema.some((table) => table.table === "workout_sets"), "schema exposes workout sets");
  const exported = await get("/api/export", token);
  assert(exported.profile.name === "Paco" && exported.health.steps === 12000, "exported data");
  assert(exported.onboarding.allergies === "lactosa", "export onboarding");
  assert(exported.workouts.length >= 1 && exported.bodyMetrics.length >= 1 && exported.recipes.length >= 1, "export complete user data");
  await del("/api/account", token);
  await del("/api/account", other.token);
  console.log(JSON.stringify({ ok: true, email, mealId: meal.id, workoutId: workout.id, photoItems: photo.items.length, tables: schema.length }, null, 2));
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
