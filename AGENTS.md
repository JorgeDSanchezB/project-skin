# AGENTS.md — Skin E-commerce 3D Landing Page

> **Guía completa para agentes/desarrolladores** que trabajen con este skin/template.
> Documenta arquitectura, decisiones, cómo personalizar, y workflows de desarrollo.

---

## 1. Resumen del Proyecto

**modelo-web-1bloque-movil** es un **skin/template reutilizable** de landing page para e-commerce, con:

- Canvas fijo 1172×657 px escalado vía `transform: scale(--k)` (pixel-perfect en desktop)
- **3 breakpoints** (desktop >1080, tablet 701–1080, phone ≤700) reusando **los mismos nodos DOM**
- Carrusel **3D real** con perspectiva (`R = 891`), culling ±42°, brillo dinámico, loop 60fps
- Mock de navegador con "tienda" (hero banner, grid 4 productos, strip beneficios)
- Type-fitter casero (alineación óptica cap-height + ink-width, sin deps)
- Animaciones nativas **Web Animations API** (sin GSAP/anime.js), fallback `prefers-reduced-motion`
- Código comentado por secciones numeradas (0-12) con contratos de píxel documentados

**Stack:** Vanilla JS (ES modules), CSS custom properties, Vite 5 para build/dev.

---

## 2. Estructura de Archivos

```
modelo-web-1bloque-movil/
├── index.html          # HTML semántico limpio, carga via ES modules
├── config.js           # ← ÚNICO ARCHIVO QUE SE EDITA PARA UN NUEVO PROYECTO
├── styles.css          # CSS con :root theme variables para re-skinning
├── app.js              # Motor: hidrata DOM, type-fitter, carousel 3D, responsive
├── package.json        # Scripts: dev / build / preview
├── vite.config.js      # (opcional, usa defaults de Vite)
├── README.md           # Documentación user-facing
├── LICENSE             # MIT
└── AGENTS.md           # Este archivo
```

---

