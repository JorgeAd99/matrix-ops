<div align="center">
  <br />
  <div style="background: linear-gradient(135deg, #c2884d 0%, #d4a96a 100%); width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(194,136,77,0.3); margin: 0 auto;">
    <h1 style="color: white; margin: 0; font-family: monospace; font-size: 40px; line-height: 1;">M</h1>
  </div>
  <br />
  
  <h1>Matrix Ops v2.0</h1>
  <p>
    <strong>Una suite matemática completa, elegante y profesional.</strong>
  </p>

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React" /></a>
    <a href="https://plotly.com/javascript/"><img src="https://img.shields.io/badge/Plotly-2D%2F3D-orange?style=flat-square&logo=plotly" alt="Plotly" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript" alt="TypeScript" /></a>
  </p>
</div>

---

## ✨ Novedades en la v2.0

Matrix Ops ha evolucionado de ser una simple calculadora a una **plataforma educativa completa**, con un diseño fuertemente inspirado en la estética minimalista y cálida de Claude (tonos piedra y ámbar, tipografía DM Sans, y efectos de glassmorphism).

### 🧮 Calculadora Matricial Avanzada
Realiza cálculos instantáneos de álgebra lineal con soporte completo para fracciones y decimales:
- **Operaciones de una matriz:** Determinante, Inversa, Transpuesta, Traza, Rango, Forma Escalonada (RREF), Multiplicación por Escalar y Potencia.
- **Operaciones de dos matrices:** Suma, Resta y Multiplicación de matrices $A \times B$.

### 📈 Graficadora 2D y 3D Integrada
Un potente motor gráfico impulsado por `Plotly.js` y `mathjs` que te permite escribir ecuaciones dinámicas:
- **Curvas 2D:** Visualiza funciones $f(x)$ con trazados de alta calidad sobre papel milimetrado.
- **Superficies 3D:** Modela funciones multivariables $f(x, y)$ en un espacio tridimensional completamente rotable.

### 📚 Centro de Material Didáctico
Aprende la teoría detrás de los cálculos. Esta nueva sección incluye un renderizador de **Markdown** con soporte para matemáticas (Remark/KaTeX), lo que permite subir apuntes y explicaciones directo desde la carpeta del proyecto.

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js (App Router) + React
- **Estilos:** Vanilla CSS Avanzado (Variables CSS globales, Flexbox/Grid, Animaciones CSS)
- **Matemáticas:** `mathjs` para parseo de ecuaciones y fracciones exactas.
- **Gráficos:** `plotly.js-dist-min` embebido dinámicamente sin SSR para máxima compatibilidad.
- **Iconografía:** `lucide-react`

---

## 🚀 Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/JorgeAd99/matrix-ops.git
   cd matrix-ops
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

---

## 📖 Cómo agregar Material Didáctico

Agregar contenido educativo es extremadamente fácil.
1. Crea un archivo `.md` (ej. `mi-clase.md`) dentro de la carpeta `/content/material/`.
2. Añade la cabecera (Frontmatter) al inicio del archivo:
   ```markdown
   ---
   title: "Introducción a los Determinantes"
   date: "2026-04-20"
   excerpt: "Una guía rápida sobre cómo calcular el determinante de una matriz 3x3."
   ---
   
   Aquí va el contenido de tu clase...
   ```
3. ¡Listo! Aparecerá automáticamente en la sección de "Material Didáctico" en la app.

---

<div align="center">
  Hecho con 🧡 para el aprendizaje del Álgebra Lineal.
</div>
