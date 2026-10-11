# modelo-web-1bloque-movil

**Skin / template de landing page e-commerce 3D** — una página de presentación completa, responsive y animada, diseñada para aplicarse a cualquier proyecto cambiando solo un archivo de configuración.

---

## 🎯 ¿Qué hace este skin?

- Canvas fijo 1172×657 px escalado con `transform: scale(--k)` para mantener la precisión pixel-perfect en desktop.
- **3 breakpoints** (desktop >1080, tablet 701–1080, phone ≤700) reusando **los mismos nodos DOM** — cero duplicación de markup.
- Carrusel **3D real** con perspectiva (`R = 891`), culling ±42°, brillo dinámico por ángulo, loop continuo a 60fps.
- Mock de navegador con "tienda" funcional (hero banner, grid de 4 productos, strip de beneficios).
- Type-fitter casero: alineación óptica de texto (cap-height + ink-width) sin dependencias.
- Animaciones nativas con **Web Animations API** (sin GSAP/anime.js), fallback `prefers-reduced-motion`.
- Código comentado por secciones numeradas (0-12) con contratos de píxel documentados.

---

## 🚀 Inicio rápido

```bash
# 1. Instala dependencias (solo Vite como devDependency)
npm install

# 2. Desarrollo con hot-reload
npm run dev

# 3. Build de producción (minifica, hashea assets, inyecta en HTML)
npm run build

# 4. Previsualiza el build
npm run preview
```

> **Nota:** El skin funciona también sin build — abre `index.html` directo en el navegador. El build solo minifica y optimiza.

---

## 🎨 Personalización (lo único que tocas normalmente)

### 1. `config.js` — **todo el contenido**

```js
// Ejemplo: cambia la marca
SKIN_CONFIG.apply({
  brand: { wordmark: 'MI-MARCA', wordmarkKicker: 'SHOPS' },
  hero: {
    badge: 'Mi eslogan personalizado',
    h1a: 'Titulo principal',
    h1b: 'Subtitulo',
    sub1: { bold: 'Lead ', tag: 'TAG', tail: ' tail' },
    sub2: 'Segunda línea.'
  },
  nav: {
    cta: { label: 'Empezar', href: '/registro' },
    links: [ { label: 'Inicio', href: '/' }, ... ]
  },
  carousel: {
    shots: [
      { url: 'https://mi-cdn.com/img1.jpg', variant: 'pay' },
      { url: 'https://mi-cdn.com/img2.jpg', variant: 'plain', caption: 'NUEVO' },
      ...
    ]
  }
  // shop, action, etc.
});
```

- **Imágenes**: usa rutas relativas o absolutas. Las que empiezan con `~/` se resuelven contra `IMG_BASE` (configurable en `config.js`).
- **Variants de carrusel**: `pay | launch | shop | brand | frete | power | off | plain`.

### 2. Variables CSS (`:root` en `styles.css`) — **tema visual**

```css
:root {
  --brand-primary: #0a86d8;       /* cyan principal */
  --brand-accent: #e5202f;        /* rojo de acento */
  --bg-deep: #020204;             /* fondo oscuro */
  --text-main: #ffffff;
  --font-ui: "Poppins", system-ui;
  --font-serif: "Playfair Display", serif;
}
```

Sobreescribe añadiendo `style="--brand-primary: #tu-color"` en `<html>` o con una hoja de estilos posterior.

---

## 📁 Estructura del proyecto

```
modelo-web-1bloque-movil/
├── index.html       # HTML semántico limpio (vacía el contenido hardcodeado)
├── config.js        # ← EDITA ESTO: marca, textos, enlaces, imágenes, productos
├── styles.css       # CSS con :root theme variables + media queries
├── app.js           # Motor: hidrata DOM, type-fitter, carousel 3D, responsive
├── package.json     # Scripts dev/build con Vite
├── LICENSE          # MIT
└── README.md        # Este archivo
```

---

## 🧩 Cómo integrar en tu proyecto

### Opción A: Copiar-pegar (recomendado para landing aislada)

Copia los 4 archivos (`index.html`, `config.js`, `styles.css`, `app.js`) a tu repo, edita `config.js` y listo.

### Opción B: Submódulo / paquete npm

```bash
npm install github:tu-usuario/modelo-web-1bloque-movil
```

Y en tu entry point:

```js
import 'modelo-web-1bloque-movil/config.js';  // expone window.SKIN_CONFIG
import 'modelo-web-1bloque-movil/styles.css';
import 'modelo-web-1bloque-movil/app.js';
```

Luego llama `SKIN_CONFIG.apply({ ... })` antes de que el DOM esté listo.

---

## 🖼️ Assets recomendados

- **Imágenes del carrusel**: 130×300 px (ratio 13:30), WebP/AVIF, < 50 KB cada una.
- **Imágenes del mock**: hero 842×158 px, productos 130×135 px (4:3).
- **Self-host de fuentes** (producción): descarga Poppins + Playfair Display, sirve como `woff2`, actualiza `@font-face` en `styles.css` y elimina el `<link>` a Google Fonts.

---

## ♿ Accesibilidad

- Semántica: `<nav>`, `<main>` implícito, botones con `aria-label`, SVGs decorativos con `aria-hidden`.
- Focus visible en todos los interactivos.
- `prefers-reduced-motion` desactiva entrada + loop del carrusel.
- Contraste AA en modo default (fondo `#020204` / texto `#fff`).

> Pendiente: skip link, landmark `<main>` explícito, auditoría completa con axe-core.

---

## 📦 Build & Deploy

```bash
npm run build   # genera dist/ con assets hasheados, HTML minificado
```

`dist/` es estático → sube a Netlify, Vercel, Cloudflare Pages, GitHub Pages, cualquier CDN.

### Headers recomendados (Netlify `_headers` / Vercel `vercel.json`)

```
/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

## 🛠️ Extender / Hackear

| Quieres…                              | Dónde tocar                          |
|---------------------------------------|--------------------------------------|
| Añadir nuevo variant de carrusel      | `app.js → creative()` + CSS `.cv`    |
| Cambiar número de tarjetas del anillo | `config.js → carousel.count`         |
| Añadir breakpoint                     | `styles.css` + `app.js → resize()`   |
| Cambiar easing de entrada             | `app.js → EXPO / SOFT` constants     |
| Internacionalizar textos              | `config.js` → estructura por locale  |

---

## 📄 Licencia

MIT — ver [`LICENSE`](LICENSE). Úsalo, modifícalo, inclúyelo en proyectos comerciales sin atribución obligatoria (aunque se agradece ⭐).

---

## 🙋‍♂️ Créditos

- **Diseño & código original**: Jorge Sanchez
- **Fuentes**: [Poppins](https://fonts.google.com/specimen/Poppins) & [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (Google Fonts)
- **Imágenes demo**: bucket CloudFront de ejemplo (reemplaza en `config.js`)
- **Inspiración**: landing pages modernas de e-commerce (Linear, Vercel, Stripe)

---

> **¿Problemas / ideas?** Abre un issue o PR. El skin está hecho para ser forkado y adaptado.