## 3. Arquitectura y Flujo de Datos

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  config.js  │────▶│   app.js    │────▶│   DOM/HTML  │
│  (CONFIG)   │     │  (ENGINE)   │     │  (RENDER)   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────┐
│                    styles.css                       │
│         (:root theme variables + media queries)     │
└─────────────────────────────────────────────────────┘
```

### 3.1 `config.js` — Single Source of Truth

Exporta `SKIN_CONFIG` (ES module + global `window.SKIN_CONFIG` para compat).

**Estructura principal:**
```js
{
  brand: { title, lang, wordmark, wordmarkKicker },
  nav: { cta: {label,href}, links: [{label,href},...] },
  hero: { badge, h1a, h1b, sub1:{bold,tag,tail}, sub2, cta:{label,href} },
  action: { enabled, label, href, icon },
  carousel: { radius, count, speed, cull, shots: [{url,variant,caption?},...] },
  shop: { browserTitle, announcement, name, tagline,
          hero: {img,imgAlt,kicker,title,cta},
          sectionTitle, sectionLink,
          products: [{img,imgAlt,name,desc,price,oldPrice,tag},...],
          strip: [string,...] }
}
```

**Variants de carrusel:** `pay | launch | shop | brand | frete | power | off | plain`

**Imágenes:** URLs que empiezan con `~/` se resuelven contra `IMG_BASE` (configurable en la parte superior de `config.js`).

### 3.2 `styles.css` — Theme Variables

Todas las decisiones visuales centralizadas en `:root`:

```css
:root {
  --brand-primary: #0a86d8;
  --brand-primary-light: #35d8ff;
  --brand-primary-bright: #8ef4ff;
  --brand-accent: #e5202f;
  --brand-whatsapp: #25d366;
  --bg-deep: #020204;
  --text-main: #ffffff;
  --text-muted: #a9aeb5;
  --border-subtle: rgba(255,255,255,0.105);
  --font-ui: "Poppins", Inter, system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
  --canvas-width: 1172px;
  --canvas-height: 657px;
  --carousel-radius: 891px;
}
```

**Override en consumidor:** `<html style="--brand-primary: #tu-color;">` o hoja CSS posterior.

### 3.3 `app.js` — Engine (no tocar salvo extender)

**Responsabilidades:**
1. **Hidratación**: Lee `SKIN_CONFIG.config` y puebla todo el DOM (nav, hero, shop, carousel, action)
2. **Type-fitter**: `fitBox()` + `baseline()` + `centreLabel()` — alineación óptica pixel-perfect
3. **Carousel 3D**: `buildRing()` + `placeCards()` — matemática de perspectiva real
4. **Responsive**: `resize()` — 3 breakpoints, escala continua `--k`, variables CSS (`--fill`, `--stshift`, `--sshift`, `--rs`)
5. **Spin loop**: `requestAnimationFrame(tick)` — rotación continua, pausa en `visibilitychange`
6. **Entrance timeline**: Web Animations API escalonada (nav → badge → h1 → sub → cta → ring → browser → WA)
7. **Menu móvil**: Burger + panel off-canvas, focus management, ESC para cerrar

**Constantes clave (mover a config.js si se necesita parametrizar):**
```js
var R = 891, N = 37, STEP = 360/N, CULL = 42, SPEED = 1.9;
var DW_MIN = 920, TAB_MAX = 1080, TAB_MIN = 701, CW = 1172;
```

---

## 4. Cómo Personalizar para un Nuevo Proyecto

### 4.1 Cambio Rápido (solo `config.js`)

```js
// Al final de config.js o en un script antes de cargar app.js
SKIN_CONFIG.apply({
  brand: { wordmark: 'MI-MARCA', wordmarkKicker: 'SHOPS' },
  hero: {
    badge: 'Expertos en lanzamiento',
    h1a: 'Automatiza',
    h1b: 'Tu tienda',
    sub1: { bold: 'Plataforma ', tag: 'SaaS', tail: ' para crecer' },
    sub2: 'Checkouts, performance, expansión sostenible.',
    cta: { label: 'Empezar gratis', href: '/registro' }
  },
  nav: {
    cta: { label: 'Crear tienda', href: '/registro' },
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Características', href: '/features' },
      { label: 'Precios', href: '/pricing' },
      { label: 'Docs', href: '/docs' },
      { label: 'Soporte', href: '/support' }
    ]
  },
  carousel: {
    shots: [
      { url: '~/hero-checkout.jpg', variant: 'pay' },
      { url: '~/hero-launch.jpg', variant: 'launch' },
      { url: '~/hero-shop.jpg', variant: 'shop' },
      { url: '~/hero-brand.jpg', variant: 'brand' },
      { url: '~/hero-frete.jpg', variant: 'frete' },
      { url: '~/hero-1.jpg', variant: 'plain', caption: 'NUEVO' },
      { url: '~/hero-2.jpg', variant: 'power' },
      { url: '~/hero-3.jpg', variant: 'plain', caption: 'LLEGÓ' },
      { url: '~/hero-4.jpg', variant: 'off' },
      { url: '~/hero-5.jpg', variant: 'plain', caption: 'TENDENCIA' }
    ]
  },
  shop: {
    browserTitle: 'Mi Tienda - Demo',
    announcement: 'Envío gratis hoy',
    name: 'MI-MARCA',
    tagline: 'E-COMMERCE',
    hero: {
      img: '~/shop-hero.jpg',
      imgAlt: 'Hero banner de mi tienda',
      kicker: 'Lanzamiento',
      title: 'Vende online<br>sin complicaciones.',
      cta: 'VER DEMO'
    },
    sectionTitle: 'Más vendidos',
    sectionLink: 'ver catálogo',
    products: [
      { img: '~/prod-1.jpg', imgAlt: 'Producto 1', name: 'Plan Pro', desc: 'Ilimitado · Mes', price: '$ 29', oldPrice: '$ 49', tag: '-40%' },
      { img: '~/prod-2.jpg', imgAlt: 'Producto 2', name: 'Plan Team', desc: '5 usuarios · Mes', price: '$ 79', oldPrice: null, tag: null },
      { img: '~/prod-3.jpg', imgAlt: 'Producto 3', name: 'Plan Enterprise', desc: 'Custom', price: 'Contactar', oldPrice: null, tag: 'POPULAR' },
      { img: '~/prod-4.jpg', imgAlt: 'Producto 4', name: 'Add-on IA', desc: 'Automatización', price: '$ 9', oldPrice: '$ 19', tag: 'NUEVO' }
    ],
    strip: [
      'Setup en 5 min',
      'Sin tarjeta de crédito',
      'Cancela cuando quieras',
      'Soporte 24/7'
    ]
  },
  action: { enabled: true, label: 'WhatsApp', href: 'https://wa.me/5939XXXXXXX', icon: 'whatsapp' }
});
```

### 4.2 Cambio de Tema Visual (CSS variables)

```html
<!-- En index.html, antes de styles.css -->
<style>
  :root {
    --brand-primary: #7c3aed;       /* purple */
    --brand-accent: #f59e0b;        /* amber */
    --bg-deep: #0f172a;             /* slate-900 */
    --font-ui: "Inter", system-ui;
    --font-serif: "Merriweather", serif;
  }
