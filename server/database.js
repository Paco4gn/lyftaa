import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { hashPassword, verifyPassword } from "./security.js";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const dataDir = join(rootDir, "data");
mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(join(dataDir, "liftlab.sqlite"));
db.exec("PRAGMA foreign_keys = ON");
db.exec("PRAGMA journal_mode = WAL");

export function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      deleted_at TEXT
    );

    CREATE TABLE IF NOT EXISTS profiles (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS health_metrics (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS habits (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS routines (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS food_photo_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
}

export function createUser(email, password) {
  const normalized = normalizeEmail(email);
  const info = db
    .prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)")
    .run(normalized, hashPassword(password));
  createDefaultRows(info.lastInsertRowid);
  return getUserById(info.lastInsertRowid);
}

export function authenticate(email, password) {
  const user = getUserByEmail(email);
  if (!user || user.deleted_at || !verifyPassword(password, user.password_hash)) return null;
  return user;
}

export function getUserById(id) {
  return db.prepare("SELECT * FROM users WHERE id = ? AND deleted_at IS NULL").get(Number(id));
}

export function getUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ? AND deleted_at IS NULL").get(normalizeEmail(email));
}

export function deleteUser(userId) {
  db.prepare("UPDATE users SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(userId);
  db.prepare("DELETE FROM profiles WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM health_metrics WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM habits WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM routines WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM meals WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM food_photo_results WHERE user_id = ?").run(userId);
}

export function getJsonRow(table, userId, fallback) {
  const row = db.prepare(`SELECT data FROM ${table} WHERE user_id = ?`).get(userId);
  return row ? JSON.parse(row.data) : fallback;
}

export function setJsonRow(table, userId, data) {
  db.prepare(`
    INSERT INTO ${table} (user_id, data, updated_at)
    VALUES (?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP
  `).run(userId, JSON.stringify(data));
  return data;
}

export function listMeals(userId) {
  return db
    .prepare("SELECT id, data, created_at FROM meals WHERE user_id = ? ORDER BY created_at DESC, id DESC")
    .all(userId)
    .map((row) => ({ id: row.id, createdAt: row.created_at, ...JSON.parse(row.data) }));
}

export function addMeal(userId, data) {
  const info = db.prepare("INSERT INTO meals (user_id, data) VALUES (?, ?)").run(userId, JSON.stringify(data));
  return { id: info.lastInsertRowid, ...data };
}

export function deleteMeal(userId, mealId) {
  db.prepare("DELETE FROM meals WHERE user_id = ? AND id = ?").run(userId, mealId);
}

export function addFoodPhotoResult(userId, data) {
  const info = db.prepare("INSERT INTO food_photo_results (user_id, data) VALUES (?, ?)").run(userId, JSON.stringify(data));
  return { id: info.lastInsertRowid, ...data };
}

export function exportUserData(userId) {
  return {
    profile: getJsonRow("profiles", userId, {}),
    health: getJsonRow("health_metrics", userId, {}),
    habits: getJsonRow("habits", userId, []),
    routines: getJsonRow("routines", userId, []),
    meals: listMeals(userId),
  };
}

function createDefaultRows(userId) {
  setJsonRow("profiles", userId, {
    name: "Usuario",
    goal: "Ganar músculo",
    level: "Principiante",
    days: 3,
    sessionTime: 60,
  });
  setJsonRow("health_metrics", userId, {
    steps: 0,
    active: 0,
    resting: 0,
    sleep: 0,
    rhr: 0,
    hrv: 0,
  });
  setJsonRow("habits", userId, [
    { id: "water", label: "Beber agua", done: false },
    { id: "steps", label: "Cumplir pasos", done: false },
    { id: "protein", label: "Cumplir proteína", done: false },
  ]);
  setJsonRow("routines", userId, []);
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}
