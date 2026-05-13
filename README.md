# LiftLab

Aplicacion gratuita de entrenamiento, ejercicios, nutricion, IA local y backend real opcional.

## Abrir la aplicacion

Cuando GitHub Pages termine de publicar, la app estara aqui:

[Abrir LiftLab](https://paco4gn.github.io/lyftaa/)

La pagina principal del repositorio de GitHub muestra este README y la lista de archivos. Para usar la aplicacion hay que abrir el enlace anterior o `index.html`.

## Que incluye

- Biblioteca con 30 ejercicios en espanol.
- 90 laminas SVG propias para ejercicios, con 3 fases visuales por movimiento.
- Vista movil y vista PC desde el mismo archivo.
- Entrenamiento guiado, rutinas, progresion y registro de series.
- Agentes IA locales para planificación, técnica, recuperación, nutrición y riesgo.
- Calculadora completa de calorias y macros con base de alimentos local.
- Sin pagos, sin claves externas y sin dependencias obligatorias.

## Ejecutar

Para ver la version estatica publicada, abre `index.html` directamente o usa GitHub Pages.

Para ejecutar LiftLab como app real local con API, usuarios, contraseñas hasheadas y base de datos SQLite:

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
- `npm start`: añade backend local con SQLite, auth, usuarios separados y API.
- Apple Health real requiere app iOS con HealthKit; la web solo puede guardar datos manuales o simulados.
