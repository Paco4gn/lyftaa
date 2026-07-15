const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const EXERCISE_DATASET_URL = "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/data/exercises.json";
const EXERCISE_DATASET_MEDIA_BASE = "https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/";
const EXERCISE_RENDER_LIMIT = 120;

let exerciseDatasetState = {
  loaded: false,
  loading: false,
  source: "LiftLab local",
  total: 0,
  error: "",
};

let exercises = [
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
  { id: "cable-fly", name: "Cruce poleas", muscle: "Pecho", equipment: "Polea", type: "push", cues: ["Paso stable.", "Abrazo amplio.", "Pausa al cerrar."], description: "Aislamiento de pecho con tension continua." },
  { id: "seated-db-press", name: "Press hombro mancuernas", muscle: "Hombro", equipment: "Mancuernas", type: "push", cues: ["Banco firme.", "Mancuernas sobre codos.", "Recorrido controlado."], description: "Empuje vertical con libertad escapular." },
  { id: "wide-pulldown", name: "Jalon agarre amplio", muscle: "Espalda", equipment: "Polea", type: "pull", cues: ["Pecho alto.", "Codos hacia costillas.", "No tires tras nuca."], description: "Variante para dorsales con agarre amplio." },
  { id: "single-row", name: "Remo una mano", muscle: "Espalda", equipment: "Mancuerna", type: "pull", cues: ["Apoyo estable.", "Codo hacia cadera.", "No gires el tronco."], description: "Remo unilateral para equilibrar lados." },
  { id: "glute-bridge", name: "Puente glúteo", muscle: "Glúteo", equipment: "Peso corporal", type: "legs", cues: ["Pies cerca de glúteos.", "Pausa arriba.", "Pelvis neutra."], description: "Extensión de cadera accesible y progresable." },
  
  // Custom CSV exercises added for pacogn4@gmail.com
  { id: "press-inclinado-csv", name: "Press inclinado", muscle: "Pecho", equipment: "Barra o mancuernas", type: "push", cues: ["Banco a 30-45 grados.", "Baja controlado al pecho superior."], description: "Pectoral superior, deltoides anterior, tríceps." },
  { id: "apertura-maquina-csv", name: "Apertura en máquina", muscle: "Pecho", equipment: "Maquina", type: "push", cues: ["Sentado erguido.", "Junta los brazos al frente de forma controlada."], description: "Aislamiento de pectoral mayor (pec deck)." },
  { id: "elevaciones-laterales-mancuernas-csv", name: "Elevaciones laterales mancuernas", muscle: "Hombro", equipment: "Mancuernas", type: "push", cues: ["De pie, mancuernas a los costados.", "Eleva en lateral hasta la altura de hombros."], description: "Deltoides lateral." },
  { id: "elevaciones-laterales-polea-csv", name: "Elevaciones laterales polea", muscle: "Hombro", equipment: "Polea", type: "push", cues: ["Polea baja.", "Tensión continua al elevar."], description: "Aislamiento de deltoides lateral." },
  { id: "triceps-polea-alta-csv", name: "Tríceps en polea alta", muscle: "Tríceps", equipment: "Polea", type: "push", cues: ["Polea alta con cuerda.", "Empuja hacia abajo extendiendo codos."], description: "Aislamiento de tríceps." },
  { id: "fondos-maquina-csv", name: "Fondos en máquina", muscle: "Tríceps", equipment: "Maquina", type: "push", cues: ["Flexiona codos a 90 grados.", "Empuja extendiendo brazos."], description: "Tríceps, pectoral inferior, deltoides anterior." },
  { id: "dominadas-elasticos-csv", name: "Dominadas con elásticos o asistida", muscle: "Espalda", equipment: "Barra fija", type: "pull", cues: ["Banda elástica de soporte.", "Baja controlado y sube barbilla sobre barra."], description: "Dorsal ancho, trapecio inferior, bíceps." },
  { id: "jalones-pecho-abierto-csv", name: "Jalones al pecho abierto", muscle: "Espalda", equipment: "Polea", type: "pull", cues: ["Agarre ancho.", "Llevar la barra al pecho superior."], description: "Dorsales, trapecio medio, deltoides posterior." },
  { id: "remo-gironda-unilateral-csv", name: "Remo girándola unilateral", muscle: "Espalda", equipment: "Maquina", type: "pull", cues: ["Inclinado.", "Tira la mancuerna o agarre hacia el torso."], description: "Dorsal ancho, trapecio medio, romboides, bíceps." },
  { id: "jalones-cerrados-csv", name: "Jalones cerrados", muscle: "Espalda", equipment: "Polea", type: "pull", cues: ["Agarre estrecho en V.", "Lleva al pecho inclinando ligeramente el torso."], description: "Dorsales, romboides, bíceps." },
  { id: "pull-over-csv", name: "Pull over", muscle: "Espalda", equipment: "Mancuerna o polea", type: "pull", cues: ["Brazos extendidos.", "Lleva hacia atrás y vuelve al frente."], description: "Dorsal ancho, pectoral mayor." },
  { id: "deltoides-posterior-apertura-csv", name: "Deltoides posterior en máquina de apertura", muscle: "Hombro", equipment: "Maquina", type: "pull", cues: ["Máquina reverse pec deck.", "Abre los brazos hacia atrás."], description: "Deltoides posterior, trapecio medio, romboides." },
  { id: "curl-scott-csv", name: "Curl scott", muscle: "Bíceps", equipment: "Banco scott", type: "pull", cues: ["Apoya brazos completamente.", "Flexiona codos sin levantar hombros."], description: "Aislamiento de bíceps braquial." },
  { id: "curl-biceps-mancuerna-csv", name: "Curl biceps mancuerna", muscle: "Bíceps", equipment: "Mancuernas", type: "pull", cues: ["De pie.", "Flexiona codos rotando muñecas al subir."], description: "Bíceps braquial, braquial, braquiorradial." },
  { id: "curl-braquial-antebrazo-csv", name: "Curl braquial antebrazo", muscle: "Bíceps", equipment: "Mancuernas", type: "pull", cues: ["Agarre neutro (martillo).", "Manten codos pegados."], description: "Braquial, braquiorradial." },
  { id: "extensiones-csv", name: "Extensiones", muscle: "Pierna", equipment: "Maquina", type: "legs", cues: ["Extiende piernas hasta arriba.", "Sostén un segundo arriba."], description: "Aislamiento de cuádriceps." },
  { id: "abductores-csv", name: "Abductores", muscle: "Glúteo", equipment: "Maquina", type: "legs", cues: ["Abre las piernas contra resistencia."], description: "Glúteo medio y menor." },
  { id: "adductores-csv", name: "Adductores", muscle: "Glúteo", equipment: "Maquina", type: "legs", cues: ["Cierra las piernas contra resistencia."], description: "Aductores de cadera." },
  { id: "sentado-peso-arriba-csv", name: "Sentado peso arriba", muscle: "Gemelo", equipment: "Maquina", type: "legs", cues: ["Eleva talones hasta contracción máxima.", "Baja lento sintiendo el estiramiento."], description: "Gastrocnemio y sóleo." },
  { id: "press-inclinado-barra-csv", name: "Press inclinado barra", muscle: "Pecho", equipment: "Barra", type: "push", cues: ["Baja la barra al pecho superior.", "Empuja verticalmente."], description: "Pectoral superior, deltoides anterior, tríceps." },
  { id: "face-full-csv", name: "Face full", muscle: "Hombro", equipment: "Polea", type: "pull", cues: ["Tira de la cuerda hacia los ojos.", "Abre codos hacia afuera."], description: "Deltoides posterior, trapecio, romboides." },
  { id: "jalon-abierto-csv", name: "Jalón abierto", muscle: "Espalda", equipment: "Polea", type: "pull", cues: ["Agarre amplio.", "Tira hacia la parte superior del pecho."], description: "Dorsales, trapecio, deltoides posterior." },
  { id: "remo-barra-polea-csv", name: "Remo con barra en polea", muscle: "Espalda", equipment: "Polea", type: "pull", cues: ["Tira de la barra hacia el abdomen.", "Espalda recta."], description: "Dorsales, trapecio medio, romboides, bíceps." },
  { id: "curl-de-biceps-csv", name: "Curl de biceps", muscle: "Bíceps", equipment: "Barra", type: "pull", cues: ["Método 21s (7 inferiores, 7 superiores, 7 completas).", "Sin descanso entre tramos."], description: "Bíceps braquial, braquial, braquiorradial de forma intensa." },
  { id: "triceps-con-cuerda-csv", name: "Tríceps con cuerda", muscle: "Tríceps", equipment: "Polea", type: "push", cues: ["Polea alta con cuerda.", "Abre la cuerda al final del recorrido."], description: "Tríceps (enfasis cabeza lateral)." },
  { id: "curl-con-barra-csv", name: "Curl con Barra", muscle: "Bíceps", equipment: "Barra", type: "pull", cues: ["Codos fijos a los lados.", "Flexiona sin balancear el cuerpo."], description: "Bíceps braquial." },
  { id: "curl-con-mancuernas-csv", name: "Curl con Mancuernas", muscle: "Bíceps", equipment: "Mancuernas", type: "pull", cues: ["De pie o sentado.", "Sube de forma alterna o simultánea."], description: "Bíceps braquial." },
  { id: "crunches-csv", name: "Crunches", muscle: "Core", equipment: "Peso corporal", type: "legs", cues: ["Eleva hombros despegándolos del suelo.", "Contrae abdomen."], description: "Abdominales superiores." },
  { id: "rompecraneos-csv", name: "Rompecráneos", muscle: "Tríceps", equipment: "Barra", type: "push", cues: ["Acostado.", "Baja la barra hacia la frente flexionando codos.", "Codos apuntando al techo."], description: "Aislamiento de tríceps." },
  { id: "jalones-de-triceps-csv", name: "Jalones de Tríceps", muscle: "Tríceps", equipment: "Polea", type: "push", cues: ["Extiende codos completamente.", "Mantén hombros fijos."], description: "Tríceps." },
  { id: "fondos-en-banco-csv", name: "Fondos en Banco", muscle: "Tríceps", equipment: "Banco", type: "push", cues: ["Manos apoyadas en borde del banco.", "Baja cadera flexionando codos.", "Hombros atrás."], description: "Tríceps y pectoral." }
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
    title: "Torso Empuje (Pecho, Hombros, Tríceps)",
    status: "Pendiente",
    duration: "70 min",
    difficulty: "Alta",
    muscles: ["Pecho", "Hombros", "Tríceps"],
    blocks: [
      { name: "Pecho", exercises: ["Press banca", "Press inclinado", "Apertura en máquina"] },
      { name: "Hombros", exercises: ["Press militar", "Elevaciones laterales mancuernas", "Elevaciones laterales polea"] },
      { name: "Tríceps", exercises: ["Tríceps en polea alta", "Fondos en máquina"] },
    ],
  },
  {
    day: "Martes",
    title: "Torso Tirón (Espalda, Hombro Posterior, Bíceps)",
    status: "Pendiente",
    duration: "75 min",
    difficulty: "Alta",
    muscles: ["Espalda", "Hombro", "Bíceps"],
    blocks: [
      { name: "Espalda", exercises: ["Dominadas con elásticos o asistida", "Jalones al pecho abierto", "Remo girándola unilateral", "Jalones cerrados", "Pull over"] },
      { name: "Hombro Posterior", exercises: ["Deltoides posterior en máquina de apertura"] },
      { name: "Bíceps", exercises: ["Curl scott", "Curl biceps mancuerna", "Curl braquial antebrazo"] },
    ],
  },
  {
    day: "Miercoles",
    title: "Descanso activo y movilidad",
    status: "Recuperación",
    duration: "20 min",
    difficulty: "Suave",
    muscles: ["Core", "Movilidad"],
    blocks: [
      { name: "Movilidad", exercises: ["Puente glúteo", "Plancha"] },
    ],
  },
  {
    day: "Jueves",
    title: "Pierna (Glúteos, Cuádriceps, Isquiotibiales, Gemelos)",
    status: "Pendiente",
    duration: "75 min",
    difficulty: "Alta",
    muscles: ["Glúteo", "Cuádriceps", "Isquiotibiales", "Gemelos"],
    blocks: [
      { name: "Glúteos", exercises: ["Peso muerto"] },
      { name: "Cuádriceps", exercises: ["Prensa", "Extensiones"] },
      { name: "Isquiotibiales", exercises: ["Curl femoral"] },
      { name: "Abductores / Aductores", exercises: ["Abductores", "Adductores"] },
      { name: "Gemelos", exercises: ["Sentado peso arriba"] },
    ],
  },
  {
    day: "Viernes",
    title: "Torso Mixto (Pecho, Hombro, Espalda, Brazos)",
    status: "Pendiente",
    duration: "80 min",
    difficulty: "Alta",
    muscles: ["Pecho", "Hombro", "Espalda", "Brazos"],
    blocks: [
      { name: "Pecho", exercises: ["Press inclinado barra", "Press inclinado mancuernas"] },
      { name: "Hombro", exercises: ["Press militar", "Elevaciones laterales mancuernas", "Face full"] },
      { name: "Espalda", exercises: ["Jalón abierto", "Remo con barra en polea"] },
      { name: "Brazos", exercises: ["Curl de biceps", "Tríceps con cuerda"] },
    ],
  },
  {
    day: "Sabado",
    title: "Bíceps y Abdominales",
    status: "Pendiente",
    duration: "45 min",
    difficulty: "Media",
    muscles: ["Bíceps", "Abdominales"],
    blocks: [
      { name: "Bíceps", exercises: ["Curl con Barra", "Curl con Mancuernas"] },
      { name: "Abdominales", exercises: ["Crunches", "Plancha"] },
    ],
  },
  {
    day: "Domingo",
    title: "Tríceps",
    status: "Pendiente",
    duration: "40 min",
    difficulty: "Media",
    muscles: ["Tríceps"],
    blocks: [
      { name: "Tríceps", exercises: ["Rompecráneos", "Jalones de Tríceps", "Fondos en Banco"] },
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
  ["🍗 pechuga de pollo", ["pollo", "pechuga", "chicken"], 165, 31, 0, 3.6],
  ["🍚 arroz cocido", ["arroz", "rice"], 130, 2.7, 28, 0.3],
  ["🍝 pasta cocida", ["pasta", "macarrones", "espagueti"], 158, 5.8, 31, 0.9],
  ["🥣 avena", ["oats", "copos de avena"], 389, 16.9, 66, 6.9],
  ["🥚 claras de huevo", ["claras", "clara"], 52, 10.9, 0.7, 0.2],
  ["🥚 huevo", ["huevos", "egg"], 143, 12.6, 0.7, 9.5, 50],
  ["🥛 leche semidesnatada", ["leche", "milk"], 47, 3.4, 4.8, 1.6],
  ["🍧 yogur griego", ["yogur", "yogurt griego"], 97, 9, 3.9, 5],
  ["🥛 proteina whey", ["whey", "proteina", "proteina en polvo"], 400, 80, 8, 6, 30],
  ["🍌 platano", ["platano", "banana"], 89, 1.1, 23, 0.3, 120],
  ["🍎 manzana", ["apple"], 52, 0.3, 14, 0.2, 180],
  ["🥑 aguacate", ["avocado"], 160, 2, 8.5, 14.7],
  ["🫒 aceite de oliva", ["aceite", "aove"], 884, 0, 0, 100, 10],
  ["🍞 pan integral", ["pan", "tostada integral"], 247, 13, 41, 4.2, 35],
  ["🥔 patata cocida", ["patata", "papa"], 87, 1.9, 20, 0.1],
  ["🍠 boniato", ["batata"], 86, 1.6, 20, 0.1],
  ["🦃 pechuga de pavo", ["pavo", "pechuga de pavo"], 104, 22, 1, 1.5],
  ["🥩 ternera magra", ["ternera", "carne"], 170, 26, 0, 7],
  ["🍣 salmon", ["salmon"], 208, 20, 0, 13],
  ["🐟 atun natural", ["atun", "atun al natural"], 116, 26, 0, 1, 80],
  ["🐟 merluza", ["pescado blanco"], 89, 17, 0, 2],
  ["🥦 brocoli", ["brocoli"], 35, 2.4, 7.2, 0.4],
  ["🍅 tomate", ["tomates"], 18, 0.9, 3.9, 0.2, 120],
  ["🥗 ensalada", ["lechuga", "verdura"], 20, 1.2, 3.5, 0.2],
  ["🫘 garbanzos cocidos", ["garbanzos"], 164, 8.9, 27, 2.6],
  ["🫘 lentejas cocidas", ["lentejas"], 116, 9, 20, 0.4],
  ["🫘 almendras", ["almendra"], 579, 21, 22, 50],
  ["🥜 mantequilla cacahuete", ["crema cacahuete", "cacahuete"], 588, 25, 20, 50],
  ["🧀 queso fresco batido", ["queso fresco", "quark"], 62, 8.5, 4, 0.2],
  ["☕ cafe con leche", ["cafe leche", "cortado"], 35, 1.8, 3, 1.2, 200],
  ["🍕 pizza", ["porcion pizza", "porcion pizza"], 266, 11, 33, 10],
  ["🍔 hamburguesa", ["burger"], 254, 17, 24, 10],
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
  animationRunning: false,
};

let dialogFrameTimer = null;

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadAppData() {
  try {
    const stored = JSON.parse(localStorage.getItem("liftlab-app-data") || "null");
    const valid = stored && typeof stored === "object" && !Array.isArray(stored);
    const safeStored = valid ? stored : {};
    try {
      const storedRoutines = JSON.parse(localStorage.getItem("liftlab-routines") || "null");
      if (Array.isArray(storedRoutines) && storedRoutines.length > 0) {
        weeklyRoutinePlan.splice(0, weeklyRoutinePlan.length, ...storedRoutines);
      }
    } catch (e) {
      console.error("Error al cargar rutinas locales:", e);
    }
    return {
      ...cloneData(defaultAppData),
      ...safeStored,
      profile: { ...defaultAppData.profile, ...(safeStored.profile || {}) },
      health: { ...defaultAppData.health, ...(safeStored.health || {}) },
      privacySettings: { ...defaultAppData.privacySettings, ...(safeStored.privacySettings || {}) },
      communityProfile: { ...defaultAppData.communityProfile, ...(safeStored.communityProfile || {}) },
      communityPosts: Array.isArray(safeStored.communityPosts) ? safeStored.communityPosts : [],
      workoutHistory: Array.isArray(safeStored.workoutHistory) ? safeStored.workoutHistory : [],
      habits: safeStored.habits?.length ? safeStored.habits : cloneData(defaultAppData.habits),
      photoItems: safeStored.photoItems?.length ? safeStored.photoItems : cloneData(defaultAppData.photoItems),
    };
  } catch (err) {
    console.error("Error loading app data:", err);
    return cloneData(defaultAppData);
  }
}

function saveAppData() {
  localStorage.setItem("liftlab-app-data", JSON.stringify(appData));
  localStorage.setItem("liftlab-routines", JSON.stringify(weeklyRoutinePlan));
}

async function apiRequest(path, options = {}) {
  if (firebaseOnline && firebaseBackend?.configured) {
    return firebaseBackend.request(path, options);
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch(apiUrl(path), {
      ...options,
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        ...(apiToken ? { authorization: `Bearer ${apiToken}` } : {}),
        ...(options.headers || {}),
      },
      body: options.body && typeof options.body !== "string" ? JSON.stringify(options.body) : options.body,
    });
    clearTimeout(timeoutId);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "API no disponible");
    return payload;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function detectApi() {
  try {
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
  } catch (e) {
    console.error("Firebase API detection failed:", e);
    firebaseOnline = false;
    firebaseBackend = null;
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
    // Auto-update pacogn4@gmail.com to the new 7-day routine format
    if (appData.account?.email?.toLowerCase() === "pacogn4@gmail.com") {
      const getRoutineSignature = (plan) => {
        return (plan || []).map(day => {
          const exNames = (day.blocks || []).flatMap(b => b.exercises || []);
          return `${day.day}:${exNames.join(',')}`;
        }).join('|');
      };
      const currentSig = getRoutineSignature(weeklyRoutinePlan);
      const targetSig = getRoutineSignature(defaultRoutinePlan);
      if (currentSig !== targetSig) {
        weeklyRoutinePlan.splice(0, weeklyRoutinePlan.length, ...cloneData(defaultRoutinePlan));
        pushApi("/api/routines", weeklyRoutinePlan).catch(console.error);
        localStorage.setItem("liftlab-routines", JSON.stringify(weeklyRoutinePlan));
      }
    }
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
  } catch (error) {
    console.error("loadApiUserData failed:", error);
    apiToken = "";
    localStorage.removeItem("liftlab-api-token");
    firebaseOnline = false;
    throw error;
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
  const importTimeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error("Import timeout")), 2500)
  );
  try {
    const module = await Promise.race([
      import("./firebase-client.js?v=2.3.0"),
      importTimeout
    ]);
    return await module.createFirebaseBackend();
  } catch (e) {
    console.error("Firebase backend load failed:", e);
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
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object" && Array.isArray(parsed.exercises)) {
        return migrateWorkout(parsed);
      }
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

