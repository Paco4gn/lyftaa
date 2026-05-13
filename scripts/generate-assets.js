const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "assets", "exercises");
fs.mkdirSync(outDir, { recursive: true });

const exercises = [
  ["bench", "Press banca", "Pecho", "Barra", "push"],
  ["incline-db", "Press inclinado mancuernas", "Pecho", "Mancuernas", "push"],
  ["dip", "Fondos", "Triceps", "Paralelas", "push"],
  ["lat-pulldown", "Jalon al pecho", "Espalda", "Polea", "pull"],
  ["row", "Remo sentado", "Espalda", "Polea", "pull"],
  ["curl", "Curl barra", "Biceps", "Barra", "pull"],
  ["squat", "Sentadilla", "Pierna", "Barra", "legs"],
  ["rdl", "Peso muerto rumano", "Femoral", "Barra", "legs"],
  ["leg-ext", "Extension de cuadriceps", "Pierna", "Maquina", "legs"],
  ["lateral-raise", "Elevacion lateral", "Hombro", "Mancuernas", "push"],
  ["pull-up", "Dominada", "Espalda", "Barra fija", "pull"],
  ["hip-thrust", "Hip thrust", "Gluteo", "Barra", "legs"],
  ["overhead-press", "Press militar", "Hombro", "Barra", "push"],
  ["pec-deck", "Contractora", "Pecho", "Maquina", "push"],
  ["triceps-pushdown", "Extension triceps polea", "Triceps", "Polea", "push"],
  ["face-pull", "Face pull", "Hombro", "Polea", "pull"],
  ["deadlift", "Peso muerto", "Espalda", "Barra", "pull"],
  ["tbar-row", "Remo T", "Espalda", "Maquina", "pull"],
  ["hammer-curl", "Curl martillo", "Biceps", "Mancuernas", "pull"],
  ["leg-press", "Prensa", "Pierna", "Maquina", "legs"],
  ["lunge", "Zancada", "Pierna", "Mancuernas", "legs"],
  ["leg-curl", "Curl femoral", "Femoral", "Maquina", "legs"],
  ["calf-raise", "Elevacion gemelo", "Gemelo", "Maquina", "legs"],
  ["plank", "Plancha", "Core", "Peso corporal", "legs"],
  ["push-up", "Flexion", "Pecho", "Peso corporal", "push"],
  ["cable-fly", "Cruce poleas", "Pecho", "Polea", "push"],
  ["seated-db-press", "Press hombro mancuernas", "Hombro", "Mancuernas", "push"],
  ["wide-pulldown", "Jalon agarre amplio", "Espalda", "Polea", "pull"],
  ["single-row", "Remo una mano", "Espalda", "Mancuerna", "pull"],
  ["glute-bridge", "Puente gluteo", "Gluteo", "Peso corporal", "legs"],
];

