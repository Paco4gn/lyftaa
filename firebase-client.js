import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

const DOCUMENTS = {
  "/api/profile": "profile",
  "/api/health": "health",
  "/api/habits": "habits",
  "/api/routines": "routines",
  "/api/active-workout": "activeWorkout",
  "/api/onboarding": "onboarding",
  "/api/preferences": "preferences",
  "/api/nutrition-plan": "nutritionPlan",
  "/api/notification-settings": "notificationSettings",
  "/api/privacy": "privacySettings",
  "/api/health-permissions": "healthPermissions",
  "/api/community/profile": "communityProfile",
};

const COLLECTIONS = {
  "/api/meals": "meals",
  "/api/food-photo/analyze": "foodPhotoResults",
  "/api/workouts": "workouts",
  "/api/body-metrics": "bodyMetrics",
  "/api/progress-photos": "progressPhotos",
  "/api/recipes": "recipes",
  "/api/shopping-lists": "shoppingLists",
  "/api/notifications": "notifications",
  "/api/consents": "consentEvents",
  "/api/community/posts": "communityPosts",
  "/api/community/friends": "friendships",
  "/api/community/challenges": "challenges",
};

let backendInstance = null;

export async function createFirebaseBackend() {
  if (backendInstance) return backendInstance;
  const config = window.LIFTLAB_CONFIG?.firebase || {};
  if (!hasFirebaseConfig(config)) {
    backendInstance = { configured: false, mode: "firebase-missing-config" };
    return backendInstance;
  }

  const app = initializeApp(config);
  const auth = getAuth(app);
  auth.languageCode = "es";
  const db = getFirestore(app);
  const storage = getStorage(app);
  await waitForAuth(auth);

  backendInstance = {
    configured: true,
    mode: "firebase",
    auth,
    db,
    storage,
    get user() {
      return auth.currentUser;
    },
    async request(path, options = {}) {
      return requestFirebase({ auth, db }, path, options);
    },
    async uploadFoodPhoto(file) {
      const user = requireFirebaseUser(auth);
      const cleanName = String(file.name || "comida.jpg").replace(/[^a-z0-9._-]/gi, "-").slice(0, 80);
      const path = `users/${user.uid}/food-photos/${Date.now()}-${cleanName}`;
      const storageRef = ref(storage, path);
      const snap = await uploadBytes(storageRef, file, {
        contentType: file.type || "image/jpeg",
        customMetadata: { purpose: "food-photo-analysis", owner: user.uid },
      });
      return {
        path,
        url: await getDownloadURL(snap.ref),
        name: file.name || "comida.jpg",
        size: file.size || 0,
        type: file.type || "image/jpeg",
      };
    },
  };
  return backendInstance;
}

function hasFirebaseConfig(config) {
  return ["apiKey", "authDomain", "projectId", "appId"].every((key) => {
    const value = String(config[key] || "").trim();
    return value && value.length > 5;
  });
}

function waitForAuth(auth) {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      unsubscribe();
      resolve();
    });
  });
}

