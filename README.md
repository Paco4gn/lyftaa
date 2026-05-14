# LiftLab

Aplicacion gratuita de entrenamiento, ejercicios, nutricion, IA local y backend real con Firebase.

## Abrir la aplicacion

Cuando GitHub Pages termine de publicar, la app estara aqui:

[Abrir LiftLab](https://paco4gn.github.io/lyftaa/)

La app web puede funcionar de dos formas:

- **Firebase real**: Auth, Firestore y Storage para usuarios reales en GitHub Pages o Firebase Hosting.
- **Backend local**: Node + SQLite con `npm start`, util para desarrollo y pruebas locales.

## Firebase real

Firebase es el backend principal recomendado para esta version web. Para activarlo:

1. Crea un proyecto en Firebase.
2. Activa Authentication con Email/password.
3. Activa Firestore Database.
4. Activa Storage para fotos de comida y progreso.
5. Copia la configuracion web de Firebase en `config.js`.
6. Publica reglas:

```bash
npm run firebase:deploy -- --only firestore:rules,storage
```

7. Publica la web en GitHub Pages o Firebase Hosting.

Con Firebase configurado, LiftLab guarda por usuario:

- Cuenta real con Firebase Auth.
- Perfil, onboarding, preferencias, privacidad y permisos de salud.
- Salud manual/sincronizada, rutinas, comidas, comida por foto y entrenamientos.
- Series por entrenamiento, metricas corporales, recetas, listas de compra, notificaciones y comunidad.
- Exportacion y borrado de datos del usuario.

Los datos se guardan bajo `users/{uid}` y las reglas incluidas permiten leer/escribir solo al usuario autenticado.

## Configuracion

Edita `config.js`:

```js
window.LIFTLAB_CONFIG = {
  firebase: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO",
    storageBucket: "TU_PROYECTO.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID",
  },
  apiBaseUrl: "",
};
```

Si `firebase` esta vacio, la app no crea cuentas falsas: avisa de que falta backend real.

## Ejecutar local

Para ejecutar LiftLab con Node + SQLite:

```bash
npm start
```

Despues entra en:

```text
http://127.0.0.1:5174/
```

Comprobaciones:

```bash
npm run check
npm run test:api
```

Emuladores de Firebase para probar reglas y datos:

```bash
npm run firebase:emulators
```

Servidor estatico simple, sin backend real:

```bash
python -m http.server 5174
```

## Que incluye

- Biblioteca con 30 ejercicios en espanol.
- Laminas SVG propias para ejercicios con fases visuales.
- Vista movil y vista PC.
- Entrenamiento guiado, rutinas, progresion y registro de series.
- Agentes IA locales para planificacion, tecnica, recuperacion, nutricion y riesgo.
- Calculadora de calorias y macros con base de alimentos local.
- Registro, login, recuperacion, cierre de sesion y borrado completo de cuenta con Firebase.
- Sin pagos, sin premium y sin funciones bloqueadas.

## Limites reales

- Apple Health real requiere una app iOS nativa con HealthKit. La web solo puede guardar datos manuales o importados.
- El peso exacto de comida por foto no puede saberse con precision solo por imagen; LiftLab lo trata como estimacion editable.
- Las recomendaciones de nutricion y entrenamiento son orientativas y no sustituyen a profesionales sanitarios.
