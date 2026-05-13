# LiftLab - Documento de producto, arquitectura y roadmap

## 1. Resumen ejecutivo

LiftLab debe evolucionar desde la versión visual actual publicada en GitHub Pages hacia una aplicación real, gratuita, personalizada y segura para entrenamiento, nutrición, hábitos, progreso e inteligencia artificial.

La versión actual ya comunica bien la dirección del producto: dashboard, entrenamiento, IA, nutrición, rutinas, biblioteca, progreso, comunidad, perfil, onboarding y concepto gratuito. El siguiente paso no es añadir más pantallas decorativas, sino convertir esa base en una app con usuarios reales, datos persistentes, planes personalizados y una arquitectura preparada para móvil, Apple Health y análisis con IA.

Principio clave: LiftLab debe ser gratis para todos. No debe haber premium, bloqueos de pago ni límites artificiales sobre funciones principales.

## 2. Estado actual de LiftLab

Versión publicada: https://paco4gn.github.io/lyftaa/

Lo que ya existe:

- Interfaz visual moderna en modo oscuro.
- Navegación principal: Inicio, Entrenar, IA, Nutrición, Rutinas, Ejercicios, Progreso, Comunidad y Perfil.
- Onboarding visual con objetivos, experiencia, equipo y creación de cuenta.
- Concepto de sincronización con Salud.
- Biblioteca inicial con 30 ejercicios.
- Rutinas y entrenamiento del día.
- IA local simulada para entrenamiento y nutrición.
- Cálculo local de calorías, macros, agua, BMR y TDEE.
- Registro manual básico de comida.
- Visuales de ejercicios generados/locales.
- Diseño móvil primero con navegación inferior.

Lo que falta para que sea una app real:

- Autenticación real.
- Base de datos multiusuario.
- Backend seguro.
- Guardado por usuario y sincronización entre dispositivos.
- Onboarding persistente.
- Generación real de planes por usuario.
- Historial real de entrenamientos, comidas, peso, medidas y hábitos.
- App iOS real para HealthKit.
- Reconocimiento de comida por foto con flujo de revisión editable.
- Almacenamiento seguro de imágenes.
- Políticas de privacidad, consentimiento y borrado completo de datos.

## 3. Referencia externa

Referencia indicada: https://idyllic-cocada-ab1ef0.netlify.app/

La referencia funciona como idea de estructura: organización semanal de entrenamiento por días, músculos y ejercicios. LiftLab debe absorber ese concepto, pero integrarlo en una experiencia más completa: rutina semanal, detalle diario, bloques de entrenamiento, modo guiado, historial y progresión.

## 4. Concepto final

LiftLab será una app gratuita que actúa como:

- Entrenador personal.
- Planificador de rutinas por días, músculos y ejercicios.
- Modo entrenamiento guiado.
- Guía de alimentación orientativa.
- Registro manual de comidas.
- Registro de comida por foto con IA aproximada y editable.
- Seguimiento de progreso.
- Coach inteligente basado en datos del usuario.
- Asistente de hábitos saludables.
- Panel de análisis con datos manuales y datos reales de Apple Health.

La app debe ser prudente: no diagnostica, no sustituye a médicos, nutricionistas, fisioterapeutas ni entrenadores titulados, y evita recomendaciones extremas.

## 5. Arquitectura recomendada

### Frontend web

Recomendación:

- React + TypeScript.
- Vite.
- Tailwind CSS o CSS Modules.
- Zustand o Redux Toolkit para estado local.
- TanStack Query para datos remotos.
- React Hook Form + Zod para formularios y validación.
- Recharts o Visx para gráficas.

Motivo: permite convertir la actual web estática en una aplicación mantenible, modular y preparada para PWA.

### App móvil

Para Apple Health hace falta app iOS real. Una web normal no puede usar HealthKit.

Opciones:

- React Native + Expo Dev Client, si se quiere compartir lógica con React.
- SwiftUI nativo, si la prioridad es integración iOS perfecta.

Recomendación práctica:

- Fase inicial: React web/PWA + backend.
- Fase HealthKit: React Native con módulo nativo HealthKit o SwiftUI.

### Backend

Recomendación:

- Node.js + NestJS o Fastify.
- API REST inicialmente.
- Webhooks y jobs programados para análisis semanal.
- OpenAPI para documentar endpoints.

Alternativa rápida:

- Supabase para auth, Postgres, storage y row level security.

Recomendación para MVP: Supabase acelera el desarrollo y reduce coste. Si el producto crece, se puede mantener Postgres y añadir backend propio.

### Base de datos

PostgreSQL.

Motivo:

- Datos relacionales claros.
- Rutinas, días, ejercicios, series y comidas encajan bien.
- Permite row level security por usuario.
- Escala mejor que guardar todo en localStorage.

