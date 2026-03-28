# Hernán — Masajista Funcional · Pitch Deck Interactivo

Sitio estático multi-presentación con scroll animado, listo para Vercel.

## 📁 Estructura

```
/
├── index.html                    → Menú/landing con cards
├── vercel.json                   → Rewrites para URLs limpias
├── shared/
│   ├── css/base.css              → Estilos compartidos (reset, layout, mockups, KPIs)
│   └── js/core.js                → Funciones compartidas (contadores, videos, scroll)
├── brands/
│   └── hernan/
│       ├── index.html            → Presentación completa
│       ├── css/theme.css         → Identidad visual de la marca
│       ├── js/main.js            → Lógica específica + animaciones GSAP
│       └── assets/               →![Uploading DSC03958.jpg…]()

└── data/
    └── hernan.json               → Datos dinámicos (KPIs, reseñas, servicios)
```

## 🚀 Deploy en Vercel

### Opción 1: Vercel CLI
```bash
npm i -g vercel
cd hernan-masaje
vercel --prod
```

### Opción 2: Vercel Dashboard
1. Subir carpeta a GitHub
2. Ir a vercel.com → New Project → Importar repositorio
3. Framework Preset: **Other** (sitio estático)
4. Build Command: dejar vacío
5. Output Directory: dejar vacío o `.`
6. Deploy ✓

## 🎨 Añadir imágenes reales

Coloca imágenes y videos en `/brands/hernan/assets/`:
- `hero-bg.jpg` → Foto de fondo del hero
- `profile.jpg` → Foto de Hernán
- `video-1.mp4`, `video-2.mp4`, `video-3.mp4` → Videos de Instagram

Luego actualiza el HTML del hero y los mockups para referenciar estas rutas:
```html
<!-- En hero -->
<img src="/brands/hernan/assets/hero-bg.jpg" class="hero__bg-img" alt="Hernán masaje">

<!-- En phone mockup -->
<video src="/brands/hernan/assets/video-1.mp4"></video>
```

## 🎯 Personalización

### Cambiar colores (theme.css)
```css
:root {
  --c-accent: #c8a96e;    /* Color dorado principal */
  --c-bg:     #070707;    /* Fondo premium gold */
}
```

### Actualizar datos (hernan.json)
Edita `/data/hernan.json` para cambiar KPIs, reseñas, servicios, datos del gráfico.


## 📦 Stack

- **HTML + CSS + JavaScript vanilla** — sin npm, sin build
- **GSAP 3 + ScrollTrigger** (CDN) — animaciones scroll
- **Chart.js 4** (CDN) — gráfico de crecimiento
- **Google Fonts** — Playfair Display + DM Sans + Space Mono
- **Vercel** — hosting estático

## 🔗 URLs

- `/` → Landing con todas las presentaciones
- `/brands/hernan/` → Presentación Hernán Masajista Funcional
- `/hernan` → Alias (via rewrite)