function getLastSessionSets(exerciseId) {
  const history = Array.isArray(appData.workoutHistory) ? appData.workoutHistory : [];
  for (let i = history.length - 1; i >= 0; i--) {
    const workout = history[i];
    const exercise = workout.exercises?.find((ex) => ex.id === exerciseId);
    if (exercise && exercise.sets?.length) {
      return exercise.sets.map((set) => ({
        weight: Number(set.weight) || 0,
        reps: Number(set.reps) || 0,
        rpe: Number(set.rpe) || 0,
        type: set.type || "Trabajo",
        done: false
      }));
    }
  }
  return null;
}

function generateWeeklyRoutinePlan() {
  const profile = appData.profile;
  const daysCount = clampNumber(profile.days, 1, 6, 3);
  const place = profile.place || "Gimnasio";
  const equipment = profile.equipment || "Gimnasio completo";
  const injuries = (profile.injuries || "").toLowerCase();

  function selectExercise(type, muscleGroup, fallbackId) {
    let candidates = exercises.filter((ex) => ex.muscle.toLowerCase() === muscleGroup.toLowerCase() || ex.type === type);
    if (muscleGroup) {
      candidates = exercises.filter((ex) => ex.muscle.toLowerCase() === muscleGroup.toLowerCase());
    }

    if (injuries.includes("hombro") || injuries.includes("shoulder")) {
      candidates = candidates.filter((ex) => !["bench", "overhead-press", "dip"].includes(ex.id));
    }
    if (injuries.includes("rodilla") || injuries.includes("knee")) {
      candidates = candidates.filter((ex) => !["squat", "lunge", "leg-press"].includes(ex.id));
    }
    if (injuries.includes("espalda") || injuries.includes("back")) {
      candidates = candidates.filter((ex) => !["deadlift", "rdl", "squat"].includes(ex.id));
    }

    let equipmentFilter = candidates;
    if (place === "Casa" || equipment === "Mancuernas") {
      equipmentFilter = candidates.filter((ex) => ex.equipment === "Mancuernas" || ex.equipment === "Mancuerna" || ex.equipment === "Peso corporal" || ex.equipment === "Barra fija");
    } else if (equipment === "Pesas rusas") {
      equipmentFilter = candidates.filter((ex) => ex.equipment === "Peso corporal" || ex.equipment === "Mancuernas" || ex.equipment === "Mancuerna");
    } else if (equipment === "Máquinas") {
      equipmentFilter = candidates.filter((ex) => ex.equipment === "Maquina" || ex.equipment === "Polea" || ex.equipment === "Peso corporal");
    }

    if (equipmentFilter.length > 0) {
      return equipmentFilter[0];
    }
    if (candidates.length > 0) {
      return candidates[0];
    }
    return exercises.find((ex) => ex.id === fallbackId) || exercises[0];
  }

  const plan = [];
  if (daysCount === 1) {
    const ex1 = selectExercise("push", "Pecho", "bench");
    const ex2 = selectExercise("pull", "Espalda", "row");
    const ex3 = selectExercise("legs", "Pierna", "squat");
    const ex4 = selectExercise("legs", "Femoral", "rdl");
    const ex5 = selectExercise("push", "Hombro", "lateral-raise");
    plan.push({
      day: "Lunes",
      title: "Cuerpo Completo - Consistencia",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Media",
      muscles: ["Pecho", "Espalda", "Pierna", "Hombro"],
      blocks: [
        { name: "Calentamiento", exercises: ["Movilidad global", ex1.name + " aproximacion"] },
        { name: "Principal", exercises: [ex1.name, ex2.name] },
        { name: "Accesorios", exercises: [ex3.name, ex4.name, ex5.name] }
      ]
    });
  } else if (daysCount === 2) {
    const exPush = selectExercise("push", "Pecho", "bench");
    const exPull = selectExercise("pull", "Espalda", "row");
    const exShoulder = selectExercise("push", "Hombro", "lateral-raise");
    const exBiceps = selectExercise("pull", "Bíceps", "curl");

    const exLegs1 = selectExercise("legs", "Pierna", "squat");
    const exLegs2 = selectExercise("legs", "Femoral", "rdl");
    const exLegs3 = selectExercise("legs", "Glúteo", "hip-thrust");
    const exCore = selectExercise("legs", "Core", "plank");

    plan.push({
      day: "Lunes",
      title: "Torso - Pecho y Espalda",
      status: "Pendiente",
      duration: "55 min",
      difficulty: "Media",
      muscles: ["Pecho", "Espalda", "Hombro"],
      blocks: [
        { name: "Calentamiento", exercises: ["Movilidad de hombros", exPush.name + " suave"] },
        { name: "Principal", exercises: [exPush.name, exPull.name] },
        { name: "Accesorios", exercises: [exShoulder.name, exBiceps.name] }
      ]
    });
    plan.push({
      day: "Jueves",
      title: "Pierna - Fuerza y Control",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Alta",
      muscles: ["Pierna", "Femoral", "Glúteo"],
      blocks: [
        { name: "Calentamiento", exercises: ["Movilidad cadera", exLegs1.name + " suave"] },
        { name: "Principal", exercises: [exLegs1.name, exLegs2.name] },
        { name: "Accesorios", exercises: [exLegs3.name, exCore.name] }
      ]
    });
  } else if (daysCount === 3) {
    const push1 = selectExercise("push", "Pecho", "bench");
    const push2 = selectExercise("push", "Hombro", "overhead-press");
    const push3 = selectExercise("push", "Tríceps", "dip");

    const pull1 = selectExercise("pull", "Espalda", "lat-pulldown");
    const pull2 = selectExercise("pull", "Espalda", "row");
    const pull3 = selectExercise("pull", "Bíceps", "curl");

    const legs1 = selectExercise("legs", "Pierna", "squat");
    const legs2 = selectExercise("legs", "Femoral", "rdl");
    const legs3 = selectExercise("legs", "Glúteo", "hip-thrust");

    plan.push({
      day: "Lunes",
      title: "Push - Empuje Torso",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Media",
      muscles: ["Pecho", "Hombro", "Tríceps"],
      blocks: [
        { name: "Calentamiento", exercises: ["Movilidad hombro", push1.name + " suave"] },
        { name: "Principal", exercises: [push1.name, push2.name] },
        { name: "Accesorios", exercises: [push3.name, "Elevacion lateral"] }
      ]
    });
    plan.push({
      day: "Miércoles",
      title: "Pull - Tirón Torso",
      status: "Pendiente",
      duration: "58 min",
      difficulty: "Media",
      muscles: ["Espalda", "Bíceps"],
      blocks: [
        { name: "Calentamiento", exercises: ["Activación escapular", pull1.name + " suave"] },
        { name: "Principal", exercises: [pull1.name, pull2.name] },
        { name: "Accesorios", exercises: [pull3.name, "Face pull"] }
      ]
    });
    plan.push({
      day: "Viernes",
      title: "Pierna - Tren Inferior",
      status: "Pendiente",
      duration: "65 min",
      difficulty: "Alta",
      muscles: ["Pierna", "Femoral", "Glúteo"],
      blocks: [
        { name: "Calentamiento", exercises: ["Movilidad tobillo", legs1.name + " suave"] },
        { name: "Principal", exercises: [legs1.name, legs2.name] },
        { name: "Accesorios", exercises: [legs3.name, "Plancha"] }
      ]
    });
  } else if (daysCount === 4) {
    const pushA = selectExercise("push", "Pecho", "bench");
    const pullA = selectExercise("pull", "Espalda", "lat-pulldown");
    const pushB = selectExercise("push", "Pecho", "incline-db");
    const pullB = selectExercise("pull", "Espalda", "row");

    const legsA1 = selectExercise("legs", "Pierna", "squat");
    const legsA2 = selectExercise("legs", "Femoral", "rdl");
    const legsB1 = selectExercise("legs", "Pierna", "leg-press");
    const legsB2 = selectExercise("legs", "Glúteo", "hip-thrust");

    plan.push({
      day: "Lunes",
      title: "Torso A - Enfoque Pecho",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Media",
      muscles: ["Pecho", "Espalda", "Hombro"],
      blocks: [
        { name: "Principal", exercises: [pushA.name, pullA.name] },
        { name: "Accesorios", exercises: ["Elevacion lateral", "Curl biceps"] }
      ]
    });
    plan.push({
      day: "Martes",
      title: "Pierna A - Enfoque Rodilla",
      status: "Pendiente",
      duration: "65 min",
      difficulty: "Alta",
      muscles: ["Pierna", "Femoral"],
      blocks: [
        { name: "Principal", exercises: [legsA1.name, legsA2.name] },
        { name: "Accesorios", exercises: ["Extension de cuadriceps", "Plancha"] }
      ]
    });
    plan.push({
      day: "Jueves",
      title: "Torso B - Enfoque Espalda",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Media",
      muscles: ["Pecho", "Espalda", "Bíceps"],
      blocks: [
        { name: "Principal", exercises: [pullB.name, pushB.name] },
        { name: "Accesorios", exercises: ["Face pull", "Extensión tríceps polea"] }
      ]
    });
    plan.push({
      day: "Viernes",
      title: "Pierna B - Enfoque Cadera",
      status: "Pendiente",
      duration: "65 min",
      difficulty: "Alta",
      muscles: ["Pierna", "Glúteo", "Femoral"],
      blocks: [
        { name: "Principal", exercises: [legsB2.name, legsB1.name] },
        { name: "Accesorios", exercises: ["Curl femoral", "Elevacion gemelo"] }
      ]
    });
  } else {
    const push1 = selectExercise("push", "Pecho", "bench");
    const push2 = selectExercise("push", "Hombro", "overhead-press");
    const pull1 = selectExercise("pull", "Espalda", "lat-pulldown");
    const pull2 = selectExercise("pull", "Espalda", "row");
    const legs1 = selectExercise("legs", "Pierna", "squat");
    const legs2 = selectExercise("legs", "Femoral", "rdl");

    plan.push({
      day: "Lunes",
      title: "Push - Empuje Torso",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Media",
      muscles: ["Pecho", "Hombro"],
      blocks: [
        { name: "Principal", exercises: [push1.name, push2.name] },
        { name: "Accesorios", exercises: ["Fondos", "Elevacion lateral"] }
      ]
    });
    plan.push({
      day: "Martes",
      title: "Pull - Tirón Espalda",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Media",
      muscles: ["Espalda", "Bíceps"],
      blocks: [
        { name: "Principal", exercises: [pull1.name, pull2.name] },
        { name: "Accesorios", exercises: ["Curl barra", "Face pull"] }
      ]
    });
    plan.push({
      day: "Miércoles",
      title: "Legs - Pierna Completa",
      status: "Pendiente",
      duration: "70 min",
      difficulty: "Alta",
      muscles: ["Pierna", "Femoral", "Glúteo"],
      blocks: [
        { name: "Principal", exercises: [legs1.name, legs2.name] },
        { name: "Accesorios", exercises: ["Hip thrust", "Curl femoral"] }
      ]
    });
    plan.push({
      day: "Jueves",
      title: "Torso - Fuerza e Hipertrofia",
      status: "Pendiente",
      duration: "55 min",
      difficulty: "Media",
      muscles: ["Pecho", "Espalda", "Hombro"],
      blocks: [
        { name: "Principal", exercises: ["Press inclinado mancuernas", "Dominada"] },
        { name: "Accesorios", exercises: ["Remo sentado", "Press hombro mancuernas"] }
      ]
    });
    plan.push({
      day: "Viernes",
      title: "Pierna - Detalle e Isometría",
      status: "Pendiente",
      duration: "60 min",
      difficulty: "Alta",
      muscles: ["Pierna", "Core"],
      blocks: [
        { name: "Principal", exercises: ["Prensa", "Zancada"] },
        { name: "Accesorios", exercises: ["Extension de cuadriceps", "Plancha"] }
      ]
    });
    if (daysCount === 6) {
      plan.push({
        day: "Sábado",
        title: "Aislamiento y Brazos",
        status: "Pendiente",
        duration: "45 min",
        difficulty: "Suave",
        muscles: ["Bíceps", "Tríceps", "Core"],
        blocks: [
          { name: "Brazos", exercises: ["Curl barra", "Extensión tríceps polea", "Curl martillo"] },
          { name: "Core", exercises: ["Plancha", "Puente glúteo"] }
        ]
      });
    }
  }
  weeklyRoutinePlan.splice(0, weeklyRoutinePlan.length, ...plan);
}

function getActiveSoreness() {
  const selectVal = $("#ai-soreness")?.value || "none";
  if (selectVal !== "none") return selectVal;
  
  const profileInjuries = normalizeText(appData.profile?.injuries || "");
  if (profileInjuries.includes("hombro") || profileInjuries.includes("shoulder") || profileInjuries.includes("manguito")) return "shoulder";
  if (profileInjuries.includes("rodilla") || profileInjuries.includes("knee") || profileInjuries.includes("patela") || profileInjuries.includes("cuad")) return "knee";
  if (profileInjuries.includes("espalda") || profileInjuries.includes("back") || profileInjuries.includes("lumbar")) return "back";
  
  return "none";
}