### Almacenamiento de imágenes

- Supabase Storage, S3 o Cloudflare R2.
- Buckets separados: food-photos, progress-photos, exercise-assets.
- Fotos privadas por defecto.
- URLs firmadas temporales.
- Borrado físico cuando el usuario elimina cuenta o foto.

### IA

Separar dos niveles:

- IA local/reglas: cálculos, heurísticas, planes base, avisos simples.
- IA remota opcional: chat, análisis de progreso, reconocimiento de comida por imagen.

La app debe funcionar aunque la IA remota falle. La IA nunca debe guardar una comida detectada por foto sin confirmación del usuario.

## 6. Estructura de carpetas propuesta

```text
apps/
  web/
    src/
      app/
      features/
        auth/
        onboarding/
        dashboard/
        training/
        routines/
        exercises/
        nutrition/
        progress/
        habits/
        health/
        coach/
        community/
        settings/
      shared/
        components/
        hooks/
        lib/
        styles/
  mobile/
    src/
      healthkit/
      camera/
      features/
packages/
  core/
    training/
    nutrition/
    health/
    ai/
    validation/
  database/
    schema/
    migrations/
  assets/
    exercises/
    anatomy/
docs/
```

## 7. Modelo de datos recomendado

Tablas principales:

- users
- user_profiles
- onboarding_answers
- user_goals
- user_preferences
- health_connections
- health_daily_metrics
- health_workouts
- exercises
- exercise_muscles
- exercise_media
- routine_templates
- routines
- routine_days
- routine_blocks
- routine_day_exercises
- planned_workouts
- completed_workouts
- completed_sets
- exercise_history
- body_weight_logs
- body_measurements
- progress_photos
- foods
- meals
- meal_items
- recipes
- recipe_items
- food_photos
- food_photo_ai_results
- water_logs
- habits
- habit_logs
- coach_messages
- notifications
- privacy_consents
- account_deletion_requests

Regla obligatoria: toda tabla con datos privados debe tener user_id y control de acceso por usuario.

## 8. Sistema de usuarios

Debe incluir:

- Registro con email y contraseña.
- Login.
- Recuperación de contraseña.
- Cierre de sesión.
- Edición de perfil.
- Eliminación de cuenta.
- Borrado completo de datos personales.
- Datos separados por usuario.
- Sincronización entre dispositivos.

Seguridad:

- Password hashing gestionado por proveedor seguro.
- Sesiones con tokens.
- RLS si se usa Supabase.
- Validación de permisos en backend.
- Logs sin datos sensibles.

## 9. Onboarding inicial

El onboarding debe ser obligatorio tras el primer registro.

Debe capturar:

- Datos físicos.
- Objetivos.
- Nivel.
- Días y tiempo disponible.
- Lugar y material.
- Lesiones y limitaciones.
- Sueño, estrés, actividad diaria.
- Preferencias alimentarias.
- Alergias e intolerancias.
- Horarios.
- Permiso opcional para Apple Health.

Resultado automático:

- Perfil inicial.
- Objetivos diarios y semanales.
- Rutina inicial.
- Plan nutricional orientativo.
- Primeros hábitos.
- Dashboard personalizado.

## 10. Apple Health / HealthKit

HealthKit solo está disponible en app iOS real. La web puede mostrar la idea, pero no leer datos reales de Salud.

Datos a leer con permiso:

- Pasos.
- Distancia.
- Calorías activas.
- Calorías en reposo.
- Entrenamientos.
- Duración de actividad.
- Sueño.
- Peso.
- Altura.
- Frecuencia cardíaca.
- Frecuencia cardíaca en reposo.
- HRV.
- VO2 máx. si existe.

Datos a escribir con permiso:

- Entrenamientos hechos en LiftLab.
- Duración.
- Calorías estimadas.
- Peso manual.
- Agua.

Uso dentro de LiftLab:

- Ajustar gasto calórico real.
- Ajustar calorías recomendadas.
- Detectar baja actividad.
- Adaptar entreno si hay mala recuperación.
- Mostrar comparativas objetivo vs realidad.
- Mejorar respuestas del coach IA.

Privacidad:

- Explicar qué se lee y para qué.
- Permiso explícito.
- Revocación clara.
- La app funciona sin conectar Salud.
- No vender ni compartir datos de salud.

## 11. Dashboard personalizado

Debe mostrar:

- Saludo por nombre.
- Entrenamiento de hoy.
- Ejercicio principal.
- Duración estimada.
- Calorías consumidas, gastadas y restantes.
- Proteínas, carbohidratos y grasas.
- Agua consumida.
- Pasos reales.
- Sueño.
- Recuperación estimada.
- Peso actual.
- Racha.
- Hábitos pendientes.
- Mensaje del coach.
- Accesos rápidos: entrenar, comida, comida por foto, peso, sincronizar Salud.

