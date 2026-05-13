# LiftLab

Aplicacion gratuita de entrenamiento, ejercicios, nutricion, IA local y backend real con usuarios y SQLite.

## Abrir la aplicacion

Cuando GitHub Pages termine de publicar, la app estatica estara aqui:

[Abrir LiftLab](https://paco4gn.github.io/lyftaa/)

La pagina principal del repositorio de GitHub muestra este README y la lista de archivos. Para usar la aplicacion hay que abrir el enlace anterior, ejecutar `index.html` o levantar el servidor real.

## Que incluye

- Biblioteca con 30 ejercicios en espanol.
- 90 laminas SVG propias para ejercicios, con 3 fases visuales por movimiento.
- Vista movil y vista PC desde el mismo archivo.
- Entrenamiento guiado, rutinas, progresion y registro de series.
- Agentes IA locales para planificacion, tecnica, recuperacion, nutricion y riesgo.
- Calculadora completa de calorias y macros con base de alimentos local.
- Registro, login, recuperacion preparada, cierre de sesion y borrado completo de cuenta.
- Base de datos SQLite con datos separados por usuario.
- Sin pagos, sin premium, sin claves externas y sin dependencias obligatorias.

## Base de datos real

Con `npm start`, LiftLab crea `data/liftlab.sqlite` y guarda los datos por usuario. La base incluye tablas para:

- Usuarios con contrasenas hasheadas y sesiones por token.
- Perfil fisico, onboarding, preferencias, privacidad y permisos de salud.
- Salud manual o sincronizada: pasos, calorias activas, reposo, sueno, frecuencia cardiaca y recuperacion.
- Rutinas, plan semanal, entrenamientos completados y series por ejercicio.
- Comidas, macros, resultados de comida por foto, recetas y listas de compra.
- Peso, medidas corporales y fotos de progreso con consentimiento.
- Habitos, notificaciones, eventos de consentimiento y comunidad.
- Exportacion completa del usuario y eliminacion completa de datos.

GitHub Pages no puede ejecutar SQLite ni guardar usuarios reales porque es hosting estatico. Para usuarios reales y sincronizacion entre dispositivos hay que desplegar el servidor Node (`server/index.js`) en un hosting con disco o base de datos persistente.

## Ejecutar

Para ver la version estatica publicada, abre `index.html` directamente o usa GitHub Pages.

Para ejecutar LiftLab como app real local con API, usuarios, contrasenas hasheadas y base de datos SQLite:

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

Servidor estatico simple, sin API:

```bash
python -m http.server 5174
```

## Estado real

- GitHub Pages: funciona como app estatica con localStorage.
- `npm start`: anade backend local con SQLite, auth, usuarios separados, API, exportacion y borrado completo.
- Apple Health real requiere app iOS con HealthKit; la web solo puede guardar datos manuales o simulados.
