# 🎯 Programming Quiz App

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Una aplicación interactiva de examen sobre conceptos básicos de Linux, construida con tecnologías modernas de frontend.

[Demo](#) · [Reportar Bug](#) · [Solicitar Feature](#)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Personalización](#-personalización)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## ✨ Características

- ✅ **Interfaz Responsiva**: Diseño adaptable a todos los dispositivos con Tailwind CSS
- ⏱️ **Temporizador Inteligente**: Contador regresivo por examen con alertas visuales
- 📊 **Barra de Progreso**: Visualización en tiempo real del avance del examen
- 🔄 **Navegación Fluida**: Navega entre preguntas y revisa tus respuestas
- 🎲 **Preguntas Aleatorias**: Cada examen presenta las preguntas en orden diferente
- 📈 **Sistema de Calificación**: Retroalimentación inmediata con análisis de resultados
- 🎨 **UI Moderna**: Interfaz limpia y profesional con animaciones suaves
- ♿ **Accesible**: Diseño pensado en la experiencia de todos los usuarios

---

## 📸 Capturas de Pantalla

```
[Aquí irían las capturas de pantalla de tu aplicación]
```

---

## 🛠️ Tecnologías

Este proyecto está construido con:

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 18.3.1 | Biblioteca UI |
| **Vite** | 6.0.1 | Build tool y dev server |
| **Tailwind CSS** | 3.4.17 | Framework de estilos |
| **PostCSS** | 8.4.49 | Procesador CSS |
| **ESLint** | 9.17.0 | Linter de código |

---

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 16.0.0
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/programming-quiz-app.git
   cd programming-quiz-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   
   Visita [http://localhost:5173](http://localhost:5173)

---

## 💻 Uso

### Modo Desarrollo

```bash
npm run dev
```

El servidor se recargará automáticamente cuando hagas cambios en el código.

### Build de Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Previsualizar Build

```bash
npm run preview
```

Previsualiza la versión de producción localmente antes de desplegar.

---

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot reload |
| `npm run build` | Genera el build optimizado para producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta ESLint para revisar el código |

---

## 📁 Estructura del Proyecto

```
programming-quiz-app/
├── src/
│   ├── App.jsx              # Componente principal con lógica del quiz
│   ├── main.jsx             # Punto de entrada de la aplicación
│   └── index.css            # Estilos globales y directivas de Tailwind
├── public/                  # Archivos estáticos
├── index.html               # HTML principal
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind CSS
├── postcss.config.js       # Configuración de PostCSS
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

### Archivos Clave

- **`src/App.jsx`**: Contiene el componente `ProgrammingQuizApp` con toda la lógica del quiz, estado, y renderizado de la UI.
- **`src/index.css`**: Incluye las directivas de Tailwind (`@tailwind base`, `@tailwind components`, `@tailwind utilities`).
- **`vite.config.js`**: Configuración del bundler y servidor de desarrollo.
- **`tailwind.config.js`**: Personalización del framework CSS (colores, fuentes, etc.).

---

## 🎨 Personalización

### Agregar o Modificar Preguntas

Las preguntas están definidas en `src/App.jsx` en la constante `questions`:

```javascript
const questions = [
  {
    id: 1,
    question: "¿Qué comando se utiliza para listar archivos en Linux?",
    options: ["ls", "dir", "list", "show"],
    correctAnswer: 0
  },
  // Agrega más preguntas aquí...
];
```

**Formato de cada pregunta:**
- `id`: Identificador único
- `question`: Texto de la pregunta
- `options`: Array con las opciones de respuesta
- `correctAnswer`: Índice de la opción correcta (comenzando en 0)

### Personalizar Colores y Estilos

Edita `tailwind.config.js` para modificar el tema:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        // Tus colores personalizados...
      }
    }
  }
}
```

### Ajustar el Temporizador

En `src/App.jsx`, busca la inicialización del estado del tiempo:

```javascript
const [timeLeft, setTimeLeft] = useState(600); // 600 segundos = 10 minutos
```

Cambia el valor para ajustar la duración del examen.

---

## 🗺️ Roadmap

- [ ] Sistema de categorías de preguntas (Linux, Redes, Programación, etc.)
- [ ] Niveles de dificultad (Básico, Intermedio, Avanzado)
- [ ] Guardar historial de exámenes en localStorage
- [ ] Modo de práctica sin límite de tiempo
- [ ] Exportar resultados a PDF
- [ ] Tema oscuro/claro
- [ ] Soporte multi-idioma (i18n)
- [ ] Sistema de logros y badges
- [ ] Estadísticas detalladas de rendimiento
- [ ] API para cargar preguntas dinámicamente

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👤 Autor

**Tu Nombre**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)

---

## 🙏 Agradecimientos

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/)
- Inspiración y recursos de la comunidad open source

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella ⭐**

Hecho con ❤️ y ☕

</div>