</style>
<link rel="stylesheet" href="styles.css">
```

### 4.3 Añadir Nuevo Variant de Carrusel

1. En `app.js`, dentro de `creative(d)`, añade un `if (d.variant === 'mivariant') { return \`...\`; }`
2. Usa clases CSS existentes (`.cv`, `.t-big`, `.t-serif`, `.dot`, `.fill`, `.ph`) + estilos inline para layout
3. En `config.js`, usa `variant: 'mivariant'` en el shot correspondiente

---

## 5. Workflows de Desarrollo

### 5.1 Instalación

```bash
cd modelo-web-1bloque-movil
npm install          # usa cache local .npm-cache/
```

### 5.2 Desarrollo con Hot-Reload

```bash
npm run dev          # Vite dev server en http://127.0.0.1:5173/
# Cambios en config.js / styles.css / app.js → recarga automática
```

### 5.3 Build de Producción

```bash
npm run build        # Genera dist/ con assets hasheados y minificados
# dist/index.html  → 9.4 kB (3.1 kB gzip)
# dist/assets/index-<hash>.js  → 20.9 kB (7.9 kB gzip)
# dist/assets/index-<hash>.css → 18.4 kB (5.0 kB gzip)
```

### 5.4 Previsualizar Build

```bash
npm run preview      # Sirve dist/ en http://127.0.0.1:4173/
```

### 5.5 Deploy

`dist/` es 100% estático → sube a **Netlify**, **Vercel**, **Cloudflare Pages**, **GitHub Pages**, cualquier CDN.

**Headers recomendados (Netlify `_headers`):**
```
/*
  Cache-Control: public, max-age=31536000, immutable
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

---

## 6. Decisiones de Arquitectura Clave

| Decisión | Razón | Trade-off |
|----------|-------|-----------|
| **Un solo `index.html`** | Simplicidad de deploy, sin SSR | SEO inicial depende de JS (mitigar: pre-render o meta tags estáticos) |
| **Canvas escalado (`--k`)** | Pixel-perfect en desktop, evita media queries por coordenadas | Requiere type-fitter para que el texto no se deforme al escalar |
| **Mismos nodos DOM en todos los breakpoints** | Mantenibilidad, sin duplicación, transiciones suaves | CSS complejo en media queries, `transform` vs `position` conflicts |
| **Web Animations API nativa** | 0 deps, hardware-accelerated, `prefers-reduced-motion` nativo | Soporte antiguo limitado (polyfill si hace falta IE11) |
| **Type-fitter casero** | Control total de cap-height + ink-width, sin deps | ~200 líneas de código, frágil si cambian fuentes drásticamente |
| **ES modules + Vite** | Build moderno, tree-shaking, hashing, HMR | Requiere `type="module"` en HTML, no funciona `file://` directo |
| **Config en `config.js` (no JSON)** | Funciones `img()`, `SKIN_CONFIG.apply()`, comentarios, lógica de merge | Ligeramente más pesado que JSON puro |

---

## 7. Extensiones Comunes (Cómo Hackear)

| Objetivo | Dónde Tocar |
|----------|-------------|
| Añadir breakpoint (ej. 1440px+) | `styles.css` `@media` + `app.js` `resize()` logic |
| Cambiar número de tarjetas del anillo | `config.js → carousel.count` |
| Cambiar easing de entrada | `app.js` constants `EXPO` / `SOFT` |
| Internacionalizar textos | `config.js` → estructura por locale `{es:{...}, en:{...}}` + selector |
| Añadir analytics (GA4/Plausible) | `index.html` `<script>` o `app.js` `gtag()` en CTAs |
| Self-host fonts (producción) | Descarga `.woff2`, `@font-face` en `styles.css`, quita `<link>` Google Fonts |
| Lazy-load imágenes nativo | `config.js` ya resuelve URLs; en `app.js` `creative()` añade `loading="lazy"` a `<img>` |
| Skip link / landmark `<main>` | `index.html` + `styles.css` `:focus-visible` |
| Tests visuales (Playwright) | `npm i -D @playwright/test`, tests en `tests/` comparando screenshots |

---

## 8. Problemas Conocidos / TODO

- [ ] **SEO**: Meta tags Open Graph, Twitter Cards, JSON-LD `WebSite`/`Product`
- [ ] **Favicon**: `favicon.ico`, `apple-touch-icon`, `manifest.json`
- [ ] **Accesibilidad**: Skip link, landmark `<main>`, auditoría axe-core completa
- [ ] **Imágenes**: `width`/`height` en `<img>` para evitar CLS, `srcset`/`webp`
- [ ] **Fonts**: Self-host en producción (eliminar request a Google Fonts)
- [ ] **Analytics**: Eventos en CTAs (Build new shop, See prices, WhatsApp)
- [ ] **Tests**: Smoke test (carga, sin errores JS, CTAs clickeables) + visual regression
- [ ] **CI/CD**: GitHub Actions `lint` + `build` + `deploy preview`
- [ ] **i18n**: Estructura multi-idioma en `config.js`

---

## 9. Comandos Útiles para Agentes

```bash
# Ver estructura
ls -la

# Ver config actual
cat config.js | head -80

# Ver variables CSS
grep -- '--' styles.css | head -30

# Ver constants del engine
grep -E 'var (R|N|STEP|CULL|SPEED|DW_MIN|TAB_MAX|TAB_MIN|CW) =' app.js

# Build y verificar tamaño
npm run build && ls -lh dist/assets/

# Lint rápido (si se añade eslint)
npm run lint 2>/dev/null || echo "no linter configured"
```

---

## 10. Contacto / Créditos

- **Autor original**: Jorge Sanchez (`jorgedsb100@gmail.com`)
- **Fuentes**: [Poppins](https://fonts.google.com/specimen/Poppins) + [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- **Imágenes demo**: Bucket CloudFront de ejemplo (reemplazar en `config.js`)
- **Licencia**: MIT — ver [`LICENSE`](LICENSE)

---

> **Nota para agentes futuros**: Este skin está diseñado para ser **forkado y adaptado**. La única barrera de entrada es editar `config.js`. No tocar `app.js` salvo para añadir variants o fixear bugs. El CSS en `styles.css` es intencionadamente verboso y comentado para que sea legible y modificable.