async function requestFirebase(ctx, path, options = {}) {
  const method = options.method || "GET";
  const body = options.body || {};

  if (path === "/api/status") {
    return {
      ok: true,
      mode: "firebase",
      database: "firestore",
      storage: "firebase-storage",
      user: publicUser(ctx.auth.currentUser),
    };
  }

  if (method === "POST" && path === "/api/auth/register") {
    const credential = await createUserWithEmailAndPassword(ctx.auth, body.email, body.password);
    await ensureUserDefaults(ctx.db, credential.user, body.seed || {});
    return sessionPayload(ctx.db, credential.user);
  }

  if (method === "POST" && path === "/api/auth/login") {
    const credential = await signInWithEmailAndPassword(ctx.auth, body.email, body.password);
    await ensureUserDefaults(ctx.db, credential.user, {});
    return sessionPayload(ctx.db, credential.user);
  }

  if (method === "POST" && path === "/api/auth/reset") {
    const email = String(body.email || ctx.auth.currentUser?.email || "").trim();
    if (!email) throw new Error("Email requerido para recuperar contraseña");
    await sendPasswordResetEmail(ctx.auth, email);
    return { ok: true, email, message: `Email de recuperacion solicitado para ${email}.` };
  }

  if (method === "POST" && path === "/api/auth/verify-email") {
    const user = requireFirebaseUser(ctx.auth);
    await sendEmailVerification(user);
    return { ok: true, email: user.email, message: `Email de verificacion solicitado para ${user.email}.` };
  }

  if (method === "POST" && path === "/api/auth/logout") {
    await signOut(ctx.auth);
    return { ok: true };
  }

  const user = requireFirebaseUser(ctx.auth);

  if (method === "GET" && path === "/api/me") return publicUser(user);
  if (method === "GET" && path === "/api/export") return exportUserData(ctx.db, user.uid);
  if (method === "DELETE" && path === "/api/account") {
    await deleteKnownUserData(ctx.db, user.uid);
    await deleteUser(user);
    return { ok: true };
  }

  if (DOCUMENTS[path]) {
    if (method === "GET") return getUserDocument(ctx.db, user.uid, DOCUMENTS[path], defaultDocument(DOCUMENTS[path]));
    if (method === "PUT") return setUserDocument(ctx.db, user.uid, DOCUMENTS[path], body);
  }

  if (COLLECTIONS[path]) {
    const collectionName = COLLECTIONS[path];
    if (method === "GET") return listUserCollection(ctx.db, user.uid, collectionName);
    if (method === "POST") return addUserCollection(ctx.db, user.uid, collectionName, path === "/api/food-photo/analyze" ? analyzeFoodPhoto(body) : body);
  }

  if (method === "DELETE") {
    const match = Object.entries(COLLECTIONS).find(([apiPath]) => path.startsWith(`${apiPath}/`));
    if (match) {
      const id = path.split("/").pop();
      await deleteDoc(doc(ctx.db, "users", user.uid, match[1], id));
      return { ok: true };
    }
  }

  throw new Error("Ruta Firebase no implementada");
}

async function sessionPayload(db, user) {
  return { token: await user.getIdToken(), user: publicUser(user), data: await exportUserData(db, user.uid) };
}

function publicUser(user) {
  return user ? { id: user.uid, email: user.email, emailVerified: Boolean(user.emailVerified), createdAt: user.metadata?.creationTime || null } : null;
}

function requireFirebaseUser(auth) {
  if (!auth.currentUser) throw new Error("Autenticacion Firebase requerida");
  return auth.currentUser;
}