## 12. Entrenamiento por días, músculos y ejercicios

La estructura central debe ser:

```text
Rutina
  Semana
    Día de entrenamiento
      Bloque
        Ejercicio
          Series planificadas
          Series completadas
```

Cada día debe tener:

- Nombre.
- Duración estimada.
- Dificultad.
- Músculos principales y secundarios.
- Estado: pendiente, completado, saltado.
- Volumen estimado.
- Botón empezar.
- Botón editar.
- Botón sustituir ejercicios.

Bloques:

- Calentamiento.
- Principal.
- Accesorios.
- Core/cardio opcional.
- Vuelta a la calma.

Plantillas iniciales:

- Principiante 3 días.
- Full body 3 días.
- Torso pierna 4 días.
- Hipertrofia 4 días.
- Fuerza 3 días.
- Push Pull Legs 6 días.
- Pérdida de grasa 4 días.
- Casa sin material.
- Casa con mancuernas.
- Rutina express 15 minutos.
- Rutina rápida 30 minutos.

## 13. Modo entrenamiento

Debe ser una experiencia paso a paso:

- Ejercicio actual.
- Imagen o animación.
- Instrucciones.
- Músculos trabajados.
- Series pendientes.
- Peso sugerido.
- Repeticiones.
- RPE.
- Descanso.
- Notas.
- Cambiar o saltar ejercicio.
- Finalizar entrenamiento.
- Resumen final.

Al terminar:

- Guardar ejercicios, series, peso, reps, RPE y notas.
- Calcular volumen.
- Calcular 1RM estimado.
- Detectar récords.
- Actualizar progreso.
- Escribir entrenamiento en Apple Health si hay permiso.

## 14. Biblioteca de ejercicios

Cada ejercicio debe guardar:

- Nombre.
- Músculo principal.
- Músculos secundarios.
- Material.
- Nivel.
- Tipo.
- Instrucciones.
- Errores comunes.
- Consejos.
- Alternativas.
- Riesgos.
- Imágenes anatómicas.
- Animación o vídeo.
- Historial personal.

Filtros:

- Músculo.
- Material.
- Nivel.
- Objetivo.
- Casa/gimnasio.
- Sin material.
- Lesiones.

## 15. Estilo visual de ejercicios

Las imágenes deben ser educativas, no decorativas.

Guía:

- Persona ejecutando el movimiento.
- Postura correcta.
- Inicio y final cuando aporte claridad.
- Músculos principales resaltados.
- Secundarios diferenciados.
- Etiquetas con líneas.
- Fondo limpio.
- Estilo anatómico semirrealista.
- Sin sexualización.
- Sin culturismo extremo.
- Misma paleta para toda la app.
- Formato vertical legible en móvil.

Cada ejercicio debe relacionarse con:

- image_main.
- image_start.
- image_end.
- animation_url.
- primary_muscles.
- secondary_muscles.
- labels.
- technique_cues.
- common_mistakes.

## 16. Nutrición

La app debe ofrecer orientación, no prescripción médica.

Debe incluir:

- Calorías diarias estimadas.
- BMR.
- TDEE.
- Ajuste por objetivo.
- Ajuste por Apple Health.
- Proteínas, carbohidratos y grasas.
- Agua.
- Menús orientativos.
- Recetas.
- Lista de compra.
- Sustituciones.
- Preferencias y alergias.
- Registro manual.
- Comidas frecuentes.
- Comparativa consumido vs gastado.

Aviso obligatorio: las recomendaciones son orientativas y no sustituyen a un profesional.

## 17. Comida por foto con IA

Flujo correcto:

1. Usuario sube o toma foto.
2. App pide contexto opcional: tamaño del plato, método de cocinado, aceite/salsas, comida cruda/cocinada.
3. IA detecta alimentos probables.
4. IA estima cantidades aproximadas.
5. App muestra resultado editable.
6. Usuario corrige alimentos y gramos.
7. Usuario confirma.
8. Solo entonces se guarda la comida.

La pantalla de revisión debe mostrar:

- Foto.
- Alimentos detectados.
- Confianza.
- Gramos estimados.
- Kcal.
- Proteína.
- Carbohidratos.
- Grasas.
- Botones para editar, añadir o borrar.
- Aviso visible: "Estimación aproximada, revisa antes de guardar."

Importante: una foto no permite saber el peso exacto. La app debe decirlo siempre.

## 18. Coach IA

Debe usar:

- Perfil.
- Objetivo.
- Rutina.
- Historial.
- Comidas.
- Peso.
- Sueño.
- Pasos.
- Recuperación.
- Datos de Apple Health.

Debe responder con prudencia:

