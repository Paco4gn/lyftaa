const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const exercises = [
  {
    id: "bench",
    name: "Press banca",
    muscle: "Pecho",
    equipment: "Barra",
    type: "push",
    cues: ["Escapulas juntas y bajas.", "Baja la barra controlada al esternon.", "Empuja el suelo con los pies."],
    description: "Movimiento principal de empuje horizontal para pecho, deltoide anterior y triceps.",
  },
  {
    id: "incline-db",
    name: "Press inclinado mancuernas",
    muscle: "Pecho",
    equipment: "Mancuernas",
    type: "push",
    cues: ["Banco entre 25 y 35 grados.", "Codos ligeramente por debajo de los hombros.", "Junta las mancuernas sin chocarlas."],
    description: "Variante estable para enfatizar la porcion clavicular del pecho.",
  },
  {
    id: "dip",
    name: "Fondos",
    muscle: "Tríceps",
    equipment: "Paralelas",
    type: "push",
    cues: ["Inclina el torso si buscas pecho.", "Bloquea suave arriba.", "Mantén hombros lejos de las orejas."],
    description: "Ejercicio de peso corporal con alta transferencia a fuerza de empuje.",
  },
  {
    id: "lat-pulldown",
    name: "Jalon al pecho",
    muscle: "Espalda",
    equipment: "Polea",
    type: "pull",
    cues: ["Inicia con depresion escapular.", "Lleva la barra al pecho alto.", "Evita tirar con la zona lumbar."],
    description: "Patron vertical para dorsales, redondo mayor y biceps.",
  },
  {
    id: "row",
    name: "Remo sentado",
    muscle: "Espalda",
    equipment: "Polea",
    type: "pull",
    cues: ["Pecho alto.", "Codos hacia atras y cerca del cuerpo.", "Pausa un segundo al contraer."],
    description: "Remo horizontal fácil de progresar y muy útil para volumen de espalda.",
  },
  {
    id: "curl",
    name: "Curl barra",
    muscle: "Bíceps",
    equipment: "Barra",
    type: "pull",
    cues: ["Codos quietos.", "Sube sin balanceo.", "Controla la bajada completa."],
    description: "Aislamiento clasico de biceps con buena carga progresiva.",
  },
  {
    id: "squat",
    name: "Sentadilla",
    muscle: "Pierna",
    equipment: "Barra",
    type: "legs",
    cues: ["Respira y bloquea el tronco.", "Rodillas siguen la línea de los pies.", "Mantén el medio pie firme."],
    description: "Patron dominante de rodilla para fuerza global y masa muscular.",
  },
  {
    id: "rdl",
    name: "Peso muerto rumano",
    muscle: "Femoral",
    equipment: "Barra",
    type: "legs",
    cues: ["Cadera atras.", "Barra pegada al cuerpo.", "Espalda neutra durante todo el recorrido."],
    description: "Bisagra de cadera para isquios, gluteo y erectores.",
  },
  {
    id: "leg-ext",
    name: "Extension de cuadriceps",
    muscle: "Pierna",
    equipment: "Maquina",
    type: "legs",
    cues: ["Ajusta el eje a la rodilla.", "Pausa arriba.", "No rebotes abajo."],
    description: "Aislamiento de cuadriceps ideal para controlar volumen sin fatiga sistemica alta.",
  },
  {
    id: "lateral-raise",
    name: "Elevacion lateral",
    muscle: "Hombro",
    equipment: "Mancuernas",
    type: "push",
    cues: ["Ligera inclinacion hacia delante.", "Sube hasta linea de hombro.", "Conduce con el codo."],
    description: "Aislamiento del deltoide medio para anchura visual del torso.",
  },
  {
    id: "pull-up",
    name: "Dominada",
    muscle: "Espalda",
    equipment: "Barra fija",
    type: "pull",
    cues: ["Cuerpo firme.", "Barbilla sobre la barra.", "Baja hasta extension controlada."],
    description: "Movimiento vertical de alto valor para fuerza relativa.",
  },
  {
    id: "hip-thrust",
    name: "Hip thrust",
    muscle: "Glúteo",
    equipment: "Barra",
    type: "legs",
    cues: ["Menton ligeramente recogido.", "Pausa arriba.", "Costillas abajo al bloquear."],
    description: "Extension de cadera enfocada en gluteo con gran potencial de carga.",
  },
];

exercises.push(
  { id: "overhead-press", name: "Press militar", muscle: "Hombro", equipment: "Barra", type: "push", cues: ["Glúteos apretados.", "Barra cerca de la cara.", "Bloquea arriba sin arquear."], description: "Empuje vertical básico para hombros y tríceps." },
  { id: "pec-deck", name: "Contractora", muscle: "Pecho", equipment: "Maquina", type: "push", cues: ["Antebrazos firmes.", "Pausa al cerrar.", "No adelantes la cabeza."], description: "Aislamiento estable para pecho con tension constante." },
  { id: "triceps-pushdown", name: "Extensión tríceps polea", muscle: "Tríceps", equipment: "Polea", type: "push", cues: ["Codos pegados.", "Extiende hasta bloquear suave.", "Sube controlado."], description: "Aislamiento de tríceps fácil de dosificar." },
  { id: "face-pull", name: "Face pull", muscle: "Hombro", equipment: "Polea", type: "pull", cues: ["Tira hacia la frente.", "Abre codos.", "Pausa atras."], description: "Trabajo de deltoide posterior y rotadores externos." },
  { id: "deadlift", name: "Peso muerto", muscle: "Espalda", equipment: "Barra", type: "pull", cues: ["Barra sobre medio pie.", "Dorsales tensos.", "Empuja el suelo."], description: "Bisagra pesada para fuerza total." },
  { id: "tbar-row", name: "Remo T", muscle: "Espalda", equipment: "Maquina", type: "pull", cues: ["Pecho apoyado si es posible.", "Codos atras.", "No rebotes."], description: "Remo pesado para densidad de espalda." },
  { id: "hammer-curl", name: "Curl martillo", muscle: "Bíceps", equipment: "Mancuernas", type: "pull", cues: ["Muñeca neutra.", "Codos estables.", "Bajada lenta."], description: "Bíceps y braquial con agarre neutro." },
  { id: "leg-press", name: "Prensa", muscle: "Pierna", equipment: "Maquina", type: "legs", cues: ["Espalda pegada.", "Rodillas siguen pies.", "No bloquees agresivo."], description: "Dominante de rodilla con carga alta y buena estabilidad." },
  { id: "lunge", name: "Zancada", muscle: "Pierna", equipment: "Mancuernas", type: "legs", cues: ["Paso firme.", "Torso alto.", "Empuja con la pierna delantera."], description: "Unilateral para cuadriceps, gluteo y estabilidad." },
  { id: "leg-curl", name: "Curl femoral", muscle: "Femoral", equipment: "Maquina", type: "legs", cues: ["Cadera pegada.", "Pausa al flexionar.", "Controla la extension."], description: "Aislamiento directo de isquiosurales." },
  { id: "calf-raise", name: "Elevacion gemelo", muscle: "Gemelo", equipment: "Maquina", type: "legs", cues: ["Estira abajo.", "Sube completo.", "Pausa arriba."], description: "Trabajo de gemelo con recorrido completo." },
  { id: "plank", name: "Plancha", muscle: "Core", equipment: "Peso corporal", type: "legs", cues: ["Costillas abajo.", "Glúteos activos.", "Respira sin perder posición."], description: "Anti-extensión básica para core." },
  { id: "push-up", name: "Flexion", muscle: "Pecho", equipment: "Peso corporal", type: "push", cues: ["Cuerpo en bloque.", "Pecho al suelo.", "Codos a 45 grados."], description: "Empuje horizontal de peso corporal." },
  { id: "cable-fly", name: "Cruce poleas", muscle: "Pecho", equipment: "Polea", type: "push", cues: ["Paso estable.", "Abrazo amplio.", "Pausa al cerrar."], description: "Aislamiento de pecho con tension continua." },
  { id: "seated-db-press", name: "Press hombro mancuernas", muscle: "Hombro", equipment: "Mancuernas", type: "push", cues: ["Banco firme.", "Mancuernas sobre codos.", "Recorrido controlado."], description: "Empuje vertical con libertad escapular." },
  { id: "wide-pulldown", name: "Jalon agarre amplio", muscle: "Espalda", equipment: "Polea", type: "pull", cues: ["Pecho alto.", "Codos hacia costillas.", "No tires tras nuca."], description: "Variante para dorsales con agarre amplio." },
  { id: "single-row", name: "Remo una mano", muscle: "Espalda", equipment: "Mancuerna", type: "pull", cues: ["Apoyo estable.", "Codo hacia cadera.", "No gires el tronco."], description: "Remo unilateral para equilibrar lados." },
  { id: "glute-bridge", name: "Puente glúteo", muscle: "Glúteo", equipment: "Peso corporal", type: "legs", cues: ["Pies cerca de glúteos.", "Pausa arriba.", "Pelvis neutra."], description: "Extensión de cadera accesible y progresable." }
);

const routineTemplates = [
  {
    id: "push",
    name: "Empuje A",
    focus: "Pecho, hombro y triceps",
    days: "2 días por semana",
    difficulty: "Intermedio",
    bars: [86, 66, 42],
    exerciseIds: ["bench", "incline-db", "dip", "lateral-raise"],
  },
  {
    id: "pull",
    name: "Tiron A",
    focus: "Espalda y biceps",
    days: "2 días por semana",
    difficulty: "Intermedio",
    bars: [72, 82, 55],
    exerciseIds: ["lat-pulldown", "row", "pull-up", "curl"],
  },
  {
    id: "legs",
    name: "Legs A",
    focus: "Cuádriceps, femoral y glúteo",
    days: "1 día por semana",
    difficulty: "Avanzado",
    bars: [94, 74, 62],
    exerciseIds: ["squat", "rdl", "leg-ext", "hip-thrust"],
  },
  {
    id: "power",
    name: "Torso fuerza",
    focus: "Fuerza maxima y marcas",
    days: "1 día por semana",
    difficulty: "Avanzado",
    bars: [96, 58, 48],
    exerciseIds: ["bench", "pull-up", "row", "lateral-raise"],
  },
  {
    id: "hypertrophy",
    name: "Hipertrofia mixta",
    focus: "Volumen controlado",
    days: "3 días por semana",
    difficulty: "Principiante",
    bars: [64, 78, 70],
    exerciseIds: ["incline-db", "lat-pulldown", "leg-ext", "curl"],
  },
  {
    id: "fullbody",
    name: "Cuerpo completo",
    focus: "Consistencia total",
    days: "3 días por semana",
    difficulty: "Principiante",
    bars: [74, 68, 76],
    exerciseIds: ["squat", "bench", "row", "rdl"],
  },
];

const weeklyRoutinePlan = [
  {
    day: "Lunes",
    title: "Push - pecho, hombro y triceps",
    status: "Pendiente",
    duration: "62 min",
    difficulty: "Media",
    muscles: ["Pecho", "Hombro", "Tríceps"],
    blocks: [
      { name: "Calentamiento", exercises: ["Movilidad hombro", "Press banca aproximacion"] },
      { name: "Principal", exercises: ["Press banca", "Press inclinado mancuernas"] },
      { name: "Accesorios", exercises: ["Fondos", "Elevacion lateral"] },
    ],
  },
  {
    day: "Martes",
    title: "Pull - espalda y biceps",
    status: "Pendiente",
    duration: "58 min",
    difficulty: "Media",
    muscles: ["Espalda", "Bíceps"],
    blocks: [
      { name: "Calentamiento", exercises: ["Activacion escapular", "Jalon suave"] },
      { name: "Principal", exercises: ["Dominadas", "Remo con barra"] },
      { name: "Accesorios", exercises: ["Jalon al pecho", "Curl biceps"] },
    ],
  },
  {
    day: "Miercoles",
    title: "Movilidad y pasos",
    status: "Recuperación",
    duration: "25 min",
    difficulty: "Suave",
    muscles: ["Core", "Movilidad"],
    blocks: [
      { name: "Movilidad", exercises: ["Cadera", "Columna toracica"] },
      { name: "Hábito", exercises: ["8.000 pasos", "Respiración 5 min"] },
    ],
  },
  {
    day: "Jueves",
    title: "Pierna y gluteo",
    status: "Pendiente",
    duration: "70 min",
    difficulty: "Alta",
    muscles: ["Pierna", "Femoral", "Glúteo"],
    blocks: [
      { name: "Calentamiento", exercises: ["Movilidad tobillo", "Sentadilla goblet"] },
      { name: "Principal", exercises: ["Sentadilla", "Peso muerto rumano"] },
      { name: "Accesorios", exercises: ["Extension cuadriceps", "Hip thrust"] },
    ],
  },
  {
    day: "Viernes",
    title: "Torso fuerza",
    status: "Pendiente",
    duration: "55 min",
    difficulty: "Media",
    muscles: ["Pecho", "Espalda", "Hombro"],
    blocks: [
      { name: "Principal", exercises: ["Press banca pesado", "Dominadas"] },
      { name: "Accesorios", exercises: ["Remo", "Press hombro mancuernas"] },
      { name: "Core", exercises: ["Plancha", "Pallof press"] },
    ],
  },
];

const defaultRoutinePlan = cloneData(weeklyRoutinePlan);

const progressData = {
  volume: [22400, 24750, 23820, 26800, 30340, 31800, 34820],
  orm: [98, 101, 102, 105, 108, 110, 112],
  sets: [44, 47, 45, 52, 58, 61, 64],
};

const muscleGroups = [
  ["Pecho", "Pecho", "front"],
  ["Bíceps", "Bíceps", "front"],
  ["Tríceps", "Tríceps", "back"],
  ["Espalda", "Espalda", "back"],
  ["Hombros", "Hombro", "front"],
  ["Abdominales", "Core", "front"],
  ["Cuádriceps", "Pierna", "front"],
  ["Isquiotibiales", "Femoral", "back"],
  ["Glúteos", "Glúteo", "back"],
  ["Gemelos", "Gemelo", "back"],
];

const feed = [
  ["LL", "Tus marcas apareceran aqui", "Registra un entreno para crear historial privado", "Privado"],
  ["LL", "Tu resumen semanal aparecera aqui", "Solo se carga con datos de tu cuenta", "Privado"],
  ["LL", "Tus rutinas guardadas apareceran aqui", "Nadie ve esta actividad salvo tu", "Privado"],
];

const foodDb = [
  ["pechuga de pollo", ["pollo", "pechuga", "chicken"], 165, 31, 0, 3.6],
  ["arroz cocido", ["arroz", "rice"], 130, 2.7, 28, 0.3],
  ["pasta cocida", ["pasta", "macarrones", "espagueti"], 158, 5.8, 31, 0.9],
  ["avena", ["oats", "copos de avena"], 389, 16.9, 66, 6.9],
  ["claras de huevo", ["claras", "clara"], 52, 10.9, 0.7, 0.2],
  ["huevo", ["huevos", "egg"], 143, 12.6, 0.7, 9.5, 50],
  ["leche semidesnatada", ["leche", "milk"], 47, 3.4, 4.8, 1.6],
  ["yogur griego", ["yogur", "yogurt griego"], 97, 9, 3.9, 5],
  ["proteina whey", ["whey", "proteina", "proteina en polvo"], 400, 80, 8, 6, 30],
  ["platano", ["platano", "banana"], 89, 1.1, 23, 0.3, 120],
  ["manzana", ["apple"], 52, 0.3, 14, 0.2, 180],
  ["aguacate", ["avocado"], 160, 2, 8.5, 14.7],
  ["aceite de oliva", ["aceite", "aove"], 884, 0, 0, 100, 10],
  ["pan integral", ["pan", "tostada integral"], 247, 13, 41, 4.2, 35],
  ["patata cocida", ["patata", "papa"], 87, 1.9, 20, 0.1],
  ["boniato", ["batata"], 86, 1.6, 20, 0.1],
  ["pavo", ["pechuga de pavo"], 104, 22, 1, 1.5],
  ["ternera magra", ["ternera", "carne"], 170, 26, 0, 7],
  ["salmon", ["salmon"], 208, 20, 0, 13],
  ["atun natural", ["atun", "atun al natural"], 116, 26, 0, 1, 80],
  ["merluza", ["pescado blanco"], 89, 17, 0, 2],
  ["brocoli", ["brocoli"], 35, 2.4, 7.2, 0.4],
  ["tomate", ["tomates"], 18, 0.9, 3.9, 0.2, 120],
  ["ensalada", ["lechuga", "verdura"], 20, 1.2, 3.5, 0.2],
  ["garbanzos cocidos", ["garbanzos"], 164, 8.9, 27, 2.6],
  ["lentejas cocidas", ["lentejas"], 116, 9, 20, 0.4],
  ["almendras", ["almendra"], 579, 21, 22, 50],
  ["mantequilla cacahuete", ["crema cacahuete", "cacahuete"], 588, 25, 20, 50],
  ["queso fresco batido", ["queso fresco", "quark"], 62, 8.5, 4, 0.2],
  ["cafe con leche", ["cafe leche", "cortado"], 35, 1.8, 3, 1.2, 200],
  ["pizza", ["porcion pizza", "porcion pizza"], 266, 11, 33, 10],
  ["hamburguesa", ["burger"], 254, 17, 24, 10],
];

let mealLog = loadMealLog();