const palettes = {
  push: ["#ff6b4a", "#ffd2c2", "#111217"],
  pull: ["#4285f4", "#cfe0fb", "#111722"],
  legs: ["#f4b942", "#ffe3a8", "#1a1710"],
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function scene(id, palette, phase) {
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
    bench: () => `${bench}${head(320, 246)}<g ${common} stroke-width="18"><path d="M286 256L230 ${y(210, 142)}"/><path d="M354 256L410 ${y(210, 142)}"/></g>${bar(184, y(210, 142), 456, 12)}${plates(154, y(210, 142), 458)}`,
    "incline-db": () => `<path d="M205 314L425 228" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>${head(318, 226)}<g ${common} stroke-width="17"><path d="M288 238L246 ${y(220, 132)}"/><path d="M348 226L408 ${y(220, 132)}"/></g>${dumbbell(238, y(220, 132))}${dumbbell(420, y(220, 132))}`,
    dip: () => `<path d="M190 112v220M450 112v220" stroke="${accent}" stroke-width="14" stroke-linecap="round"/><path d="M190 160h120M330 160h120" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>${head(320, y(200, 150) - 42)}<g ${common} stroke-width="18"><path d="M320 ${y(200, 150)}v86M292 ${y(200, 150) + 4}L210 166M348 ${y(200, 150) + 4}L430 166M320 ${y(200, 150) + 86}l-42 66M320 ${y(200, 150) + 86}l42 66"/></g>`,
    "lat-pulldown": () => `<path d="M170 82h300" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${cable(320, 82, 320, y(116, 176))}${head(320, 216)}<g ${common} stroke-width="18"><path d="M320 240v88M290 246L230 ${y(116, 176)}M350 246L410 ${y(116, 176)}M320 328l-48 46M320 328l48 46"/></g>`,
    row: () => `<path d="M170 276h320" stroke="${ink}" stroke-width="18" stroke-linecap="round"/><path d="M178 318h108M420 318h60" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${cable(520, 202, y(418, 334), 226)}${head(282, 190)}<g ${common} stroke-width="18"><path d="M282 214l-22 74M272 232L${y(418, 334)} 226M260 288h112M282 288l-38 68M330 288l42 68"/></g>`,
    curl: () => `${head(320, 116)}<g ${common} stroke-width="18"><path d="M320 142v116M290 168L250 ${y(280, 190)}M350 168L390 ${y(280, 190)}M320 258l-52 92M320 258l52 92"/></g>${bar(238, y(280, 190), 402, 11)}${plates(214, y(280, 190), 410)}`,
    squat: () => `${bar(190, 124, 450, 13)}${plates(158, 124, 454)}${head(320, 84)}<g ${common} stroke-width="20"><path d="M320 108v${y(184, 238) - 108}M320 ${y(184, 238)}L266 ${y(278, 292)}L232 360M320 ${y(184, 238)}L386 ${y(278, 292)}L426 360M284 130L220 124M356 130L420 124"/></g>`,
    rdl: () => `${head(306, 104)}<g ${common} stroke-width="18"><path d="M306 128L360 ${y(172, 216)}M360 ${y(172, 216)}L318 354M360 ${y(172, 216)}L420 354M342 ${y(172, 216) - 4}L252 ${y(236, 294)}M376 ${y(172, 216) - 4}L430 ${y(236, 294)}"/></g>${bar(190, y(236, 294), 478, 13)}${plates(158, y(236, 294), 482)}`,
    "leg-ext": () => `<path d="M196 238h152v70H196z" fill="${ink}" opacity=".9"/><path d="M286 186h96v56h-96z" fill="${ink}" opacity=".9"/>${head(278, 162)}<g ${common} stroke-width="18"><path d="M288 186l62 58M326 280L${y(430, 512)} 280M${y(430, 512)} 280l38 0"/></g><circle cx="${y(430, 512) + 46}" cy="280" r="28" fill="${accent}"/>`,
    "lateral-raise": () => `${head(320, 120)}<g ${common} stroke-width="18"><path d="M320 144v120M320 172L218 ${y(238, 154)}M320 172L422 ${y(238, 154)}M320 264l-48 92M320 264l48 92"/></g>${dumbbell(206, y(238, 154))}${dumbbell(434, y(238, 154))}`,
    "pull-up": () => `<path d="M162 82h316" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${head(320, y(222, 154) - 50)}<g ${common} stroke-width="18"><path d="M320 ${y(222, 154) - 26}v104M294 ${y(222, 154)}L220 84M346 ${y(222, 154)}L420 84M320 ${y(222, 154) + 78}l-54 74M320 ${y(222, 154) + 78}l54 74"/></g>`,
    "hip-thrust": () => `<path d="M154 282h138" stroke="${ink}" stroke-width="22" stroke-linecap="round"/><path d="M422 322H522" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>${head(236, 222)}<g ${common} stroke-width="18"><path d="M260 238L350 ${y(264, 206)}L456 316M350 ${y(264, 206)}L306 318M350 ${y(264, 206)}L392 318"/></g>${bar(268, y(264, 206) - 8, 432, 13)}${plates(244, y(264, 206) - 8, 436)}`,
    "overhead-press": () => `${head(320, 148)}<g ${common} stroke-width="18"><path d="M320 172v112M292 190L250 ${y(206, 82)}M348 190L390 ${y(206, 82)}M320 284l-52 80M320 284l52 80"/></g>${bar(202, y(206, 82), 438, 12)}${plates(170, y(206, 82), 442)}`,
    "pec-deck": () => `<path d="M178 130h284v210H178z" fill="${ink}" opacity=".12" stroke="${accent}" stroke-width="8"/><path d="M230 150v160M410 150v160" stroke="${accent}" stroke-width="12"/>${head(320, 154)}<g ${common} stroke-width="18"><path d="M320 178v112M300 204L${y(220, 290)} 220M340 204L${640 - y(220, 290)} 220M320 290l-48 72M320 290l48 72"/></g>`,
    "triceps-pushdown": () => `${cable(320, 70, 320, y(166, 256))}${bar(270, y(166, 256), 370, 10)}${head(320, 136)}<g ${common} stroke-width="18"><path d="M320 160v104M288 184L272 ${y(166, 256)}M352 184L368 ${y(166, 256)}M320 264l-52 86M320 264l52 86"/></g>`,
    "face-pull": () => `${cable(520, 156, y(420, 344), 156)}${head(300, 152)}<g ${common} stroke-width="18"><path d="M300 176v106M286 198L${y(420, 344)} 156M314 198L${y(420, 344)} 188M300 282l-50 82M300 282l54 82"/></g><circle cx="520" cy="156" r="22" fill="${accent}"/>`,
    deadlift: () => `${bar(170, y(302, 226), 470, 14)}${plates(136, y(302, 226), 474)}${head(314, 110)}<g ${common} stroke-width="18"><path d="M314 134L358 ${y(178, 232)}M358 ${y(178, 232)}L302 356M358 ${y(178, 232)}L418 356M338 ${y(178, 232)}L278 ${y(302, 226)}M376 ${y(178, 232)}L420 ${y(302, 226)}"/></g>`,
    "tbar-row": () => `<path d="M210 326L512 180" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${plates(490, 180, 542)}${head(282, 154)}<g ${common} stroke-width="18"><path d="M282 178L350 238M350 238l-52 108M350 238l62 96M320 214L396 ${y(250, 194)}M338 226L410 ${y(250, 194)}"/></g>`,
    "hammer-curl": () => `${head(320, 116)}<g ${common} stroke-width="18"><path d="M320 142v116M290 170L250 ${y(274, 190)}M350 170L390 ${y(274, 190)}M320 258l-52 92M320 258l52 92"/></g>${dumbbell(246, y(274, 190))}${dumbbell(394, y(274, 190))}`,
    "leg-press": () => `<path d="M180 312h170L476 122" stroke="${ink}" stroke-width="18" stroke-linecap="round"/><path d="M478 90l86 86" stroke="${accent}" stroke-width="18"/><path d="M${y(430, 506)} 106l74 74" stroke="${accent}" stroke-width="12"/>${head(246, 242)}<g ${common} stroke-width="18"><path d="M270 260l72 36M342 296L${y(430, 506)} 156M342 296L${y(430, 506) - 40} 196"/></g>`,
    lunge: () => `${head(320, 110)}<g ${common} stroke-width="18"><path d="M320 134v102M320 236L250 296L202 356M320 236L414 ${y(286, 320)}L482 350M288 164L238 214M352 164L402 214"/></g>${dumbbell(234, 214)}${dumbbell(406, 214)}`,
    "leg-curl": () => `<path d="M168 230h286" stroke="${ink}" stroke-width="22" stroke-linecap="round"/><path d="M210 290h250" stroke="${ink}" stroke-width="18" stroke-linecap="round"/>${head(210, 196)}<g ${common} stroke-width="18"><path d="M238 214h150M388 214L${y(470, 384)} 284"/></g><circle cx="${y(470, 384) + 30}" cy="284" r="28" fill="${accent}"/>`,
    "calf-raise": () => `<path d="M212 104h216v36H212z" fill="${accent}"/>${head(320, 86)}<g ${common} stroke-width="18"><path d="M320 110v142M320 252l-46 98M320 252l48 ${y(350, 322) - 252}M286 146L232 112M354 146L408 112"/></g><path d="M240 360h90M354 ${y(350, 322)}h92" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>`,
    plank: () => `<path d="M170 304H496" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>${head(190, 230)}<g ${common} stroke-width="18"><path d="M214 246L352 260L486 300M300 258L244 304M384 274L344 304"/></g>`,
    "push-up": () => `${head(210, y(244, 296) - 42)}<g ${common} stroke-width="18"><path d="M232 ${y(244, 296) - 24}L390 ${y(244, 296)}L500 314M300 ${y(244, 296) - 8}L250 320M384 ${y(244, 296)}L340 322"/></g><path d="M164 322h390" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`,
    "cable-fly": () => `<path d="M104 78v270M536 78v270" stroke="${accent}" stroke-width="12"/><path d="M104 104L${y(218, 314)} 210M536 104L${640 - y(218, 314)} 210" stroke="${accent}" stroke-width="6" stroke-dasharray="8 8"/>${head(320, 142)}<g ${common} stroke-width="18"><path d="M320 166v120M296 198L${y(218, 314)} 210M344 198L${640 - y(218, 314)} 210M320 286l-52 76M320 286l52 76"/></g>`,
    "seated-db-press": () => `<path d="M232 302h176v34H232z" fill="${ink}"/><path d="M270 202h100v104H270z" fill="${ink}" opacity=".24"/>${head(320, 146)}<g ${common} stroke-width="18"><path d="M320 170v96M292 188L254 ${y(190, 88)}M348 188L386 ${y(190, 88)}M320 266l-42 72M320 266l42 72"/></g>${dumbbell(246, y(190, 88))}${dumbbell(394, y(190, 88))}`,
    "wide-pulldown": () => `<path d="M126 80h388" stroke="${accent}" stroke-width="14" stroke-linecap="round"/>${cable(320, 80, 320, y(110, 172))}${head(320, 214)}<g ${common} stroke-width="18"><path d="M320 238v90M286 246L184 ${y(110, 172)}M354 246L456 ${y(110, 172)}M320 328l-48 46M320 328l48 46"/></g>`,
    "single-row": () => `<path d="M210 286h210" stroke="${ink}" stroke-width="18"/><path d="M250 320h120" stroke="${ink}" stroke-width="14"/>${head(304, 150)}<g ${common} stroke-width="18"><path d="M304 174L370 238M370 238l-38 106M370 238l64 92M316 192L246 286M360 230L452 ${y(282, 210)}"/></g>${dumbbell(460, y(282, 210))}`,
    "glute-bridge": () => `<path d="M150 326h360" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>${head(196, 260)}<g ${common} stroke-width="18"><path d="M220 276L338 ${y(280, 224)}L454 316M338 ${y(280, 224)}L300 318M338 ${y(280, 224)}L390 318"/></g>`,
  };
  return (scenes[id] || scenes.bench)();
}

function makeSvg([id, name, muscle, equipment, type], frame) {
  const palette = palettes[type] || palettes.push;
  const phase = frame === 0 ? 0 : frame === 1 ? 1 : 0.5;
  return `<?xml version="1.0" encoding="UTF-8"?>
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
  <g filter="url(#shadow)">${scene(id, palette, phase)}</g>
  <g>
    <rect x="28" y="28" width="254" height="66" rx="18" fill="#ffffff" opacity=".88"/>
    <text x="48" y="56" font-family="Arial, sans-serif" font-size="22" font-weight="800" fill="#17191c">${esc(name)}</text>
    <text x="48" y="78" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="${palette[0]}">${esc(muscle)} - ${esc(equipment)}</text>
  </g>
</svg>`;
}

for (const exercise of exercises) {
  for (let frame = 0; frame < 3; frame += 1) {
    fs.writeFileSync(path.join(outDir, `${exercise[0]}-${frame}.svg`), makeSvg(exercise, frame));
  }
}

console.log(`Generated ${exercises.length * 3} exercise assets in ${path.relative(root, outDir)}`);