function translateSoreness(soreness) {
  const map = {
    shoulder: "hombro",
    back: "espalda baja",
    knee: "rodilla"
  };
  return map[soreness] || soreness;
}

function adaptExercisesForSoreness(exerciseIds, soreness) {
  if (!soreness || soreness === "none") return { ids: exerciseIds, adapted: false };
  let adapted = false;
  const newIds = exerciseIds.map(id => {
    if (soreness === "shoulder" && ["bench", "incline-db", "dip"].includes(id)) {
      adapted = true;
      return "row";
    }
    if (soreness === "back" && ["rdl", "deadlift"].includes(id)) {
      adapted = true;
      return "leg-ext";
    }
    if (soreness === "knee" && ["squat", "leg-press", "lunge"].includes(id)) {
      adapted = true;
      return "hip-thrust";
    }
    return id;
  });
  return { ids: newIds, adapted };
}

function createWorkout(templateId) {
  const template = routineTemplates.find((item) => item.id === templateId) || routineTemplates[0];
  const soreness = getActiveSoreness();
  const adaptation = adaptExercisesForSoreness(template.exerciseIds, soreness);
  if (adaptation.adapted) {
    setTimeout(() => showToast(`IA: Ajustados ejercicios para proteger tu lesión de ${translateSoreness(soreness)}.`), 500);
  }
  return {
    name: template.name + (adaptation.adapted ? " (Adaptado)" : ""),
    exercises: adaptation.ids.map((id, index) => {
      const historicalSets = getLastSessionSets(id);
      return {
        id,
        sets: historicalSets || [
          { weight: index === 0 ? 80 : 32, reps: index === 0 ? 6 : 10, rpe: 8, type: index === 0 ? "Top" : "Normal", done: false },
          { weight: index === 0 ? 75 : 30, reps: index === 0 ? 8 : 12, rpe: 7, type: "Back", done: false },
          { weight: index === 0 ? 72.5 : 28, reps: index === 0 ? 8 : 12, rpe: 7, type: "Back", done: false },
        ]
      };
    }),
  };
}

function createWorkoutFromWeekDay(day) {
  const exerciseNames = day.blocks.flatMap((block) => block.exercises);
  const ids = exerciseNames
    .map((name) => exercises.find((exercise) => normalizeText(exercise.name) === normalizeText(name) || normalizeText(name).includes(normalizeText(exercise.name)) || normalizeText(exercise.name).includes(normalizeText(name)))?.id)
    .filter(Boolean);
  if (!ids.length) {
    const fallback = ["push", "pull", "fullbody", "legs", "power"][appData.selectedWeekDay] || "push";
    return createWorkout(fallback);
  }
  const soreness = getActiveSoreness();
  const adaptation = adaptExercisesForSoreness(ids, soreness);
  if (adaptation.adapted) {
    setTimeout(() => showToast(`IA: Ajustados ejercicios para proteger tu lesión de ${translateSoreness(soreness)}.`), 500);
  }
  return {
    name: day.title + (adaptation.adapted ? " (Adaptado)" : ""),
    exercises: adaptation.ids.map((id, index) => {
      const historicalSets = getLastSessionSets(id);
      const isCompound = index < 2;
      return {
        id,
        sets: historicalSets || [
          { weight: isCompound ? 80 : 30, reps: isCompound ? 6 : 10, rpe: 8, type: isCompound ? "Top" : "Normal", done: false },
          { weight: isCompound ? 75 : 28, reps: isCompound ? 8 : 12, rpe: 7, type: "Back", done: false },
          { weight: isCompound ? 72.5 : 26, reps: isCompound ? 8 : 12, rpe: 7, type: "Back", done: false },
        ]
      };
    }),
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
  if (view === "workout" && !state.animationRunning) {
    state.animationRunning = true;
    animateExercise();
  }

  // Hide the onboarding button when not on dashboard or if signed in
  const onboardingBtn = $("#open-onboarding");
  if (onboardingBtn) {
    const shouldHide = view !== "dashboard" || isSignedIn();
    onboardingBtn.classList.toggle("hidden", shouldHide);
  }
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
  const container = $(target);
  if (!container) return;
  const history = Array.isArray(appData.workoutHistory) ? appData.workoutHistory : [];
  if (history.length > 0) {
    const sorted = [...history].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt)).slice(0, 3);
    container.innerHTML = sorted.map((workout) => {
      let dateFormatted = "Reciente";
      if (workout.completedAt) {
        try {
          dateFormatted = new Date(workout.completedAt).toLocaleDateString("es-ES", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          });
        } catch (e) {}
      }
      let muscleTag = "Entreno";
      if (workout.exercises && workout.exercises.length > 0) {
        const firstEx = findExercise(workout.exercises[0].id);
        if (firstEx) muscleTag = firstEx.muscle;
      }
      return `
        <article class="feed-item">
          <span class="thumb">🏆</span>
          <div>
            <strong>${workout.name}</strong>
            <small>${dateFormatted} • ${workout.durationMin || 60} min • ${workout.calories || 0} kcal</small>
          </div>
          <span class="pill" style="background: rgba(204, 255, 0, 0.15); color: #ccff00; border: 1px solid rgba(204, 255, 0, 0.3); font-weight: 700;">${muscleTag}</span>
        </article>
      `;
    }).join("");
  } else {
    container.innerHTML = feed
      .map(([avatar, title, subtitle, tag]) => `
        <article class="feed-item">
          <span class="thumb">${avatar}</span>
          <div><strong>${title}</strong><small>${subtitle}</small></div>
          <span class="pill">${tag}</span>
        </article>
      `)
      .join("");
  }
}

const exerciseGifs = {
  bench: "videos/0025-EIeI8Vf.gif",
  "incline-db": "videos/0314-ns0SIbU.gif",
  dip: "videos/0251-9WTm7dq.gif",
  "lat-pulldown": "videos/2330-LEprlgG.gif",
  row: "videos/0861-fUBheHs.gif",
  curl: "videos/0031-25GPyDY.gif",
  squat: "videos/0043-qXTaZnJ.gif",
  rdl: "videos/0085-wQ2c4XD.gif",
  "leg-ext": "videos/0585-my33uHU.gif",
  "lateral-raise": "videos/0334-DsgkuIt.gif",
  "pull-up": "videos/0652-lBDjFxJ.gif",
  "hip-thrust": "videos/3562-qg2PGl6.gif",
  "overhead-press": "videos/1456-wdRZISl.gif",
  "pec-deck": "videos/0596-v3xmPAR.gif",
  "triceps-pushdown": "videos/0241-gAwDzB3.gif",
  "face-pull": "videos/0233-ZfyAGhK.gif",
  deadlift: "videos/0032-ila4NZS.gif",
  "tbar-row": "videos/1349-BgljGjd.gif",
  "hammer-curl": "videos/0313-slDvUAU.gif",
  "leg-press": "videos/0739-10Z2DXU.gif",
  lunge: "videos/0336-RRWFUcw.gif",
  "leg-curl": "videos/0586-17lJ1kr.gif",
  "calf-raise": "videos/1372-8ozhUIZ.gif",
  plank: "videos/2135-VBAWRPG.gif",
  "push-up": "videos/0662-I4hDWkc.gif",
  "cable-fly": "videos/0227-Pr9Rhf4.gif",
  "seated-db-press": "videos/0405-znQUdHY.gif",
  "wide-pulldown": "videos/0150-eYnzaCm.gif",
  "single-row": "videos/0292-C0MA9bC.gif",
  "glute-bridge": "videos/1409-qKBpF7I.gif",

  // Custom CSV exercises — mapped to closest equivalent GIF
  "press-inclinado-csv": "videos/0314-ns0SIbU.gif",          // Press inclinado → incline-db
  "apertura-maquina-csv": "videos/0596-v3xmPAR.gif",          // Apertura en máquina → pec-deck
  "elevaciones-laterales-mancuernas-csv": "videos/0334-DsgkuIt.gif", // Elev. laterales mancuernas → lateral-raise
  "elevaciones-laterales-polea-csv": "videos/0334-DsgkuIt.gif",      // Elev. laterales polea → lateral-raise
  "triceps-polea-alta-csv": "videos/0241-gAwDzB3.gif",        // Tríceps polea alta → triceps-pushdown
  "fondos-maquina-csv": "videos/0251-9WTm7dq.gif",            // Fondos en máquina → dip
  "dominadas-elasticos-csv": "videos/0652-lBDjFxJ.gif",       // Dominadas con elásticos → pull-up
  "jalones-pecho-abierto-csv": "videos/0150-eYnzaCm.gif",     // Jalones al pecho abierto → wide-pulldown
  "remo-gironda-unilateral-csv": "videos/0292-C0MA9bC.gif",   // Remo girándola unilateral → single-row
  "jalones-cerrados-csv": "videos/2330-LEprlgG.gif",          // Jalones cerrados → lat-pulldown
  "pull-over-csv": "videos/0227-Pr9Rhf4.gif",                 // Pull over → cable-fly (similar arc)
  "deltoides-posterior-apertura-csv": "videos/0233-ZfyAGhK.gif", // Deltoides posterior → face-pull
  "curl-scott-csv": "videos/0031-25GPyDY.gif",                // Curl scott → curl
  "curl-biceps-mancuerna-csv": "videos/0313-slDvUAU.gif",     // Curl bíceps mancuerna → hammer-curl
  "curl-braquial-antebrazo-csv": "videos/0313-slDvUAU.gif",   // Curl braquial antebrazo → hammer-curl
  "extensiones-csv": "videos/0585-my33uHU.gif",               // Extensiones → leg-ext
  "abductores-csv": "videos/3562-qg2PGl6.gif",                // Abductores → hip-thrust (glúteo)
  "adductores-csv": "videos/3562-qg2PGl6.gif",                // Adductores → hip-thrust (glúteo)
  "sentado-peso-arriba-csv": "videos/1372-8ozhUIZ.gif",       // Sentado peso arriba → calf-raise
  "press-inclinado-barra-csv": "videos/0314-ns0SIbU.gif",     // Press inclinado barra → incline-db
  "face-full-csv": "videos/0233-ZfyAGhK.gif",                 // Face full → face-pull
  "jalon-abierto-csv": "videos/0150-eYnzaCm.gif",             // Jalón abierto → wide-pulldown
  "remo-barra-polea-csv": "videos/0861-fUBheHs.gif",          // Remo con barra en polea → row
  "curl-de-biceps-csv": "videos/0031-25GPyDY.gif",            // Curl de bíceps → curl
  "triceps-con-cuerda-csv": "videos/0241-gAwDzB3.gif",        // Tríceps con cuerda → triceps-pushdown
  "curl-con-barra-csv": "videos/0031-25GPyDY.gif",            // Curl con Barra → curl
  "curl-con-mancuernas-csv": "videos/0313-slDvUAU.gif",       // Curl con Mancuernas → hammer-curl
  "crunches-csv": "videos/2135-VBAWRPG.gif",                  // Crunches → plank (core)
  "rompecraneos-csv": "videos/0241-gAwDzB3.gif",              // Rompecráneos → triceps-pushdown
  "jalones-de-triceps-csv": "videos/0241-gAwDzB3.gif",        // Jalones de Tríceps → triceps-pushdown
  "fondos-en-banco-csv": "videos/0251-9WTm7dq.gif"            // Fondos en Banco → dip
};

function findExercise(id) {
  return exercises.find((item) => item.id === id) || exercises[0];
}

function posterSrc(exercise, frame = 0) {
  if (exercise?.gifUrl && (frame === "gif" || frame === "video")) return exercise.gifUrl;
  if (exercise?.imageUrl) return exercise.imageUrl;
  const exerciseGifPath = exerciseGifs[exercise.id];
  if (exerciseGifPath) {
    if (frame === "gif" || frame === "video") {
      return `https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/${exerciseGifPath}`;
    }
    const jpgPath = exerciseGifPath.replace("videos/", "images/").replace(".gif", ".jpg");
    return `https://raw.githubusercontent.com/hasaneyldrm/exercises-dataset/main/${jpgPath}`;
  }
  return `assets/exercises/${exercise.id}-${frame}.svg`;
}

function motionSrc(exercise) {
  return exercise?.gifUrl || posterSrc(exercise, "gif");
}

function exerciseAttribution(exercise) {
  if (!exercise?.source) return "LiftLab";
  return [exercise.source, exercise.attribution].filter(Boolean).join(" · ");
}

const exerciseNamePatterns = [
  [/3\/4 sit-up/i, "Abdominal parcial 3/4"],
  [/ab roller/i, "Rueda abdominal"],
  [/air bike/i, "Bicicleta abdominal"],
  [/alternate heel touch/i, "Toque alterno de talones"],
  [/archer push.?up/i, "Flexión arquero"],
  [/arnold press/i, "Press Arnold"],
  [/back extension/i, "Extensión lumbar"],
  [/barbell bench press/i, "Press banca con barra"],
  [/bench press/i, "Press banca"],
  [/barbell curl/i, "Curl de bíceps con barra"],
  [/barbell deadlift/i, "Peso muerto con barra"],
  [/deadlift/i, "Peso muerto"],
  [/barbell row/i, "Remo con barra"],
  [/barbell squat/i, "Sentadilla con barra"],
  [/bulgarian split squat/i, "Sentadilla búlgara"],
  [/cable crossover/i, "Cruce de poleas"],
  [/cable curl/i, "Curl en polea"],
  [/cable fly/i, "Apertura en polea"],
  [/cable kickback/i, "Patada de glúteo en polea"],
  [/cable lateral raise/i, "Elevación lateral en polea"],
  [/cable pushdown/i, "Extensión de tríceps en polea"],
  [/calf raise/i, "Elevación de gemelos"],
  [/chest dip/i, "Fondos para pecho"],
  [/chin.?up/i, "Dominada supina"],
  [/concentration curl/i, "Curl concentrado"],
  [/crunch/i, "Crunch abdominal"],
  [/decline bench press/i, "Press banca declinado"],
  [/dumbbell bench press/i, "Press banca con mancuernas"],
  [/dumbbell curl/i, "Curl de bíceps con mancuernas"],
  [/dumbbell fly/i, "Aperturas con mancuernas"],
  [/dumbbell lateral raise/i, "Elevación lateral con mancuernas"],
  [/front raise/i, "Elevación frontal"],
  [/glute bridge/i, "Puente de glúteo"],
  [/hammer curl/i, "Curl martillo"],
  [/hip thrust/i, "Hip thrust"],
  [/incline bench press/i, "Press banca inclinado"],
  [/incline dumbbell press/i, "Press inclinado con mancuernas"],
  [/jump squat/i, "Sentadilla con salto"],
  [/lat pulldown/i, "Jalón al pecho"],
  [/leg curl/i, "Curl femoral"],
  [/leg extension/i, "Extensión de cuádriceps"],
  [/leg press/i, "Prensa de piernas"],
  [/alternate lateral pulldown/i, "Jalón lateral alterno"],
  [/lateral pulldown/i, "Jalón lateral"],
  [/lunge/i, "Zancada"],
  [/mountain climber/i, "Escalador"],
  [/overhead press/i, "Press militar"],
  [/pec deck/i, "Contractora de pecho"],
  [/plank/i, "Plancha"],
  [/pull.?up/i, "Dominada"],
  [/push.?up/i, "Flexión"],
  [/romanian deadlift/i, "Peso muerto rumano"],
  [/russian twist/i, "Giro ruso"],
  [/shoulder press/i, "Press de hombro"],
  [/shrug/i, "Encogimiento de trapecio"],
  [/sit.?up/i, "Abdominal sit-up"],
  [/skull crusher/i, "Rompecráneos"],
  [/triceps extension/i, "Extensión de tríceps"],
  [/triceps dip/i, "Fondos de tríceps"],
  [/upright row/i, "Remo al mentón"],
];

const exerciseWordTranslations = [
  ["body weight", "peso corporal"],
  ["barbell", "barra"],
  ["dumbbell", "mancuerna"],
  ["cable", "polea"],
  ["lever", "máquina"],
  ["smith", "smith"],
  ["weighted", "con lastre"],
  ["assisted", "asistido"],
  ["standing", "de pie"],
  ["seated", "sentado"],
  ["lying", "tumbado"],
  ["incline", "inclinado"],
  ["decline", "declinado"],
  ["reverse", "inverso"],
  ["single arm", "a una mano"],
  ["one arm", "a una mano"],
  ["single leg", "a una pierna"],
  ["wide grip", "agarre amplio"],
  ["close grip", "agarre cerrado"],
  ["front", "frontal"],
  ["rear", "posterior"],
  ["side", "lateral"],
  ["raise", "elevación"],
  ["row", "remo"],
  ["squat", "sentadilla"],
  ["extension", "extensión"],
  ["rotation", "rotación"],
  ["stretch", "estiramiento"],
  ["alternate", "alterno"],
  ["alternating", "alterno"],
  ["pulldown", "jalón"],
  ["press", "press"],
  ["fly", "apertura"],
  ["kickback", "patada"],
  ["twist", "giro"],
  ["split", "dividida"],
  ["bench", "banco"],
  ["machine", "máquina"],
  ["kneeling", "de rodillas"],
  ["knee", "rodilla"],
  ["arm", "brazo"],
  ["leg", "pierna"],
  ["hip", "cadera"],
  ["chest", "pecho"],
  ["shoulder", "hombro"],
  ["biceps", "bíceps"],
  ["triceps", "tríceps"],
  ["calf", "gemelo"],
  ["glute", "glúteo"],
  ["abdominal", "abdominal"],
  ["with", "con"],
  ["on", "en"],
];

