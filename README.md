// ...existing code...
# Programming Quiz App con Tailwind + Vite + React

Aplicación de examen interactivo sobre conceptos básicos de Linux creada con React, Vite y Tailwind CSS.

## Características
- Interfaz responsiva y estilizada con Tailwind CSS.
- Temporizador por examen y barra de progreso.
- Navegación entre preguntas y revisión de resultados.
- Reinicio del examen con preguntas aleatorias.

## Estructura relevante
- Código principal de la UI: [`ProgrammingQuizApp`](src/App.jsx) ([src/App.jsx](src/App.jsx))
- Punto de entrada: [src/main.jsx](src/main.jsx)
- Estilos Tailwind: [src/index.css](src/index.css)
- Configuración de Vite: [vite.config.js](vite.config.js)
- Configuración de Tailwind: [tailwind.config.js](tailwind.config.js)
- Configuración PostCSS: [postcss.config.js](postcss.config.js)
- HTML de la app: [index.html](index.html)
- Scripts y dependencias: [package.json](package.json)

## Cómo ejecutar (desarrollo)
1. Instalar dependencias:
   ```sh
   npm install
   ```
2. Iniciar servidor de desarrollo:
   ```sh
   npm run dev
   ```
3. Abrir en el navegador la URL que Vite muestre (por defecto http://localhost:5173).

## Scripts útiles
- npm run dev — servidor de desarrollo
- npm run build — build de producción (dist)
- npm run preview — previsualizar build

## Cómo editar las preguntas
Las preguntas y opciones están en [src/App.jsx](src/App.jsx) en la constante `questions` (editar directamente para añadir/modificar preguntas). Ver también el componente principal [`ProgrammingQuizApp`](src/App.jsx).

## Notas
- Proyecto configurado como ESM ("type": "module") en [package.json](package.json).
- Tailwind ya está integrado: revisa [tailwind.config.js](tailwind.config.js) y [postcss.config.js](postcss.config.js).
