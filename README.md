#Proyecto Integrador - Módulo 4: Aplicación de Gestión de Tareas

Aplicación web interactiva para la gestión de tareas personales en tiempo real con autenticación de usuarios, persistencia en la nube y alertas por correo electrónico.

#Tecnologías Utilizadas

- Frontend: React, TypeScript, Vite.
- Base de Datos & Auth: Firebase Firestore (sincronización en tiempo real con `onSnapshot`) y Firebase Authentication.
- Backend / Serverless: Vercel Serverless Functions (`/api/send-email`).
- Notificaciones: AWS SES (Simple Email Service).
- Testing: Vitest, React Testing Library, jsdom.
- Despliegue: Vercel.

---

#Seguridad e Integración con AWS SES

Para evitar la exposición de credenciales sensibles en el cliente (`VITE_AWS_ACCESS_KEY_ID`, `VITE_AWS_SECRET_ACCESS_KEY`), se migró la integración del SDK de AWS SES desde el frontend hacia una *Serverless Function de Vercel* en la ruta `api/send-email.ts`.

- Las claves de AWS están protegidas de manera totalmente segura como variables de entorno privadas en el panel de Vercel (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).
- El cliente React envía únicamente peticiones HTTP POST al endpoint seguro `/api/send-email`.

---

#Sincronización en Tiempo Real y CRUD Completo

- Lectura en tiempo real: Se implementó `onSnapshot` en el custom hook `useTasks.ts` para reflejar instantáneamente cualquier cambio en la lista de tareas sin recargar la página.
- CRUD Operativo: Los usuarios pueden crear, listar, marcar como completadas, eliminar y editar el título y la descripción de sus tareas registradas.

---

#Uso de Inteligencia Artificial Pruebas Unitarias y de Componentes

El proyecto cuenta con una suite de pruebas automáticas configurada con *Vitest* y *React Testing Library*.

Para ejecutar las pruebas unitarias en tu entorno local:

```bash
npx vitest run
```

---

#Uso de Inteligencia Artificial en el Desarrollo

Durante el desarrollo de este proyecto se utilizó asistencia de Inteligencia Artificial para agilizar la integración de servicios en la nube, resolver configuraciones y acelerar el despliegue:

* IA de Antigravity: Se utilizó para guiar la verificación de las identidades de correo electrónico (emisor y receptor) en Amazon Simple Email Service (AWS SES), garantizando la entrega correcta de los resúmenes por email.
* Gemini: Se utilizó para la gestión y actualización de las variables de entorno de Firebase con sus valores correspondientes, así como para la generación, configuración y vinculación de las credenciales y variables de entorno de AWS dentro de Vercel.
---

#Configuración e Instalación Local

 Clonar el repositorio: Descarga una copia del código fuente desde GitHub a tu equipo local.
   ```bash
   git clone [https://github.com/more-004/Proyecto-Integrador-M04.git](https://github.com/more-004/Proyecto-Integrador-M04.git)
   cd Proyecto-Integrador-M04
```

---


1. Instalar las dependencias: Descarga todas las librerías necesarias del proyecto (node_modules).

```bash
npm install
```

2. Configurar variables de entorno: Crea un archivo .env en la raíz con las credenciales públicas de Firebase para conectar la app local con la base de datos.

VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

3. Iniciar el servidor de desarrollo: Levanta la aplicación en el entorno local.

```bash
npm run dev
```

---

Despliegue en producción: https://proyecto-integrador04ledesmamorena.vercel.app