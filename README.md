# Gestión de Tareas (Task Manager)

Aplicación web para la gestión de tareas diarias desarrollada con React, TypeScript y Vite. Permite a los usuarios organizar sus pendientes y enviar un informe con el resumen de sus tareas directamente a su correo electrónico mediante la integración con **AWS SES (Simple Email Service)**.

---

 Características

* **Gestión de tareas:** Crear, marcar como completadas y eliminar tareas en tiempo real.
* **Autenticación:** Gestión de sesiones de usuario.
* **Notificaciones por email:** Envío de resúmenes de tareas directamente a la bandeja de entrada del usuario utilizando AWS SES SDK v3.

---

 Tecnologías Utilizadas

* **Frontend:** React 19, TypeScript, Vite
* **Servicios Cloud:** AWS SDK para JavaScript (`@aws-sdk/client-ses`)
* **Autenticación y Almacenamiento:** Firebase

---

 Requisitos Previos

1. **Node.js** (versión 18 o superior).
2. Una cuenta activa en **Amazon Web Services (AWS)**.
3. Un usuario en **AWS IAM** con la política `AmazonSESFullAccess` adjunta.
4. Una identidad de correo electrónico verificada en **Amazon SES** (se requiere verificar tanto el correo remitente como los de prueba si la cuenta de AWS SES sigue en modo *Sandbox*).

---

 Configuración del Entorno (`.env`)

Crea un archivo `.env` en la raíz de tu proyecto basándote en la siguiente estructura e ingresa tus credenciales de AWS:

```env
# Configuración de AWS SES (Vite exige el prefijo VITE_)
VITE_AWS_ACCESS_KEY_ID=tu_access_key_id
VITE_AWS_SECRET_ACCESS_KEY=tu_secret_access_key
VITE_AWS_REGION=us-east-2
VITE_SENDER_EMAIL=tu_email_verificado@gmail.com

Aqui tienes el texto completo en formato Markdown. Copia y pega todo el contenido directamente en tu archivo `README.md`:

```markdown
# Gestión de Tareas (Task Manager)

Aplicación web para la gestión de tareas diarias desarrollada con React, TypeScript y Vite. Permite a los usuarios organizar sus pendientes y enviar un informe con el resumen de sus tareas directamente a su correo electrónico mediante la integración con **AWS SES (Simple Email Service)**.

---

## 🚀 Características

* **Gestión de tareas:** Crear, marcar como completadas y eliminar tareas en tiempo real.
* **Autenticación:** Gestión de sesiones de usuario.
* **Notificaciones por email:** Envío de resúmenes de tareas directamente a la bandeja de entrada del usuario utilizando AWS SES SDK v3.

---

## 🛠️ Tecnologías Utilizadas

* **Frontend:** React 19, TypeScript, Vite
* **Servicios Cloud:** AWS SDK para JavaScript (`@aws-sdk/client-ses`)
* **Autenticación y Almacenamiento:** Firebase

---

## 📋 Requisitos Previos

1. **Node.js** (versión 18 o superior).
2. Una cuenta activa en **Amazon Web Services (AWS)**.
3. Un usuario en **AWS IAM** con la política `AmazonSESFullAccess` adjunta.
4. Una identidad de correo electrónico verificada en **Amazon SES** (se requiere verificar tanto el correo remitente como los de prueba si la cuenta de AWS SES sigue en modo *Sandbox*).

---

## ⚙️ Configuración del Entorno (`.env`)

Crea un archivo `.env` en la raíz de tu proyecto basándote en la siguiente estructura e ingresa tus credenciales de AWS:

```env
# Configuración de AWS SES (Vite exige el prefijo VITE_)
VITE_AWS_ACCESS_KEY_ID=tu_access_key_id
VITE_AWS_SECRET_ACCESS_KEY=tu_secret_access_key
VITE_AWS_REGION=us-east-2
VITE_SENDER_EMAIL=tu_email_verificado@gmail.com

```

> **Nota de seguridad:** Nunca compartas ni subas tu archivo `.env` a repositorios públicos como GitHub. Verifica que esté incluido en el archivo `.gitignore`.

---


**Acceder a la aplicación:**
Abre tu navegador e ingresa a `http://localhost:5173`.

---

 Uso de la Funcionalidad de Email

1. Inicia sesión en la aplicación.
2. Agrega las tareas que deseas gestionar.
3. Haz clic en el botón **"Enviar resumen por email"**.
4. Revisa tu bandeja de entrada (o la carpeta de *Spam / Correo no deseado* si es la primera vez que recibes un correo desde la cuenta de prueba de AWS).

```

```