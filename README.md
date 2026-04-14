
# Fitness Frontend

Bienvenido al repositorio de Fitness Frontend, una aplicación web moderna y responsiva diseñada para ayudar a los usuarios a gestionar sus actividades físicas y recibir recomendaciones personalizadas.

## Tabla de Contenidos

- [Fitness Frontend](#fitness-frontend)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Descripción del Proyecto](#descripción-del-proyecto)
  - [Características](#características)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
  - [Cómo Empezar](#cómo-empezar)
    - [Pre-requisitos](#pre-requisitos)
    - [Instalación](#instalación)
  - [Variables de Entorno](#variables-de-entorno)
  - [Scripts Disponibles](#scripts-disponibles)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Clientes API](#clientes-api)
    - [`apiClient.ts`](#apiclientts)
    - [`keycloakClient.ts`](#keycloakclientts)
  - [Servicios](#servicios)
  - [Componentes](#componentes)
  - [Páginas](#páginas)
  - [Hooks](#hooks)
  - [Contextos](#contextos)
  - [Tipos](#tipos)
  - [Contribuciones](#contribuciones)

## Descripción del Proyecto

Fitness Frontend es la interfaz de usuario para una plataforma de fitness completa. Permite a los usuarios registrarse, iniciar sesión, registrar sus actividades físicas diarias, ver su progreso y obtener recomendaciones de ejercicios basadas en sus datos. La aplicación se integra con un backend a través de una API gateway y utiliza Keycloak para la autenticación y autorización.

## Características

- **Autenticación de Usuarios:** Registro e inicio de sesión seguros utilizando Keycloak (OAuth 2.0 con PKCE).
- **Gestión de Perfil:** Los usuarios pueden ver y actualizar su información de perfil.
- **Registro de Actividades:** Formulario para que los usuarios registren sus actividades físicas, incluyendo tipo, duración, intensidad y calorías quemadas.
- **Listado de Actividades:** Visualización de un historial de todas las actividades registradas.
- **Recomendaciones Personalizadas:** Tarjetas de recomendación de ejercicios que los usuarios pueden ver y gestionar.
- **Diseño Responsivo:** Interfaz de usuario adaptable a diferentes tamaños de pantalla, desde dispositivos móviles hasta ordenadores de escritorio.
- **Protección de Rutas:** Rutas privadas que solo son accesibles para usuarios autenticados.

## Tecnologías Utilizadas

- **React 19:** Biblioteca para construir interfaces de usuario.
- **Vite:** Herramienta de desarrollo frontend rápida.
- **TypeScript:** Superset de JavaScript que añade tipado estático.
- **React Router DOM v7:** Para el enrutamiento en la aplicación.
- **Tailwind CSS:** Framework de CSS para un diseño rápido y personalizable.
- **Axios:** Cliente HTTP para realizar peticiones a la API.
- **Keycloak JS:** Adaptador de Keycloak para aplicaciones JavaScript.
- **React Hook Form & Zod:** Para la gestión y validación de formularios.
- **React Icons:** Biblioteca de iconos.
- **React Toastify:** Para mostrar notificaciones.
- **ESLint:** Para el linting del código.

## Cómo Empezar

Sigue estas instrucciones para tener una copia del proyecto funcionando en tu máquina local para desarrollo y pruebas.

### Pre-requisitos

Asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión 20.x o superior)
- [npm](https://www.npmjs.com/) (normalmente viene con Node.js)

### Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/NarenImbachi/fitness-frontend
    cd fitness-frontend
    ```

2.  **Instala las dependencias:**

    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**

    Crea un archivo `.env.local` en la raíz del proyecto copiando el archivo de ejemplo `.env.example`:

    ```bash
    cp .env.example .env.local
    ```

    Abre el archivo `.env.local` y asegúrate de que las variables apunten a las URLs correctas de tu backend y Keycloak.

4.  **Ejecuta la aplicación en modo de desarrollo:**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

## Variables de Entorno

El archivo `.env.local` contiene las siguientes variables de entorno necesarias para que la aplicación funcione correctamente:

- `VITE_GATEWAY_URL`: La URL base de la API gateway del backend.
- `VITE_KEYCLOAK_URL`: La URL de tu instancia de Keycloak.
- `VITE_KEYCLOAK_REALM`: El realm de Keycloak que estás utilizando.
- `VITE_KEYCLOAK_CLIENT_ID`: El ID del cliente de Keycloak configurado para esta aplicación.
- `VITE_KEYCLOAK_REDIRECT_URI`: La URI de redirección después de un inicio de sesión exitoso.

## Scripts Disponibles

En el archivo `package.json`, puedes encontrar los siguientes scripts:

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila la aplicación para producción.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de problemas.
- `npm run preview`: Inicia un servidor local para previsualizar la build de producción.

## Estructura del Proyecto

El proyecto sigue una estructura organizada para facilitar la mantenibilidad y escalabilidad:

```
src/
├── api/
│   ├── apiClient.ts         # Cliente Axios configurado para la API.
│   └── keycloakClient.ts    # Instancia y configuración de Keycloak.
│   └── services/            # Servicios para interactuar con los endpoints de la API.
├── assets/                  # Archivos estáticos como imágenes y logos.
├── components/              # Componentes de React reutilizables.
├── contexts/                # Contextos de React para el estado global.
├── hooks/                   # Hooks de React personalizados.
├── pages/                   # Componentes que representan las páginas de la aplicación.
├── types/                   # Definiciones de tipos y esquemas de Zod.
├── App.css                  # Estilos globales para la aplicación.
├── App.tsx                  # Componente principal de la aplicación y configuración de rutas.
├── index.css                # Estilos base (Tailwind CSS).
└── main.tsx                 # Punto de entrada de la aplicación.
```

## Clientes API

### `apiClient.ts`

Este archivo configura una instancia de `axios` que se utiliza en toda la aplicación para comunicarse con el backend. Incluye un interceptor para añadir automáticamente el token de autenticación de Keycloak a cada solicitud.

### `keycloakClient.ts`

Aquí se inicializa el cliente de Keycloak con la configuración extraída de las variables de entorno. Este cliente se utiliza para gestionar todo el flujo de autenticación.

## Servicios

Los servicios en `src/api/services/` encapsulan la lógica para realizar peticiones a los diferentes endpoints de la API.

- **`activityService.ts`:** Funciones para crear y obtener actividades.
- **`recommendationsService.ts`:** Funciones para obtener y gestionar recomendaciones.
- **`userService.ts`:** Funciones para interactuar con los datos del perfil del usuario.

## Componentes

Los componentes reutilizables se encuentran en `src/components/`.

- **`ActivityForm.tsx`:** Formulario para registrar nuevas actividades.
- **`ActivityList.tsx`:** Muestra una lista de actividades del usuario.
- **`MainLayout.tsx`:** Layout principal que incluye el `Navbar` y el contenido de la página.
- **`Navbar.tsx`:** Barra de navegación superior.
- **`ProtectedRoute.tsx`:** Componente de orden superior para proteger rutas.
- **`RecommendationCard.tsx`:** Tarjeta para mostrar una recomendación.
- **`RecommendationModal.tsx`:** Modal para ver los detalles de una recomendación.

## Páginas

Las páginas de la aplicación se encuentran en `src/pages/`.

- **`ActivitiesPage.tsx`:** Página para ver y registrar actividades.
- **`DashboardPage.tsx`:** Panel principal para usuarios autenticados.
- **`HomePage.tsx`:** Página de inicio pública.
- **`LoginPage.tsx`:** Página de inicio de sesión (redirige a Keycloak).
- **`ProfilePage.tsx`:** Página de perfil del usuario.
- **`RecommendationsPage.tsx`:** Página para ver las recomendaciones.
- **`RegisterPage.tsx`:** Página de registro (redirige a Keycloak).

## Hooks

Los hooks personalizados en `src/hooks/` abstraen la lógica y el estado.

- **`useActivities.ts`:** Hook para gestionar el estado de las actividades.
- **`useAuth.ts`:** Hook para acceder al contexto de autenticación.
- **`useProfile.ts`:** Hook para gestionar el estado del perfil del usuario.
- **`useRecommendations.ts`:** Hook para gestionar el estado de las recomendaciones.

## Contextos

El contexto en `src/contexts/` proporciona un estado global.

- **`AuthContext.tsx`:** Proporciona información sobre el estado de autenticación y el perfil del usuario a toda la aplicación.

## Tipos

Las definiciones de tipos y esquemas se encuentran en `src/types/`.

- **`index.ts`:** Exporta todos los tipos para un fácil acceso.
- **`schemas.ts`:** Contiene esquemas de `Zod` para la validación de datos, especialmente en formularios.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3.  Realiza tus cambios y haz commit (`git commit -am 'Añade nueva característica'`).
4.  Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5.  Abre un Pull Request.