async function ensureUserDefaults(db, user, seed) {
  const root = doc(db, "users", user.uid);
  await setDoc(
    root,
    {
      email: user.email,
      provider: "firebase",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
  const defaults = {
    profile: { name: "Usuario", goal: "Ganar musculo", level: "Principiante", days: 3, sessionTime: 60, email: user.email, ...(seed.profile || {}) },
    health: { steps: 0, active: 0, resting: 0, sleep: 0, rhr: 0, hrv: 0, ...(seed.health || {}) },
    habits: seed.habits || [
      { id: "water", label: "Beber agua", done: false },
      { id: "steps", label: "Cumplir pasos", done: false },
      { id: "protein", label: "Cumplir proteina", done: false },
    ],
    routines: seed.routines || [],
    activeWorkout: seed.activeWorkout || {},
    onboarding: seed.onboarding || {},
    preferences: { language: "es", units: "metric", freePlan: true, ...(seed.preferences || {}) },
    nutritionPlan: seed.nutritionPlan || {},
    notificationSettings: { workout: true, meals: true, water: true, sleep: true, progress: true, ...(seed.notificationSettings || {}) },
    privacySettings: { publicProfile: false, shareHealthData: false, saveFoodPhotos: false, trainModelsWithPhotos: false, ...(seed.privacySettings || {}) },
    healthPermissions: { appleHealthConnected: false, read: [], write: [], ...(seed.healthPermissions || {}) },
    communityProfile: { public: false, displayName: "Usuario", ...(seed.communityProfile || {}) },
  };

  await Promise.all(
    Object.entries(defaults).map(async ([name, value]) => {
      const ref = doc(db, "users", user.uid, "private", name);
      const existing = await getDoc(ref);
      if (!existing.exists()) await setDoc(ref, { data: value, updatedAt: serverTimestamp() });
    })
  );
}

async function getUserDocument(db, uid, name, fallback) {
  const snap = await getDoc(doc(db, "users", uid, "private", name));
  return snap.exists() ? snap.data().data ?? fallback : fallback;
}

async function setUserDocument(db, uid, name, data) {
  await setDoc(doc(db, "users", uid, "private", name), { data, updatedAt: serverTimestamp() }, { merge: true });
  return data;
}

async function addUserCollection(db, uid, name, data) {
  const ref = await addDoc(collection(db, "users", uid, name), { ...data, createdAt: serverTimestamp() });
  return { id: ref.id, ...data };
}

async function listUserCollection(db, uid, name) {
  const snap = await getDocs(query(collection(db, "users", uid, name), orderBy("createdAt", "desc")));
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

async function exportUserData(db, uid) {
  const documentEntries = await Promise.all(Object.values(DOCUMENTS).map(async (name) => [name, await getUserDocument(db, uid, name, defaultDocument(name))]));
  const collectionEntries = await Promise.all(Object.entries(COLLECTIONS).map(async ([, name]) => [name, await listUserCollection(db, uid, name).catch(() => [])]));
  return {
    ...Object.fromEntries(documentEntries),
    ...Object.fromEntries(collectionEntries),
    foodPhotoResults: await listUserCollection(db, uid, "foodPhotoResults").catch(() => []),
    workouts: await listUserCollection(db, uid, "workouts").catch(() => []),
    bodyMetrics: await listUserCollection(db, uid, "bodyMetrics").catch(() => []),
    progressPhotos: await listUserCollection(db, uid, "progressPhotos").catch(() => []),
    recipes: await listUserCollection(db, uid, "recipes").catch(() => []),
    shoppingLists: await listUserCollection(db, uid, "shoppingLists").catch(() => []),
    notifications: await listUserCollection(db, uid, "notifications").catch(() => []),
    consentEvents: await listUserCollection(db, uid, "consentEvents").catch(() => []),
    communityPosts: await listUserCollection(db, uid, "communityPosts").catch(() => []),
    friendships: await listUserCollection(db, uid, "friendships").catch(() => []),
    challenges: await listUserCollection(db, uid, "challenges").catch(() => []),
  };
}

async function deleteKnownUserData(db, uid) {
  await Promise.all(Object.values(COLLECTIONS).map((name) => deleteCollectionDocs(db, uid, name)));
  await deleteCollectionDocs(db, uid, "private");
  await deleteDoc(doc(db, "users", uid)).catch(() => {});
}

async function deleteCollectionDocs(db, uid, name) {
  const snap = await getDocs(collection(db, "users", uid, name));
  await Promise.all(snap.docs.map((docSnap) => deleteDoc(docSnap.ref)));
}

function defaultDocument(name) {
  return {
    profile: {},
    health: {},
    habits: [],
    routines: [],
    activeWorkout: {},
    onboarding: {},
    preferences: {},
    nutritionPlan: {},
    notificationSettings: {},
    privacySettings: {},
    healthPermissions: {},
    communityProfile: {},
  }[name] ?? {};
}

function analyzeFoodPhoto(body) {
  const plate = body.plateSize === "Grande" ? 1.25 : body.plateSize === "Pequeno" ? 0.8 : 1;
  const extraFat = body.extraFat === "Mucho" ? 15 : body.extraFat === "No se ve" ? 7 : 0;
  const items = [
    { name: "Arroz cocido", grams: Math.round(160 * plate), kcal: Math.round(208 * plate), protein: 4.3, carbs: 44.8, fat: 0.5 },
    { name: "Pechuga de pollo", grams: Math.round(170 * plate), kcal: Math.round(281 * plate), protein: 52.7, carbs: 0, fat: 6.1 },
    { name: "Verduras", grams: Math.round(100 * plate), kcal: Math.round(35 * plate), protein: 2.4, carbs: 7.2, fat: 0.4 },
  ];
  if (extraFat) items.push({ name: "Aceite de oliva", grams: extraFat, kcal: Math.round(extraFat * 8.84), protein: 0, carbs: 0, fat: extraFat });
  return {
    approximate: true,
    provider: "firebase-client-estimator",
    warning: "No se puede conocer el peso exacto solo con imagen. Revisa antes de guardar.",
    context: body,
    items,
  };
}
