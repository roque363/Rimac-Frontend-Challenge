# 🧩 Reto Técnico Frontend – RIMAC

Desarrollo de una aplicación **SPA (Single Page Application)** en **React + Vite + TypeScript**, basada en el diseño de Figma y las APIs proporcionadas por RIMAC.

---

## 🚀 Stack Tecnológico

- ⚛️ React + Vite + TypeScript
- 🎨 Sass (BEM Methodology)
- 🔄 React Router DOM
- 🧠 React Context API
- 🧪 Vitest + React Testing Library
- 🌐 Axios + Fetch API

---

## 🚀 Demo

Despliegue en AWS Amplify
🔗 **Deploy:** [https://main.dpkxxpqd7l7nq.amplifyapp.com/](https://main.dpkxxpqd7l7nq.amplifyapp.com/)

---

## Instalar dependencias

```
npm install
```

---

## Variables de entorno

Crea un archivo .env con:

```
VITE_PUBLIC_API_URL=https://rimac-front-end-challenge.netlify.app/api
```

---

## Modo desarrollo

Corremos el proyecto en nuestro ambiente local:

```
npm run dev
```

Aplicación disponible en:
👉 http://localhost:5173

---

## 🧠 Tecnologías y librerías utilizadas

| Librería / Framework  | Uso principal                                               |
| --------------------- | ----------------------------------------------------------- |
| **React 18 + Vite**   | Base SPA y build rápido                                     |
| **TypeScript**        | Tipado estricto y mejor mantenibilidad                      |
| **React Router DOM**  | Navegación entre vistas (Home → Plans → Summary)            |
| **Zod**               | Validación de formularios con tipos inferidos               |
| **Axios**             | Cliente HTTP con configuración centralizada e interceptores |
| **SASS (Modules)**    | Estilos con alcance local, variables y mixins               |
| **ESLint + Prettier** | Linter y formateador para mantener código limpio            |
| **AWS Amplify**       | Hosting, CI/CD y despliegue automático                      |

---

## 🧱 Estructura del Proyecto

```bash
src/
├─ assets/ # Íconos, imágenes, fuentes
├─ components/
│ ├─ common/ # Componentes globales (Header, Footer)
│ ├─ ui/ # Componentes atómicos reutilizables (Button, TextField, CheckBox, Stack, Select, etc.)
│ └─ domain/ # Componentes de negocio (QuoteTargetSelector, PlanCard, SummaryDetailsCard, etc.)
├─ context/ # Estado global (QuoteContext)
├─ hooks/ # Custom hooks (useUser, usePlans, useQuote)
├─ pages/
│ ├─ Home/
│ ├─ Plans/
│ └─ Summary/
├─ schemas/ # Validaciones (Zod)
├─ services/ # Integración con API (axiosInstance, user/plans services)
├─ types/ # Tipos TypeScript (DTO y domain)
├─ utils/ # Helpers/formatters
├─ main.tsx # Entry point
└─ vite.config.ts # Configuración Vite
```
