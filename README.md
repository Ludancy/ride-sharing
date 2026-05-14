# WebRptos (Proyecto Base de Datos - Frontend)

Este proyecto es el Frontend (Cliente web) desarrollado en **Angular 16** para un sistema de gestión de repuestos y vehículos. Utiliza **Angular Material** para el diseño de la interfaz y la experiencia de usuario.

## Características Principales

*   **Autenticación**: Sistema de Login y Registro de usuarios, implementado con Guards para protección de rutas.
*   **Gestión de Perfiles**: Visualización y gestión de la información del usuario (`Perfil`).
*   **Sistema Central**: Acceso a la gestión de productos y sistema general (`Sistema`).
*   **Ingreso de Vehículos**: Módulo específico para el ingreso y control de vehículos o pedidos (disponible para usuarios con rol de administrador/nivel 3).
*   **Diseño Responsivo**: Interfaz adaptable a diferentes tamaños de pantalla, usando el sistema de Angular Material y CSS personalizado.

## Tecnologías Utilizadas

*   [Angular](https://angular.io/) (v16.0.4) - Framework Frontend principal.
*   [Angular Material](https://material.angular.io/) (v16.0.3) - Componentes de interfaz de usuario.
*   [RxJS](https://rxjs.dev/) - Programación reactiva y manejo de estado/eventos.
*   [SweetAlert2](https://sweetalert2.github.io/) - Alertas y notificaciones interactivas para una mejor UX.

## Requisitos Previos

Asegúrate de tener instalados en tu entorno de desarrollo:

*   [Node.js](https://nodejs.org/) (Versiones compatibles con Angular 16, preferiblemente Node v16 o v18).
*   [Angular CLI](https://angular.io/cli) instalado globalmente (`npm install -g @angular/cli@16`).

## Instalación y Ejecución

1. Abre una terminal en el directorio principal de este proyecto (`proyecto_base_datos-main`).
2. Instala las dependencias del proyecto a través de npm:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo local:

   ```bash
   npm start
   # o alternativamente: ng serve
   ```

4. Abre tu navegador web y dirígete a `http://localhost:4200/`. La aplicación se recargará de forma automática si realizas cambios en los archivos fuente.

## Estructura del Proyecto

*   `src/app/auth/`: Módulo encargado de la autenticación (login, registro, guards y servicios de autenticación).
*   `src/app/rptos/`: Módulo principal de repuestos y sistema, que incluye:
    *   `seccion-inicio`: Vista de inicio y perfil del usuario.
    *   `seccion-sistema`: Gestión de productos y sistema central.
    *   `seccion-pedidos`: Gestión e ingreso de vehículos/pedidos.
*   `src/app/shared/`: Componentes, directivas o pipes compartidos a lo largo de toda la aplicación.
*   `src/app/material/`: Módulo para la importación centralizada de los componentes de Angular Material.

## Comandos Útiles (Angular CLI)

*   **Generar estructura**: `ng generate component nombre-componente` (Puedes usar también `directive`, `pipe`, `service`, `class`, `guard`, `interface`, `module`).
*   **Compilación para Producción**: Ejecuta `npm run build` o `ng build`. Los archivos compilados y optimizados se generarán dentro de la carpeta `dist/`.
*   **Tests Unitarios**: Ejecuta `npm run test` o `ng test` para correr las pruebas mediante [Karma](https://karma-runner.github.io).