const defaultAppData = {
  account: null,
  profile: {
    name: "Usuario",
    age: 30,
    sex: "male",
    height: 178,
    weight: 82,
    goal: "Ganar músculo",
    secondaryGoal: "Mejorar salud general",
    level: "Principiante",
    days: 3,
    sessionTime: 60,
    place: "Gimnasio",
    equipment: "",
    injuries: "",
    medical: "",
    sleep: "Normal",
    stress: "Medio",
    work: "Mixto",
    steps: 8000,
    diet: "",
    allergies: "",
    intolerances: "",
    dislikes: "",
    meals: 4,
    budget: "Medio",
    trainingTime: "18:30",
    mealTimes: "08:00, 14:00, 18:00, 21:00",
    health: "manual",
  },
  health: {
    steps: 0,
    active: 0,
    resting: 0,
    sleep: 0,
    rhr: 0,
    hrv: 0,
    distance: 0,
    workouts: 0,
    activityMinutes: 0,
  },
  workoutHistory: [],
  privacySettings: {
    publicProfile: false,
    autoRest: true,
    healthSync: false,
    recordNotifications: true,
  },
  communityProfile: {
    public: false,
    displayName: "Usuario",
  },
  communityPosts: [],
  habits: [
    { id: "water", label: "Beber 2 vasos de agua", done: false },
    { id: "steps", label: "Llegar al objetivo de pasos", done: false },
    { id: "protein", label: "Cumplir proteína", done: false },
    { id: "sleep", label: "Preparar sueño", done: false },
  ],
  selectedWeekDay: 0,
  photoItems: [
    { name: "Arroz cocido", grams: 150, kcal: 195, protein: 4.1, carbs: 42, fat: 0.5 },
    { name: "Pechuga de pollo", grams: 180, kcal: 297, protein: 55.8, carbs: 0, fat: 6.5 },
    { name: "Verduras", grams: 100, kcal: 35, protein: 2.4, carbs: 7.2, fat: 0.4 },
  ],
};

let appData = loadAppData();
let apiToken = localStorage.getItem("liftlab-api-token") || "";
let apiOnline = false;
let firebaseOnline = false;
let firebaseBackend = null;

const state = {
  view: "dashboard",
  currentTemplate: "push",
  libraryFilter: "Todos",
  selectedExercise: exercises[0],
  activeWorkout: loadWorkout(),
  timer: { remaining: 90, running: false, handle: null },
};

let dialogFrameTimer = null;

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadAppData() {
  try {
    const stored = JSON.parse(localStorage.getItem("liftlab-app-data") || "null");
    return {
      ...cloneData(defaultAppData),
      ...(stored || {}),
      profile: { ...defaultAppData.profile, ...(stored?.profile || {}) },
      health: { ...defaultAppData.health, ...(stored?.health || {}) },
      privacySettings: { ...defaultAppData.privacySettings, ...(stored?.privacySettings || {}) },
      communityProfile: { ...defaultAppData.communityProfile, ...(stored?.communityProfile || {}) },
      communityPosts: Array.isArray(stored?.communityPosts) ? stored.communityPosts : [],
      workoutHistory: Array.isArray(stored?.workoutHistory) ? stored.workoutHistory : [],
      habits: stored?.habits?.length ? stored.habits : cloneData(defaultAppData.habits),
      photoItems: stored?.photoItems?.length ? stored.photoItems : cloneData(defaultAppData.photoItems),
    };
  } catch {
    return cloneData(defaultAppData);
  }
}

function saveAppData() {
  localStorage.setItem("liftlab-app-data", JSON.stringify(appData));
}

async function apiRequest(path, options = {}) {
  if (firebaseOnline && firebaseBackend?.configured) {
    return firebaseBackend.request(path, options);
  }
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(apiToken ? { authorization: `Bearer ${apiToken}` } : {}),
      ...(options.headers || {}),
    },
    body: options.body && typeof options.body !== "string" ? JSON.stringify(options.body) : options.body,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "API no disponible");
  return payload;
}

async function detectApi() {
  firebaseBackend = await loadFirebaseBackend();
  firebaseOnline = Boolean(firebaseBackend?.configured);
  if (firebaseOnline) {
    apiOnline = false;
    if (firebaseBackend.user) {
      appData.account = { email: firebaseBackend.user.email, id: firebaseBackend.user.uid, mode: "firebase" };
      saveAppData();
    } else {
      appData.account = null;
      apiToken = "";
      localStorage.removeItem("liftlab-api-token");
      saveAppData();
    }
    renderAuthStatus();
    return true;
  }
  try {
    await apiRequest("/api/status");
    apiOnline = true;
  } catch {
    apiOnline = false;
  }
  renderAuthStatus();
  return apiOnline;
}

async function loadApiUserData() {
  if (!(await detectApi())) return;
  if (firebaseOnline && !firebaseBackend?.user) return;
  if (!firebaseOnline && !apiToken) return;
  try {
    const data = await apiRequest("/api/export");
    const currentAccount = appData.account;
    appData = {
      ...cloneData(defaultAppData),
      account: currentAccount,
      profile: { ...cloneData(defaultAppData.profile), ...(data.profile || {}) },
      health: { ...cloneData(defaultAppData.health), ...(data.health || {}) },
      privacySettings: { ...cloneData(defaultAppData.privacySettings), ...(data.privacySettings || {}), publicProfile: Boolean(data.communityProfile?.public) },
      communityProfile: { ...cloneData(defaultAppData.communityProfile), ...(data.communityProfile || {}) },
      communityPosts: Array.isArray(data.communityPosts) ? data.communityPosts : [],
      workoutHistory: Array.isArray(data.workouts) ? data.workouts : [],
      habits: Array.isArray(data.habits) ? data.habits : cloneData(defaultAppData.habits),
      photoItems: Array.isArray(data.foodPhotoResults?.[0]?.items) ? data.foodPhotoResults[0].items : cloneData(defaultAppData.photoItems),
    };
    weeklyRoutinePlan.splice(
      0,
      weeklyRoutinePlan.length,
      ...(Array.isArray(data.routines) && data.routines.length ? data.routines : cloneData(defaultRoutinePlan))
    );
    if (Array.isArray(data.meals)) {
      mealLog = data.meals.map((meal) => ({ ...meal, date: meal.date || new Date().toISOString().slice(0, 10) }));
      saveMealLog();
    } else {
      mealLog = [];
      saveMealLog();
    }
    state.activeWorkout = data.activeWorkout?.exercises?.length ? data.activeWorkout : createWorkout("push");
    saveWorkout();
    saveAppData();
    renderAllAppData();
  } catch {
    apiToken = "";
    localStorage.removeItem("liftlab-api-token");
    firebaseOnline = false;
  }
}

function resetLocalUserState(account = null) {
  appData = { ...cloneData(defaultAppData), account };
  mealLog = [];
  state.activeWorkout = createWorkout("push");
  localStorage.setItem("liftlab-app-data", JSON.stringify(appData));
  localStorage.setItem("liftlab-meals", JSON.stringify(mealLog));
  localStorage.setItem("liftlab-workout", JSON.stringify(state.activeWorkout));
}

async function pushApi(path, data) {
  if (!firebaseOnline && (!apiToken || !apiOnline)) return;
  try {
    await apiRequest(path, { method: "PUT", body: data });
  } catch {
    apiOnline = false;
    renderAuthStatus();
  }
}

function apiUrl(path) {
  const base = String(window.LIFTLAB_CONFIG?.apiBaseUrl || localStorage.getItem("liftlab-api-base-url") || "").replace(/\/$/, "");
  return `${base}${path}`;
}

async function loadFirebaseBackend() {
  if (firebaseBackend) return firebaseBackend;
  if (!hasFirebaseConfig()) return { configured: false, mode: "firebase-missing-config" };
  try {
    const module = await import("./firebase-client.js");
    return module.createFirebaseBackend();
  } catch {
    return { configured: false, mode: "firebase-unavailable" };
  }
}

function hasFirebaseConfig() {
  const config = window.LIFTLAB_CONFIG?.firebase || {};
  return ["apiKey", "authDomain", "projectId", "appId"].every((key) => Boolean(String(config[key] || "").trim()));
}

function hasRealBackend() {
  return firebaseOnline || (apiOnline && Boolean(apiToken));
}

function isSignedIn() {
  return Boolean(appData.account?.id && hasRealBackend());
}

function setAuthUiState(loading = false) {
  document.body.classList.toggle("auth-loading", loading);
  document.body.classList.toggle("auth-locked", !loading && !isSignedIn());
  const gateStatus = $("#gate-auth-status");
  if (gateStatus) {
    if (loading) gateStatus.textContent = "Comprobando sesión con Firebase...";
    else if (isSignedIn()) gateStatus.textContent = `Sesión iniciada: ${appData.account.email}`;
    else if (firebaseOnline) gateStatus.textContent = "Firebase conectado. Crea cuenta gratis o inicia sesión.";
    else if (apiOnline) gateStatus.textContent = "Backend local conectado. Crea cuenta o inicia sesión.";
    else gateStatus.textContent = "No hay backend conectado. Revisa Firebase o arranca npm start.";
  }
  $$(".account-shortcut").forEach((shortcut) => {
    shortcut.innerHTML = isSignedIn()
      ? '<svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0"/></svg>Mi cuenta'
      : '<svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0"/></svg>Iniciar sesión';
  });
}

function getAuthCredentials(source = "profile") {
  const prefix = source === "gate" ? "gate-" : "";
  return {
    email: $(`#${prefix}auth-email`)?.value.trim() || "",
    password: $(`#${prefix}auth-password`)?.value || "",
  };
}

function syncAuthInputs(source = "profile") {
  const fromGate = source === "gate";
  const sourceEmail = fromGate ? $("#gate-auth-email") : $("#auth-email");
  const sourcePassword = fromGate ? $("#gate-auth-password") : $("#auth-password");
  const targetEmail = fromGate ? $("#auth-email") : $("#gate-auth-email");
  const targetPassword = fromGate ? $("#auth-password") : $("#gate-auth-password");
  if (targetEmail && sourceEmail) targetEmail.value = sourceEmail.value;
  if (targetPassword && sourcePassword) targetPassword.value = sourcePassword.value;
}

async function uploadFoodPhotoToFirebase(file) {
  if (!file || !firebaseOnline || !firebaseBackend?.uploadFoodPhoto) return null;
  const upload = await firebaseBackend.uploadFoodPhoto(file);
  appData.lastFoodPhoto = upload;
  saveAppData();
  return upload;
}

function loadWorkout() {
  const stored = localStorage.getItem("liftlab-workout");
  if (stored) {
    try {
      return migrateWorkout(JSON.parse(stored));
    } catch {
      localStorage.removeItem("liftlab-workout");
    }
  }
  return createWorkout("push");
}

function migrateWorkout(workout) {
  const names = {
    "Push A": "Empuje A",
    "Pull A": "Tiron A",
    "Upper Power": "Torso fuerza",
    "Hypertrophy Mix": "Hipertrofia mixta",
    "Full Body": "Cuerpo completo",
  };
  if (workout?.name && names[workout.name]) workout.name = names[workout.name];
  if (workout?.name?.startsWith("IA ·")) workout.name = workout.name.replace("IA ·", "IA -");
  return workout;
}

function createWorkout(templateId) {
  const template = routineTemplates.find((item) => item.id === templateId) || routineTemplates[0];
  return {
    name: template.name,
    exercises: template.exerciseIds.map((id, index) => ({
      id,
      sets: [
        { weight: index === 0 ? 80 : 32, reps: index === 0 ? 6 : 10, rpe: 8, type: index === 0 ? "Top" : "Normal", done: false },
        { weight: index === 0 ? 75 : 30, reps: index === 0 ? 8 : 12, rpe: 7, type: "Back", done: false },
        { weight: index === 0 ? 72.5 : 28, reps: index === 0 ? 8 : 12, rpe: 7, type: "Back", done: false },
      ],
    })),
  };
}

function createWorkoutFromWeekDay(day) {
  const exerciseNames = day.blocks.flatMap((block) => block.exercises);
  const ids = exerciseNames
    .map((name) => exercises.find((exercise) => normalizeText(exercise.name) === normalizeText(name) || normalizeText(name).includes(normalizeText(exercise.name)))?.id)
    .filter(Boolean);
  const fallback = ["push", "pull", "fullbody", "legs", "power"][appData.selectedWeekDay] || "push";
  const workout = createWorkout(fallback);
  if (!ids.length) return workout;
  return {
    name: day.title,
    exercises: ids.slice(0, 5).map((id, index) => ({
      id,
      sets: [
        { weight: index === 0 ? 80 : 30, reps: index === 0 ? 6 : 10, rpe: 8, type: index === 0 ? "Principal" : "Trabajo", done: false },
        { weight: index === 0 ? 75 : 28, reps: index === 0 ? 8 : 12, rpe: 7, type: "Progresion", done: false },
        { weight: index === 0 ? 72.5 : 26, reps: index === 0 ? 8 : 12, rpe: 7, type: "Volumen", done: false },
      ],
    })),
  };
}

function saveWorkout() {
  localStorage.setItem("liftlab-workout", JSON.stringify(state.activeWorkout));
  if (firebaseOnline && firebaseBackend?.user) {
    apiRequest("/api/active-workout", { method: "PUT", body: state.activeWorkout }).catch(() => {});
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.handle);
  showToast.handle = setTimeout(() => toast.classList.remove("show"), 2200);
}

function setView(view) {
  if (!isSignedIn()) {
    setAuthUiState(false);
    showToast("Primero inicia sesión o crea una cuenta gratis.");
    $("#gate-auth-email")?.focus();
    return;
  }
  state.view = view;
  $$(".view").forEach((panel) => panel.classList.toggle("active", panel.id === `${view}-view`));
  $$(".nav-item, .mobile-tab").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  const titles = {
    dashboard: "Inicio",
    ai: "Entrenador IA",
    nutrition: "Nutrición",
    workout: "Entrenar",
    implementation: "Mi plan",
    routines: "Rutinas",
    library: "Ejercicios",
    progress: "Progreso",
    community: "Comunidad",
    profile: "Perfil",
  };
  $("#view-title").textContent = titles[view];
  if (view === "progress") drawProgressChart();
}

