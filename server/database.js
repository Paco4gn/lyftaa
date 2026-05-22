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

    CREATE TABLE IF NOT EXISTS onboarding_answers (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS preferences (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS nutrition_plans (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS notification_settings (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS privacy_settings (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS health_permissions (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS active_workouts (
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

    CREATE TABLE IF NOT EXISTS workout_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      routine_day TEXT,
      workout_name TEXT,
      started_at TEXT,
      completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      duration_min REAL DEFAULT 0,
      calories REAL DEFAULT 0,
      total_volume REAL DEFAULT 0,
      notes TEXT,
      data TEXT NOT NULL DEFAULT '{}',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workout_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      session_id INTEGER NOT NULL,
      exercise_id TEXT,
      exercise_name TEXT,
      set_number INTEGER NOT NULL,
      weight REAL DEFAULT 0,
      reps INTEGER DEFAULT 0,
      rpe REAL DEFAULT 0,
      completed INTEGER NOT NULL DEFAULT 0,
      notes TEXT,
      data TEXT NOT NULL DEFAULT '{}',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS body_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      measured_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      weight REAL,
      waist REAL,
      chest REAL,
      hip REAL,
      body_fat REAL,
      muscle_mass REAL,
      data TEXT NOT NULL DEFAULT '{}',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS progress_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      taken_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      storage_path TEXT,
      consent INTEGER NOT NULL DEFAULT 0,
      data TEXT NOT NULL DEFAULT '{}',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS shopping_lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      body TEXT,
      scheduled_at TEXT,
      read_at TEXT,
      data TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS consent_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      granted INTEGER NOT NULL,
      data TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS community_profiles (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS community_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      body TEXT NOT NULL,
      visibility TEXT NOT NULL DEFAULT 'private',
      data TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS community_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      post_id INTEGER NOT NULL,
      body TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS friendships (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      friend_user_id INTEGER,
      status TEXT NOT NULL DEFAULT 'pending',
      data TEXT NOT NULL DEFAULT '{}',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      data TEXT NOT NULL DEFAULT '{}',
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
  db.prepare("DELETE FROM onboarding_answers WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM active_workouts WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM preferences WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM nutrition_plans WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM notification_settings WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM privacy_settings WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM health_permissions WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM meals WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM food_photo_results WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM workout_sessions WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM body_metrics WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM progress_photos WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM recipes WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM shopping_lists WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM user_notifications WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM consent_events WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM community_profiles WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM community_posts WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM friendships WHERE user_id = ?").run(userId);
  db.prepare("DELETE FROM challenges WHERE user_id = ?").run(userId);
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

export function listFoodPhotoResults(userId) {
  return db
    .prepare("SELECT id, data, created_at FROM food_photo_results WHERE user_id = ? ORDER BY created_at DESC, id DESC")
    .all(userId)
    .map((row) => ({ id: row.id, createdAt: row.created_at, ...JSON.parse(row.data) }));
}

export function addWorkoutSession(userId, data) {
  const setRows = flattenWorkoutSets(data);
  const totalVolume = setRows.reduce((sum, set) => sum + Number(set.weight || 0) * Number(set.reps || 0), 0);
  const info = db
    .prepare(`
      INSERT INTO workout_sessions (user_id, routine_day, workout_name, started_at, completed_at, duration_min, calories, total_volume, notes, data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      userId,
      data.routineDay || data.routine_day || null,
      data.name || data.workoutName || "Entrenamiento",
      data.startedAt || null,
      data.completedAt || new Date().toISOString(),
      Number(data.durationMin || data.duration || 0),
      Number(data.calories || 0),
      totalVolume,
      data.notes || null,
      JSON.stringify(data)
    );
  const sessionId = info.lastInsertRowid;
  const insertSet = db.prepare(`
    INSERT INTO workout_sets (user_id, session_id, exercise_id, exercise_name, set_number, weight, reps, rpe, completed, notes, data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  setRows.forEach((set) => {
    insertSet.run(
      userId,
      sessionId,
      set.exerciseId || null,
      set.exerciseName || null,
      Number(set.setNumber || 1),
      Number(set.weight || 0),
      Number(set.reps || 0),
      Number(set.rpe || 0),
      set.completed ? 1 : 0,
      set.notes || null,
      JSON.stringify(set)
    );
  });
  return getWorkoutSession(userId, sessionId);
}

export function listWorkoutSessions(userId) {
  return db
    .prepare("SELECT * FROM workout_sessions WHERE user_id = ? ORDER BY completed_at DESC, id DESC")
    .all(userId)
    .map((row) => hydrateWorkoutSession(row));
}

export function getWorkoutSession(userId, sessionId) {
  const row = db.prepare("SELECT * FROM workout_sessions WHERE user_id = ? AND id = ?").get(userId, sessionId);
  return row ? hydrateWorkoutSession(row) : null;
}

export function deleteWorkoutSession(userId, sessionId) {
  db.prepare("DELETE FROM workout_sessions WHERE user_id = ? AND id = ?").run(userId, sessionId);
}

export function listRecords(table, userId) {
  return db
    .prepare(`SELECT * FROM ${table} WHERE user_id = ? ORDER BY id DESC`)
    .all(userId)
    .map((row) => hydrateRecord(row));
}

export function addRecord(table, userId, data) {
  const columns = recordInsertColumns(table, data);
  const info = db.prepare(columns.sql).run(...columns.values(userId, data));
  return { id: info.lastInsertRowid, ...data };
}

export function deleteRecord(table, userId, id) {
  db.prepare(`DELETE FROM ${table} WHERE user_id = ? AND id = ?`).run(userId, id);
}

export function exportUserData(userId) {
  return {
    profile: getJsonRow("profiles", userId, {}),
    health: getJsonRow("health_metrics", userId, {}),
    habits: getJsonRow("habits", userId, []),
    routines: getJsonRow("routines", userId, []),
    activeWorkout: getJsonRow("active_workouts", userId, null),
    onboarding: getJsonRow("onboarding_answers", userId, {}),
    preferences: getJsonRow("preferences", userId, {}),
    nutritionPlan: getJsonRow("nutrition_plans", userId, {}),
    notificationSettings: getJsonRow("notification_settings", userId, {}),
    privacySettings: getJsonRow("privacy_settings", userId, {}),
    healthPermissions: getJsonRow("health_permissions", userId, {}),
    communityProfile: getJsonRow("community_profiles", userId, {}),
    meals: listMeals(userId),
    foodPhotoResults: listFoodPhotoResults(userId),
    workouts: listWorkoutSessions(userId),
    bodyMetrics: listRecords("body_metrics", userId),
    progressPhotos: listRecords("progress_photos", userId),
    recipes: listRecords("recipes", userId),
    shoppingLists: listRecords("shopping_lists", userId),
    notifications: listRecords("user_notifications", userId),
    consentEvents: listRecords("consent_events", userId),
    communityPosts: listRecords("community_posts", userId),
    friendships: listRecords("friendships", userId),
    challenges: listRecords("challenges", userId),
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
  setJsonRow("active_workouts", userId, null);
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
  setJsonRow("onboarding_answers", userId, {});
  setJsonRow("preferences", userId, { language: "es", units: "metric", freePlan: true });
  setJsonRow("nutrition_plans", userId, {});
  setJsonRow("notification_settings", userId, {
    workout: true,
    meals: true,
    water: true,
    sleep: true,
    progress: true,
  });
  setJsonRow("privacy_settings", userId, {
    publicProfile: false,
    shareHealthData: false,
    saveFoodPhotos: false,
    trainModelsWithPhotos: false,
  });
  setJsonRow("health_permissions", userId, {
    appleHealthConnected: false,
    read: [],
    write: [],
  });
  setJsonRow("community_profiles", userId, {
    public: false,
    displayName: "Usuario",
  });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function flattenWorkoutSets(data) {
  return (data.exercises || []).flatMap((exercise, exerciseIndex) =>
    (exercise.sets || []).map((set, setIndex) => ({
      ...set,
      exerciseId: exercise.id || exercise.exerciseId,
      exerciseName: exercise.name || exercise.exerciseName,
      exerciseIndex,
      setNumber: setIndex + 1,
      completed: Boolean(set.done ?? set.completed),
    }))
  );
}

function hydrateWorkoutSession(row) {
  const sets = db.prepare("SELECT * FROM workout_sets WHERE session_id = ? ORDER BY id ASC").all(row.id).map(hydrateRecord);
  return {
    id: row.id,
    routineDay: row.routine_day,
    name: row.workout_name,
    startedAt: row.started_at,
    completedAt: row.completed_at,
    durationMin: row.duration_min,
    calories: row.calories,
    totalVolume: row.total_volume,
    notes: row.notes,
    ...JSON.parse(row.data || "{}"),
    sets,
  };
}

function hydrateRecord(row) {
  const data = row.data ? JSON.parse(row.data) : {};
  return {
    id: row.id,
    ...Object.fromEntries(Object.entries(row).filter(([key]) => !["data", "user_id", "password_hash"].includes(key))),
    ...data,
  };
}

function recordInsertColumns(table, data) {
  const json = JSON.stringify(data);
  const definitions = {
    body_metrics: {
      sql: "INSERT INTO body_metrics (user_id, measured_at, weight, waist, chest, hip, body_fat, muscle_mass, data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: (userId, value) => [
        userId,
        value.measuredAt || new Date().toISOString(),
        nullableNumber(value.weight),
        nullableNumber(value.waist),
        nullableNumber(value.chest),
        nullableNumber(value.hip),
        nullableNumber(value.bodyFat),
        nullableNumber(value.muscleMass),
        json,
      ],
    },
    progress_photos: {
      sql: "INSERT INTO progress_photos (user_id, taken_at, storage_path, consent, data) VALUES (?, ?, ?, ?, ?)",
      values: (userId, value) => [userId, value.takenAt || new Date().toISOString(), value.storagePath || null, value.consent ? 1 : 0, json],
    },
    recipes: {
      sql: "INSERT INTO recipes (user_id, name, data) VALUES (?, ?, ?)",
      values: (userId, value) => [userId, value.name || "Receta", json],
    },
    shopping_lists: {
      sql: "INSERT INTO shopping_lists (user_id, name, data) VALUES (?, ?, ?)",
      values: (userId, value) => [userId, value.name || "Lista de compra", json],
    },
    user_notifications: {
      sql: "INSERT INTO user_notifications (user_id, type, title, body, scheduled_at, data) VALUES (?, ?, ?, ?, ?, ?)",
      values: (userId, value) => [userId, value.type || "general", value.title || "Aviso", value.body || "", value.scheduledAt || null, json],
    },
    consent_events: {
      sql: "INSERT INTO consent_events (user_id, type, granted, data) VALUES (?, ?, ?, ?)",
      values: (userId, value) => [userId, value.type || "general", value.granted ? 1 : 0, json],
    },
    community_posts: {
      sql: "INSERT INTO community_posts (user_id, body, visibility, data) VALUES (?, ?, ?, ?)",
      values: (userId, value) => [userId, value.body || value.text || "", value.visibility || "private", json],
    },
    friendships: {
      sql: "INSERT INTO friendships (user_id, friend_user_id, status, data) VALUES (?, ?, ?, ?)",
      values: (userId, value) => [userId, value.friendUserId || null, value.status || "pending", json],
    },
    challenges: {
      sql: "INSERT INTO challenges (user_id, title, status, data) VALUES (?, ?, ?, ?)",
      values: (userId, value) => [userId, value.title || "Reto", value.status || "active", json],
    },
  };
  if (!definitions[table]) {
    throw new Error(`Tabla no permitida: ${table}`);
  }
  return definitions[table];
}

function nullableNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