- No diagnosticar.
- No recomendar dietas extremas.
- No fomentar obsesión por peso o calorías.
- Recomendar profesional si hay dolor, enfermedad o síntomas.

## 19. Progreso

Debe incluir:

- Peso.
- Medidas.
- Fotos.
- Entrenos completados.
- Volumen.
- 1RM.
- Series duras.
- Calorías.
- Pasos.
- Sueño.
- Agua.
- Hábitos.
- Cumplimiento semanal y mensual.

Gráficas:

- Peso.
- Fuerza.
- Volumen.
- Calorías.
- Pasos.
- Sueño.
- Hábitos.

## 20. Seguridad y privacidad

Obligatorio:

- Datos privados por usuario.
- Cifrado en tránsito.
- Control de acceso.
- Fotos privadas.
- Consentimiento HealthKit.
- Consentimiento cámara/galería.
- Borrado de cuenta.
- Borrado de fotos.
- Política de privacidad.
- Aviso legal.
- No vender datos.
- No usar fotos para entrenar modelos sin consentimiento explícito.

## 21. MVP funcional

Prioridad realista:

1. Migrar a React + TypeScript.
2. Añadir auth real.
3. Crear base de datos.
4. Onboarding persistente.
5. Dashboard por usuario.
6. Rutina inicial personalizada.
7. Rutinas por días y bloques.
8. Vista semanal.
9. Vista diaria.
10. Modo entrenamiento básico.
11. Registro de series.
12. Registro manual de comidas.
13. Peso y medidas.
14. Gráficas simples.
15. Ajustes y eliminación de cuenta.
16. Preparar arquitectura para app iOS y HealthKit.

No empezar por HealthKit ni comida por foto. Primero hay que tener usuarios, datos y rutinas reales.

## 22. Roadmap

Fase 1 - Base funcional:

- React/TypeScript.
- Auth.
- Base de datos.
- Perfil.
- Onboarding.
- Dashboard.

Fase 2 - Entrenamiento:

- Rutinas por días.
- Bloques.
- Plantillas.
- Editor.
- Vista semanal.
- Vista diaria.

Fase 3 - Modo entrenamiento:

- Registro de series.
- Pesos, reps, RPE.
- Temporizador.
- Historial.
- 1RM.
- Gráficas.

Fase 4 - Nutrición:

- Cálculos.
- Registro manual.
- Alimentos frecuentes.
- Agua.
- Recetas.
- Lista de compra.

Fase 5 - App iOS + HealthKit:

- Pasos.
- Calorías activas.
- Calorías en reposo.
- Sueño.
- Entrenamientos.
- Panel de datos reales.

Fase 6 - Coach IA:

- Chat.
- Recomendaciones.
- Fatiga.
- Estancamiento.
- Ajustes de rutina y comida.

Fase 7 - Comida por foto:

- Cámara.
- Galería.
- Análisis IA.
- Revisión editable.
- Guardado confirmado.
- Privacidad de fotos.

Fase 8 - Comunidad:

- Perfil público opcional.
- Amigos.
- Retos.
- Publicaciones.
- Moderación.

## 23. Riesgos principales

Producto:

- Intentar hacerlo todo a la vez.
- Confundir maqueta visual con app real.
- Crear IA sin datos persistentes.

Técnicos:

- HealthKit no funciona en web.
- Fotos requieren almacenamiento privado.
- IA de comida tiene margen de error.
- Sin backend no hay sincronización real.

Legales y salud:

- Datos de salud son sensibles.
- Hay que pedir consentimiento claro.
- No se deben vender datos.
- No se deben dar diagnósticos.
- Las calorías y macros son estimaciones.

## 24. Próximos pasos

Orden recomendado:

1. Crear rama de desarrollo.
2. Migrar la app estática a React + TypeScript.
3. Definir schema de Postgres.
4. Implementar auth.
5. Implementar onboarding real.
6. Guardar perfil por usuario.
7. Crear generador de rutina inicial.
8. Crear vista semanal por días.
9. Crear vista detalle por día.
10. Crear modo entrenamiento básico.
11. Guardar historial real.
12. Después añadir nutrición avanzada.
13. Después app iOS + HealthKit.
14. Después reconocimiento de comida por foto.

## 25. Fuentes y notas

- Versión actual de LiftLab: https://paco4gn.github.io/lyftaa/
- Referencia de estructura de rutinas: https://idyllic-cocada-ab1ef0.netlify.app/
- HealthKit requiere aplicación iOS nativa, no solo web.
- Para estimaciones energéticas se recomienda usar fórmulas reconocidas como Mifflin-St Jeor y ajustar con datos reales cuando estén disponibles.
- El reconocimiento de comida por imagen debe ser tratado como aproximación editable, nunca como medición exacta.