function openAccountPanel() {
  if (!isSignedIn()) {
    setAuthUiState(false);
    requestAnimationFrame(() => $("#gate-auth-email")?.focus());
    return;
  }
  setView("profile");
  requestAnimationFrame(() => {
    $(".account-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    $("#auth-email")?.focus();
  });
}

function renderDate() {
  $("#today-label").textContent = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function renderPhonePreview() {
  const container = $("#phone-preview");
  const workout = createWorkout(state.currentTemplate);
  container.innerHTML = workout.exercises
    .map((item) => {
      const exercise = findExercise(item.id);
      return `
        <div class="preview-row">
          <span class="thumb ${exercise.type}">${exercise.name.slice(0, 1)}</span>
          <div><strong>${exercise.name}</strong><small>${item.sets.length} series - ${exercise.equipment}</small></div>
          <span class="pill">${exercise.muscle}</span>
        </div>
      `;
    })
    .join("");
}

function renderWeekPlan() {
  const hasHistory = Array.isArray(appData.workoutHistory) && appData.workoutHistory.length > 0;
  const days = weeklyRoutinePlan.map((item, index) => [
    item.day.slice(0, 3),
    item.title.split(" - ")[0],
    hasHistory && index < Math.min(appData.workoutHistory.length, 2) ? "Completado" : index === 3 ? "Hoy" : item.status,
    hasHistory && index < Math.min(appData.workoutHistory.length, 2),
  ]);
  $("#week-plan").innerHTML = days
    .map(([day, title, status, done]) => `
      <article class="week-day ${done ? "done" : ""}">
        <strong>${day}</strong>
        <p>${title}</p>
        <small>${status}</small>
      </article>
    `)
    .join("");
}

function renderFeed(target = "#recent-feed") {
  $(target).innerHTML = feed
    .map(([avatar, title, subtitle, tag]) => `
      <article class="feed-item">
        <span class="thumb">${avatar}</span>
        <div><strong>${title}</strong><small>${subtitle}</small></div>
        <span class="pill">${tag}</span>
      </article>
    `)
    .join("");
}

function findExercise(id) {
  return exercises.find((item) => item.id === id) || exercises[0];
}

function posterSrc(exercise, frame = 0) {
  return `assets/exercises/${exercise.id}-${frame}.svg`;
}

function posterDataUri(exercise, frame = 0) {
  const palette = {
    push: ["#d95b43", "#f3b59f", "#1f1f21"],
    pull: ["#3b74c5", "#a8c6f3", "#181d27"],
    legs: ["#e0a636", "#f0d798", "#202018"],
  }[exercise.type] || ["#1f8a70", "#9edbc9", "#17201d"];
  const phase = frame === 0 ? 0 : frame === 1 ? 1 : 0.5;
  const scene = exerciseScene(exercise.id, palette, phase);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${palette[1]}"/>
          <stop offset="1" stop-color="#f8f5ed"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" flood-opacity=".22"/>
        </filter>
      </defs>
      <rect width="640" height="420" rx="28" fill="url(#bg)"/>
      <path d="M0 332 C126 286 216 348 338 300 C468 250 552 292 640 248 L640 420 L0 420 Z" fill="${palette[0]}" opacity=".16"/>
      <g stroke="#ffffff" stroke-opacity=".45" stroke-width="2">
        <path d="M72 70h496M72 140h496M72 210h496M72 280h496"/>
        <path d="M120 42v310M240 42v310M360 42v310M480 42v310"/>
      </g>
      <g filter="url(#shadow)">${scene}</g>
      <g>
        <rect x="28" y="28" width="236" height="66" rx="18" fill="#ffffff" opacity=".86"/>
        <text x="48" y="56" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="#17191c">${escapeSvg(exercise.name)}</text>
        <text x="48" y="78" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${palette[0]}">${escapeSvg(exercise.muscle)} - ${escapeSvg(exercise.equipment)}</text>
      </g>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function exerciseScene(id, palette, phase) {
  const [accent, , ink] = palette;
  const y = (a, b) => a + (b - a) * phase;
  const common = `stroke="${ink}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
  const head = (cx, cy, r = 24) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${ink}"/>`;
  const bar = (x1, yy, x2, width = 12) => `<path d="M${x1} ${yy}H${x2}" stroke="${accent}" stroke-width="${width}" stroke-linecap="round"/>`;
  const plates = (x1, yy, x2, yy2 = yy) => `<rect x="${x1}" y="${yy - 42}" width="28" height="84" rx="8" fill="${accent}"/><rect x="${x2}" y="${yy2 - 42}" width="28" height="84" rx="8" fill="${accent}"/>`;
  const cable = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${accent}" stroke-width="6" stroke-dasharray="8 8" stroke-linecap="round"/>`;
  const bench = `<path d="M185 300H455" stroke="${ink}" stroke-width="18" stroke-linecap="round"/><path d="M225 268H405" stroke="${ink}" stroke-width="16" stroke-linecap="round"/>`;
  const dumbbell = (x, yy) => `<path d="M${x - 34} ${yy}h68" stroke="${accent}" stroke-width="10" stroke-linecap="round"/><rect x="${x - 45}" y="${yy - 22}" width="15" height="44" rx="5" fill="${accent}"/><rect x="${x + 30}" y="${yy - 22}" width="15" height="44" rx="5" fill="${accent}"/>`;
  const scenes = {
    bench: () => {
      const barY = y(210, 142);
      return `${bench}${head(320, 246)}<g ${common} stroke-width="18"><path d="M286 256L230 ${barY}"/><path d="M354 256L410 ${barY}"/></g>${bar(184, barY, 456, 12)}${plates(154, barY, 458)}`;
    },
    "incline-db": () => {
      const handY = y(220, 132);
      return `<path d="M205 314L425 228" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>${head(318, 226)}<g ${common} stroke-width="17"><path d="M288 238L246 ${handY}"/><path d="M348 226L408 ${handY}"/></g>${dumbbell(238, handY)}${dumbbell(420, handY)}`;
    },
    dip: () => {
      const shoulderY = y(200, 150);
      return `<path d="M190 112v220M450 112v220" stroke="${accent}" stroke-width="14" stroke-linecap="round"/><path d="M190 160h120M330 160h120" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>${head(320, shoulderY - 42)}<g ${common} stroke-width="18"><path d="M320 ${shoulderY}v86M292 ${shoulderY + 4}L210 166M348 ${shoulderY + 4}L430 166M320 ${shoulderY + 86}l-42 66M320 ${shoulderY + 86}l42 66"/></g>`;
    },
    "lat-pulldown": () => {
      const handY = y(116, 176);
      return `<path d="M170 82h300" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${cable(320, 82, 320, handY)}${head(320, 216)}<g ${common} stroke-width="18"><path d="M320 240v88M290 246L230 ${handY}M350 246L410 ${handY}M320 328l-48 46M320 328l48 46"/></g>`;
    },
    row: () => {
      const handX = y(418, 334);
      return `<path d="M170 276h320" stroke="${ink}" stroke-width="18" stroke-linecap="round"/><path d="M178 318h108M420 318h60" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${cable(520, 202, handX, 226)}${head(282, 190)}<g ${common} stroke-width="18"><path d="M282 214l-22 74M272 232L${handX} 226M260 288h112M282 288l-38 68M330 288l42 68"/></g>`;
    },
    curl: () => {
      const barY = y(280, 190);
      return `${head(320, 116)}<g ${common} stroke-width="18"><path d="M320 142v116M290 168L250 ${barY}M350 168L390 ${barY}M320 258l-52 92M320 258l52 92"/></g>${bar(238, barY, 402, 11)}${plates(214, barY, 410)}`;
    },
    squat: () => {
      const hipY = y(184, 238);
      const kneeY = y(278, 292);
      return `${bar(190, 124, 450, 13)}${plates(158, 124, 454)}${head(320, 84)}<g ${common} stroke-width="20"><path d="M320 108v${hipY - 108}M320 ${hipY}L266 ${kneeY}L232 360M320 ${hipY}L386 ${kneeY}L426 360M284 130L220 124M356 130L420 124"/></g>`;
    },
    rdl: () => {
      const hipY = y(172, 216);
      const barY = y(236, 294);
      return `${head(306, 104)}<g ${common} stroke-width="18"><path d="M306 128L360 ${hipY}M360 ${hipY}L318 354M360 ${hipY}L420 354M342 ${hipY - 4}L252 ${barY}M376 ${hipY - 4}L430 ${barY}"/></g>${bar(190, barY, 478, 13)}${plates(158, barY, 482)}`;
    },
    "leg-ext": () => {
      const footX = y(430, 512);
      return `<path d="M196 238h152v70H196z" fill="${ink}" opacity=".9"/><path d="M286 186h96v56h-96z" fill="${ink}" opacity=".9"/>${head(278, 162)}<g ${common} stroke-width="18"><path d="M288 186l62 58M326 280L${footX} 280M${footX} 280l38 0"/></g><circle cx="${footX + 46}" cy="280" r="28" fill="${accent}"/>`;
    },
    "lateral-raise": () => {
      const handY = y(238, 154);
      return `${head(320, 120)}<g ${common} stroke-width="18"><path d="M320 144v120M320 172L218 ${handY}M320 172L422 ${handY}M320 264l-48 92M320 264l48 92"/></g>${dumbbell(206, handY)}${dumbbell(434, handY)}`;
    },
    "pull-up": () => {
      const bodyY = y(222, 154);
      return `<path d="M162 82h316" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${head(320, bodyY - 50)}<g ${common} stroke-width="18"><path d="M320 ${bodyY - 26}v104M294 ${bodyY}L220 84M346 ${bodyY}L420 84M320 ${bodyY + 78}l-54 74M320 ${bodyY + 78}l54 74"/></g>`;
    },
    "hip-thrust": () => {
      const hipY = y(264, 206);
      return `<path d="M154 282h138" stroke="${ink}" stroke-width="22" stroke-linecap="round"/><path d="M422 322H522" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>${head(236, 222)}<g ${common} stroke-width="18"><path d="M260 238L350 ${hipY}L456 316M350 ${hipY}L306 318M350 ${hipY}L392 318"/></g>${bar(268, hipY - 8, 432, 13)}${plates(244, hipY - 8, 436)}`;
    },
    "overhead-press": () => {
      const barY = y(206, 82);
      return `${head(320, 148)}<g ${common} stroke-width="18"><path d="M320 172v112M292 190L250 ${barY}M348 190L390 ${barY}M320 284l-52 80M320 284l52 80"/></g>${bar(202, barY, 438, 12)}${plates(170, barY, 442)}`;
    },
    "pec-deck": () => {
      const handX = y(220, 290);
      return `<path d="M178 130h284v210H178z" fill="${ink}" opacity=".12" stroke="${accent}" stroke-width="8"/><path d="M230 150v160M410 150v160" stroke="${accent}" stroke-width="12"/>${head(320, 154)}<g ${common} stroke-width="18"><path d="M320 178v112M300 204L${handX} 220M340 204L${640 - handX} 220M320 290l-48 72M320 290l48 72"/></g>`;
    },
    "triceps-pushdown": () => {
      const handY = y(166, 256);
      return `${cable(320, 70, 320, handY)}${bar(270, handY, 370, 10)}${head(320, 136)}<g ${common} stroke-width="18"><path d="M320 160v104M288 184L272 ${handY}M352 184L368 ${handY}M320 264l-52 86M320 264l52 86"/></g>`;
    },
    "face-pull": () => {
      const handX = y(420, 344);
      return `${cable(520, 156, handX, 156)}${head(300, 152)}<g ${common} stroke-width="18"><path d="M300 176v106M286 198L${handX} 156M314 198L${handX} 188M300 282l-50 82M300 282l54 82"/></g><circle cx="520" cy="156" r="22" fill="${accent}"/>`;
    },
    deadlift: () => {
      const hipY = y(178, 232);
      const barY = y(302, 226);
      return `${bar(170, barY, 470, 14)}${plates(136, barY, 474)}${head(314, 110)}<g ${common} stroke-width="18"><path d="M314 134L358 ${hipY}M358 ${hipY}L302 356M358 ${hipY}L418 356M338 ${hipY}L278 ${barY}M376 ${hipY}L420 ${barY}"/></g>`;
    },
    "tbar-row": () => {
      const handY = y(250, 194);
      return `<path d="M210 326L512 180" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${plates(490, 180, 542)}${head(282, 154)}<g ${common} stroke-width="18"><path d="M282 178L350 238M350 238l-52 108M350 238l62 96M320 214L396 ${handY}M338 226L410 ${handY}"/></g>`;
    },
    "hammer-curl": () => {
      const handY = y(274, 190);
      return `${head(320, 116)}<g ${common} stroke-width="18"><path d="M320 142v116M290 170L250 ${handY}M350 170L390 ${handY}M320 258l-52 92M320 258l52 92"/></g>${dumbbell(246, handY)}${dumbbell(394, handY)}`;
    },
    "leg-press": () => {
      const sledX = y(430, 506);
      return `<path d="M180 312h170L476 122" stroke="${ink}" stroke-width="18" stroke-linecap="round"/><path d="M478 90l86 86" stroke="${accent}" stroke-width="18"/><path d="M${sledX} 106l74 74" stroke="${accent}" stroke-width="12"/>${head(246, 242)}<g ${common} stroke-width="18"><path d="M270 260l72 36M342 296L${sledX} 156M342 296L${sledX - 40} 196"/></g>`;
    },
    lunge: () => {
      const backKnee = y(286, 320);
      return `${head(320, 110)}<g ${common} stroke-width="18"><path d="M320 134v102M320 236L250 296L202 356M320 236L414 ${backKnee}L482 350M288 164L238 214M352 164L402 214"/></g>${dumbbell(234, 214)}${dumbbell(406, 214)}`;
    },
    "leg-curl": () => {
      const footX = y(470, 384);
      return `<path d="M168 230h286" stroke="${ink}" stroke-width="22" stroke-linecap="round"/><path d="M210 290h250" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>${head(210, 196)}<g ${common} stroke-width="18"><path d="M238 214h150M388 214L${footX} 284"/></g><circle cx="${footX + 30}" cy="284" r="28" fill="${accent}"/>`;
    },
    "calf-raise": () => {
      const heelY = y(350, 322);
      return `<path d="M212 104h216v36H212z" fill="${accent}"/>${head(320, 86)}<g ${common} stroke-width="18"><path d="M320 110v142M320 252l-46 98M320 252l48 ${heelY - 252}M286 146L232 112M354 146L408 112"/></g><path d="M240 360h90M354 ${heelY}h92" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>`;
    },
    plank: () => `<path d="M170 304H496" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>${head(190, 230)}<g ${common} stroke-width="18"><path d="M214 246L352 260L486 300M300 258L244 304M384 274L344 304"/></g>`,
    "push-up": () => {
      const chestY = y(244, 296);
      return `${head(210, chestY - 42)}<g ${common} stroke-width="18"><path d="M232 ${chestY - 24}L390 ${chestY}L500 314M300 ${chestY - 8}L250 320M384 ${chestY}L340 322"/></g><path d="M164 322h390" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`;
    },
    "cable-fly": () => {
      const handX = y(218, 314);
      return `<path d="M104 78v270M536 78v270" stroke="${accent}" stroke-width="12"/><path d="M104 104L${handX} 210M536 104L${640 - handX} 210" stroke="${accent}" stroke-width="6" stroke-dasharray="8 8"/>${head(320, 142)}<g ${common} stroke-width="18"><path d="M320 166v120M296 198L${handX} 210M344 198L${640 - handX} 210M320 286l-52 76M320 286l52 76"/></g>`;
    },
    "seated-db-press": () => {
      const handY = y(190, 88);
      return `<path d="M232 302h176v34H232z" fill="${ink}"/><path d="M270 202h100v104H270z" fill="${ink}" opacity=".24"/>${head(320, 146)}<g ${common} stroke-width="18"><path d="M320 170v96M292 188L254 ${handY}M348 188L386 ${handY}M320 266l-42 72M320 266l42 72"/></g>${dumbbell(246, handY)}${dumbbell(394, handY)}`;
    },
    "wide-pulldown": () => {
      const handY = y(110, 172);
      return `<path d="M126 80h388" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${cable(320, 80, 320, handY)}${head(320, 214)}<g ${common} stroke-width="18"><path d="M320 238v90M286 246L184 ${handY}M354 246L456 ${handY}M320 328l-48 46M320 328l48 46"/></g>`;
    },
    "single-row": () => {
      const handY = y(282, 210);
      return `<path d="M210 286h210" stroke="${ink}" stroke-width="18"/><path d="M250 320h120" stroke="${ink}" stroke-width="14"/>${head(304, 150)}<g ${common} stroke-width="18"><path d="M304 174L370 238M370 238l-38 106M370 238l64 92M316 192L246 286M360 230L452 ${handY}"/></g>${dumbbell(460, handY)}`;
    },
    "glute-bridge": () => {
      const hipY = y(280, 224);
      return `<path d="M150 326h360" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>${head(196, 260)}<g ${common} stroke-width="18"><path d="M220 276L338 ${hipY}L454 316M338 ${hipY}L300 318M338 ${hipY}L390 318"/></g>`;
    },
  };
  return (scenes[id] || scenes.bench)();
}

function escapeSvg(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderWorkoutLog() {
  $("#active-workout-name").textContent = state.activeWorkout.name;
  $("#exercise-log").innerHTML = state.activeWorkout.exercises
    .map((entry, exerciseIndex) => {
      const exercise = findExercise(entry.id);
      return `
        <article class="log-exercise" data-exercise-index="${exerciseIndex}">
          <div class="log-head">
            <div>
              <strong>${exercise.name}</strong>
              <small>${exercise.muscle} - ${exercise.equipment}</small>
            </div>
            <button class="text-button" data-demo="${exercise.id}">Ver técnica</button>
          </div>
          <div class="set-grid">
            ${entry.sets
              .map((set, setIndex) => `
                <div class="set-row" data-set-index="${setIndex}">
                  <strong>${setIndex + 1}</strong>
                  <label>Peso<input data-field="weight" type="number" min="0" step="0.5" value="${set.weight}"></label>
                  <label>Reps<input data-field="reps" type="number" min="1" step="1" value="${set.reps}"></label>
                  <label>RPE<input data-field="rpe" type="number" min="1" max="10" step="0.5" value="${set.rpe}"></label>
                  <label>Tipo<input data-field="type" value="${set.type}"></label>
                  <button class="check-set ${set.done ? "done" : ""}" data-check-set aria-label="Completar serie">${set.done ? "✓" : ""}</button>
                </div>
              `)
              .join("")}
          </div>
          <button class="text-button" data-add-set="${exerciseIndex}">Añadir serie</button>
        </article>
      `;
    })
    .join("");
}

function renderRoutines() {
  renderWeeklyRoutineBoard();
  $("#routines-grid").innerHTML = routineTemplates
    .map((routine) => `
      <article class="routine-card">
        <div>
          <strong>${routine.name}</strong>
          <small>${routine.focus}</small>
        </div>
        <div class="routine-meta">
          <span class="pill">${routine.days}</span>
          <span class="pill">${routine.difficulty}</span>
        </div>
        <div class="mini-bars">
          ${routine.bars.map((bar) => `<span style="--bar:${bar}%"></span>`).join("")}
        </div>
        <button class="primary-button" data-load-template="${routine.id}">Usar rutina</button>
      </article>
    `)
    .join("");
}

function renderFilters() {
  const muscles = ["Todos", ...new Set(exercises.map((item) => item.muscle))];
  $("#muscle-filter").innerHTML = muscles
    .map((muscle) => `<button class="${state.libraryFilter === muscle ? "active" : ""}" data-muscle="${muscle}">${muscle}</button>`)
    .join("");
}

function renderLibrary() {
  const query = $("#exercise-search")?.value?.trim().toLowerCase() || "";
  const filtered = exercises.filter((exercise) => {
    const matchesFilter = state.libraryFilter === "Todos" || exercise.muscle === state.libraryFilter;
    const haystack = `${exercise.name} ${exercise.muscle} ${exercise.equipment}`.toLowerCase();
    return matchesFilter && haystack.includes(query);
  });
  $("#exercise-count-label").textContent = `${filtered.length} ejercicios`;
  $("#exercise-library").innerHTML = filtered
    .map((exercise) => `
      <article class="exercise-card">
        <button class="exercise-visual media-card" data-open-exercise="${exercise.id}" aria-label="Abrir guía de ${exercise.name}">
          <img src="${posterSrc(exercise, 1)}" alt="Foto de ${exercise.name}" loading="lazy">
          <span class="play-dot"><svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7V5Z"/></svg></span>
        </button>
        <div>
          <strong>${exercise.name}</strong>
          <small>${exercise.muscle} - ${exercise.equipment}</small>
        </div>
        <button class="ghost-button" data-open-exercise-button="${exercise.id}">Abrir guía</button>
      </article>
    `)
    .join("");
}

function renderCues() {
  if ($("#dialog-title")) $("#dialog-title").textContent = state.selectedExercise.name;
  if ($("#dialog-muscle")) $("#dialog-muscle").textContent = state.selectedExercise.muscle;
  if ($("#dialog-description")) $("#dialog-description").textContent = state.selectedExercise.description;
  if ($("#dialog-video-frame")) {
    $("#dialog-video-frame").src = posterSrc(state.selectedExercise, 0);
    $("#dialog-video-frame").alt = `Video animado de ${state.selectedExercise.name}`;
  }
  if ($("#dialog-photos")) {
    $("#dialog-photos").innerHTML = [0, 1, 2].map((frame) => `<img src="${posterSrc(state.selectedExercise, frame)}" alt="Foto ${frame + 1} de ${state.selectedExercise.name}">`).join("");
  }
  if ($("#dialog-muscles")) {
    $("#dialog-muscles").innerHTML = `
    <img src="${muscleDataUri(state.selectedExercise.muscle, "front")}" alt="Musculos frontales trabajados por ${state.selectedExercise.name}">
    <img src="${muscleDataUri(state.selectedExercise.muscle, "back")}" alt="Musculos posteriores trabajados por ${state.selectedExercise.name}">
  `;
  }
  $("#cue-list").innerHTML = state.selectedExercise.cues.map((cue) => `<div class="cue">${cue}</div>`).join("");
}

function drawExercise(canvas, exercise, phase) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const styles = getComputedStyle(document.body);
  const ink = styles.getPropertyValue("--ink").trim();
  const accent = styles.getPropertyValue("--accent").trim();
  const coral = styles.getPropertyValue("--coral").trim();
  const blue = styles.getPropertyValue("--blue").trim();
  const amber = styles.getPropertyValue("--amber").trim();

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = styles.getPropertyValue("--surface-strong").trim();
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = styles.getPropertyValue("--line").trim();
  ctx.lineWidth = 2;
  for (let x = 40; x < width; x += 56) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 38; y < height; y += 50) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  const t = (Math.sin(phase) + 1) / 2;
  const color = exercise.type === "push" ? coral : exercise.type === "pull" ? blue : amber;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (exercise.type === "legs") {
    const hipY = 122 + t * 52;
    const kneeY = 205 - t * 15;
    drawJoint(ctx, width / 2, 72, 24, ink);
    stroke(ctx, ink, 14, [[width / 2, 96], [width / 2 - 8, hipY], [width / 2 + 38, kneeY], [width / 2 + 70, 278]]);
    stroke(ctx, ink, 14, [[width / 2, hipY], [width / 2 - 46, kneeY], [width / 2 - 78, 278]]);
    stroke(ctx, color, 9, [[width / 2 - 82, 106], [width / 2 + 88, 106]]);
    drawPlate(ctx, width / 2 - 104, 106, color);
    drawPlate(ctx, width / 2 + 104, 106, color);
  } else if (exercise.type === "pull") {
    const handY = 82 + t * 42;
    stroke(ctx, color, 9, [[width / 2 - 128, 70], [width / 2 + 128, 70]]);
    drawJoint(ctx, width / 2, 154 + t * 22, 24, ink);
    stroke(ctx, ink, 13, [[width / 2, 176 + t * 22], [width / 2, 254]]);
    stroke(ctx, ink, 11, [[width / 2 - 18, 198], [width / 2 - 76, handY], [width / 2 - 104, 72]]);
    stroke(ctx, ink, 11, [[width / 2 + 18, 198], [width / 2 + 76, handY], [width / 2 + 104, 72]]);
    stroke(ctx, ink, 12, [[width / 2, 254], [width / 2 - 50, 304]]);
    stroke(ctx, ink, 12, [[width / 2, 254], [width / 2 + 50, 304]]);
  } else {
    const barY = 100 + t * 54;
    stroke(ctx, ink, 18, [[130, 242], [390, 242]]);
    stroke(ctx, ink, 12, [[180, 210], [342, 210]]);
    drawJoint(ctx, width / 2, 176, 22, ink);
    stroke(ctx, ink, 12, [[width / 2 - 34, 198], [width / 2 - 80, barY]]);
    stroke(ctx, ink, 12, [[width / 2 + 34, 198], [width / 2 + 80, barY]]);
    stroke(ctx, color, 8, [[width / 2 - 130, barY], [width / 2 + 130, barY]]);
    drawPlate(ctx, width / 2 - 154, barY, color);
    drawPlate(ctx, width / 2 + 154, barY, color);
  }

  ctx.fillStyle = ink;
  ctx.font = "700 22px system-ui, sans-serif";
  ctx.fillText(exercise.name, 24, 34);
  ctx.fillStyle = accent;
  ctx.font = "700 14px system-ui, sans-serif";
  ctx.fillText(`${exercise.muscle} - ${exercise.equipment}`, 24, 58);
}

function stroke(ctx, color, width, points) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  points.forEach(([x, y], index) => (index ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.stroke();
}

function drawJoint(ctx, x, y, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlate(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x - 14, y - 34, 28, 68, 8);
  ctx.fill();
}

function animateExercise() {
  const phase = performance.now() / 650;
  drawExercise($("#exercise-canvas"), state.selectedExercise, phase);
  requestAnimationFrame(animateExercise);
}

function stopDialogAnimation() {
  if (!dialogFrameTimer) return;
  clearInterval(dialogFrameTimer);
  dialogFrameTimer = null;
}

function startDialogAnimation() {
  stopDialogAnimation();
  let frame = 0;
  dialogFrameTimer = setInterval(() => {
    const dialog = $("#exercise-dialog");
    const dialogVideo = $("#dialog-video-frame");
    if (!dialog.open || !dialogVideo) {
      stopDialogAnimation();
      return;
    }
    frame = (frame + 1) % 3;
    dialogVideo.src = posterSrc(state.selectedExercise, frame);
    dialogVideo.dataset.frame = String(frame);
  }, 650);
}

function drawProgressChart() {
  const canvas = $("#progress-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const mode = $("#chart-mode").value;
  const data = progressData[mode];
  const styles = getComputedStyle(document.body);
  const ink = styles.getPropertyValue("--ink").trim();
  const muted = styles.getPropertyValue("--muted").trim();
  const accent = styles.getPropertyValue("--accent").trim();
  const line = styles.getPropertyValue("--line").trim();
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = styles.getPropertyValue("--surface-strong").trim();
  ctx.fillRect(0, 0, width, height);

  const padding = 54;
  const max = Math.max(...data) * 1.12;
  const min = Math.min(...data) * 0.88;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = padding + ((height - padding * 2) / 4) * i;
    stroke(ctx, line, 1, [[padding, y], [width - padding, y]]);
  }

  const points = data.map((value, index) => {
    const x = padding + ((width - padding * 2) / (data.length - 1)) * index;
    const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    return [x, y, value];
  });

  ctx.beginPath();
  points.forEach(([x, y], index) => (index ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  ctx.stroke();

  points.forEach(([x, y, value], index) => {
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = index === points.length - 1 ? ink : muted;
    ctx.font = "700 18px system-ui, sans-serif";
    ctx.fillText(formatMetric(value, mode), x - 24, y - 16);
  });

  ctx.fillStyle = muted;
  ctx.font = "700 14px system-ui, sans-serif";
  ["S1", "S2", "S3", "S4", "S5", "S6", "S7"].forEach((label, index) => {
    ctx.fillText(label, points[index][0] - 10, height - 22);
  });
}

function formatMetric(value, mode) {
  if (mode === "volume") return `${Math.round(value / 1000)}k`;
  if (mode === "orm") return `${value}kg`;
  return `${value}`;
}

function renderCalculator() {
  const weight = Number($("#calc-weight").value || 0);
  const reps = Number($("#calc-reps").value || 1);
  const result = Math.round(weight * (1 + reps / 30));
  $("#calc-result").textContent = `${result} kg`;
}

function renderMilestones() {
  const history = Array.isArray(appData.workoutHistory) ? appData.workoutHistory : [];
  const items = history.length
    ? [
        ["Último entreno", `${history.at(-1)?.name || "Entreno"} guardado en tu cuenta`],
        ["Entrenos registrados", `${history.length} sesiones reales`],
        ["Progreso", "Los récords aparecerán al repetir ejercicios"],
      ]
    : [["Sin registros todavía", "Completa tu primer entrenamiento para ver marcas reales"]];
  $("#milestones").innerHTML = items.map(([title, text]) => `<article class="milestone"><strong>${title}</strong><br><small>${text}</small></article>`).join("");
}

function renderCommunity() {
  const sets = state.activeWorkout.exercises.flatMap((entry) => entry.sets || []);
  const completedSets = sets.filter((set) => set.done);
  const volumeKg = completedSets.reduce((total, set) => total + Number(set.weight || 0) * Number(set.reps || 0), 0);
  const targetKg = 45000;
  const progress = Math.min(100, Math.round((volumeKg / targetKg) * 100));
  const publicProfile = Boolean(appData.privacySettings?.publicProfile || appData.communityProfile?.public);
  const ring = $("#community-ring");
  const ringValue = $("#community-ring-value");
  const challengeCopy = $("#community-challenge-copy") || $(".challenge .subtle");
  if (ring) ring.style.setProperty("--progress", progress);
  if (ringValue) ringValue.textContent = `${progress}%`;
  if ($("#community-target-pill")) $("#community-target-pill").textContent = `${targetKg.toLocaleString("es-ES")} kg`;
  if (challengeCopy) {
    challengeCopy.textContent = "Suma volumen solo con tus sesiones registradas. Estos datos son privados por defecto y no se mezclan con otros usuarios.";
  }

  $("#leaderboard").innerHTML = [
    ["Volumen guardado", `${Math.round(volumeKg).toLocaleString("es-ES")} kg`, "Solo tu cuenta"],
    ["Series completadas", `${completedSets.length}`, "Entreno actual"],
    ["Pasos de hoy", `${Number(appData.health.steps || 0).toLocaleString("es-ES")}`, "Dato privado"],
    ["Perfil público", publicProfile ? "Activado" : "Desactivado", publicProfile ? "Solo si tú lo decides" : "Nadie ve tus datos"],
  ]
    .map(([metric, value, note]) => `
      <div class="leader-row">
        <strong>LL</strong>
        <span>${escapeHtml(metric)}</span>
        <small>${escapeHtml(value)} · ${escapeHtml(note)}</small>
      </div>
    `)
    .join("");
  const posts = Array.isArray(appData.communityPosts) ? appData.communityPosts.slice().reverse() : [];
  $("#community-feed").innerHTML = posts.length
    ? posts
        .map((post) => `
          <article class="feed-item">
            <span class="thumb">${escapeHtml(initialsFromName(appData.profile.name))}</span>
            <div>
              <strong>${escapeHtml(post.title || "Avance privado")}</strong>
              <small>${escapeHtml(post.text || "")}</small>
            </div>
            <span class="pill">${escapeHtml(post.privacy === "public" ? "Público" : "Privado")}</span>
          </article>
        `)
        .join("")
    : `<div class="empty-state">No hay actividad compartida. Esta pantalla solo muestra tus propios datos y no enseña personas de ejemplo.</div>`;
}

function renderMeasures() {
  const profile = appData.profile;
  const health = appData.health;
  const measures = [
    ["Peso", `${round1(profile.weight)} kg`],
    ["Cintura", `${Math.round(Number(profile.weight || 0))} cm`],
    ["Pecho", `${Math.round(Number(profile.height || 0) * 0.58)} cm`],
    ["Brazo", `${Math.round(Number(profile.height || 0) * 0.21)} cm`],
    ["Sueño", health.sleep ? `${round1(health.sleep)} h` : "Sin registrar"],
    ["Pasos", Number(health.steps || 0).toLocaleString("es-ES")],
  ];
  $("#measure-grid").innerHTML = measures.map(([name, value]) => `<div class="measure-item"><span>${name}</span><strong>${value}</strong></div>`).join("");
}

function collectTrainingContext() {
  const sets = state.activeWorkout.exercises.flatMap((entry) =>
    entry.sets.map((set) => ({ ...set, exercise: findExercise(entry.id) }))
  );
  const completed = sets.filter((set) => set.done);
  const volume = sets.reduce((total, set) => total + Number(set.weight || 0) * Number(set.reps || 0), 0);
  const hardSets = sets.filter((set) => Number(set.rpe || 0) >= 8).length;
  return {
    goal: $("#ai-goal")?.value || "hypertrophy",
    time: Number($("#ai-time")?.value || 60),
    recovery: Number($("#ai-recovery")?.value || 82),
    soreness: $("#ai-soreness")?.value || "none",
    sets,
    completed,
    volume,
    hardSets,
    workoutName: state.activeWorkout.name,
  };
}

function runAIAgents() {
  const ctx = collectTrainingContext();
  const readiness = ctx.recovery >= 78 ? "Alta" : ctx.recovery >= 58 ? "Media" : "Baja";
  const deload = ctx.recovery < 55 || ctx.hardSets > 8;
  const goalText = {
    hypertrophy: "hipertrofia",
    strength: "fuerza",
    fatloss: "perdida de grasa",
    recomp: "recomposicion",
  }[ctx.goal];
  const sorenessMap = {
    none: "sin restricciones",
    shoulder: "evitar presses pesados y priorizar rangos sin dolor",
    back: "evitar bisagras pesadas y usar maquinas o apoyos",
    knee: "evitar flexion profunda cargada y priorizar control",
  };
  const agents = [
    {
      name: "Entrenador",
      score: `${readiness}`,
      text: `Sesión recomendada para ${goalText}: ${ctx.time} min con ${deload ? "volumen reducido" : "progresión normal"}. Contexto: ${sorenessMap[ctx.soreness]}.`,
    },
    {
      name: "Progresión",
      score: deload ? "Deload" : "+2,5%",
      text: deload
        ? "Mantén el peso y baja 1 serie por ejercicio. El objetivo de hoy es calidad, no récord."
        : "Sube 2,5 kg en el primer básico si completas todas las series con RPE 8 o menos.",
    },
    {
      name: "Técnica",
      score: "3 cues",
      text: ctx.soreness === "shoulder"
        ? "Reduce rango si molesta, codos 30-45 grados, escápulas estables y sin rebote."
        : "Graba la serie top, revisa recorrido completo, velocidad estable y control excéntrico.",
    },
    {
      name: "Recuperación",
      score: `${ctx.recovery}%`,
      text: ctx.recovery >= 78
        ? "Puedes entrenar fuerte, pero deja 1 repetición en recámara en accesorios."
        : "Prioriza sueño, descansos largos y evita llegar al fallo en más de una serie.",
    },
    {
      name: "Nutrición",
      score: ctx.goal === "fatloss" ? "Déficit" : "Proteína",
      text: ctx.goal === "fatloss"
        ? "Mantén proteína alta y deja carbohidratos alrededor del entreno para rendir."
        : "Apunta a 1,8-2,2 g/kg de proteína y carbohidratos antes de la sesión.",
    },
    {
      name: "Riesgo",
      score: deload ? "Alerta" : "OK",
      text: deload
        ? "Señal de fatiga: hoy conviene recortar volumen y no perseguir marcas."
        : "Riesgo bajo. Calienta progresivo y respeta el temporizador.",
    },
  ];
  $("#ai-agent-grid").innerHTML = agents
    .map((agent) => `
      <article class="ai-agent-card">
        <div><strong>${agent.name}</strong><span>${agent.score}</span></div>
        <p>${agent.text}</p>
      </article>
    `)
    .join("");
  renderAIPlan(ctx, deload);
  renderAINutritionFromTraining(ctx);
  addAIMessage("Entrenador", agents[0].text);
}

function renderAINutritionFromTraining(ctx) {
  const mappedGoal = {
    hypertrophy: "bulk",
    strength: "maintain",
    fatloss: "cut",
    recomp: "maintain",
  }[ctx.goal] || "maintain";
  const targets = getNutritionTargets(mappedGoal, { trainingMinutes: ctx.time });
  const totals = sumNutrition(todayMeals().map((meal) => meal.totals));
  renderNutritionAI(totals, targets);
}

function renderAIPlan(ctx, deload = false) {
  const base = ctx.goal === "strength" ? "power" : ctx.soreness === "knee" ? "push" : ctx.soreness === "back" ? "push" : "push";
  const template = routineTemplates.find((routine) => routine.id === base) || routineTemplates[0];
  const exerciseIds = template.exerciseIds.map((id) => {
    if (ctx.soreness === "shoulder" && ["bench", "incline-db", "dip"].includes(id)) return "row";
    if (ctx.soreness === "back" && ["rdl", "deadlift"].includes(id)) return "leg-ext";
    if (ctx.soreness === "knee" && ["squat", "leg-press", "lunge"].includes(id)) return "hip-thrust";
    return id;
  });
  const sets = deload ? "2-3" : ctx.goal === "strength" ? "3-5" : "3-4";
  const reps = ctx.goal === "strength" ? "3-6" : ctx.goal === "fatloss" ? "10-15" : "8-12";
  $("#ai-plan").innerHTML = exerciseIds
    .map((id, index) => {
      const exercise = findExercise(id);
      return `
        <div class="ai-plan-row">
          <span>${index + 1}</span>
          <img src="${posterSrc(exercise, 1)}" alt="${exercise.name}">
          <div>
            <strong>${exercise.name}</strong>
            <small>${sets} series - ${reps} reps - RPE ${deload ? "6-7" : "7-9"}</small>
          </div>
        </div>
      `;
    })
    .join("");
}

function applyAIPlan() {
  const ctx = collectTrainingContext();
  const ids = [...$("#ai-plan").querySelectorAll(".ai-plan-row strong")]
    .map((node) => exercises.find((exercise) => exercise.name === node.textContent)?.id)
    .filter(Boolean);
  if (!ids.length) {
    runAIAgents();
    return;
  }
  state.activeWorkout = {
    name: `IA - ${ctx.time} min`,
    exercises: ids.map((id) => ({
      id,
      sets: [
        { weight: 30, reps: ctx.goal === "strength" ? 5 : 10, rpe: 7, type: "IA", done: false },
        { weight: 30, reps: ctx.goal === "strength" ? 5 : 10, rpe: 7, type: "IA", done: false },
        { weight: 30, reps: ctx.goal === "strength" ? 5 : 10, rpe: 8, type: "IA", done: false },
      ],
    })),
  };
  saveWorkout();
  renderWorkoutLog();
  showToast("Plan IA cargado en Entrenar.");
  setView("workout");
}

function addAIMessage(author, text) {
  const chat = $("#ai-chat");
  if (!chat) return;
  chat.insertAdjacentHTML("beforeend", `<div class="ai-message ${author === "Tu" ? "user" : ""}"><strong>${author}</strong><p>${text}</p></div>`);
  chat.scrollTop = chat.scrollHeight;
}

function answerAIQuestion(question) {
  const ctx = collectTrainingContext();
  const q = question.toLowerCase();
  if (q.includes("dolor") || q.includes("hombro") || q.includes("rodilla") || q.includes("espalda")) {
    return "Reduce rango, baja carga un 10-20% y cambia a variante estable. Si el dolor es punzante o cambia tu técnica, corta esa serie.";
  }
  if (q.includes("peso") || q.includes("subo") || q.includes("progres")) {
    return ctx.recovery >= 75
      ? "Sí: sube poco, 2-2,5 kg en básicos o una repetición por serie en accesorios. Si pasas de RPE 9, vuelve al peso anterior."
      : "Hoy no subiría peso. Mantén carga, mejora técnica y busca repetir rendimiento con menos fatiga.";
  }
  if (q.includes("comer") || q.includes("prote") || q.includes("nutri")) {
    return "Base simple: proteína alta, sal e hidratación antes de entrenar, carbohidrato fácil 60-120 min antes si la sesión es dura.";
  }
  return "Para hoy prioriza adherencia: elige 4 ejercicios, deja 1-2 repeticiones en recámara y registra todo. Mañana ajusto progresión con lo que completes.";
}

function loadMealLog() {
  try {
    return JSON.parse(localStorage.getItem("liftlab-meals") || "[]");
  } catch {
    return [];
  }
}

function saveMealLog() {
  localStorage.setItem("liftlab-meals", JSON.stringify(mealLog));
}

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9,.+\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clampNumber(value, min, max, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function findFood(fragment) {
  const text = normalizeText(fragment);
  return foodDb
    .map((food) => {
      const [name, aliases] = food;
      const match = [name, ...aliases]
        .map((alias) => normalizeText(alias))
        .filter((alias) => alias && text.includes(alias))
        .sort((a, b) => b.length - a.length)[0];
      return match ? { food, score: match.length } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)[0]?.food;
}

function parseAmount(fragment, food) {
  const text = normalizeText(fragment).replace(",", ".");
  const unitWeight = food?.[6] || 100;
  const gramMatch = text.match(/(\d+(?:\.\d+)?)\s*(g|gr|gramos|ml|mililitros)\b/);
  if (gramMatch) return Number(gramMatch[1]);
  const kgMatch = text.match(/(\d+(?:\.\d+)?)\s*(kg|kilo|kilos)\b/);
  if (kgMatch) return Number(kgMatch[1]) * 1000;
  const spoonMatch = text.match(/(\d+(?:\.\d+)?)\s*(cucharada|cucharadas|tbsp)\b/);
  if (spoonMatch) return Number(spoonMatch[1]) * 15;
  const teaspoonMatch = text.match(/(\d+(?:\.\d+)?)\s*(cucharadita|cucharaditas|tsp)\b/);
  if (teaspoonMatch) return Number(teaspoonMatch[1]) * 5;
  const cupMatch = text.match(/(\d+(?:\.\d+)?)\s*(taza|tazas)\b/);
  if (cupMatch) return Number(cupMatch[1]) * 240;
  const scoopMatch = text.match(/(\d+(?:\.\d+)?)\s*(scoop|scoops|cacito|cacitos)\b/);
  if (scoopMatch) return Number(scoopMatch[1]) * unitWeight;
  const sliceMatch = text.match(/(\d+(?:\.\d+)?)\s*(rebanada|rebanadas|tostada|tostadas)\b/);
  if (sliceMatch) return Number(sliceMatch[1]) * unitWeight;
  const canMatch = text.match(/(\d+(?:\.\d+)?)\s*(lata|latas)\b/);
  if (canMatch) return Number(canMatch[1]) * unitWeight;
  const unitMatch = text.match(/(\d+(?:\.\d+)?)\s*(unidad|unidades|huevo|huevos|platano|banana|manzana|tomate|tomates)\b/);
  if (unitMatch) return Number(unitMatch[1]) * unitWeight;
  const leading = text.match(/^(\d+(?:\.\d+)?)/);
  if (leading && food?.[6]) return Number(leading[1]) * unitWeight;
  return 100;
}

function parseMeal(text) {
  const parts = text
    .split(/,|\+|\by\b/gi)
    .map((part) => part.trim())
    .filter(Boolean);
  const items = parts.map((part) => {
    const food = findFood(part);
    if (!food) {
      return { raw: part, name: part, grams: 0, kcal: 0, protein: 0, carbs: 0, fat: 0, matched: false };
    }
    const grams = parseAmount(part, food);
    const factor = grams / 100;
    return {
      raw: part,
      name: food[0],
      grams,
      kcal: Math.round(food[2] * factor),
      protein: round1(food[3] * factor),
      carbs: round1(food[4] * factor),
      fat: round1(food[5] * factor),
      matched: true,
    };
  });
  return {
    items,
    totals: sumNutrition(items),
  };
}

function sumNutrition(items) {
  return items.reduce(
    (total, item) => ({
      kcal: total.kcal + item.kcal,
      protein: round1(total.protein + item.protein),
      carbs: round1(total.carbs + item.carbs),
      fat: round1(total.fat + item.fat),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

function round1(value) {
  return Math.round(Number(value || 0) * 10) / 10;
}

function getNutritionTargets(goalOverride = null, options = {}) {
  const weight = clampNumber($("#nutri-weight")?.value, 30, 250, 82);
  const height = clampNumber($("#nutri-height")?.value, 120, 230, 178);
  const age = clampNumber($("#nutri-age")?.value, 12, 90, 35);
  const sex = $("#nutri-sex")?.value || "male";
  const activity = clampNumber($("#nutri-activity")?.value, 1.2, 1.9, 1.55);
  const goal = goalOverride || $("#nutri-goal")?.value || "maintain";
  const rate = $("#nutri-rate")?.value || "standard";
  const bmr = sex === "male" ? 10 * weight + 6.25 * height - 5 * age + 5 : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * activity;
  const adjustments = {
    cut: { controlled: -0.1, standard: -0.15, aggressive: -0.2 },
    maintain: { controlled: 0, standard: 0, aggressive: 0 },
    bulk: { controlled: 0.05, standard: 0.08, aggressive: 0.12 },
  };
  const adjustmentPct = adjustments[goal]?.[rate] ?? adjustments.maintain.standard;
  const floor = sex === "female" ? 1200 : 1500;
  const kcal = Math.max(floor, Math.round(tdee * (1 + adjustmentPct)));
  const proteinRate = goal === "cut" ? 2.2 : goal === "bulk" ? 2 : 1.8;
  const fatRate = goal === "cut" ? 0.7 : 0.8;
  const protein = Math.round(weight * proteinRate);
  const fat = Math.max(Math.round(weight * fatRate), Math.round((kcal * 0.2) / 9));
  const carbs = Math.max(50, Math.round((kcal - protein * 4 - fat * 9) / 4));
  const macroKcal = Math.round(protein * 4 + carbs * 4 + fat * 9);
  const water = getHydrationTarget(weight, activity, options.trainingMinutes);
  const bmi = round1(weight / (height / 100) ** 2);
  const weeklyWeightChange = round1(((kcal - tdee) * 7) / 7700);
  const flags = [];
  if (kcal === floor && goal === "cut") flags.push("El déficit ha sido limitado para no bajar de un mínimo seguro.");
  if (Math.abs(macroKcal - kcal) > 80) flags.push("Los macros se han ajustado para mantener proteína y grasa mínima.");
  if (rate === "aggressive" && goal !== "maintain") flags.push("Ritmo agresivo: revisa energía, hambre, rendimiento y sueño cada semana.");
  return {
    kcal,
    protein,
    carbs,
    fat,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    macroKcal,
    goal,
    rate,
    adjustmentPct,
    proteinRate,
    fatRate,
    bmi,
    weeklyWeightChange,
    water,
    flags,
  };
}

function getHydrationTarget(weight, activity, trainingOverride = null) {
  const trainingMinutes = clampNumber(trainingOverride ?? $("#nutri-training-min")?.value ?? $("#ai-time")?.value, 0, 240, 60);
  const mlPerKg = activity >= 1.725 ? 38 : activity >= 1.55 ? 35 : activity >= 1.375 ? 33 : 30;
  const baseMl = weight * mlPerKg;
  const trainingMl = Math.round((trainingMinutes / 60) * 500);
  const totalMl = Math.round((baseMl + trainingMl) / 100) * 100;
  return {
    ml: totalMl,
    liters: round1(totalMl / 1000),
    duringTraining: Math.round(trainingMl / 100) * 100,
    mlPerKg,
    trainingMinutes,
    electrolytes: totalMl >= 3600 ? "Añade sal/electrolitos si sudas mucho." : "Agua normal suficiente salvo calor o sudor alto.",
  };
}

function todayMeals() {
  const today = new Date().toISOString().slice(0, 10);
  return mealLog.filter((meal) => meal.date === today);
}

function renderNutrition() {
  const targets = getNutritionTargets();
  const meals = todayMeals();
  const totals = sumNutrition(meals.map((meal) => meal.totals));
  $("#nutrition-date").textContent = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short" }).format(new Date());
  $("#macro-rings").innerHTML = [
    ["Kcal", totals.kcal, targets.kcal],
    ["Proteína", totals.protein, targets.protein, "g"],
    ["Carbos", totals.carbs, targets.carbs, "g"],
    ["Grasas", totals.fat, targets.fat, "g"],
    ["Agua", 0, targets.water.liters, " L"],
  ]
    .map(([label, value, target, unit = ""]) => {
      const displayValue = label === "Agua" ? targets.water.liters : value;
      const pct = label === "Agua" ? 100 : Math.min(100, Math.round((Number(value) / Number(target)) * 100) || 0);
      return `<div class="macro-card"><span>${label}</span><strong>${displayValue}${unit}</strong><small>${target}${unit} objetivo</small><div class="macro-bar"><i style="width:${pct}%"></i></div></div>`;
    })
    .join("");
  $("#daily-summary").innerHTML = `
    <div><span>Consumido</span><strong>${totals.kcal} kcal</strong></div>
    <div><span>Restante</span><strong>${Math.max(0, targets.kcal - totals.kcal)} kcal</strong></div>
    <div><span>Proteína</span><strong>${totals.protein} / ${targets.protein} g</strong></div>
    <div><span>Agua IA</span><strong>${targets.water.liters} L/día</strong></div>
    <div><span>Gasto total</span><strong>${targets.tdee} kcal</strong></div>
  `;
  $("#meal-log").innerHTML = meals.length
    ? meals
        .map((meal, index) => `
          <article class="meal-entry">
            <div><strong>${escapeHtml(meal.slot)}</strong><small>${meal.items.map((item) => escapeHtml(item.name)).join(", ")}</small></div>
            <span>${meal.totals.kcal} kcal</span>
            <button class="icon-button" data-delete-meal="${index}" aria-label="Eliminar comida"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
          </article>
        `)
        .join("")
    : `<p class="subtle">Aun no hay comidas registradas hoy.</p>`;
  renderNutritionAI(totals, targets);
  renderNutritionCoach(totals, targets);
  renderDashboardData();
}

function renderNutritionCoach(totals, targets) {
  const remaining = targets.kcal - totals.kcal;
  const proteinLeft = targets.protein - totals.protein;
  const water = targets.water;
  const messages = [
    remaining > 500 ? `Te quedan ${remaining} kcal. Prioriza una comida con proteína y carbohidrato si vas a entrenar.` : `Vas cerca del objetivo. Mantén comidas simples para no pasarte.`,
    proteinLeft > 25 ? `Faltan ${Math.round(proteinLeft)} g de proteína. Buena opción: pollo, yogur griego, whey o atún.` : "Proteína bien encaminada.",
    totals.fat > targets.fat ? "Grasas por encima del objetivo: el resto del día usa carnes magras y evita aceite/frutos secos." : "Grasas bajo control.",
    `Cálculo base: BMR ${targets.bmr} kcal, gasto total ${targets.tdee} kcal, objetivo ${targets.kcal} kcal.`,
    `Agua estimada: ${water.liters} L/día. Durante el entreno: ${water.duringTraining} ml extra. ${water.electrolytes}`,
  ];
  $("#nutrition-coach").innerHTML = [...messages, ...targets.flags].map((msg) => `<div class="coach-note">${escapeHtml(msg)}</div>`).join("");
}

function renderNutritionAI(totals, targets) {
  const remaining = targets.kcal - totals.kcal;
  const proteinLeft = Math.max(0, targets.protein - totals.protein);
  const carbLeft = Math.max(0, targets.carbs - totals.carbs);
  const fatLeft = Math.max(0, targets.fat - totals.fat);
  const goalLabel = {
    cut: "perder grasa",
    maintain: "mantener",
    bulk: "ganar músculo",
  }[targets.goal] || "mantener";
  const status = remaining > 250 ? "Faltan calorías útiles." : remaining < -150 ? "Vas por encima del objetivo." : "Vas dentro del rango.";
  const proteinAdvice = proteinLeft > 30 ? "Sube proteína en la siguiente comida." : proteinLeft > 10 ? "Remata con una ración pequeña de proteína." : "Proteína cubierta.";
  const energyLabel = remaining >= 0 ? "Calorías restantes" : "Calorías por encima";
  const energyValue = `${Math.abs(remaining)} kcal`;
  const adjustmentLabel = targets.adjustmentPct === 0 ? "mantenimiento" : `${Math.abs(Math.round(targets.adjustmentPct * 100))}% ${targets.adjustmentPct > 0 ? "superávit" : "déficit"}`;
  const weeklyLabel = targets.weeklyWeightChange === 0 ? "peso estable" : `${targets.weeklyWeightChange > 0 ? "+" : ""}${targets.weeklyWeightChange} kg/sem estimado`;
  const flags = targets.flags.length ? `<div class="nutrition-ai-flags">${targets.flags.map((flag) => `<span>${escapeHtml(flag)}</span>`).join("")}</div>` : "";
  const html = `
    <div class="nutrition-ai-head">
      <span class="pill">IA nutricional local</span>
      <strong>${targets.kcal} kcal para ${goalLabel}</strong>
      <small>${status} ${proteinAdvice} Fórmula Mifflin-St Jeor, ${adjustmentLabel}, ${weeklyLabel}.</small>
    </div>
    <div class="nutrition-ai-grid">
      <div><span>${energyLabel}</span><strong>${energyValue}</strong><small>BMR ${targets.bmr} kcal · TDEE ${targets.tdee} kcal</small></div>
      <div><span>Proteína restante</span><strong>${proteinLeft} g</strong><small>Objetivo: ${targets.protein} g/día</small></div>
      <div><span>Carbohidratos restantes</span><strong>${carbLeft} g</strong><small>Objetivo: ${targets.carbs} g/día</small></div>
      <div><span>Grasas restantes</span><strong>${fatLeft} g</strong><small>Objetivo: ${targets.fat} g/día</small></div>
      <div><span>Agua necesaria</span><strong>${targets.water.liters} L/día</strong><small>${targets.water.duringTraining} ml extra entrenando</small></div>
      <div><span>Electrolitos</span><strong>${targets.water.ml >= 3600 ? "Recomendados" : "Opcional"}</strong><small>${targets.water.electrolytes}</small></div>
      <div><span>IMC y macros</span><strong>${targets.bmi} IMC</strong><small>${targets.macroKcal} kcal desde macros</small></div>
      <div><span>Proteína/kg</span><strong>${targets.proteinRate} g/kg</strong><small>Grasa mínima: ${targets.fatRate} g/kg o 20% kcal</small></div>
      <div><span>Agua/kg</span><strong>${targets.water.mlPerKg} ml/kg</strong><small>${targets.water.trainingMinutes} min entreno incluidos</small></div>
    </div>
    ${flags}
  `;
  if ($("#ai-nutrition-panel")) $("#ai-nutrition-panel").innerHTML = html;
  if ($("#nutrition-ai-summary")) $("#nutrition-ai-summary").innerHTML = html;
}

function previewMeal() {
  const parsed = parseMeal($("#meal-input").value);
  $("#meal-preview").innerHTML = parsed.items.length
    ? `
      <div class="meal-total"><strong>${parsed.totals.kcal} kcal</strong><span>${parsed.totals.protein}p - ${parsed.totals.carbs}c - ${parsed.totals.fat}g</span></div>
      ${parsed.items.map((item) => `<div class="meal-item ${item.matched ? "" : "unmatched"}"><span>${escapeHtml(item.name)}</span><small>${item.grams ? `${Math.round(item.grams)}g` : "sin coincidencia"} - ${item.kcal} kcal</small></div>`).join("")}
    `
    : "";
  return parsed;
}

async function addMeal() {
  const parsed = previewMeal();
  if (!parsed.items.length || parsed.totals.kcal === 0) {
    showToast("Escribe una comida reconocible con cantidades.");
    return null;
  }
  if (parsed.items.some((item) => !item.matched)) {
    showToast("Hay alimentos sin reconocer. Corrige el texto o busca el alimento abajo.");
    return null;
  }
  const meal = {
    date: new Date().toISOString().slice(0, 10),
    slot: $("#meal-slot").value,
    text: $("#meal-input").value,
    ...parsed,
  };
  mealLog.push(meal);
  saveMealLog();
  if (hasRealBackend()) {
    const saved = await apiRequest("/api/meals", { method: "POST", body: meal }).catch(() => null);
    if (saved?.id) {
      meal.id = saved.id;
      saveMealLog();
    }
  }
  $("#meal-input").value = "";
  $("#meal-preview").innerHTML = "";
  renderNutrition();
  showToast("Comida guardada.");
  return meal;
}

function renderFoodSearch() {
  const query = normalizeText($("#food-search").value);
  const matches = foodDb
    .filter(([name, aliases]) => !query || [name, ...aliases].some((alias) => normalizeText(alias).includes(query)))
    .slice(0, 8);
  $("#food-results").innerHTML = matches
    .map(([name, , kcal, protein, carbs, fat]) => `<button type="button" data-food-name="${escapeHtml(name)}"><strong>${escapeHtml(name)}</strong><small>${kcal} kcal - ${protein}p ${carbs}c ${fat}g /100g</small></button>`)
    .join("");
}

function renderPhotoFoodResults() {
  const container = $("#photo-food-results");
  if (!container) return;
  container.innerHTML = appData.photoItems
    .map((item, index) => `
      <article class="photo-food-item">
        <label>Alimento<input data-photo-field="name" data-photo-index="${index}" value="${escapeHtml(item.name)}"></label>
        <label>Gramos<input data-photo-field="grams" data-photo-index="${index}" type="number" value="${item.grams}"></label>
        <label>Kcal<input data-photo-field="kcal" data-photo-index="${index}" type="number" value="${item.kcal}"></label>
        <small>${round1(item.protein)}p · ${round1(item.carbs)}c · ${round1(item.fat)}g</small>
        <button class="icon-button" data-remove-photo-food="${index}" aria-label="Eliminar alimento"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </article>
    `)
    .join("");
}

function simulatePhotoFood() {
  const plate = $("#photo-plate-size")?.value || "Normal";
  const fat = $("#photo-extra-fat")?.value || "Poco";
  const scale = plate === "Grande" ? 1.25 : plate === "Pequeño" ? 0.8 : 1;
  appData.photoItems = [
    scalePhotoItem("Arroz cocido", 160 * scale),
    scalePhotoItem("Pechuga de pollo", 170 * scale),
    scalePhotoItem("Verduras", 100 * scale),
  ];
  if (fat === "Mucho" || fat === "No se ve") appData.photoItems.push(scalePhotoItem("aceite de oliva", fat === "Mucho" ? 15 : 7));
  saveAppData();
  renderPhotoFoodResults();
  showToast("Análisis aproximado generado. Revisa y corrige antes de guardar.");
}

function scalePhotoItem(name, grams) {
  const food = findFood(name) || foodDb[0];
  const factor = grams / 100;
  return {
    name: food[0],
    grams: Math.round(grams),
    kcal: Math.round(food[2] * factor),
    protein: round1(food[3] * factor),
    carbs: round1(food[4] * factor),
    fat: round1(food[5] * factor),
  };
}

function updatePhotoFoodItem(index, field, value) {
  const item = appData.photoItems[index];
  if (!item) return;
  if (field === "name") {
    item.name = value;
  } else {
    item[field] = Math.max(0, Number(value) || 0);
  }
  if (field === "grams" || field === "name") {
    const recalculated = scalePhotoItem(item.name, item.grams || 100);
    Object.assign(item, recalculated, { name: item.name || recalculated.name });
  }
  saveAppData();
  renderPhotoFoodResults();
}

async function confirmPhotoFood() {
  const text = appData.photoItems.map((item) => `${Math.round(item.grams)}g ${item.name}`).join(", ");
  $("#meal-input").value = text;
  const parsed = previewMeal();
  if (!parsed.items.length) {
    showToast("No hay alimentos detectados para guardar.");
    return;
  }
  await addMeal();
  if (hasRealBackend()) {
    await apiRequest("/api/food-photo/analyze", {
      method: "POST",
      body: {
        plateSize: $("#photo-plate-size")?.value,
        cookingMethod: $("#photo-cooking-method")?.value,
        extraFat: $("#photo-extra-fat")?.value,
        confirmedItems: appData.photoItems,
        photo: appData.lastFoodPhoto || null,
      },
    }).catch(() => {});
  }
  showToast("Comida por foto revisada y guardada.");
}

function renderDashboardData() {
  const profile = appData.profile;
  const health = appData.health;
  const history = Array.isArray(appData.workoutHistory) ? appData.workoutHistory : [];
  const meals = todayMeals();
  const totals = sumNutrition(meals.map((meal) => meal.totals));
  const targets = getNutritionTargets();
  $("#weekly-workouts").textContent = `${history.length}`;
  $("#recovery-score").textContent = `${estimateRecovery()}%`;
  $("#weekly-volume").textContent = history.length ? `${estimateHistoryVolume(history).toLocaleString("es-ES")} kg` : "0 kg";
  $("#best-orm").textContent = history.length ? `${estimateBestOrm(history)} kg` : "Sin datos";
  $("#side-streak").textContent = `${history.length ? Math.min(history.length, 8) : 0} días`;
  const data = [
    ["Hola", profile.name, profile.goal],
    ["Pasos", health.steps.toLocaleString("es-ES"), `${Math.round((health.steps / profile.steps) * 100)}% objetivo`],
    ["Calorías gastadas", `${health.active + health.resting}`, `${health.active} activas`],
    ["Calorías restantes", `${Math.max(0, targets.kcal - totals.kcal)}`, `${totals.kcal} consumidas`],
    ["Proteína", `${totals.protein}/${targets.protein} g`, "objetivo diario"],
    ["Sueño", `${health.sleep} h`, `FC reposo ${health.rhr}`],
    ["Agua", `${targets.water.liters} L`, "objetivo IA"],
    ["Peso", `${profile.weight} kg`, `IMC ${targets.bmi}`],
  ];
  $("#dashboard-real-data").innerHTML = data
    .map(([label, value, help]) => `<div><span>${label}</span><strong>${value}</strong><small>${help}</small></div>`)
    .join("");
}

function estimateHistoryVolume(history) {
  return Math.round(
    history.reduce((sum, workout) => sum + (workout.exercises || []).flatMap((entry) => entry.sets || []).reduce((setSum, set) => setSum + Number(set.weight || 0) * Number(set.reps || 0), 0), 0)
  );
}

function estimateBestOrm(history) {
  const sets = history.flatMap((workout) => (workout.exercises || []).flatMap((entry) => entry.sets || []));
  const best = sets.reduce((max, set) => Math.max(max, Number(set.weight || 0) * (1 + Number(set.reps || 0) / 30)), 0);
  return best ? Math.round(best) : 0;
}

function estimateRecovery() {
  const health = appData.health;
  let score = 70;
  if (health.sleep >= 7) score += 10;
  if (health.hrv >= 55) score += 8;
  if (health.rhr <= 60) score += 6;
  if (health.steps > appData.profile.steps * 1.25) score -= 8;
  if (appData.profile.stress === "Alto") score -= 10;
  return Math.max(35, Math.min(98, Math.round(score)));
}

function renderHabits() {
  $("#habit-list").innerHTML = appData.habits
    .map((habit) => `
      <label class="habit-item ${habit.done ? "done" : ""}">
        <input type="checkbox" data-habit-id="${habit.id}" ${habit.done ? "checked" : ""}>
        <span>${habit.label}</span>
      </label>
    `)
    .join("");
}

function renderHealthInputs() {
  const health = appData.health;
  const fields = [
    ["#health-steps-input", health.steps],
    ["#health-active-input", health.active],
    ["#health-resting-input", health.resting],
    ["#health-sleep-input", health.sleep],
    ["#health-rhr-input", health.rhr],
    ["#health-hrv-input", health.hrv],
  ];
  fields.forEach(([selector, value]) => {
    if ($(selector)) $(selector).value = value;
  });
}

function renderAuthStatus() {
  const status = $("#auth-status");
  setAuthUiState(false);
  if (!status) return;
  const help = $("#auth-help");
  const isFirebaseAccount = appData.account?.mode === "firebase" && firebaseOnline;
  if (isFirebaseAccount) {
    status.textContent = `Cuenta real iniciada (Firebase): ${appData.account.email}`;
    if (help) help.textContent = "Tus datos se guardan en Firebase Auth, Firestore y Storage, separados por usuario.";
    return;
  }
  if (firebaseOnline) {
    status.textContent = "Firebase conectado. Puedes crear cuenta o iniciar sesión real.";
    if (help) help.textContent = "Registro, login, rutinas, comidas, entrenos y perfil se guardaran en Firebase.";
    return;
  }
  const isRealAccount = appData.account?.mode === "api" && apiOnline;
  if (isRealAccount) {
    status.textContent = `Cuenta real iniciada (SQLite): ${appData.account.email}`;
    if (help) help.textContent = "Tus datos se guardan en la base de datos del backend y se separan por usuario.";
    return;
  }
  if (apiOnline) {
    status.textContent = "Backend conectado. Puedes crear cuenta o iniciar sesión real.";
    if (help) help.textContent = "Registro, login, rutinas, comidas, entrenos y perfil se guardaran en SQLite.";
    return;
  }
  status.textContent = "Sin backend conectado. No hay cuenta real ni sincronización.";
  if (help) help.textContent = "Configura Firebase en config.js o abre la app con npm start para usar usuarios reales y base de datos.";
}

function showBackendRequired() {
  showToast("No hay backend real conectado. Configura Firebase en config.js o ejecuta npm start.");
  renderAuthStatus();
}

function authErrorMessage(error) {
  const message = String(error?.message || error || "");
  if (message.includes("auth/configuration-not-found") || message.includes("CONFIGURATION_NOT_FOUND")) {
    return "Firebase Auth aun no esta activado. En Firebase Console activa Authentication > Email/Password.";
  }
  if (message.includes("auth/operation-not-allowed")) {
    return "Activa el proveedor Email/Password en Firebase Authentication.";
  }
  if (message.includes("auth/email-already-in-use")) return "Ese email ya tiene cuenta. Inicia sesión.";
  if (message.includes("auth/invalid-credential") || message.includes("auth/wrong-password")) return "Email o contraseña incorrectos.";
  if (message.includes("auth/weak-password")) return "La contraseña debe tener al menos 6 caracteres.";
  if (message.includes("auth/invalid-email")) return "El email no es válido.";
  if (message.includes("auth/network-request-failed")) return "Firebase no ha confirmado el envío. Comprueba conexión, espera un minuto y vuelve a probar con el email exacto.";
  if (message.includes("auth/too-many-requests")) return "Firebase ha bloqueado temporalmente demasiados intentos. Espera unos minutos y vuelve a probar.";
  if (message.includes("auth/user-not-found")) return "No existe cuenta con ese email. Revisa que este escrito exactamente igual.";
  return message || "No se pudo completar la accion de cuenta.";
}

async function sendPasswordReset(source = "profile") {
  syncAuthInputs(source);
  const inputEmail = source === "gate" ? $("#gate-auth-email")?.value.trim() : $("#auth-email")?.value.trim();
  const email = inputEmail || appData.account?.email || "";
  if (!email) return showToast("Introduce el email para recuperar contraseña.");
  if (appData.account?.email && normalizeText(email) !== normalizeText(appData.account.email)) {
    showToast(`Ojo: estas enviando el correo a ${email}, no a la cuenta iniciada ${appData.account.email}.`);
  }
  if (await detectApi()) {
    await apiRequest("/api/auth/reset", { method: "POST", body: { email } })
      .then((result) => showToast(`Correo solicitado para ${result.email || email}. Mira Spam/Promociones y comprueba que el email este bien escrito.`))
      .catch((error) => showToast(authErrorMessage(error)));
  } else {
    showBackendRequired();
  }
}

async function sendVerificationEmail() {
  if (!isSignedIn()) return showToast("Inicia sesión para verificar tu email.");
  if (await detectApi()) {
    await apiRequest("/api/auth/verify-email", { method: "POST" })
      .then((result) => showToast(`Correo de verificacion solicitado para ${result.email || appData.account.email}. Revisa Spam/Promociones.`))
      .catch((error) => showToast(authErrorMessage(error)));
  } else {
    showBackendRequired();
  }
}

function renderProfileInputs() {
  const profile = appData.profile;
  const fields = {
    "#profile-name-input": profile.name,
    "#profile-age-input": profile.age,
    "#profile-sex-input": profile.sex,
    "#profile-height-input": profile.height,
    "#profile-weight-input": profile.weight,
    "#profile-goal-input": profile.goal,
    "#profile-secondary-goal-input": profile.secondaryGoal,
    "#profile-level-input": profile.level,
    "#profile-days-input": profile.days,
    "#profile-session-time-input": profile.sessionTime,
    "#profile-place-input": profile.place,
    "#profile-equipment-input": profile.equipment,
    "#profile-injuries-input": profile.injuries,
    "#profile-medical-input": profile.medical,
    "#profile-sleep-input": profile.sleep,
    "#profile-stress-input": profile.stress,
    "#profile-work-input": profile.work,
    "#profile-steps-input": profile.steps,
    "#profile-diet-input": profile.diet,
    "#profile-allergies-input": profile.allergies,
    "#profile-intolerances-input": profile.intolerances,
    "#profile-dislikes-input": profile.dislikes,
    "#profile-meals-input": profile.meals,
    "#profile-budget-input": profile.budget,
    "#profile-training-time-input": profile.trainingTime,
    "#profile-meal-times-input": profile.mealTimes,
    "#profile-health-input": profile.health,
  };
  Object.entries(fields).forEach(([selector, value]) => {
    if ($(selector)) $(selector).value = value;
  });
  const profileTitle = $(".profile-card h3");
  const profileText = $(".profile-card .subtle");
  const profileAvatar = $(".profile-card .avatar");
  if (profileTitle) profileTitle.textContent = profile.name;
  if (profileText) profileText.textContent = `Objetivo: ${profile.goal.toLowerCase()} · ${profile.days} días/semana`;
  if (profileAvatar) profileAvatar.textContent = initialsFromName(profile.name);
  if ($("#nutri-weight")) $("#nutri-weight").value = profile.weight;
  if ($("#nutri-height")) $("#nutri-height").value = profile.height;
  if ($("#nutri-age")) $("#nutri-age").value = profile.age;
  if ($("#nutri-sex")) $("#nutri-sex").value = profile.sex;
  if ($("#nutri-training-min")) $("#nutri-training-min").value = profile.sessionTime;
  if ($("#public-profile-toggle")) $("#public-profile-toggle").checked = Boolean(appData.privacySettings?.publicProfile);
  if ($("#auto-rest-toggle")) $("#auto-rest-toggle").checked = Boolean(appData.privacySettings?.autoRest);
  if ($("#health-sync-toggle")) $("#health-sync-toggle").checked = Boolean(appData.privacySettings?.healthSync);
  if ($("#record-notifications-toggle")) $("#record-notifications-toggle").checked = Boolean(appData.privacySettings?.recordNotifications);
}

function initialsFromName(name) {
  return String(name || "LiftLab")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "LL";
}

async function saveProfileFromForm() {
  appData.profile = {
    ...appData.profile,
    name: $("#profile-name-input").value.trim() || "Usuario",
    age: clampNumber($("#profile-age-input").value, 12, 90, 35),
    sex: $("#profile-sex-input").value,
    height: clampNumber($("#profile-height-input").value, 120, 230, 178),
    weight: clampNumber($("#profile-weight-input").value, 30, 250, 82),
    goal: $("#profile-goal-input").value,
    secondaryGoal: $("#profile-secondary-goal-input").value.trim(),
    level: $("#profile-level-input").value,
    days: clampNumber($("#profile-days-input").value, 1, 7, 4),
    sessionTime: clampNumber($("#profile-session-time-input").value, 15, 180, 60),
    place: $("#profile-place-input").value,
    equipment: $("#profile-equipment-input").value.trim(),
    injuries: $("#profile-injuries-input").value.trim(),
    medical: $("#profile-medical-input").value.trim(),
    sleep: $("#profile-sleep-input").value,
    stress: $("#profile-stress-input").value,
    work: $("#profile-work-input").value,
    steps: clampNumber($("#profile-steps-input").value, 1000, 30000, 8000),
    diet: $("#profile-diet-input").value.trim(),
    allergies: $("#profile-allergies-input").value.trim(),
    intolerances: $("#profile-intolerances-input").value.trim(),
    dislikes: $("#profile-dislikes-input").value.trim(),
    meals: clampNumber($("#profile-meals-input").value, 1, 8, 4),
    budget: $("#profile-budget-input").value.trim(),
    trainingTime: $("#profile-training-time-input").value.trim(),
    mealTimes: $("#profile-meal-times-input").value.trim(),
    health: $("#profile-health-input").value,
  };
  saveAppData();
  await pushApi("/api/profile", appData.profile);
  await pushApi("/api/onboarding", appData.profile);
  renderProfileInputs();
  renderDashboardData();
  renderNutrition();
  runAIAgents();
  showToast("Perfil guardado y planes recalculados.");
}

function renderWeeklyRoutineBoard() {
  const board = $("#weekly-routine-board");
  if (!board) return;
  board.innerHTML = weeklyRoutinePlan
    .map((day, index) => `
      <article class="weekly-day-card ${day.status === "Recuperación" ? "recovery" : ""} ${appData.selectedWeekDay === index ? "active" : ""}" data-select-week-day="${index}">
        <div class="weekly-day-head">
          <div>
            <span>${day.day}</span>
            <strong>${day.title}</strong>
          </div>
          <small>${day.status}</small>
        </div>
        <div class="weekly-day-meta">
          <span>${day.duration}</span>
          <span>${day.difficulty}</span>
          <span>${day.muscles.join(" · ")}</span>
        </div>
        <div class="routine-blocks">
          ${day.blocks
            .map((block) => `
              <div class="routine-block">
                <strong>${block.name}</strong>
                <small>${block.exercises.join(", ")}</small>
              </div>
            `)
            .join("")}
        </div>
        <div class="weekly-day-actions">
          <button class="primary-button" data-load-template="${["push", "pull", "fullbody", "legs", "power"][index] || "push"}">Empezar</button>
          <button class="ghost-button" data-edit-week-day="${index}">Editar</button>
          <button class="ghost-button" data-swap-week-day="${index}">Sustituir</button>
        </div>
      </article>
    `)
    .join("");
  renderRoutineDayDetail();
}

function renderRoutineDayDetail() {
  const day = weeklyRoutinePlan[appData.selectedWeekDay] || weeklyRoutinePlan[0];
  if (!$("#routine-day-detail")) return;
  $("#routine-detail-title").textContent = `${day.day}: ${day.title}`;
  $("#routine-detail-subtitle").textContent = `${day.duration} · ${day.difficulty} · ${day.muscles.join(", ")}`;
  const allExercises = day.blocks.flatMap((block) => block.exercises);
  $("#routine-day-detail").innerHTML = `
    <div class="routine-day-summary">
      <div><span>Estado</span><strong>${day.status}</strong></div>
      <div><span>Ejercicios</span><strong>${allExercises.length}</strong></div>
      <div><span>Volumen estimado</span><strong>${allExercises.length * 9} series</strong></div>
      <div><span>Progresion</span><strong>+1 rep o +2,5 kg</strong></div>
    </div>
    <div class="routine-detail-blocks">
      ${day.blocks
        .map((block, blockIndex) => `
          <section class="routine-detail-block">
            <h4>Bloque ${blockIndex + 1}: ${block.name}</h4>
            ${block.exercises
              .map((name, exerciseIndex) => {
                const exercise = exercises.find((item) => normalizeText(name).includes(normalizeText(item.name))) || exercises[(blockIndex + exerciseIndex) % exercises.length];
                return `
                  <article class="routine-detail-exercise">
                    <img src="${posterSrc(exercise, 1)}" alt="Imagen anatomica de ${exercise.name}">
                    <div>
                      <strong>${exercise.name}</strong>
                      <small>${exercise.muscle} · ${exercise.equipment}</small>
                      <p>${exercise.cues[0]} ${exercise.cues[1]}</p>
                    </div>
                    <div class="routine-prescription">
                      <span>3 series</span>
                      <span>${exerciseIndex === 0 && blockIndex === 1 ? "6-8 reps" : "10-12 reps"}</span>
                      <span>RPE ${exerciseIndex === 0 ? "8" : "7"}</span>
                      <span>${exerciseIndex === 0 ? "120s" : "75s"}</span>
                    </div>
                  </article>
                `;
              })
              .join("")}
          </section>
        `)
        .join("")}
    </div>
    <div class="coach-note">Coach IA: si duermes mal o Salud marca baja recuperación, baja 1 serie en accesorios. Si una máquina está ocupada, usa la sustitución del día.</div>
  `;
}

function selectWeekDay(index) {
  appData.selectedWeekDay = Number(index);
  saveAppData();
  renderWeeklyRoutineBoard();
}

function openExercise(id) {
  const exercise = findExercise(id);
  state.selectedExercise = exercise;
  $("#dialog-title").textContent = exercise.name;
  $("#dialog-muscle").textContent = exercise.muscle;
  $("#dialog-description").textContent = exercise.description;
  $("#dialog-video-frame").src = posterSrc(exercise, 0);
  $("#dialog-video-frame").dataset.frame = "0";
  $("#dialog-video-frame").alt = `Video animado de ${exercise.name}`;
  $("#dialog-photos").innerHTML = [0, 1, 2]
    .map((frame) => `<img src="${posterSrc(exercise, frame)}" alt="Foto ${frame + 1} de ${exercise.name}">`)
    .join("");
  $("#dialog-muscles").innerHTML = `
    <img src="${muscleDataUri(exercise.muscle, "front")}" alt="Musculos frontales trabajados por ${exercise.name}">
    <img src="${muscleDataUri(exercise.muscle, "back")}" alt="Musculos posteriores trabajados por ${exercise.name}">
  `;
  renderCues();
  $("#exercise-dialog").showModal();
  startDialogAnimation();
}

function renderMuscleAtlas() {
  $("#muscle-atlas").innerHTML = muscleGroups
    .map(([name, filter, side]) => {
      const count = exercises.filter((exercise) => exercise.muscle === filter).length;
      return `
      <button class="muscle-card" data-muscle="${filter}">
        <img src="${muscleDataUri(name, side)}" alt="${name}">
        <strong>${name}</strong>
        <small>${count} ejercicios</small>
      </button>
    `;
    })
    .join("");
}

function muscleDataUri(muscle, side = "front") {
  const active = "#ff3b30";
  const base = "#f0f0f0";
  const shadow = "#b8b8b8";
  const mark = (name) => muscle === name ? active : base;
  const isBack = side === "back";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="420" viewBox="0 0 360 420">
      <rect width="360" height="420" rx="24" fill="#050505"/>
      <g transform="translate(75 28)">
        <ellipse cx="105" cy="34" rx="26" ry="31" fill="${base}"/>
        <path d="M78 68c14 16 40 16 54 0l16 42H62z" fill="${shadow}"/>
        <path d="M60 102c-28 16-42 50-48 86l32 7c6-30 14-50 28-62z" fill="${mark(isBack ? "Espalda" : "Pecho")}"/>
        <path d="M150 102c28 16 42 50 48 86l-32 7c-6-30-14-50-28-62z" fill="${mark(isBack ? "Espalda" : "Pecho")}"/>
        <path d="M72 96h66c18 38 18 90 0 132H72c-18-42-18-94 0-132z" fill="${mark(isBack ? "Espalda" : "Pecho")}"/>
        <path d="M88 112c10 40 10 78 0 112M122 112c-10 40-10 78 0 112" stroke="#050505" stroke-opacity=".35" stroke-width="4"/>
        <path d="M48 186c-9 34-12 68-8 100l30 1c2-33 5-63 14-90z" fill="${mark("Bíceps")}"/>
        <path d="M162 186c9 34 12 68 8 100l-30 1c-2-33-5-63-14-90z" fill="${mark("Tríceps")}"/>
        <path d="M74 230h30v124H56c0-42 7-84 18-124z" fill="${mark("Cuádriceps")}"/>
        <path d="M106 230h30c11 40 18 82 18 124h-48z" fill="${mark(isBack ? "Isquiotibiales" : "Cuádriceps")}"/>
        <path d="M75 230c20 18 40 18 60 0l-8 54H83z" fill="${mark("Glúteos")}" opacity="${isBack ? "1" : ".28"}"/>
        <path d="M82 106h46v118H82z" fill="${mark("Abdominales")}" opacity="${!isBack && muscle === "Abdominales" ? "1" : "0"}"/>
        <path d="M48 96c16-18 34-26 54-26s38 8 60 26l-18 42c-16-18-28-26-42-26s-26 8-38 26z" fill="${mark("Hombros")}" opacity=".96"/>
        <path d="M58 354h42l-4 42H60zM110 354h42l-2 42h-36z" fill="${muscle === "Gemelo" || muscle === "Gemelos" ? active : base}"/>
      </g>
      <text x="180" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#fff">${escapeSvg(muscle)}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function addExerciseToWorkout(id) {
  state.activeWorkout.exercises.push({
    id,
    sets: [{ weight: 20, reps: 10, rpe: 7, type: "Normal", done: false }],
  });
  saveWorkout();
  renderWorkoutLog();
  showToast("Ejercicio añadido al entreno.");
}

function loadTemplate(id) {
  state.currentTemplate = id;
  state.activeWorkout = createWorkout(id);
  saveWorkout();
  renderPhonePreview();
  renderWorkoutLog();
  showToast("Rutina cargada.");
  setView("workout");
}

function syncHealthData() {
  appData.health = {
    ...appData.health,
    steps: Math.max(4500, appData.health.steps + 650),
    active: Math.max(250, appData.health.active + 45),
    resting: appData.health.resting,
    sleep: round1(Math.max(5.5, appData.health.sleep - 0.1)),
    rhr: appData.health.rhr,
    hrv: appData.health.hrv,
    distance: round1((appData.health.steps + 650) * 0.00078),
    workouts: Math.max(1, appData.health.workouts),
    activityMinutes: appData.health.activityMinutes + 6,
  };
  saveAppData();
  renderHealthInputs();
  renderDashboardData();
  renderNutrition();
  runAIAgents();
  pushApi("/api/health", appData.health);
  showToast("Datos de Salud actualizados. En iOS se leeran con HealthKit real.");
}

function saveManualHealth() {
  appData.health = {
    ...appData.health,
    steps: clampNumber($("#health-steps-input").value, 0, 50000, 8000),
    active: clampNumber($("#health-active-input").value, 0, 5000, 500),
    resting: clampNumber($("#health-resting-input").value, 800, 3500, 1800),
    sleep: clampNumber($("#health-sleep-input").value, 0, 14, 7),
    rhr: clampNumber($("#health-rhr-input").value, 35, 120, 60),
    hrv: clampNumber($("#health-hrv-input").value, 10, 180, 60),
  };
  appData.health.distance = round1(appData.health.steps * 0.00078);
  saveAppData();
  pushApi("/api/health", appData.health);
  renderDashboardData();
  renderNutrition();
  showToast("Datos manuales de salud guardados.");
}

async function registerLocalAccount(source = "profile") {
  syncAuthInputs(source);
  const { email, password } = getAuthCredentials(source);
  if (!email || password.length < 6) {
    showToast("Introduce email y contraseña de al menos 6 caracteres.");
    return;
  }
  setAuthUiState(true);
  if (await detectApi()) {
    try {
      const session = await apiRequest("/api/auth/register", {
        method: "POST",
        body: { email, password, seed: { profile: appData.profile, health: appData.health, habits: appData.habits, routines: weeklyRoutinePlan } },
      });
      apiToken = session.token;
      localStorage.setItem("liftlab-api-token", apiToken);
      appData.account = { email: session.user.email, id: session.user.id, mode: firebaseOnline ? "firebase" : "api" };
      appData.profile = { ...appData.profile, ...session.data.profile, email };
      await pushApi("/api/profile", appData.profile);
      await pushApi("/api/onboarding", appData.profile);
      await pushApi("/api/health", appData.health);
      await pushApi("/api/habits", appData.habits);
      await pushApi("/api/routines", weeklyRoutinePlan);
      await loadApiUserData();
      showToast(firebaseOnline ? "Cuenta real creada en Firebase." : "Cuenta real creada en backend local.");
    } catch (error) {
      showToast(authErrorMessage(error));
      setAuthUiState(false);
      return;
    }
  } else {
    showBackendRequired();
    setAuthUiState(false);
    return;
  }
  saveAppData();
  renderAuthStatus();
  setView("dashboard");
}

async function loginLocalAccount(source = "profile") {
  syncAuthInputs(source);
  const { email, password } = getAuthCredentials(source);
  if (!email) {
    showToast("Introduce el email.");
    return;
  }
  setAuthUiState(true);
  if (await detectApi()) {
    try {
      const session = await apiRequest("/api/auth/login", { method: "POST", body: { email, password } });
      apiToken = session.token;
      localStorage.setItem("liftlab-api-token", apiToken);
      appData.account = { email: session.user.email, id: session.user.id, mode: firebaseOnline ? "firebase" : "api" };
      saveAppData();
      await loadApiUserData();
      showToast(firebaseOnline ? "Sesión iniciada con Firebase." : "Sesión iniciada con backend.");
      setView("dashboard");
      return;
    } catch (error) {
      showToast(authErrorMessage(error));
      setAuthUiState(false);
      return;
    }
  }
  showBackendRequired();
  setAuthUiState(false);
}

async function deleteLocalAccount() {
  if (firebaseOnline || (apiToken && apiOnline)) await apiRequest("/api/account", { method: "DELETE" }).catch(() => {});
  localStorage.removeItem("liftlab-app-data");
  localStorage.removeItem("liftlab-meals");
  localStorage.removeItem("liftlab-workout");
  localStorage.removeItem("liftlab-api-token");
  apiToken = "";
  firebaseOnline = false;
  firebaseBackend = null;
  resetLocalUserState(null);
  renderAllAppData();
  renderAuthStatus();
  setAuthUiState(false);
  showToast("Cuenta y datos locales eliminados.");
}

function renderAllAppData() {
  renderProfileInputs();
  renderAuthStatus();
  renderHealthInputs();
  renderDashboardData();
  renderWeekPlan();
  renderHabits();
  renderPhotoFoodResults();
  renderCommunity();
  renderMeasures();
  renderWeeklyRoutineBoard();
  renderWorkoutLog();
  renderNutrition();
}

function startTimer(seconds = 90) {
  clearInterval(state.timer.handle);
  state.timer.remaining = seconds;
  state.timer.running = true;
  updateTimerText();
  state.timer.handle = setInterval(() => {
    state.timer.remaining -= 1;
    updateTimerText();
    if (state.timer.remaining <= 0) {
      clearInterval(state.timer.handle);
      state.timer.running = false;
      showToast("Descanso completado.");
    }
  }, 1000);
}

function updateTimerText() {
  const minutes = String(Math.floor(state.timer.remaining / 60)).padStart(2, "0");
  const seconds = String(state.timer.remaining % 60).padStart(2, "0");
  $("#rest-timer").textContent = `${minutes}:${seconds}`;
}

function bindEvents() {
  $$(".nav-item, .mobile-tab").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  $$("[data-view-shortcut]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.viewShortcut)));
  document.addEventListener("click", (event) => {
    const templateButton = event.target.closest("[data-load-template]");
    if (templateButton) loadTemplate(templateButton.dataset.loadTemplate);

    const weekCard = event.target.closest("[data-select-week-day]");
    if (weekCard && !event.target.closest("button")) selectWeekDay(weekCard.dataset.selectWeekDay);

    const editWeekDay = event.target.closest("[data-edit-week-day]");
    if (editWeekDay) {
      selectWeekDay(editWeekDay.dataset.editWeekDay);
      showToast("Día seleccionado. Cambia ejercicios desde Sustituir o empieza la sesión.");
    }

    const swapWeekDay = event.target.closest("[data-swap-week-day]");
    if (swapWeekDay) {
      const day = weeklyRoutinePlan[Number(swapWeekDay.dataset.swapWeekDay)];
      day.blocks[day.blocks.length - 1].exercises = day.blocks[day.blocks.length - 1].exercises.map((name) => (name.includes("Plancha") ? "Elevacion lateral" : name));
      selectWeekDay(swapWeekDay.dataset.swapWeekDay);
      pushApi("/api/routines", weeklyRoutinePlan);
      showToast("Ejercicio sustituido según disponibilidad y molestias.");
    }

    const habitToggle = event.target.closest("[data-habit-id]");
    if (habitToggle) {
      const habit = appData.habits.find((item) => item.id === habitToggle.dataset.habitId);
      if (habit) habit.done = habitToggle.checked;
      saveAppData();
      pushApi("/api/habits", appData.habits);
      renderHabits();
      showToast(habitToggle.checked ? "Hábito completado." : "Hábito pendiente.");
    }

    const removePhotoFood = event.target.closest("[data-remove-photo-food]");
    if (removePhotoFood) {
      appData.photoItems.splice(Number(removePhotoFood.dataset.removePhotoFood), 1);
      saveAppData();
      renderPhotoFoodResults();
    }

    const openButton = event.target.closest("[data-open-exercise]");
    if (openButton) openExercise(openButton.dataset.openExercise);

    const openButtonText = event.target.closest("[data-open-exercise-button]");
    if (openButtonText) openExercise(openButtonText.dataset.openExerciseButton);

    const muscleCard = event.target.closest(".muscle-card");
    if (muscleCard) {
      state.libraryFilter = muscleCard.dataset.muscle;
      renderFilters();
      renderLibrary();
      $(".section-title").scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(`Filtrando ${state.libraryFilter}.`);
    }

    const demoButton = event.target.closest("[data-demo]");
    if (demoButton) {
      state.selectedExercise = findExercise(demoButton.dataset.demo);
      renderCues();
      showToast(`${state.selectedExercise.name}: guía cargada.`);
    }

    const addSetButton = event.target.closest("[data-add-set]");
    if (addSetButton) {
      const index = Number(addSetButton.dataset.addSet);
      state.activeWorkout.exercises[index].sets.push({ weight: 20, reps: 10, rpe: 7, type: "Normal", done: false });
      saveWorkout();
      renderWorkoutLog();
    }
  });

  $("#exercise-log").addEventListener("input", (event) => {
    const input = event.target;
    const row = input.closest(".set-row");
    const exerciseNode = input.closest(".log-exercise");
    if (!row || !exerciseNode) return;
    const exerciseIndex = Number(exerciseNode.dataset.exerciseIndex);
    const setIndex = Number(row.dataset.setIndex);
    const field = input.dataset.field;
    const value = field === "type" ? input.value : Number(input.value);
    state.activeWorkout.exercises[exerciseIndex].sets[setIndex][field] = value;
    saveWorkout();
  });

  $("#exercise-log").addEventListener("click", (event) => {
    const button = event.target.closest("[data-check-set]");
    if (!button) return;
    const row = button.closest(".set-row");
    const exerciseNode = button.closest(".log-exercise");
    const exerciseIndex = Number(exerciseNode.dataset.exerciseIndex);
    const setIndex = Number(row.dataset.setIndex);
    const set = state.activeWorkout.exercises[exerciseIndex].sets[setIndex];
    set.done = !set.done;
    saveWorkout();
    button.classList.toggle("done", set.done);
    button.textContent = set.done ? "✓" : "";
    if (set.done) startTimer(90);
  });

  $("#timer-btn").addEventListener("click", () => startTimer(90));
  $$(".account-shortcut").forEach((button) => button.addEventListener("click", openAccountPanel));
  $("#finish-workout-btn").addEventListener("click", () => {
    const completed = state.activeWorkout.exercises.flatMap((item) => item.sets).filter((set) => set.done).length;
    const durationMin = Number($("#ai-time")?.value || appData.profile.sessionTime || 60);
    const finishedWorkout = {
      ...cloneData(state.activeWorkout),
      completedAt: new Date().toISOString(),
      durationMin,
      calories: Math.round((durationMin * appData.profile.weight * 5.5) / 60),
      source: "LiftLab modo entrenamiento",
    };
    appData.workoutHistory = [...(appData.workoutHistory || []), finishedWorkout];
    saveAppData();
    if (hasRealBackend()) apiRequest("/api/workouts", { method: "POST", body: finishedWorkout }).catch(() => {});
    renderDashboardData();
    renderMilestones();
    renderWeekPlan();
    showToast(`Entreno guardado con ${completed} series completadas.`);
  });
  $("#add-exercise-btn").addEventListener("click", () => setView("library"));
  $("#swap-exercise").addEventListener("click", () => {
    const index = exercises.findIndex((item) => item.id === state.selectedExercise.id);
    state.selectedExercise = exercises[(index + 1) % exercises.length];
    renderCues();
  });
  $("#close-dialog").addEventListener("click", () => $("#exercise-dialog").close());
  $("#exercise-dialog").addEventListener("close", stopDialogAnimation);
  $("#add-to-workout").addEventListener("click", () => {
    addExerciseToWorkout(state.selectedExercise.id);
    $("#exercise-dialog").close();
  });
  $("#start-from-dialog").addEventListener("click", () => {
    addExerciseToWorkout(state.selectedExercise.id);
    $("#exercise-dialog").close();
    setView("workout");
  });
  $("#exercise-search").addEventListener("input", renderLibrary);
  $("#muscle-filter").addEventListener("click", (event) => {
    const button = event.target.closest("[data-muscle]");
    if (!button) return;
    state.libraryFilter = button.dataset.muscle;
    renderFilters();
    renderLibrary();
  });
  $("#chart-mode").addEventListener("change", drawProgressChart);
  $("#calc-weight").addEventListener("input", renderCalculator);
  $("#calc-reps").addEventListener("input", renderCalculator);
  $("#theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    drawProgressChart();
  });
  $("#device-toggle").addEventListener("click", () => {
    document.body.classList.toggle("device-mobile");
    localStorage.setItem("liftlab-device-mode", document.body.classList.contains("device-mobile") ? "mobile" : "desktop");
    updateDeviceToggleLabel();
    drawProgressChart();
  });
  $("#add-friend-btn").addEventListener("click", async () => {
    const post = {
      title: "Nota privada",
      text: "Espacio reservado para tus avances. No se muestra a otros usuarios.",
      privacy: "private",
      createdAtLocal: new Date().toISOString(),
    };
    appData.communityPosts = [...(appData.communityPosts || []), post];
    saveAppData();
    renderCommunity();
    if (hasRealBackend()) await apiRequest("/api/community/posts", { method: "POST", body: post }).catch(() => {});
    showToast(hasRealBackend() ? "Nota privada guardada en tu cuenta." : "Nota privada guardada en este dispositivo.");
  });
  $("#share-progress-btn").addEventListener("click", async () => {
    const privacy = appData.privacySettings?.publicProfile ? "public" : "private";
    const post = {
      title: privacy === "public" ? "Avance listo para publicar" : "Avance privado",
      text: `Semana al ${Math.round((appData.health.steps / appData.profile.steps) * 100)}% de pasos y ${Math.min(appData.profile.days, 5)} entrenos planificados.`,
      privacy,
      createdAtLocal: new Date().toISOString(),
    };
    appData.communityPosts = [...(appData.communityPosts || []), post];
    saveAppData();
    if (hasRealBackend()) await apiRequest("/api/community/posts", { method: "POST", body: post }).catch(() => {});
    showToast(privacy === "public" ? "Avance guardado como público en tu cuenta." : "Avance guardado privado. Nadie más lo ve.");
    setView("community");
  });
  $("#public-profile-toggle")?.addEventListener("change", async (event) => {
    appData.privacySettings.publicProfile = event.target.checked;
    appData.communityProfile = { ...(appData.communityProfile || {}), public: event.target.checked, displayName: appData.profile.name };
    saveAppData();
    renderCommunity();
    if (hasRealBackend()) await apiRequest("/api/community/profile", { method: "PUT", body: appData.communityProfile }).catch(() => {});
    showToast(event.target.checked ? "Perfil público activado por decisión tuya." : "Perfil público desactivado. Tus datos quedan privados.");
  });
  $("#auto-rest-toggle")?.addEventListener("change", (event) => {
    appData.privacySettings.autoRest = event.target.checked;
    saveAppData();
  });
  $("#health-sync-toggle")?.addEventListener("change", (event) => {
    appData.privacySettings.healthSync = event.target.checked;
    saveAppData();
  });
  $("#record-notifications-toggle")?.addEventListener("change", (event) => {
    appData.privacySettings.recordNotifications = event.target.checked;
    saveAppData();
  });
  $("#quick-log-workout")?.addEventListener("click", () => setView("workout"));
  $("#quick-log-meal")?.addEventListener("click", () => setView("nutrition"));
  $("#quick-photo-food")?.addEventListener("click", () => {
    setView("nutrition");
    $("#simulate-photo-food")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  $("#quick-log-weight")?.addEventListener("click", () => {
    setView("implementation");
    $("#profile-weight-input")?.focus();
  });
  $("#sync-health-dashboard")?.addEventListener("click", syncHealthData);
  $("#sync-health-profile")?.addEventListener("click", syncHealthData);
  $("#reset-habits")?.addEventListener("click", () => {
    appData.habits = appData.habits.map((habit) => ({ ...habit, done: false }));
    saveAppData();
    renderHabits();
    showToast("Hábitos reiniciados.");
  });
  $("#generate-week-btn")?.addEventListener("click", () => {
    renderWeeklyRoutineBoard();
    showToast("Semana generada según objetivo, días, tiempo y material.");
  });
  $("#duplicate-routine-day")?.addEventListener("click", () => {
    const day = weeklyRoutinePlan[appData.selectedWeekDay];
    weeklyRoutinePlan.push({ ...cloneData(day), day: "Extra", status: "Pendiente" });
    renderWeeklyRoutineBoard();
    pushApi("/api/routines", weeklyRoutinePlan);
    showToast("Día duplicado en la semana.");
  });
  $("#favorite-routine-day")?.addEventListener("click", async () => {
    appData.favoriteRoutine = cloneData(weeklyRoutinePlan[appData.selectedWeekDay]);
    saveAppData();
    if (hasRealBackend()) await pushApi("/api/preferences", { ...(appData.preferences || {}), favoriteRoutine: appData.favoriteRoutine });
    showToast(hasRealBackend() ? "Rutina favorita guardada en tu cuenta." : "Rutina favorita pendiente de sincronización.");
  });
  $("#start-routine-day")?.addEventListener("click", () => {
    state.activeWorkout = createWorkoutFromWeekDay(weeklyRoutinePlan[appData.selectedWeekDay]);
    saveWorkout();
    renderWorkoutLog();
    setView("workout");
    showToast("Día cargado en modo entrenamiento.");
  });
  $("#simulate-photo-food")?.addEventListener("click", simulatePhotoFood);
  $("#confirm-photo-food")?.addEventListener("click", confirmPhotoFood);
  $("#add-photo-food-item")?.addEventListener("click", () => {
    appData.photoItems.push(scalePhotoItem("huevo", 50));
    saveAppData();
    renderPhotoFoodResults();
  });
  $("#food-photo-input")?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    simulatePhotoFood();
    if (file && (await detectApi()) && firebaseOnline) {
      await uploadFoodPhotoToFirebase(file)
        .then(() => showToast("Foto subida a Firebase Storage. Análisis aproximado listo para revisar."))
        .catch(() => showToast("No se pudo subir la foto. Puedes revisar y guardar la estimación manual."));
      return;
    }
    showToast("Foto cargada. Análisis aproximado listo para revisar.");
  });
  $("#photo-food-results")?.addEventListener("change", (event) => {
    const input = event.target.closest("[data-photo-field]");
    if (!input) return;
    updatePhotoFoodItem(Number(input.dataset.photoIndex), input.dataset.photoField, input.value);
  });
  $("#save-onboarding-real")?.addEventListener("click", saveProfileFromForm);
  $("#account-register")?.addEventListener("click", () => registerLocalAccount("profile"));
  $("#account-login")?.addEventListener("click", () => loginLocalAccount("profile"));
  $("#gate-register")?.addEventListener("click", () => registerLocalAccount("gate"));
  $("#gate-login")?.addEventListener("click", () => loginLocalAccount("gate"));
  ["#auth-email", "#auth-password", "#gate-auth-email", "#gate-auth-password"].forEach((selector) => {
    $(selector)?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      loginLocalAccount(selector.startsWith("#gate") ? "gate" : "profile");
    });
  });
  $("#gate-reset")?.addEventListener("click", async () => {
    await sendPasswordReset("gate");
  });
  $("#account-reset")?.addEventListener("click", async () => {
    await sendPasswordReset("profile");
  });
  $("#account-verify-email")?.addEventListener("click", sendVerificationEmail);
  $("#account-logout")?.addEventListener("click", async () => {
    if (firebaseOnline) await apiRequest("/api/auth/logout", { method: "POST" }).catch(() => {});
    apiToken = "";
    localStorage.removeItem("liftlab-api-token");
    resetLocalUserState(null);
    renderAllAppData();
    renderAuthStatus();
    setAuthUiState(false);
    showToast("Sesión cerrada.");
  });
  $("#account-delete")?.addEventListener("click", deleteLocalAccount);
  ["#health-steps-input", "#health-active-input", "#health-resting-input", "#health-sleep-input", "#health-rhr-input", "#health-hrv-input"].forEach((selector) => {
    $(selector)?.addEventListener("change", saveManualHealth);
  });
  $("#edit-profile-btn").addEventListener("click", () => {
    const card = $(".profile-card");
    const name = $(".profile-card h3");
    const editing = !card.classList.contains("editing");
    card.classList.toggle("editing", editing);
    name.contentEditable = editing ? "true" : "false";
    $("#edit-profile-btn").textContent = editing ? "Guardar perfil" : "Editar perfil";
    if (editing) {
      name.focus();
    } else {
      const nextName = name.textContent.trim() || appData.profile.name || "Usuario";
      appData.profile.name = nextName;
      $(".profile-card .avatar").textContent = initialsFromName(nextName);
      saveAppData();
      renderDashboardData();
      pushApi("/api/profile", appData.profile);
    }
    showToast(editing ? "Edita tu nombre y pulsa Guardar perfil." : "Perfil guardado.");
  });
  $("#random-measure").addEventListener("click", async () => {
    renderMeasures();
    if (hasRealBackend()) {
      await apiRequest("/api/body-metrics", {
        method: "POST",
        body: {
          measuredAt: new Date().toISOString(),
          weight: appData.profile.weight,
          waist: Math.round(Number(appData.profile.weight || 0)),
          chest: Math.round(Number(appData.profile.height || 0) * 0.58),
          sleep: appData.health.sleep,
          steps: appData.health.steps,
        },
      }).catch(() => null);
    }
    showToast(hasRealBackend() ? "Medidas guardadas en tu cuenta." : "Medidas actualizadas.");
  });
  $("#run-ai-agents").addEventListener("click", runAIAgents);
  $("#apply-ai-plan").addEventListener("click", applyAIPlan);
  $("#ai-recovery").addEventListener("input", () => {
    $("#ai-recovery-label").textContent = `${$("#ai-recovery").value}%`;
  });
  ["#ai-goal", "#ai-time", "#ai-soreness"].forEach((selector) => {
    $(selector).addEventListener("change", runAIAgents);
  });
  $("#ai-chat-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#ai-chat-input");
    const value = input.value.trim();
    if (!value) return;
    addAIMessage("Tu", value);
    addAIMessage("Entrenador", answerAIQuestion(value));
    input.value = "";
  });
  $$(".ai-prompts [data-ai-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.aiPrompt;
      addAIMessage("Tu", value);
      addAIMessage("Entrenador", answerAIQuestion(value));
    });
  });
  $("#meal-input").addEventListener("input", previewMeal);
  $("#analyze-meal").addEventListener("click", previewMeal);
  $("#add-meal").addEventListener("click", () => addMeal());
  $("#recalc-nutrition").addEventListener("click", renderNutrition);
  $("#clear-meals").addEventListener("click", async () => {
    const today = new Date().toISOString().slice(0, 10);
    const todayMealsToDelete = mealLog.filter((meal) => meal.date === today);
    mealLog = mealLog.filter((meal) => meal.date !== today);
    saveMealLog();
    if (hasRealBackend()) {
      await Promise.all(todayMealsToDelete.map((meal) => meal.id ? apiRequest(`/api/meals/${meal.id}`, { method: "DELETE" }).catch(() => null) : null));
    }
    renderNutrition();
    showToast("Día nutricional limpiado.");
  });
  ["#nutri-weight", "#nutri-height", "#nutri-age", "#nutri-sex", "#nutri-activity", "#nutri-goal", "#nutri-rate", "#nutri-training-min"].forEach((selector) => {
    $(selector).addEventListener("change", renderNutrition);
  });
  $$("#meal-log").forEach((log) => {
    log.addEventListener("click", (event) => {
      const button = event.target.closest("[data-delete-meal]");
      if (!button) return;
      const today = new Date().toISOString().slice(0, 10);
      const todayIndexes = mealLog.map((meal, index) => ({ meal, index })).filter(({ meal }) => meal.date === today);
      const target = todayIndexes[Number(button.dataset.deleteMeal)];
      if (!target) return;
      const [removed] = mealLog.splice(target.index, 1);
      saveMealLog();
      if (hasRealBackend() && removed?.id) apiRequest(`/api/meals/${removed.id}`, { method: "DELETE" }).catch(() => {});
      renderNutrition();
    });
  });
  $("#food-search").addEventListener("input", renderFoodSearch);
  $("#food-results").addEventListener("click", (event) => {
    const button = event.target.closest("[data-food-name]");
    if (!button) return;
    const current = $("#meal-input").value.trim();
    $("#meal-input").value = current ? `${current}, 100g ${button.dataset.foodName}` : `100g ${button.dataset.foodName}`;
    previewMeal();
  });
  $$("#nutrition-view [data-meal-example]").forEach((button) => {
    button.addEventListener("click", () => {
      $("#meal-input").value = button.dataset.mealExample;
      previewMeal();
    });
  });
  $("#open-onboarding").addEventListener("click", () => openOnboarding(0));
  $("#close-onboarding").addEventListener("click", closeOnboarding);
  $("#next-onboarding").onclick = () => moveOnboarding(1);
  $("#prev-onboarding").onclick = () => moveOnboarding(-1);
  $("#onboarding-flow").addEventListener("click", (event) => {
    if (event.target.id === "onboarding-flow") closeOnboarding();
    const choice = event.target.closest(".onboarding-step button");
    if (!choice) return;
    const step = choice.closest(".onboarding-step");
    step.querySelectorAll("button").forEach((button) => button.classList.remove("selected"));
    choice.classList.add("selected");
    const label = choice.textContent.trim();
    if (label.includes("Continuar")) {
      showToast("Perfil inicial preparado gratis.");
      moveOnboarding(1);
    } else if (label.includes("Entrar gratis")) {
      showToast("Todo listo. Entrenamiento abierto.");
      closeOnboarding();
      setView("workout");
    } else {
      showToast("Preferencia guardada.");
    }
  });
}

let onboardingIndex = 0;

function openOnboarding(index = 0) {
  onboardingIndex = index;
  $("#onboarding-flow").classList.add("show");
  $("#onboarding-flow").setAttribute("aria-hidden", "false");
  renderOnboarding();
}

function closeOnboarding() {
  $("#onboarding-flow").classList.remove("show");
  $("#onboarding-flow").setAttribute("aria-hidden", "true");
  sessionStorage.setItem("liftlab-onboarding-seen", "1");
}

function moveOnboarding(delta) {
  const steps = $$(".onboarding-step");
  onboardingIndex = Math.max(0, Math.min(steps.length - 1, onboardingIndex + delta));
  renderOnboarding();
}

function renderOnboarding() {
  const steps = $$(".onboarding-step");
  steps.forEach((step, index) => step.classList.toggle("active", index === onboardingIndex));
  $("#onboarding-progress").style.width = `${((onboardingIndex + 1) / steps.length) * 100}%`;
  $("#prev-onboarding").disabled = onboardingIndex === 0;
  $("#next-onboarding").textContent = onboardingIndex === steps.length - 1 ? "Entrar" : "Siguiente";
  if (onboardingIndex === steps.length - 1) $("#next-onboarding").onclick = closeOnboarding;
  else $("#next-onboarding").onclick = () => moveOnboarding(1);
}

async function bootstrapAuth() {
  setAuthUiState(true);
  const online = await detectApi();
  if (online && ((firebaseOnline && firebaseBackend?.user) || (!firebaseOnline && apiToken))) {
    await loadApiUserData();
    setView("dashboard");
  } else {
    appData.account = null;
    saveAppData();
    renderAuthStatus();
    setAuthUiState(false);
  }
}

function init() {
  applyPreferredDeviceMode();
  setAuthUiState(true);
  renderProfileInputs();
  renderDate();
  renderPhonePreview();
  renderWeekPlan();
  renderFeed();
  renderWorkoutLog();
  renderRoutines();
  renderFilters();
  renderMuscleAtlas();
  renderLibrary();
  renderCues();
  drawProgressChart();
  renderCalculator();
  renderMilestones();
  renderCommunity();
  renderMeasures();
  renderHealthInputs();
  renderDashboardData();
  renderHabits();
  renderPhotoFoodResults();
  runAIAgents();
  renderNutrition();
  renderFoodSearch();
  updateTimerText();
  updateDeviceToggleLabel();
  window.addEventListener("resize", applyResponsiveDeviceMode);
  bindEvents();
  animateExercise();
  bootstrapAuth();
}

function applyPreferredDeviceMode() {
  const saved = localStorage.getItem("liftlab-device-mode");
  const useMobile = saved ? saved === "mobile" : window.innerWidth < 861;
  document.body.classList.toggle("device-mobile", useMobile);
}

function applyResponsiveDeviceMode() {
  if (localStorage.getItem("liftlab-device-mode")) return;
  document.body.classList.toggle("device-mobile", window.innerWidth < 861);
  updateDeviceToggleLabel();
}

function updateDeviceToggleLabel() {
  const toggle = $("#device-toggle");
  if (!toggle) return;
  toggle.innerHTML = document.body.classList.contains("device-mobile")
    ? '<svg viewBox="0 0 24 24"><path d="M3 5h18v12H3zM8 21h8M12 17v4"/></svg>Modo PC'
    : '<svg viewBox="0 0 24 24"><path d="M7 3h10v18H7zM11 18h2"/></svg>Modo móvil';
}

init();