function titleCaseSpanish(value) {
  return String(value)
    .split(" ")
    .filter(Boolean)
    .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(" ");
}

function translateExerciseName(name = "") {
  const clean = String(name).replace(/\s+/g, " ").trim();
  const exact = exerciseNamePatterns.find(([pattern]) => pattern.test(clean));
  if (exact) return exact[1];
  let translated = ` ${clean.toLowerCase()} `;
  exerciseWordTranslations
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([from, to]) => {
      translated = translated.replace(new RegExp(`\\b${from}\\b`, "g"), to);
    });
  return titleCaseSpanish(translated.replace(/\s+/g, " ").trim() || clean);
}

function translateSecondaryMuscle(value = "") {
  const text = normalizeText(value);
  if (/(pector|chest)/.test(text)) return "Pecho";
  if (/(lat|back|trap|dorsal)/.test(text)) return "Espalda";
  if (/tricep/.test(text)) return "Tríceps";
  if (/bicep|brachialis/.test(text)) return "Bíceps";
  if (/deltoid|shoulder/.test(text)) return "Hombro";
  if (/glute/.test(text)) return "Glúteo";
  if (/hamstring/.test(text)) return "Femoral";
  if (/quad/.test(text)) return "Cuádriceps";
  if (/calf|soleus|gastrocnemius/.test(text)) return "Gemelo";
  if (/abs|abdom|core|waist/.test(text)) return "Core";
  return titleCaseSpanish(String(value).replaceAll("_", " "));
}

function mapDatasetMuscle(item) {
  const text = normalizeText(`${item.name || ""} ${item.category || ""} ${item.body_part || ""} ${item.target || ""} ${item.muscle_group || ""}`);
  if (/(chest|pector|pecho)/.test(text)) return "Pecho";
  if (/(back|lat|trap|dorsal|espalda)/.test(text)) return "Espalda";
  if (/(triceps|tricep)/.test(text)) return "Tríceps";
  if (/(biceps|upper arms|brachialis|bicep|curl)/.test(text)) return "Bíceps";
  if (/(shoulder|deltoid|hombro|delts)/.test(text)) return "Hombro";
  if (/(glute|gluteo|glúteo|hip)/.test(text)) return "Glúteo";
  if (/(hamstring|femoral)/.test(text)) return "Femoral";
  if (/(calf|lower legs|gemelo|soleus)/.test(text)) return "Gemelo";
  if (/(waist|abs|core|abdominal)/.test(text)) return "Core";
  if (/(upper legs|quads|quadriceps|thigh|leg|pierna)/.test(text)) return "Pierna";
  return "Core";
}

function mapDatasetEquipment(value = "") {
  const text = normalizeText(value);
  if (text.includes("body weight")) return "Peso corporal";
  if (text.includes("dumbbell")) return "Mancuernas";
  if (text.includes("barbell")) return "Barra";
  if (text.includes("cable")) return "Polea";
  if (text.includes("machine") || text.includes("leverage") || text.includes("smith")) return "Máquina";
  if (text.includes("band")) return "Banda";
  if (text.includes("kettlebell")) return "Kettlebell";
  if (text.includes("ez")) return "Barra EZ";
  if (text.includes("weighted")) return "Lastre";
  if (text.includes("stability ball")) return "Fitball";
  return value || "Sin equipo";
}

function datasetPath(path) {
  return path ? `${EXERCISE_DATASET_MEDIA_BASE}${path}` : "";
}

function normalizeDatasetExercise(item) {
  const steps = Array.isArray(item.instruction_steps?.es) && item.instruction_steps.es.length
    ? item.instruction_steps.es
    : String(item.instructions?.es || item.instructions?.en || "Ejercicio sin instrucciones disponibles.").split(/(?<=\.)\s+/).filter(Boolean);
  const muscle = mapDatasetMuscle(item);
  const type = muscle === "Espalda" || muscle === "Bíceps" ? "pull" : ["Pierna", "Femoral", "Glúteo", "Gemelo", "Core"].includes(muscle) ? "legs" : "push";
  return {
    id: `dataset-${item.id}`,
    datasetId: item.id,
    name: translateExerciseName(item.name),
    originalName: item.name,
    muscle,
    equipment: mapDatasetEquipment(item.equipment),
    type,
    cues: steps.slice(0, 5),
    description: item.instructions?.es || item.instructions?.en || `${item.name}: guía técnica disponible en el dataset.`,
    target: translateSecondaryMuscle(item.target || item.muscle_group || item.category),
    secondaryMuscles: (item.secondary_muscles || []).map(translateSecondaryMuscle),
    imageUrl: datasetPath(item.image),
    gifUrl: datasetPath(item.gif_url),
    source: "Dataset de ejercicios",
    attribution: item.attribution || "© Gym visual",
  };
}

async function loadExerciseDataset() {
  if (exerciseDatasetState.loading || exerciseDatasetState.loaded) return;
  exerciseDatasetState.loading = true;
  exerciseDatasetState.error = "";
  try {
    const response = await fetch(EXERCISE_DATASET_URL, { cache: "force-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const dataset = await response.json();
    if (!Array.isArray(dataset)) throw new Error("Formato de dataset no válido");
    const normalized = dataset.map(normalizeDatasetExercise).filter((item) => item.name && item.muscle);
    const localByName = new Set(exercises.map((item) => normalizeText(item.name)));
    const seenDatasetKeys = new Set();
    const uniqueDataset = normalized.filter((item) => {
      const translatedName = normalizeText(item.name);
      const originalName = normalizeText(item.originalName);
      const compoundKey = normalizeText(`${item.name} ${item.muscle} ${item.equipment}`);
      if (localByName.has(translatedName) || localByName.has(originalName) || seenDatasetKeys.has(compoundKey)) return false;
      seenDatasetKeys.add(compoundKey);
      return true;
    });
    exercises = [...exercises, ...uniqueDataset];
    exerciseDatasetState = {
      loaded: true,
      loading: false,
      source: "hasaneyldrm/exercises-dataset",
      total: uniqueDataset.length,
      error: "",
    };
    renderFilters();
    renderMuscleAtlas();
    renderLibrary();
  } catch (error) {
    exerciseDatasetState.loading = false;
    exerciseDatasetState.error = "No se pudo cargar el dataset externo. Se mantiene la biblioteca local.";
    renderLibrary();
  }
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

function openSwapWorkoutExerciseDialog(exerciseIndex) {
  let dialog = $("#swap-workout-exercise-dialog");
  if (!dialog) {
    document.body.insertAdjacentHTML("beforeend", `
      <dialog id="swap-workout-exercise-dialog" style="border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); padding: 24px; max-width: 400px; box-shadow: var(--shadow-lg); width: 90%;">
        <h3 style="margin-top: 0; margin-bottom: 16px; font-family: 'Outfit', sans-serif;">Sustituir ejercicio</h3>
        <label style="display: block; margin-bottom: 20px;">
          Selecciona el nuevo ejercicio:
          <select id="workout-swap-select" style="width: 100%; padding: 10px; margin-top: 8px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface-strong); color: var(--ink);">
            ${exercises.map(e => `<option value="${e.id}">${escapeHtml(e.name)} (${e.muscle})</option>`).join("")}
          </select>
        </label>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="ghost-button" id="workout-swap-cancel">Cancelar</button>
          <button class="primary-button" id="workout-swap-confirm">Sustituir</button>
        </div>
      </dialog>
    `);
    dialog = $("#swap-workout-exercise-dialog");
    $("#workout-swap-cancel").addEventListener("click", () => dialog.close());
  }
  
  const confirmBtn = $("#workout-swap-confirm");
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  
  newConfirmBtn.addEventListener("click", () => {
    const select = $("#workout-swap-select");
    const newExerciseId = select.value;
    if (newExerciseId) {
      state.activeWorkout.exercises[exerciseIndex].id = newExerciseId;
      saveWorkout();
      renderWorkoutLog();
      const newEx = findExercise(newExerciseId);
      showToast(`Ejercicio sustituido por "${newEx.name}".`);
    }
    dialog.close();
  });
  
  dialog.showModal();
}

function renderWorkoutLog() {
  const nameEl = $("#active-workout-name");
  const logEl = $("#exercise-log");
  if (!nameEl || !logEl) return;
  nameEl.textContent = state.activeWorkout.name;
  logEl.innerHTML = state.activeWorkout.exercises
    .map((entry, exerciseIndex) => {
      const exercise = findExercise(entry.id);
      return `
        <article class="log-exercise" data-exercise-index="${exerciseIndex}">
          <div class="log-head">
            <div>
              <strong>${exercise.name}</strong>
              <small>${exercise.muscle} - ${exercise.equipment}</small>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="text-button" data-technique-exercise="${exercise.id}">Ver técnica</button>
              <button class="text-button" data-swap-workout-exercise="${exerciseIndex}">Sustituir</button>
              <button class="text-button" data-remove-exercise="${exerciseIndex}" style="color: var(--coral);">Eliminar</button>
            </div>
          </div>
          <div class="set-grid">
            ${entry.sets
              .map((set, setIndex) => `
                <div class="set-row" data-set-index="${setIndex}">
                  <strong class="set-label" style="font-size: 0.76rem; white-space: nowrap;">Serie ${setIndex + 1} de ${entry.sets.length}</strong>
                  <label>Peso
                    <div class="qty-btn-group">
                      <button type="button" class="qty-btn" data-adjust-set-val="-2.5" data-field="weight" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">-</button>
                      <input data-field="weight" type="number" min="0" step="0.5" value="${set.weight}">
                      <button type="button" class="qty-btn" data-adjust-set-val="2.5" data-field="weight" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">+</button>
                    </div>
                  </label>
                  <label>Reps
                    <div class="qty-btn-group">
                      <button type="button" class="qty-btn" data-adjust-set-val="-1" data-field="reps" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">-</button>
                      <input data-field="reps" type="number" min="1" step="1" value="${set.reps}">
                      <button type="button" class="qty-btn" data-adjust-set-val="1" data-field="reps" data-exercise-index="${exerciseIndex}" data-set-index="${setIndex}">+</button>
                    </div>
                  </label>
                  <label>RPE<input data-field="rpe" type="number" min="1" max="10" step="0.5" value="${set.rpe}"></label>
                  <label>Tipo<input data-field="type" value="${set.type}"></label>
                  <button class="check-set ${set.done ? "done" : ""}" data-check-set aria-label="Completar serie">${set.done ? "✓" : ""}</button>
                  <button class="ghost-button" data-remove-set="${setIndex}" style="padding: 4px 8px; font-size: 1.1rem; color: var(--coral); min-width: auto; border: none; background: transparent;" aria-label="Eliminar serie">×</button>
                </div>
              `)
              .join("")}
          </div>
          <div style="display: flex; gap: 12px; margin-top: 8px;">
            <button class="text-button" data-add-set="${exerciseIndex}">Añadir serie</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderRoutines() {
  renderWeeklyRoutineBoard();
  const grid = $("#routines-grid");
  if (!grid) return;
  grid.innerHTML = routineTemplates
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
  const container = $("#muscle-filter");
  if (!container) return;
  const preferredOrder = ["Pecho", "Espalda", "Hombro", "Bíceps", "Tríceps", "Pierna", "Femoral", "Glúteo", "Gemelo", "Core"];
  const available = new Set(exercises.map((item) => item.muscle).filter(Boolean));
  const extras = [...available].filter((muscle) => !preferredOrder.includes(muscle)).sort((a, b) => a.localeCompare(b, "es"));
  const muscles = ["Todos", ...preferredOrder.filter((muscle) => available.has(muscle)), ...extras];
  const totalCount = exercises.length;
  const countFor = (muscle) => muscle === "Todos" ? totalCount : exercises.filter((item) => item.muscle === muscle).length;
  container.innerHTML = muscles
    .map((muscle) => `<button class="${state.libraryFilter === muscle ? "active" : ""}" data-muscle="${muscle}">${muscle} (${countFor(muscle)})</button>`)
    .join("");
}

function renderLibrary() {
  const countLabel = $("#exercise-count-label");
  const libraryContainer = $("#exercise-library");
  if (!countLabel || !libraryContainer) return;
  const query = normalizeText($("#exercise-search")?.value || "");
  const filtered = exercises.filter((exercise) => {
    const matchesFilter = state.libraryFilter === "Todos" || exercise.muscle === state.libraryFilter;
    const haystack = normalizeText(`${exercise.name} ${exercise.originalName || ""} ${exercise.muscle} ${exercise.equipment} ${exercise.target || ""} ${(exercise.secondaryMuscles || []).join(" ")}`);
    return matchesFilter && haystack.includes(query);
  });
  const visible = filtered.slice(0, EXERCISE_RENDER_LIMIT);
  const datasetLabel = exerciseDatasetState.loaded
    ? ` · ${exerciseDatasetState.total} del dataset`
    : exerciseDatasetState.loading
      ? " · cargando dataset"
      : exerciseDatasetState.error
        ? " · dataset no cargado"
        : "";
  countLabel.textContent = `${filtered.length} ejercicios${filtered.length > visible.length ? ` · mostrando ${visible.length}` : ""}${datasetLabel}`;
  libraryContainer.innerHTML = visible
    .map((exercise) => `
      <article class="exercise-card">
        <button class="exercise-visual media-card" data-open-exercise="${exercise.id}" aria-label="Abrir guía de ${exercise.name}">
          <img src="${posterSrc(exercise, 1)}" alt="Foto de ${escapeHtml(exercise.name)}" loading="lazy">
          <span class="play-dot"><svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7V5Z"/></svg></span>
        </button>
        <div>
          <strong>${escapeHtml(exercise.name)}</strong>
          <small>${escapeHtml(exercise.muscle)} - ${escapeHtml(exercise.equipment)}</small>
          ${exercise.source ? `<span class="exercise-source">${escapeHtml(exercise.source)}</span>` : ""}
        </div>
        <button class="ghost-button" data-open-exercise-button="${exercise.id}">Abrir guía</button>
      </article>
    `)
    .join("");
}

function renderCues() {
  if (!state.selectedExercise) return;
  if ($("#dialog-title")) $("#dialog-title").textContent = state.selectedExercise.name;
  if ($("#dialog-muscle")) $("#dialog-muscle").textContent = state.selectedExercise.muscle;
  if ($("#dialog-description")) $("#dialog-description").textContent = state.selectedExercise.description;
  
  const hasExerciseGif = !!exerciseGifs[state.selectedExercise.id];
  if ($("#dialog-video-frame")) {
    $("#dialog-video-frame").src = motionSrc(state.selectedExercise);
    $("#dialog-video-frame").alt = `Video animado de ${state.selectedExercise.name}`;
  }
  if ($("#dialog-photos")) {
    const photos = state.selectedExercise.imageUrl
      ? [state.selectedExercise.imageUrl, state.selectedExercise.gifUrl || state.selectedExercise.imageUrl]
      : [0, 1, 2].map((frame) => posterSrc(state.selectedExercise, hasExerciseGif && frame === 0 ? 1 : frame));
    $("#dialog-photos").style.display = "";
    $("#dialog-photos").innerHTML = photos.map((src, index) => `<img src="${src}" alt="Foto ${index + 1} de ${escapeHtml(state.selectedExercise.name)}">`).join("");
  }
  if ($("#dialog-muscles")) {
    $("#dialog-muscles").innerHTML = `
    <img src="${muscleDataUri(state.selectedExercise.muscle, "front")}" alt="Músculos frontales trabajados por ${state.selectedExercise.name}">
    <img src="${muscleDataUri(state.selectedExercise.muscle, "back")}" alt="Músculos posteriores trabajados por ${state.selectedExercise.name}">
  `;
  }
  $("#cue-list").innerHTML = [
    ...state.selectedExercise.cues.map((cue) => `<div class="cue">${escapeHtml(cue)}</div>`),
    `<div class="cue source-cue">${escapeHtml(exerciseAttribution(state.selectedExercise))}</div>`,
  ].join("");
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

let lastCoachExerciseId = null;

function animateExercise() {
  if (state.view !== "workout") {
    state.animationRunning = false;
    return;
  }
  const canvas = $("#exercise-canvas");
  const gifImg = $("#coach-exercise-gif");
  
  if (state.selectedExercise) {
    const hasExerciseGif = !!exerciseGifs[state.selectedExercise.id];
    if (hasExerciseGif) {
      if (canvas) canvas.style.display = "none";
      if (gifImg) {
        gifImg.style.display = "block";
        if (lastCoachExerciseId !== state.selectedExercise.id) {
          lastCoachExerciseId = state.selectedExercise.id;
          gifImg.src = posterSrc(state.selectedExercise, "gif");
        }
      }
    } else {
      if (gifImg) {
        gifImg.style.display = "none";
        lastCoachExerciseId = null;
      }
      if (canvas) {
        canvas.style.display = "block";
        const phase = performance.now() / 650;
        drawExercise(canvas, state.selectedExercise, phase);
      }
    }
  } else {
    if (gifImg) {
      gifImg.style.display = "none";
      lastCoachExerciseId = null;
    }
    if (canvas) {
      canvas.style.display = "block";
    }
  }
  
  requestAnimationFrame(animateExercise);
}

function stopDialogAnimation() {
  if (!dialogFrameTimer) return;
  clearInterval(dialogFrameTimer);
  dialogFrameTimer = null;
}

function startDialogAnimation() {
  stopDialogAnimation();
  if (state.selectedExercise?.gifUrl || (state.selectedExercise && exerciseGifs[state.selectedExercise.id])) return;
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

function getChartData(mode) {
  const history = Array.isArray(appData.workoutHistory) ? appData.workoutHistory : [];
  if (history.length === 0) {
    return {
      isEmptyHistory: true,
      labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7"],
      values: progressData[mode]
    };
  }

  // Sort history chronologically by completion date
  const sorted = [...history].sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));
  const recent = sorted.slice(-7);

  const labels = recent.map(w => {
    try {
      const d = new Date(w.completedAt);
      if (isNaN(d.getTime())) return "Entreno";
      return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" });
    } catch {
      return "Entreno";
    }
  });

  let values = [];
  if (mode === "volume") {
    values = recent.map(w => estimateHistoryVolume([w]));
  } else if (mode === "orm") {
    values = recent.map(w => estimateBestOrm([w]));
  } else if (mode === "sets") {
    values = recent.map(w => (w.exercises || []).flatMap(e => e.sets || []).filter(s => s.done).length);
  }

  return {
    isEmptyHistory: false,
    labels,
    values
  };
}

function drawProgressChart() {
  const canvas = $("#progress-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const mode = $("#chart-mode").value;
  
  const chartInfo = getChartData(mode);
  const data = chartInfo.values;
  const labels = chartInfo.labels;

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
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);
  // Ensure we don't divide by zero if max and min are equal
  const max = maxVal === 0 ? 100 : maxVal * 1.12;
  const min = minVal === 0 ? 0 : minVal * 0.88;

  ctx.strokeStyle = line;
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = padding + ((height - padding * 2) / 4) * i;
    stroke(ctx, line, 1, [[padding, y], [width - padding, y]]);
  }

  const points = data.map((value, index) => {
    let x;
    if (data.length === 1) {
      x = width / 2;
    } else {
      x = padding + ((width - padding * 2) / (data.length - 1)) * index;
    }
    let y;
    if (max === min) {
      y = height / 2;
    } else {
      y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    }
    return [x, y, value];
  });

  if (points.length > 0) {
    // 1. Draw and fill the gradient area under the Bezier curve (only if we have more than 1 point)
    if (points.length > 1) {
      const fillGrad = ctx.createLinearGradient(0, padding, 0, height - padding);
      fillGrad.addColorStop(0, accent);
      fillGrad.addColorStop(1, "rgba(0,0,0,0)");
      
      ctx.save();
      ctx.fillStyle = fillGrad;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(points[0][0], height - padding);
      ctx.lineTo(points[0][0], points[0][1]);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX1 = p0[0] + (p1[0] - p0[0]) / 2;
        const cpY1 = p0[1];
        const cpX2 = p0[0] + (p1[0] - p0[0]) / 2;
        const cpY2 = p1[1];
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1[0], p1[1]);
      }
      ctx.lineTo(points[points.length - 1][0], height - padding);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Draw the smooth stroke on top
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cpX1 = p0[0] + (p1[0] - p0[0]) / 2;
        const cpY1 = p0[1];
        const cpX2 = p0[0] + (p1[0] - p0[0]) / 2;
        const cpY2 = p1[1];
        ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1[0], p1[1]);
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = accent;
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      // Just draw a single thick dot if there is only 1 data point
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(points[0][0], points[0][1], 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }

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
  labels.forEach((label, index) => {
    if (points[index]) {
      ctx.fillText(label, points[index][0] - 18, height - 22);
    }
  });

  if (chartInfo.isEmptyHistory) {
    ctx.fillStyle = accent;
    ctx.font = "600 12px system-ui, sans-serif";
    ctx.fillText("Sin historial - registra entrenamientos para ver tu progreso real", padding, padding - 15);
  }
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
  const container = $("#milestones");
  if (!container) return;
  const history = Array.isArray(appData.workoutHistory) ? appData.workoutHistory : [];
  const items = history.length
    ? [
        ["Último entreno", `${history.at(-1)?.name || "Entreno"} guardado en tu cuenta`],
        ["Entrenos registrados", `${history.length} sesiones reales`],
        ["Progreso", "Los récords aparecerán al repetir ejercicios"],
      ]
    : [["Sin registros todavía", "Completa tu primer entrenamiento para ver marcas reales"]];
  container.innerHTML = items.map(([title, text]) => `<article class="milestone"><strong>${title}</strong><br><small>${text}</small></article>`).join("");
  
  // Update timeline
  renderWorkoutHistoryTimeline();
}

function renderWorkoutHistoryTimeline() {
  const container = $("#workout-history-timeline");
  if (!container) return;
  
  const history = Array.isArray(appData.workoutHistory) ? appData.workoutHistory : [];
  if (history.length === 0) {
    container.innerHTML = `<div class="timeline-empty">Aún no has registrado ningún entrenamiento. ¡Completa tu primera sesión para comenzar tu historial!</div>`;
    return;
  }
  
  const sortedHistory = [...history].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  
  container.innerHTML = sortedHistory.map((workout) => {
    const muscles = new Set();
    let totalVolume = 0;
    let completedSets = 0;
    
    if (Array.isArray(workout.exercises)) {
      workout.exercises.forEach((exEntry) => {
        const exercise = findExercise(exEntry.id);
        if (exercise) muscles.add(exercise.muscle);
        
        if (Array.isArray(exEntry.sets)) {
          exEntry.sets.forEach((set) => {
            if (set.done) {
              completedSets++;
              totalVolume += (Number(set.weight) || 0) * (Number(set.reps) || 0);
            }
          });
        }
      });
    }
    
    let dateFormatted = "Fecha no disponible";
    if (workout.completedAt) {
      try {
        dateFormatted = new Date(workout.completedAt).toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });
      } catch (e) {}
    }
    
    const badgesHtml = Array.from(muscles).map((muscle) => {
      let typeClass = "";
      let emoji = "💪";
      const muscleLower = String(muscle).toLowerCase();
      if (["pecho", "hombro", "tríceps", "hombros"].some(m => muscleLower.includes(m))) {
        typeClass = "push";
        emoji = "💪";
      } else if (["espalda", "bíceps"].some(m => muscleLower.includes(m))) {
        typeClass = "pull";
        emoji = "🏋️";
      } else if (["pierna", "femoral", "glúteo", "gemelo", "cuádriceps", "isquiotibiales", "glúteos", "gemelos"].some(m => muscleLower.includes(m))) {
        typeClass = "legs";
        emoji = "🦵";
      } else {
        emoji = "🛡️";
      }
      return `<span class="muscle-badge ${typeClass}">${emoji} ${muscle}</span>`;
    }).join(" ");
    
    return `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-header">
          <strong class="timeline-title">${workout.name}</strong>
          <span class="timeline-date">${dateFormatted}</span>
        </div>
        <div class="timeline-meta">
          <span>⏱️ ${workout.durationMin || 60} min</span>
          <span>🔥 ${workout.calories || 0} kcal</span>
          <span>🏋️ ${totalVolume.toLocaleString("es-ES")} kg (Volumen)</span>
          <span>✅ ${completedSets} series</span>
        </div>
        <div class="timeline-badges">
          ${badgesHtml}
        </div>
      </div>
    `;
  }).join("");
}

function renderCommunity() {
  // Vista de comunidad eliminada por solicitud del usuario
  return;
}

function renderMeasures() {
  const container = $("#measure-grid");
  if (!container) return;
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
  container.innerHTML = measures.map(([name, value]) => `<div class="measure-item"><span>${name}</span><strong>${value}</strong></div>`).join("");
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

  const meals = todayMeals();
  const totals = sumNutrition(meals.map((meal) => meal.totals));
  const targets = getNutritionTargets(ctx.goal === "fatloss" ? "cut" : ctx.goal === "hypertrophy" ? "bulk" : "maintain", { trainingMinutes: ctx.time });
  const remainingKcal = targets.kcal - totals.kcal;
  const remainingProtein = Math.max(0, targets.protein - totals.protein);

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
      score: `${totals.kcal}/${targets.kcal} kcal`,
      text: `Llevas ${totals.kcal} kcal consumidas de ${targets.kcal} kcal (${remainingKcal > 0 ? 'faltan ' + remainingKcal : 'exceso de ' + Math.abs(remainingKcal)} kcal). Proteína restante: ${remainingProtein}g de ${targets.protein}g.`,
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

function showAITypingIndicator() {
  const chat = $("#ai-chat");
  if (!chat) return;
  const existing = chat.querySelector(".ai-typing-indicator");
  if (existing) existing.remove();
  chat.insertAdjacentHTML(
    "beforeend",
    `<div class="ai-message ai-typing-indicator">
      <strong>Coach IA</strong>
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>`
  );
  chat.scrollTop = chat.scrollHeight;
}

function removeAITypingIndicator() {
  const chat = $("#ai-chat");
  if (!chat) return;
  const indicator = chat.querySelector(".ai-typing-indicator");
  if (indicator) indicator.remove();
}

function answerAIQuestion(question) {
  const ctx = collectTrainingContext();
  const q = question.toLowerCase();
  const meals = todayMeals();
  const totals = sumNutrition(meals.map((meal) => meal.totals));
  const targets = getNutritionTargets(ctx.goal === "fatloss" ? "cut" : ctx.goal === "hypertrophy" ? "bulk" : "maintain", { trainingMinutes: ctx.time });
  const remainingKcal = targets.kcal - totals.kcal;
  const remainingProtein = Math.max(0, targets.protein - totals.protein);
  const workoutHistoryCount = Array.isArray(appData.workoutHistory) ? appData.workoutHistory.length : 0;

  if (q.includes("dolor") || q.includes("hombro") || q.includes("rodilla") || q.includes("espalda") || q.includes("lesion") || q.includes("molestia")) {
    let specificAdvice = "";
    if (ctx.soreness === "shoulder" || q.includes("hombro")) {
      specificAdvice = " Tienes molestia de hombro activa: evita Press banca o Press militar; realiza Cruce de poleas o elevaciones laterales en rangos cómodos.";
    } else if (ctx.soreness === "knee" || q.includes("rodilla")) {
      specificAdvice = " Tienes molestia de rodilla activa: sustituye Sentadillas y Prensa por Hip Thrust y extensiones ligeras controladas.";
    } else if (ctx.soreness === "back" || q.includes("espalda")) {
      specificAdvice = " Tienes molestia de espalda baja activa: evita Peso muerto y Remo con barra libre; usa remo apoyado en máquina y planchas para el core.";
    }
    return `Para tu dolor/molestia:${specificAdvice} Mi consejo general: reduce el rango de movimiento, baja el peso un 10-20% y prioriza ejercicios estables. Si el dolor es punzante o te hace compensar con otra postura, detén la serie de inmediato.`;
  }
  if (q.includes("peso") || q.includes("subo") || q.includes("progres") || q.includes("volumen") || q.includes("fuerza")) {
    const volLogText = workoutHistoryCount > 0 
      ? ` Llevas ${workoutHistoryCount} entrenos registrados y tu volumen en esta sesión es de ${ctx.volume} kg.` 
      : " Aún no tienes entrenos históricos registrados.";
    return ctx.recovery >= 75
      ? `Tu recuperación es buena (${ctx.recovery}%).${volLogText} Te aconsejo subir la carga un 2-2.5 kg en ejercicios básicos si en la última sesión completaste todas las series con RPE 8 o menos, o intentar una repetición extra por serie en accesorios.`
      : `Tu recuperación está algo baja hoy (${ctx.recovery}%).${volLogText} Mantén los pesos actuales, concéntrate en mejorar la velocidad de levantamiento y la técnica, buscando repetir el rendimiento anterior sin acumular fatiga excesiva.`;
  }
  if (q.includes("comer") || q.includes("prote") || q.includes("nutri") || q.includes("caloria") || q.includes("dieta")) {
    return `Nutrición de hoy: Llevas consumidas ${totals.kcal} kcal de un objetivo diario de ${targets.kcal} kcal (te quedan ${remainingKcal > 0 ? remainingKcal + ' kcal libres' : Math.abs(remainingKcal) + ' kcal de exceso'}). Te restan ${remainingProtein}g de proteína (consumidos ${totals.protein}g de ${targets.protein}g). Mi consejo: prioriza fuentes magras como pechuga de pollo, claras de huevo, yogur griego o batido de whey para cubrir el objetivo restante.`;
  }
  return `Para la sesión de hoy (${ctx.workoutName}): Concéntrate en la adherencia y calidad técnica. Realiza tus series planificadas dejando 1-2 repeticiones en recámara (RPE 7-8) y regístralo todo. Tu recuperación estimada es del ${ctx.recovery}%. ¡A por ello!`;
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
  const profile = appData.profile || {};
  
  const weight = clampNumber($("#nutri-weight")?.value || profile.weight, 30, 250, 82);
  const height = clampNumber($("#nutri-height")?.value || profile.height, 120, 230, 178);
  const age = clampNumber($("#nutri-age")?.value || profile.age, 12, 90, 35);
  const sex = $("#nutri-sex")?.value || profile.sex || "male";
  
  let activityVal = 1.55;
  if ($("#nutri-activity")?.value) {
    activityVal = Number($("#nutri-activity").value);
  } else if (profile.activityLevel) {
    const act = String(profile.activityLevel).toLowerCase();
    if (act.includes("sedentario") || act.includes("poco")) activityVal = 1.2;
    else if (act.includes("ligero") || act.includes("1-3")) activityVal = 1.375;
    else if (act.includes("moderado") || act.includes("3-5")) activityVal = 1.55;
    else if (act.includes("intenso") || act.includes("6-7")) activityVal = 1.725;
    else if (act.includes("muy") || act.includes("atletas")) activityVal = 1.9;
  }
  const activity = clampNumber(activityVal, 1.2, 1.9, 1.55);

  let goal = goalOverride || $("#nutri-goal")?.value;
  if (!goal) {
    const g = String(profile.goal || "").toLowerCase();
    if (g.includes("fat") || g.includes("perder") || g.includes("defin")) goal = "cut";
    else if (g.includes("hyper") || g.includes("ganar") || g.includes("volumen")) goal = "bulk";
    else goal = "maintain";
  }
  
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
    ["Kcal", totals.kcal, targets.kcal, "kcal", "kcal", "#ccff00"],
    ["Proteína", totals.protein, targets.protein, "g", "proteina", "#ff3366"],
    ["Carbos", totals.carbs, targets.carbs, "g", "carbos", "#00f0ff"],
    ["Grasas", totals.fat, targets.fat, "g", "grasas", "#ffb703"],
    ["Agua", 0, targets.water.liters, " L", "agua", "#00a8ff"],
  ]
    .map(([label, value, target, unit = "", classLabel = "", color = ""]) => {
      const displayValue = label === "Agua" ? targets.water.liters : value;
      const pct = label === "Agua" ? 100 : Math.min(100, Math.round((Number(value) / Number(target)) * 100) || 0);
      return `
        <div class="macro-ring-card ${classLabel}">
          <div class="ring-container">
            <svg class="macro-svg-ring" viewBox="0 0 36 36">
              <path class="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path class="ring-fill" stroke-dasharray="${pct}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div class="ring-text">
              <strong>${pct}%</strong>
            </div>
          </div>
          <div class="macro-details">
            <span class="macro-label">${label}</span>
            <span class="macro-values"><strong>${displayValue}${unit}</strong> / ${target}${unit}</span>
          </div>
        </div>
      `;
    })
    .join("");

  $("#daily-summary").innerHTML = `
    <div><span>Consumido</span><strong>${totals.kcal} kcal</strong></div>
    <div><span>Restante</span><strong>${Math.max(0, targets.kcal - totals.kcal)} kcal</strong></div>
    <div><span>Proteína</span><strong>${totals.protein} / ${targets.protein} g</strong></div>
    <div><span>Agua IA</span><strong>${targets.water.liters} L/día</strong></div>
    <div><span>Gasto total</span><strong>${targets.tdee} kcal</strong></div>
  `;

  // Update Calorie Balance Bar
  const remaining = targets.kcal - totals.kcal;
  const balancePct = Math.min(100, Math.round((totals.kcal / targets.kcal) * 100) || 0);
  
  const balanceBarFill = $("#balance-bar-fill");
  const balanceConsumed = $("#balance-consumed");
  const balanceRemaining = $("#balance-remaining");
  const balanceTarget = $("#balance-target");
  const warningMsg = $("#balance-warning-msg");
  
  if (balanceBarFill) balanceBarFill.style.width = `${balancePct}%`;
  if (balanceConsumed) balanceConsumed.textContent = `${totals.kcal} kcal`;
  if (balanceTarget) balanceTarget.textContent = `${targets.kcal} kcal`;
  
  if (remaining < 0) {
    if (balanceRemaining) balanceRemaining.innerHTML = `<span style="color:#ff3366">${Math.abs(remaining)} kcal extra</span>`;
    if (warningMsg) {
      warningMsg.textContent = "⚠️ ¡Has superado tu objetivo calórico de hoy!";
      warningMsg.style.color = "#ff3366";
    }
    if (balanceBarFill) {
      balanceBarFill.style.backgroundColor = "#ff3366";
      balanceBarFill.style.boxShadow = "0 0 10px #ff3366";
    }
  } else {
    if (balanceRemaining) balanceRemaining.textContent = `${remaining} kcal`;
    if (warningMsg) warningMsg.textContent = "";
    if (balanceBarFill) {
      balanceBarFill.style.backgroundColor = "#ccff00";
      balanceBarFill.style.boxShadow = "0 0 10px #ccff00";
    }
  }

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
    : `<p class="subtle">Aún no hay comidas registradas hoy.</p>`;
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
  
  // Saludo dinámico y consejos en welcome banner
  const welcomeTitle = $("#welcome-title");
  const welcomeCoachTip = $("#welcome-coach-tip");
  if (welcomeTitle && welcomeCoachTip) {
    const hours = new Date().getHours();
    let greeting = "¡Buenos días";
    if (hours >= 12 && hours < 20) greeting = "¡Buenas tardes";
    else if (hours >= 20 || hours < 6) greeting = "¡Buenas noches";
    
    const userName = profile.name || "Atleta";
    welcomeTitle.textContent = `${greeting}, ${userName}! 👋`;
    
    const tips = [
      "La constancia vence al talento. ¡Mantén tu racha activa hoy!",
      "Prioriza la técnica antes de subir el peso. La calidad construye fuerza real.",
      "El descanso y la nutrición son el 50% de tus ganancias. No los descuides.",
      "Tu único rival es la persona que fuiste ayer. ¡A entrenar con foco y determinación!",
      "Sincroniza tus datos de Salud periódicamente para afinar las recomendaciones de la IA.",
      "El agua lubrica tus articulaciones y mejora el rendimiento. Bebe al menos 2.5 litros.",
      "Un entrenamiento de 20 minutos es 100% mejor que uno que no se hace."
    ];
    const tipIndex = new Date().getDate() % tips.length;
    welcomeCoachTip.textContent = tips[tipIndex];
  }

  const recoveryVal = estimateRecovery();
  const volumeKg = history.length ? estimateHistoryVolume(history) : 0;
  const bestOrmVal = history.length ? estimateBestOrm(history) : 0;

  $("#weekly-workouts").textContent = `${history.length}`;
  $("#recovery-score").textContent = `${recoveryVal}%`;
  $("#weekly-volume").textContent = volumeKg ? `${volumeKg.toLocaleString("es-ES")} kg` : "0 kg";
  $("#best-orm").textContent = bestOrmVal ? `${bestOrmVal} kg` : "Sin datos";
  $("#side-streak").textContent = `${history.length ? Math.min(history.length, 8) : 0} días`;

  // Actualizar micro-barras de progreso
  const volBar = $("#vol-bar-fill");
  const ormBar = $("#orm-bar-fill");
  const workBar = $("#work-bar-fill");
  const recBar = $("#rec-bar-fill");
  
  if (volBar) volBar.style.width = `${Math.min(100, Math.round((volumeKg / 15000) * 100))}%`;
  if (ormBar) ormBar.style.width = `${Math.min(100, Math.round((bestOrmVal / (Number(profile.weight || 75) * 1.5)) * 100))}%`;
  if (workBar) workBar.style.width = `${Math.min(100, Math.round((history.length / 4) * 100))}%`;
  if (recBar) recBar.style.width = `${recoveryVal}%`;
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
  renderFeed();
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
  generateWeeklyRoutinePlan();
  saveAppData();
  await pushApi("/api/profile", appData.profile);
  await pushApi("/api/onboarding", appData.profile);
  await pushApi("/api/routines", weeklyRoutinePlan).catch(() => {});
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

function openAddRoutineExerciseDialog(blockIndex) {
  let dialog = $("#add-routine-exercise-dialog");
  if (!dialog) {
    document.body.insertAdjacentHTML("beforeend", `
      <dialog id="add-routine-exercise-dialog" style="border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); padding: 24px; max-width: 400px; box-shadow: var(--shadow-lg); width: 90%;">
        <h3 style="margin-top: 0; margin-bottom: 16px; font-family: 'Outfit', sans-serif;">Añadir ejercicio</h3>
        <label style="display: block; margin-bottom: 20px;">
          Selecciona el ejercicio:
          <select id="routine-add-select" style="width: 100%; padding: 10px; margin-top: 8px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface-strong); color: var(--ink);">
            ${exercises.map(e => `<option value="${escapeHtml(e.name)}">${escapeHtml(e.name)} (${e.muscle})</option>`).join("")}
          </select>
        </label>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="ghost-button" id="routine-add-cancel">Cancelar</button>
          <button class="primary-button" id="routine-add-confirm">Añadir</button>
        </div>
      </dialog>
    `);
    dialog = $("#add-routine-exercise-dialog");
    $("#routine-add-cancel").addEventListener("click", () => dialog.close());
  }
  
  const confirmBtn = $("#routine-add-confirm");
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
  
  newConfirmBtn.addEventListener("click", () => {
    const select = $("#routine-add-select");
    const name = select.value;
    if (name) {
      const day = weeklyRoutinePlan[appData.selectedWeekDay] || weeklyRoutinePlan[0];
      day.blocks[blockIndex].exercises.push(name);
      saveAppData();
      pushApi("/api/routines", weeklyRoutinePlan).catch(() => {});
      renderRoutineDayDetail();
      showToast(`Ejercicio "${name}" añadido.`);
    }
    dialog.close();
  });
  
  dialog.showModal();
}

function openEditRoutineMetaDialog() {
  let dialog = $("#edit-routine-meta-dialog");
  const day = weeklyRoutinePlan[appData.selectedWeekDay] || weeklyRoutinePlan[0];
  
  if (!dialog) {
    document.body.insertAdjacentHTML("beforeend", `
      <dialog id="edit-routine-meta-dialog" style="border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); color: var(--ink); padding: 24px; max-width: 400px; box-shadow: var(--shadow-lg); width: 90%;">
        <h3 style="margin-top: 0; margin-bottom: 16px; font-family: 'Outfit', sans-serif;">Editar detalles del día</h3>
        <label style="display: block; margin-bottom: 12px;">
          Título de la rutina:
          <input id="routine-meta-title" type="text" style="width: 100%; padding: 10px; margin-top: 6px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface-strong); color: var(--ink);" />
        </label>
        <label style="display: block; margin-bottom: 12px;">
          Duración estimada:
          <input id="routine-meta-duration" type="text" placeholder="Ej. 45 min" style="width: 100%; padding: 10px; margin-top: 6px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface-strong); color: var(--ink);" />
        </label>
        <label style="display: block; margin-bottom: 20px;">
          Dificultad:
          <select id="routine-meta-difficulty" style="width: 100%; padding: 10px; margin-top: 6px; border: 1px solid var(--line); border-radius: 6px; background: var(--surface-strong); color: var(--ink);">
            <option>Fácil</option>
            <option>Media</option>
            <option>Avanzada</option>
          </select>
        </label>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="ghost-button" id="routine-meta-cancel">Cancelar</button>
          <button class="primary-button" id="routine-meta-confirm">Guardar</button>
        </div>
      </dialog>
    `);
    dialog = $("#edit-routine-meta-dialog");
    $("#routine-meta-cancel").addEventListener("click", () => dialog.close());
  }
  
  $("#routine-meta-title").value = day.title;
  $("#routine-meta-duration").value = day.duration;
  $("#routine-meta-difficulty").value = day.difficulty;

  const confirmBtn = $("#routine-meta-confirm");
  const newConfirmBtn = confirmBtn.cloneNode(true);
  confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

  newConfirmBtn.addEventListener("click", () => {
    const titleVal = $("#routine-meta-title").value.trim();
    const durationVal = $("#routine-meta-duration").value.trim() || "45 min";
    const difficultyVal = $("#routine-meta-difficulty").value;
    
    if (titleVal) {
      day.title = titleVal;
      day.duration = durationVal;
      day.difficulty = difficultyVal;
      saveAppData();
      pushApi("/api/routines", weeklyRoutinePlan).catch(() => {});
      renderWeeklyRoutineBoard();
      showToast("Detalles de rutina actualizados.");
    }
    dialog.close();
  });

  dialog.showModal();
}

function renderRoutineDayDetail() {
  const day = weeklyRoutinePlan[appData.selectedWeekDay] || weeklyRoutinePlan[0];
  if (!$("#routine-day-detail")) return;
  
  $("#routine-detail-title").innerHTML = `${escapeHtml(day.day)}: ${escapeHtml(day.title)} <button class="icon-button" id="edit-routine-meta-btn" title="Editar detalles" style="display: inline-flex; vertical-align: middle; margin-left: 8px; padding: 4px; color: var(--accent); background: none; border: none; cursor: pointer;" aria-label="Editar detalles del día"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></button>`;
  $("#routine-detail-subtitle").textContent = `${day.duration} · ${day.difficulty} · ${day.muscles.join(", ")}`;
  const allExercises = day.blocks.flatMap((block) => block.exercises);
  
  $("#routine-day-detail").innerHTML = `
    <div class="routine-day-summary">
      <div><span>Estado</span><strong>${day.status}</strong></div>
      <div><span>Ejercicios</span><strong>${allExercises.length}</strong></div>
      <div><span>Volumen estimado</span><strong>${allExercises.length * 9} series</strong></div>
      <div><span>Progresión</span><strong>+1 rep o +2,5 kg</strong></div>
    </div>
    <div class="routine-detail-blocks">
      ${day.blocks
        .map((block, blockIndex) => `
          <section class="routine-detail-block" style="border-bottom: 1px solid var(--line); padding-bottom: 16px; margin-bottom: 16px;">
            <h4 style="margin-bottom: 12px; color: var(--accent); font-family: 'Outfit', sans-serif;">Bloque ${blockIndex + 1}: ${escapeHtml(block.name)}</h4>
            ${block.exercises.length === 0 ? `<p class="subtle" style="font-size: 0.9rem; margin-bottom: 12px;">No hay ejercicios en este bloque.</p>` : ""}
            ${block.exercises
              .map((name, exerciseIndex) => {
                const exercise = exercises.find((item) => normalizeText(name).includes(normalizeText(item.name))) || exercises[(blockIndex + exerciseIndex) % exercises.length];
                return `
                  <article class="routine-detail-exercise" style="display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${posterSrc(exercise, 1)}" alt="Imagen de ${escapeHtml(exercise.name)}" style="width: 48px; height: 48px; border-radius: 6px; object-fit: cover; border: 1px solid var(--line);">
                      <div>
                        <strong>${escapeHtml(exercise.name)}</strong>
                        <br>
                        <small class="subtle">${escapeHtml(exercise.muscle)} · ${escapeHtml(exercise.equipment)}</small>
                      </div>
                    </div>
                    <div class="routine-prescription" style="display: flex; align-items: center; gap: 12px;">
                      <span>3 series</span>
                      <span>${exerciseIndex === 0 && blockIndex === 1 ? "6-8 reps" : "10-12 reps"}</span>
                      <span>RPE ${exerciseIndex === 0 ? "8" : "7"}</span>
                      <button class="icon-button delete-routine-exercise" data-block-index="${blockIndex}" data-exercise-index="${exerciseIndex}" title="Eliminar ejercicio" style="color: #ff3366; background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 4px;" aria-label="Eliminar ejercicio">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
                      </button>
                    </div>
                  </article>
                `;
              })
              .join("")}
            <div style="margin-top: 12px; display: flex; justify-content: flex-start;">
              <button class="ghost-button add-routine-exercise-btn" data-block-index="${blockIndex}" style="padding: 6px 12px; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; border: 1px dashed var(--line); border-radius: 6px; cursor: pointer; background: none; color: var(--ink);">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Añadir ejercicio
              </button>
            </div>
          </section>
        `)
        .join("")}
    </div>
    <div class="coach-note" style="margin-top: 16px;">Coach IA: si duermes mal o Salud marca baja recuperación, baja 1 serie en accesorios. Si una máquina está ocupada, usa la sustitución del día.</div>
  `;

  // Attach event listeners
  $("#edit-routine-meta-btn")?.addEventListener("click", openEditRoutineMetaDialog);

  $("#routine-day-detail").querySelectorAll(".delete-routine-exercise").forEach(btn => {
    btn.addEventListener("click", () => {
      const blockIndex = Number(btn.dataset.blockIndex);
      const exerciseIndex = Number(btn.dataset.exerciseIndex);
      const day = weeklyRoutinePlan[appData.selectedWeekDay] || weeklyRoutinePlan[0];
      const removed = day.blocks[blockIndex].exercises.splice(exerciseIndex, 1)[0];
      saveAppData();
      pushApi("/api/routines", weeklyRoutinePlan).catch(() => {});
      renderRoutineDayDetail();
      renderWeeklyRoutineBoard(); // Refresh summary board
      showToast(`Ejercicio "${removed}" eliminado.`);
    });
  });

  $("#routine-day-detail").querySelectorAll(".add-routine-exercise-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const blockIndex = Number(btn.dataset.blockIndex);
      openAddRoutineExerciseDialog(blockIndex);
    });
  });
}

function selectWeekDay(index) {
  appData.selectedWeekDay = Number(index);
  saveAppData();
  renderWeeklyRoutineBoard();
}

function openExercise(id) {
  const exercise = findExercise(id);
  state.selectedExercise = exercise;
  renderCues();
  
  const hasExerciseGif = !!exerciseGifs[exercise.id];
  const hasMotion = hasExerciseGif || !!exercise.gifUrl;
  if (!hasMotion) {
    startDialogAnimation();
  } else {
    stopDialogAnimation();
  }
  $("#exercise-dialog").showModal();
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
  const isBack = side === "back";
  
  function canonicalizeMuscle(name) {
    if (!name) return "";
    const n = name.toLowerCase().trim();
    if (n === "pecho") return "pecho";
    if (n === "biceps" || n === "bíceps") return "biceps";
    if (n === "triceps" || n === "tríceps") return "triceps";
    if (n === "espalda") return "espalda";
    if (n === "hombros" || n === "hombro") return "hombros";
    if (n === "abdominales" || n === "core") return "abdominales";
    if (n === "cuádriceps" || n === "cuadriceps" || n === "pierna") return "cuadriceps";
    if (n === "isquiotibiales" || n === "femoral") return "isquiotibiales";
    if (n === "glúteos" || n === "gluteos" || n === "glúteo" || n === "gluteo") return "gluteos";
    if (n === "gemelos" || n === "gemelo") return "gemelos";
    return n;
  }
  
  const muscleCanonical = canonicalizeMuscle(muscle);
  
  const styleFor = (muscleNames) => {
    const isActive = muscleNames.some(m => canonicalizeMuscle(m) === muscleCanonical);
    if (isActive) {
      return 'fill="url(#active-grad)" filter="url(#neon-glow)" stroke="#ccff00" stroke-width="1.5"';
    }
    return 'fill="#1b1e25" stroke="#2c303b" stroke-width="1"';
  };

  const svg = !isBack ? `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="420" viewBox="0 0 360 420">
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0b0c10"/>
          <stop offset="100%" stop-color="#151821"/>
        </linearGradient>
        <linearGradient id="active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ccff00"/>
          <stop offset="100%" stop-color="#10b981"/>
        </linearGradient>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComponentTransfer in="blur" result="glow1">
            <feFuncA type="linear" slope="0.8"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="360" height="420" rx="24" fill="url(#bg-grad)" stroke="#232731" stroke-width="1.5"/>
      <circle cx="180" cy="180" r="140" fill="none" stroke="#232731" stroke-width="1" stroke-dasharray="3,6"/>
      <circle cx="180" cy="180" r="90" fill="none" stroke="#232731" stroke-width="0.8" stroke-dasharray="3,6"/>
      <line x1="180" y1="20" x2="180" y2="350" stroke="#232731" stroke-width="1" stroke-dasharray="2,4"/>
      <line x1="30" y1="180" x2="330" y2="180" stroke="#232731" stroke-width="1" stroke-dasharray="2,4"/>
      <g>
        <path d="M168,52 C168,36 192,36 192,52 C192,67 186,75 180,82 C174,75 168,67 168,52 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M172,82 L172,92 H188 V82 Z" fill="#15181e" stroke="#2c303b" stroke-width="1"/>
        <path d="M172,88 C160,94 146,100 135,108 C145,110 158,106 172,98 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M188,88 C200,94 214,100 225,108 C215,110 202,106 188,98 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M135,108 C122,114 116,130 116,146 C116,154 122,154 126,148 C132,138 136,124 135,108 Z" ${styleFor(["Hombros", "Hombro"])}/>
        <path d="M225,108 C238,114 244,130 244,146 C244,154 238,154 234,148 C228,138 224,124 225,108 Z" ${styleFor(["Hombros", "Hombro"])}/>
        <path d="M178,108 L138,110 C136,110 134,124 134,142 C134,152 144,156 178,156 Z" ${styleFor(["Pecho"])}/>
        <path d="M182,108 L222,110 C224,110 226,124 226,142 C226,152 216,156 182,156 Z" ${styleFor(["Pecho"])}/>
        <path d="M116,146 C108,158 104,180 108,198 C114,198 120,192 122,180 C124,168 126,154 126,148 Z" ${styleFor(["Bíceps", "Bicep"])}/>
        <path d="M244,146 C252,158 256,180 252,198 C246,198 240,192 238,180 C236,168 234,154 234,148 Z" ${styleFor(["Bíceps", "Bicep"])}/>
        <path d="M108,198 C102,216 96,248 102,274 L114,266 C118,246 120,220 122,200 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M252,198 C258,216 264,248 258,274 L246,266 C242,246 240,220 238,200 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M102,274 L98,290 L106,290 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M258,274 L262,290 L254,290 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M156,160 H178 V174 H156 Z M182,160 H204 V174 H182 Z M154,178 H178 V192 H154 Z M182,178 H206 V192 H182 Z M154,196 H178 V210 H154 Z M182,196 H206 V210 H182 Z M156,214 H178 V228 H156 Z M182,214 H204 V228 H182 Z" ${styleFor(["Abdominales", "Core"])}/>
        <path d="M134,156 C136,180 140,204 150,228 C146,204 142,180 138,156 Z" ${styleFor(["Abdominales", "Core"])}/>
        <path d="M226,156 C224,180 220,204 210,228 C214,204 218,180 222,156 Z" ${styleFor(["Abdominales", "Core"])}/>
        <path d="M148,232 C138,260 135,300 148,332 C152,336 158,336 160,332 C164,308 170,268 178,232 Z" ${styleFor(["Cuádriceps", "Pierna"])}/>
        <path d="M212,232 C222,260 225,300 212,332 C208,336 202,336 200,332 C196,308 190,268 182,232 Z" ${styleFor(["Cuádriceps", "Pierna"])}/>
        <path d="M178,232 C170,268 164,308 160,332 L168,330 C172,308 176,268 180,232 Z" ${styleFor(["Cuádriceps", "Pierna"])}/>
        <path d="M182,232 C190,268 196,308 200,332 L192,330 C188,308 184,268 180,232 Z" ${styleFor(["Cuádriceps", "Pierna"])}/>
        <path d="M148,336 C144,352 142,372 150,392 L156,392 C158,372 158,352 160,336 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M212,336 C216,352 218,372 210,392 L204,392 C202,372 202,352 200,336 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M150,392 L144,406 H158 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M210,392 L216,406 H202 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
      </g>
      <rect x="80" y="356" width="200" height="42" rx="10" fill="#000000" fill-opacity="0.6" stroke="#232731" stroke-width="1"/>
      <text x="180" y="375" text-anchor="middle" font-family="'Outfit', 'Inter', sans-serif" font-size="14" font-weight="700" fill="#ffffff" letter-spacing="1.5">${escapeSvg(muscle).toUpperCase()}</text>
      <text x="180" y="389" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#8890a6" letter-spacing="1">VISTA FRONTAL</text>
    </svg>` : `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="420" viewBox="0 0 360 420">
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0b0c10"/>
          <stop offset="100%" stop-color="#151821"/>
        </linearGradient>
        <linearGradient id="active-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ccff00"/>
          <stop offset="100%" stop-color="#10b981"/>
        </linearGradient>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComponentTransfer in="blur" result="glow1">
            <feFuncA type="linear" slope="0.8"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="glow1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="360" height="420" rx="24" fill="url(#bg-grad)" stroke="#232731" stroke-width="1.5"/>
      <circle cx="180" cy="180" r="140" fill="none" stroke="#232731" stroke-width="1" stroke-dasharray="3,6"/>
      <circle cx="180" cy="180" r="90" fill="none" stroke="#232731" stroke-width="0.8" stroke-dasharray="3,6"/>
      <line x1="180" y1="20" x2="180" y2="350" stroke="#232731" stroke-width="1" stroke-dasharray="2,4"/>
      <line x1="30" y1="180" x2="330" y2="180" stroke="#232731" stroke-width="1" stroke-dasharray="2,4"/>
      <g>
        <path d="M168,52 C168,36 192,36 192,52 C192,67 186,75 180,82 C174,75 168,67 168,52 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M172,82 L172,92 H188 V82 Z" fill="#15181e" stroke="#2c303b" stroke-width="1"/>
        <path d="M180,82 L172,92 C158,104 148,110 135,116 C155,123 170,128 180,136 C190,128 205,123 225,116 C212,110 202,104 188,92 Z" ${styleFor(["Espalda"])}/>
        <path d="M135,116 C124,121 118,136 120,150 L130,146 C134,136 134,126 135,116 Z" ${styleFor(["Hombros", "Hombro"])}/>
        <path d="M225,116 C236,121 242,136 240,150 L230,146 C226,136 226,126 225,116 Z" ${styleFor(["Hombros", "Hombro"])}/>
        <path d="M120,150 C112,162 108,182 112,198 C118,198 124,192 126,180 C128,168 130,154 130,146 Z" ${styleFor(["Tríceps", "Tricep"])}/>
        <path d="M240,150 C248,162 252,182 248,198 C242,198 236,192 234,180 C232,168 230,154 230,146 Z" ${styleFor(["Tríceps", "Tricep"])}/>
        <path d="M112,198 C106,216 100,248 106,274 L118,266 C122,246 124,220 126,200 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M248,198 C254,216 260,248 254,274 L242,266 C238,246 236,220 234,200 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M106,274 L102,290 L110,290 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M254,274 L258,290 L250,290 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M180,136 C165,136 142,140 130,146 L136,172 C142,182 152,192 180,202 Z" ${styleFor(["Espalda"])}/>
        <path d="M180,136 C195,136 218,140 230,146 L224,172 C218,182 208,192 180,202 Z" ${styleFor(["Espalda"])}/>
        <path d="M180,202 L154,202 C158,214 162,222 180,228 Z" ${styleFor(["Espalda"])}/>
        <path d="M180,202 L206,202 C202,214 198,222 180,228 Z" ${styleFor(["Espalda"])}/>
        <path d="M180,228 C154,228 142,238 142,260 C142,278 158,288 180,282 Z" ${styleFor(["Glúteos", "Glúteo"])}/>
        <path d="M180,228 C206,228 218,238 218,260 C218,278 202,288 180,282 Z" ${styleFor(["Glúteos", "Glúteo"])}/>
        <path d="M142,284 C138,300 135,330 148,354 C150,358 158,358 160,354 C164,335 168,310 178,283 Z" ${styleFor(["Isquiotibiales", "Femoral"])}/>
        <path d="M218,284 C222,300 225,330 212,354 C210,358 202,358 200,354 C196,335 190,310 182,283 Z" ${styleFor(["Isquiotibiales", "Femoral"])}/>
        <path d="M178,283 C170,310 164,335 160,354 H166 C170,335 174,310 178,283 Z" ${styleFor(["Isquiotibiales", "Femoral"])}/>
        <path d="M182,283 C190,310 196,335 200,354 H194 C190,335 186,310 182,283 Z" ${styleFor(["Isquiotibiales", "Femoral"])}/>
        <path d="M148,358 C138,370 136,388 146,402 H152 C158,388 158,370 160,358 Z" ${styleFor(["Gemelos", "Gemelo"])}/>
        <path d="M212,358 C222,370 224,388 214,402 H208 C202,388 202,370 200,358 Z" ${styleFor(["Gemelos", "Gemelo"])}/>
        <path d="M152,402 L150,410 H156 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
        <path d="M208,402 L210,410 H204 Z" fill="#1b1e25" stroke="#2c303b" stroke-width="1"/>
      </g>
      <rect x="80" y="356" width="200" height="42" rx="10" fill="#000000" fill-opacity="0.6" stroke="#232731" stroke-width="1"/>
      <text x="180" y="375" text-anchor="middle" font-family="'Outfit', 'Inter', sans-serif" font-size="14" font-weight="700" fill="#ffffff" letter-spacing="1.5">${escapeSvg(muscle).toUpperCase()}</text>
      <text x="180" y="389" text-anchor="middle" font-family="'Inter', sans-serif" font-size="9" font-weight="600" fill="#8890a6" letter-spacing="1">VISTA POSTERIOR</text>
    </svg>`;
    
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function addExerciseToWorkout(id) {
  const historicalSets = getLastSessionSets(id);
  state.activeWorkout.exercises.push({
    id,
    sets: historicalSets || [{ weight: 20, reps: 10, rpe: 7, type: "Normal", done: false }],
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

function openHealthDialog(type) {
  const dialog = $("#health-connection-dialog");
  const title = $("#health-dialog-title");
  const body = $("#health-dialog-body");
  
  if (!dialog || !title || !body) return;
  
  if (type === "apple") {
    title.textContent = "Conectar Apple Health (Atajos de iOS)";
    body.innerHTML = `
      <p>Debido a las políticas de seguridad de Apple, una aplicación web (PWA) no puede acceder directamente a <strong>HealthKit</strong> en segundo plano sin una envoltura nativa de App Store.</p>
      <p>Sin embargo, ¡tenemos una solución perfecta! Puedes conectar tus datos usando los <strong>Atajos de iOS (Shortcuts)</strong>:</p>
      <ol style="margin-left: 20px; margin-top: 10px; display: grid; gap: 8px; font-size: 13px;">
        <li>Crea un atajo en tu iPhone que lea tus pasos, sueño y frecuencia cardíaca del día de Apple Health.</li>
        <li>Configura una acción de "Obtener contenido de URL" para enviar esos datos a LiftLab vía Webhook a nuestro backend local.</li>
        <li>Configura una automatización diaria (ej: 23:00) para ejecutar el atajo de forma 100% silenciosa y automática.</li>
      </ol>
      <p style="margin-top: 15px; font-weight: bold; color: var(--accent);">¿Quieres simular la conexión para probar la aplicación hoy?</p>
    `;
  } else {
    title.textContent = "Conectar Google Fit (OAuth 2.0)";
    body.innerHTML = `
      <p>Para conectar tu cuenta de <strong>Google Fit</strong> o <strong>Health Connect</strong>, utilizamos la API de consentimiento seguro de Google (OAuth 2.0).</p>
      <p>Al hacer clic, se abrirá la pantalla oficial de Google para que nos concedas permisos de lectura para:</p>
      <ul style="margin-left: 20px; margin-top: 10px; display: grid; gap: 6px; font-size: 13px;">
        <li>Actividad física (pasos y minutos activos).</li>
        <li>Sueño (horas y calidad).</li>
        <li>Ritmo cardíaco y HRV.</li>
      </ul>
      <p style="margin-top: 15px; font-weight: bold; color: var(--accent);">¿Quieres iniciar el flujo de vinculación y sincronizar tus datos reales ahora?</p>
    `;
  }
  
  dialog.showModal();
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

async function loginWithGoogle() {
  setAuthUiState(true);
  try {
    await detectApi();
    if (!firebaseOnline || !firebaseBackend?.signinWithGoogle) {
      showToast("Inicio con Google solo disponible con Firebase activo.");
      setAuthUiState(false);
      return;
    }
    const session = await firebaseBackend.signinWithGoogle();
    apiToken = session.token;
    localStorage.setItem("liftlab-api-token", apiToken);
    appData.account = { email: session.user.email, id: session.user.id, mode: "firebase" };
    saveAppData();
    await loadApiUserData();
    showToast(`¡Bienvenido, ${appData.profile.name || session.user.email}!`);
    renderAuthStatus();
    setAuthUiState(false);
    setView("dashboard");
  } catch (error) {
    const msg = error.code === "auth/popup-closed-by-user" ? "Ventana cerrada. Intenta de nuevo." : (error.code === "auth/popup-blocked" ? "Popups bloqueados. Permite popups en el navegador." : authErrorMessage(error));
    showToast(msg);
    setAuthUiState(false);
  }
}

async function loginWithApple() {
  setAuthUiState(true);
  try {
    await detectApi();
    if (!firebaseOnline || !firebaseBackend?.signinWithApple) {
      showToast("Inicio con Apple solo disponible con Firebase activo.");
      setAuthUiState(false);
      return;
    }
    const session = await firebaseBackend.signinWithApple();
    apiToken = session.token;
    localStorage.setItem("liftlab-api-token", apiToken);
    appData.account = { email: session.user.email, id: session.user.id, mode: "firebase" };
    saveAppData();
    await loadApiUserData();
    showToast(`¡Bienvenido con Apple ID!`);
    renderAuthStatus();
    setAuthUiState(false);
    setView("dashboard");
  } catch (error) {
    const msg = error.code === "auth/popup-closed-by-user" ? "Ventana cerrada. Intenta de nuevo." : (error.code === "auth/popup-blocked" ? "Popups bloqueados. Permite popups en el navegador." : authErrorMessage(error));
    showToast(msg);
    setAuthUiState(false);
  }
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
  const runSafe = (name, fn) => {
    try {
      fn();
    } catch (e) {
      console.error(`Error during render ${name}:`, e);
    }
  };
  runSafe("renderProfileInputs", renderProfileInputs);
  runSafe("renderAuthStatus", renderAuthStatus);
  runSafe("renderHealthInputs", renderHealthInputs);
  runSafe("renderDashboardData", renderDashboardData);
  runSafe("renderWeekPlan", renderWeekPlan);
  runSafe("renderHabits", renderHabits);
  runSafe("renderPhotoFoodResults", renderPhotoFoodResults);
  runSafe("renderCommunity", renderCommunity);
  runSafe("renderMeasures", renderMeasures);
  runSafe("renderWeeklyRoutineBoard", renderWeeklyRoutineBoard);
  runSafe("renderWorkoutLog", renderWorkoutLog);
  runSafe("renderNutrition", renderNutrition);
  runSafe("renderMilestones", renderMilestones);
}

function playBeep(frequency = 880, duration = 0.3) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.03);
    gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.warn("Audio Context block or unsupported:", err);
  }
}

function playTimerFinishedSound() {
  playBeep(880, 0.15);
  setTimeout(() => playBeep(880, 0.25), 250);
}

function startTimer(seconds = 90) {
  clearInterval(state.timer.handle);
  state.timer.total = seconds;
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
      playTimerFinishedSound();
    }
  }, 1000);
}

function updateTimerText() {
  const minutes = String(Math.max(0, Math.floor(state.timer.remaining / 60))).padStart(2, "0");
  const seconds = String(Math.max(0, state.timer.remaining % 60)).padStart(2, "0");
  const restTimer = $("#rest-timer");
  if (restTimer) restTimer.textContent = `${minutes}:${seconds}`;
  
  const total = state.timer.total || 90;
  const pct = Math.max(0, Math.min(100, (state.timer.remaining / total) * 100));
  const fillCircle = $("#timer-fill-circle");
  if (fillCircle) {
    fillCircle.style.strokeDasharray = `${pct} 100`;
  }
}

function bindEvents() {
  $$(".nav-item, .mobile-tab").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  $$("[data-view-shortcut]").forEach((button) => button.addEventListener("click", () => {
    const target = button.dataset.viewShortcut;
    if (target === "workout") {
      // Load today's plan before switching to workout view
      const today = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"][new Date().getDay()];
      const dayIndex = weeklyRoutinePlan.findIndex((d) => d.day === today);
      const planDay = weeklyRoutinePlan[dayIndex >= 0 ? dayIndex : (appData.selectedWeekDay || 0)];
      if (planDay && planDay.status !== "Recuperación") {
        state.activeWorkout = createWorkoutFromWeekDay(planDay);
        saveWorkout();
        renderWorkoutLog();
      }
    }
    setView(target);
  }));
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

    const techniqueButton = event.target.closest("[data-technique-exercise]");
    if (techniqueButton) {
      state.selectedExercise = findExercise(techniqueButton.dataset.techniqueExercise);
      renderCues();
      showToast(`${state.selectedExercise.name}: guía cargada.`);
    }

    const addSetButton = event.target.closest("[data-add-set]");
    if (addSetButton) {
      const index = Number(addSetButton.dataset.addSet);
      const exercise = state.activeWorkout.exercises[index];
      const lastSet = exercise.sets[exercise.sets.length - 1];
      const newSet = lastSet
        ? { weight: lastSet.weight, reps: lastSet.reps, rpe: lastSet.rpe, type: lastSet.type, done: false }
        : { weight: 20, reps: 10, rpe: 7, type: "Normal", done: false };
      exercise.sets.push(newSet);
      saveWorkout();
      renderWorkoutLog();
    }

    const removeSetButton = event.target.closest("[data-remove-set]");
    if (removeSetButton) {
      const row = removeSetButton.closest(".set-row");
      const exerciseNode = removeSetButton.closest(".log-exercise");
      if (row && exerciseNode) {
        const exerciseIndex = Number(exerciseNode.dataset.exerciseIndex);
        const setIndex = Number(row.dataset.setIndex);
        state.activeWorkout.exercises[exerciseIndex].sets.splice(setIndex, 1);
        saveWorkout();
        renderWorkoutLog();
        showToast("Serie eliminada.");
      }
    }

    const swapWorkoutExerciseButton = event.target.closest("[data-swap-workout-exercise]");
    if (swapWorkoutExerciseButton) {
      openSwapWorkoutExerciseDialog(Number(swapWorkoutExerciseButton.dataset.swapWorkoutExercise));
    }

    const removeExerciseButton = event.target.closest("[data-remove-exercise]");
    if (removeExerciseButton) {
      const exerciseIndex = Number(removeExerciseButton.dataset.removeExercise);
      state.activeWorkout.exercises.splice(exerciseIndex, 1);
      saveWorkout();
      renderWorkoutLog();
      showToast("Ejercicio eliminado del entreno.");
    }
  });

  $("#exercise-log")?.addEventListener("input", (event) => {
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

  $("#exercise-log")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-check-set]");
    if (button) {
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
      return;
    }

    const adjustBtn = event.target.closest("[data-adjust-set-val]");
    if (adjustBtn) {
      const row = adjustBtn.closest(".set-row");
      const exerciseNode = adjustBtn.closest(".log-exercise");
      if (!row || !exerciseNode) return;
      const exerciseIndex = Number(exerciseNode.dataset.exerciseIndex);
      const setIndex = Number(row.dataset.setIndex);
      const delta = Number(adjustBtn.dataset.adjustSetVal);
      const field = adjustBtn.dataset.field;
      const set = state.activeWorkout.exercises[exerciseIndex].sets[setIndex];
      let val = Number(set[field]) || 0;
      val += delta;
      if (field === "reps" && val < 1) val = 1;
      if (field === "weight" && val < 0) val = 0;
      set[field] = val;
      saveWorkout();
      const input = row.querySelector(`input[data-field="${field}"]`);
      if (input) {
        input.value = val;
      }
      return;
    }
  });

  $("#timer-btn")?.addEventListener("click", () => {
    if (state.timer.running) {
      clearInterval(state.timer.handle);
      state.timer.running = false;
      state.timer.remaining = 0;
      updateTimerText();
      showToast("Temporizador detenido.");
      return;
    }
    const val = prompt("¿Cuántos segundos quieres descansar?", "90");
    const secs = parseInt(val, 10);
    if (!isNaN(secs) && secs > 0) {
      startTimer(secs);
    }
  });
  $$(".account-shortcut").forEach((button) => button.addEventListener("click", openAccountPanel));
  $("#finish-workout-btn")?.addEventListener("click", () => {
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
  $("#add-exercise-btn")?.addEventListener("click", () => setView("library"));
  $("#swap-exercise")?.addEventListener("click", () => {
    const index = exercises.findIndex((item) => item.id === state.selectedExercise.id);
    state.selectedExercise = exercises[(index + 1) % exercises.length];
    renderCues();
  });
  $("#close-dialog")?.addEventListener("click", () => $("#exercise-dialog").close());
  $("#exercise-dialog")?.addEventListener("close", stopDialogAnimation);
  $("#add-to-workout")?.addEventListener("click", () => {
    addExerciseToWorkout(state.selectedExercise.id);
    $("#exercise-dialog").close();
  });
  $("#start-from-dialog")?.addEventListener("click", () => {
    addExerciseToWorkout(state.selectedExercise.id);
    $("#exercise-dialog").close();
    setView("workout");
  });
  $("#exercise-search")?.addEventListener("input", renderLibrary);
  $("#muscle-filter")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-muscle]");
    if (!button) return;
    state.libraryFilter = button.dataset.muscle;
    renderFilters();
    renderLibrary();
  });
  $("#chart-mode")?.addEventListener("change", drawProgressChart);
  $("#calc-weight")?.addEventListener("input", renderCalculator);
  $("#calc-reps")?.addEventListener("input", renderCalculator);
  $("#theme-toggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    drawProgressChart();
  });
  $("#device-toggle")?.addEventListener("click", () => {
    document.body.classList.toggle("device-mobile");
    localStorage.setItem("liftlab-device-mode", document.body.classList.contains("device-mobile") ? "mobile" : "desktop");
    updateDeviceToggleLabel();
    drawProgressChart();
  });
  $("#add-friend-btn")?.addEventListener("click", async () => {
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
  $("#share-progress-btn")?.addEventListener("click", async () => {
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
  $("#connect-apple-health")?.addEventListener("click", () => openHealthDialog("apple"));
  $("#connect-google-fit")?.addEventListener("click", () => openHealthDialog("google"));
  $("#close-health-dialog")?.addEventListener("click", () => $("#health-connection-dialog")?.close());
  $("#confirm-health-dialog")?.addEventListener("click", () => {
    $("#health-connection-dialog")?.close();
    syncHealthData();
    showToast("¡Dispositivo vinculado con éxito! Datos de salud sincronizados.");
  });
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
    const foodName = prompt("Escribe el nombre del alimento a buscar (ej. pollo, arroz, yogur, avena):");
    if (!foodName) return;

    const gramsInput = prompt(`¿Cuántos gramos de "${foodName}" quieres añadir?`, "100");
    if (gramsInput === null) return;
    const grams = Number(gramsInput) || 100;

    const matched = findFood(foodName);
    let scaled;
    if (matched) {
      scaled = scalePhotoItem(matched[0], grams);
      showToast(`Añadido: ${scaled.name} (${scaled.grams}g) desde la base de datos.`);
    } else {
      // Si no existe, crear un alimento genérico con macros en 0, que el usuario puede ajustar
      scaled = {
        name: foodName,
        grams: grams,
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      };
      showToast(`Añadido alimento personalizado: ${foodName} (${grams}g). Revisa macros.`);
    }

    appData.photoItems.push(scaled);
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
  $("#gate-social-google")?.addEventListener("click", loginWithGoogle);
  $("#gate-social-apple")?.addEventListener("click", loginWithApple);
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
  $("#edit-profile-btn")?.addEventListener("click", () => {
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
  $("#random-measure")?.addEventListener("click", async () => {
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
  $("#run-ai-agents")?.addEventListener("click", runAIAgents);
  $("#apply-ai-plan")?.addEventListener("click", applyAIPlan);
  $("#ai-recovery")?.addEventListener("input", () => {
    $("#ai-recovery-label").textContent = `${$("#ai-recovery").value}%`;
  });
  ["#ai-goal", "#ai-time", "#ai-soreness"].forEach((selector) => {
    $(selector)?.addEventListener("change", runAIAgents);
  });
  $("#ai-chat-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#ai-chat-input");
    const value = input.value.trim();
    if (!value) return;
    addAIMessage("Tu", value);
    input.value = "";
    showAITypingIndicator();
    setTimeout(() => {
      removeAITypingIndicator();
      addAIMessage("Entrenador", answerAIQuestion(value));
    }, 1000);
  });
  $$(".ai-prompts [data-ai-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.aiPrompt;
      addAIMessage("Tu", value);
      showAITypingIndicator();
      setTimeout(() => {
        removeAITypingIndicator();
        addAIMessage("Entrenador", answerAIQuestion(value));
      }, 1000);
    });
  });
  $("#meal-input")?.addEventListener("input", previewMeal);
  $("#analyze-meal")?.addEventListener("click", previewMeal);
  $("#add-meal")?.addEventListener("click", () => addMeal());
  $("#recalc-nutrition")?.addEventListener("click", renderNutrition);
  $("#clear-meals")?.addEventListener("click", async () => {
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
    $(selector)?.addEventListener("change", (e) => {
      const val = e.target.value;
      if (selector === "#nutri-weight") appData.profile.weight = Number(val) || 82;
      else if (selector === "#nutri-height") appData.profile.height = Number(val) || 178;
      else if (selector === "#nutri-age") appData.profile.age = Number(val) || 35;
      else if (selector === "#nutri-sex") appData.profile.sex = val;
      else if (selector === "#nutri-training-min") appData.profile.sessionTime = Number(val) || 60;
      else if (selector === "#nutri-goal") {
        appData.profile.goal = val === "cut" ? "Fatloss" : val === "bulk" ? "Hypertrophy" : "Recomp";
      }
      
      saveAppData();
      pushApi("/api/profile", appData.profile).catch(() => {});
      
      renderNutrition();
      renderProfileInputs();
      renderDashboardData();
    });
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
  $("#food-search")?.addEventListener("input", renderFoodSearch);
  $("#food-results")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-food-name]");
    if (!button) return;
    const foodName = button.dataset.foodName;
    const slot = $("#meal-slot").value || "Comida";
    
    const foodItem = foodDb.find(([name]) => name === foodName);
    if (!foodItem) return;
    
    const [name, , kcal, protein, carbs, fat, defaultGrams = 100] = foodItem;
    const grams = defaultGrams || 100;
    const factor = grams / 100;
    
    const meal = {
      date: new Date().toISOString().slice(0, 10),
      slot: slot,
      text: `${grams}g de ${name}`,
      items: [{
        name: name,
        grams: grams,
        kcal: Math.round(kcal * factor),
        protein: round1(protein * factor),
        carbs: round1(carbs * factor),
        fat: round1(fat * factor),
        matched: true
      }],
      totals: {
        kcal: Math.round(kcal * factor),
        protein: round1(protein * factor),
        carbs: round1(carbs * factor),
        fat: round1(fat * factor)
      }
    };
    
    mealLog.push(meal);
    saveMealLog();
    if (hasRealBackend()) {
      const saved = await apiRequest("/api/meals", {
        method: "POST",
        body: meal
      }).catch(() => null);
      if (saved && saved.id) {
        meal.id = saved.id;
      }
    }
    renderNutrition();
    showToast(`Añadido: ${grams}g de ${name} a ${slot}`);
  });
  $$("#nutrition-view [data-meal-example]").forEach((button) => {
    button.addEventListener("click", () => {
      $("#meal-input").value = button.dataset.mealExample;
      previewMeal();
    });
  });
  $("#open-onboarding")?.addEventListener("click", () => openOnboarding(0));
  $("#close-onboarding")?.addEventListener("click", closeOnboarding);
  $("#next-onboarding").onclick = () => moveOnboarding(1);
  $("#prev-onboarding").onclick = () => moveOnboarding(-1);
  $("#onboarding-flow")?.addEventListener("click", (event) => {
    if (event.target.id === "onboarding-flow") closeOnboarding();
    const choice = event.target.closest(".onboarding-step button");
    if (!choice) return;
    const step = choice.closest(".onboarding-step");
    const stepIndex = Number(step.dataset.step);

    step.querySelectorAll("button").forEach((button) => button.classList.remove("selected"));
    choice.classList.add("selected");
    const label = choice.textContent.trim();

    // Guardar la elección dinámicamente
    if (stepIndex === 1) { // Objetivos
      if (label === "Ganar músculo") onboardingChoices.goal = "Ganar músculo";
      else if (label === "Hacerme más fuerte") onboardingChoices.goal = "Ganar fuerza";
      else if (label === "Perder peso") onboardingChoices.goal = "Perder peso";
      else if (label === "Fundamentos" || label === "Acondicionamiento") onboardingChoices.goal = "Salud";
      else if (label === "Deporte") onboardingChoices.goal = "Rendimiento";
    } else if (stepIndex === 3) { // Experiencia
      if (label.includes("nuevo") || label.includes("meses")) onboardingChoices.level = "Principiante";
      else if (label.includes("año")) onboardingChoices.level = "Intermedio";
      else onboardingChoices.level = "Avanzado";
    } else if (stepIndex === 4) { // Equipo
      if (label === "Gimnasio completo") { onboardingChoices.equipment = "Gimnasio completo"; onboardingChoices.place = "Gimnasio"; }
      else if (label === "Barras") { onboardingChoices.equipment = "Barras"; onboardingChoices.place = "Casa"; }
      else if (label === "Mancuernas") { onboardingChoices.equipment = "Mancuernas"; onboardingChoices.place = "Casa"; }
      else if (label === "Pesas rusas") { onboardingChoices.equipment = "Pesas rusas"; onboardingChoices.place = "Casa"; }
      else if (label === "Máquinas") { onboardingChoices.equipment = "Máquinas"; onboardingChoices.place = "Gimnasio"; }
      else { onboardingChoices.equipment = "Peso corporal"; onboardingChoices.place = "Casa"; }
    }

    if (label.includes("Continuar")) {
      showToast("Perfil inicial preparado gratis.");
      moveOnboarding(1);
    } else if (label.includes("Entrar gratis")) {
      saveOnboardingChoices();
      showToast("Todo listo. Entrenamiento abierto.");
      closeOnboarding();
      setView("workout");
    } else {
      showToast("Preferencia guardada.");
    }
  });

  $("#onboarding-weight-input")?.addEventListener("input", (e) => {
    const val = Number(e.target.value) || 70;
    if ($("#onboarding-weight-slider")) $("#onboarding-weight-slider").value = val;
    onboardingChoices.weight = val;
  });
  $("#onboarding-weight-slider")?.addEventListener("input", (e) => {
    const val = Number(e.target.value) || 70;
    if ($("#onboarding-weight-input")) $("#onboarding-weight-input").value = val;
    onboardingChoices.weight = val;
  });
}

let onboardingIndex = 0;
const onboardingChoices = {
  goal: "Ganar músculo",
  level: "Principiante",
  equipment: "Gimnasio completo",
  place: "Gimnasio",
  weight: 70
};

function saveOnboardingChoices() {
  appData.profile.goal = onboardingChoices.goal;
  appData.profile.level = onboardingChoices.level;
  appData.profile.equipment = onboardingChoices.equipment;
  appData.profile.place = onboardingChoices.place;
  appData.profile.weight = Number($("#onboarding-weight-input")?.value) || onboardingChoices.weight;

  // Generar dinámicamente la rutina de forma adaptada
  generateWeeklyRoutinePlan();

  // Persistir los datos
  saveAppData();
  pushApi("/api/profile", appData.profile).catch(() => {});
  pushApi("/api/onboarding", appData.profile).catch(() => {});
  pushApi("/api/routines", weeklyRoutinePlan).catch(() => {});

  renderAllAppData();
}

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
  try {
    const online = await detectApi();
    if (online && ((firebaseOnline && firebaseBackend?.user) || (!firebaseOnline && apiToken))) {
      await loadApiUserData();
      setAuthUiState(false);
      setView("dashboard");
    } else if (appData.account?.isGuest) {
      renderAllAppData();
      setAuthUiState(false);
      setView("dashboard");
    } else {
      appData.account = null;
      saveAppData();
      renderAuthStatus();
      setAuthUiState(false);
    }
  } catch (e) {
    console.error("Auth bootstrapping failed, resetting to guest/fallback mode:", e);
    appData.account = null;
    saveAppData();
    renderAuthStatus();
    setAuthUiState(false);
  }
}

function init() {
  if (appData.account?.isGuest) {
    localStorage.removeItem("liftlab-app-data");
    appData = cloneData(defaultAppData);
  }
  applyPreferredDeviceMode();
  setAuthUiState(true);
  
  const runSafe = (name, fn) => {
    try {
      fn();
    } catch (e) {
      console.error(`Error during init ${name}:`, e);
    }
  };

  runSafe("renderProfileInputs", renderProfileInputs);
  runSafe("renderDate", renderDate);
  runSafe("renderPhonePreview", renderPhonePreview);
  runSafe("renderWeekPlan", renderWeekPlan);
  runSafe("renderFeed", renderFeed);
  runSafe("renderWorkoutLog", renderWorkoutLog);
  runSafe("renderRoutines", renderRoutines);
  runSafe("renderFilters", renderFilters);
  runSafe("renderMuscleAtlas", renderMuscleAtlas);
  runSafe("renderLibrary", renderLibrary);
  runSafe("renderCues", renderCues);
  runSafe("loadExerciseDataset", loadExerciseDataset);
  runSafe("drawProgressChart", drawProgressChart);
  runSafe("renderCalculator", renderCalculator);
  runSafe("renderMilestones", renderMilestones);
  runSafe("renderCommunity", renderCommunity);
  runSafe("renderMeasures", renderMeasures);
  runSafe("renderHealthInputs", renderHealthInputs);
  runSafe("renderDashboardData", renderDashboardData);
  runSafe("renderHabits", renderHabits);
  runSafe("renderPhotoFoodResults", renderPhotoFoodResults);
  runSafe("runAIAgents", runAIAgents);
  runSafe("renderNutrition", renderNutrition);
  runSafe("renderFoodSearch", renderFoodSearch);
  runSafe("updateTimerText", updateTimerText);
  runSafe("updateDeviceToggleLabel", updateDeviceToggleLabel);
  
  window.addEventListener("resize", applyResponsiveDeviceMode);
  
  runSafe("bindEvents", bindEvents);
  runSafe("animateExercise", animateExercise);
  
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

// Sincronización en segundo plano: asegurar que los datos estén frescos al volver a la app
document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible") {
    try {
      await loadApiUserData();
    } catch (e) {
      console.warn("Error en sincronización en segundo plano", e);
    }
  }
});

window.addEventListener("focus", async () => {
  try {
    await loadApiUserData();
  } catch (e) {
    console.warn("Error en sincronización en segundo plano", e);
  }
});

