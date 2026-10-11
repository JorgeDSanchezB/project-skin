/* =====================================================================
   SKIN CONFIG  —  the single source of truth for all page content.
   =====================================================================
   This is the only file you normally edit to apply the skin to a new
   project. Every string, image URL, price, link and brand name that the
   page renders lives here. `app.js` reads `window.SKIN_CONFIG` and paints
   the markup; `styles.css` handles the visual identity.

   To use: change the values below (or override them on the fly with
   `SKIN_CONFIG.apply({...})` before `app.js` runs) and save.
   ===================================================================== */

/* Central image base. All `img` values below that start with "~" are
   resolved against this prefix, so one bucket can host every asset.
   Absolute URLs (http/https) pass through untouched. */
const IMG_BASE =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/';

function img(ref) {
  if (!ref) return '';
  return ref.charAt(0) === '~' ? IMG_BASE + ref.slice(1) : ref;
}

const CONFIG = {

  /* ------------------------------------------------------------------
     Brand / document
     ------------------------------------------------------------------ */
  brand: {
    title: 'Vision — Streamline the shop virtual',
    lang: 'en-US',
    wordmark: 'VERTEX',
    wordmarkKicker: 'SHOPS',
    /* logo svg is baked into index.html (see .mark); swap that node to
       rebrand the icon. The wordmark text is set from this value. */
  },

  /* ------------------------------------------------------------------
     Navigation pill
     ------------------------------------------------------------------ */
  nav: {
    cta: { label: 'Build new shop', href: '#' },
    links: [
      { label: 'Origin', href: '#' },
      { label: 'Learn how', href: '#' },
      { label: 'Core Vertex', href: '#' },
      { label: 'Prices', href: '#' },
      { label: 'Support', href: '#' }
    ]
  },

  /* ------------------------------------------------------------------
     Hero (badge + headline + sub copy + CTA)
     ------------------------------------------------------------------ */
  hero: {
    badge: 'Professionals at store startup',
    h1a: 'Streamline the shop',
    h1b: 'Process',
    /* sub1 = a line with a bold lead, an inline tag and a tail.
       sub2 = a plain second line. */
    sub1: {
      bold: 'Restructuring store systems / ',
      tag: 'E-commerce',
      tail: ' orchestrated with'
    },
    sub2: 'checkouts, performance, a sustainable expansion.',
    cta: { label: 'See prices', href: '#' }
  },

  /* ------------------------------------------------------------------
     Floating action button (bottom-right). Set `enabled:false` to hide
     it entirely; `href` is where it points (wa.me/..., mailto:, ...).
     ------------------------------------------------------------------ */
  action: {
    enabled: true,
    label: 'WhatsApp',
    href: '#',
    icon: 'whatsapp' /* 'whatsapp' is the only built-in glyph for now */
  },

  /* ------------------------------------------------------------------
     3D carousel ring
     ------------------------------------------------------------------
     shots: one entry per distinct card. The ring repeats this list to
     fill `count` slots, so keep 1..N entries. `variant` selects the
     visual treatment (see creative() in app.js):
       pay | launch | shop | brand | frete | power | off | plain
     `caption` is only used by the `plain` variant. */
  carousel: {
    radius: 891,   /* must match the CSS perspective on .ring */
    count: 37,     /* total cards in the ring */
    speed: 1.9,    /* degrees per second of rotation */
    cull: 42,      /* hide cards beyond this many degrees from camera */
    shots: [
      { url: '~/hf_20260912_110422_0fc34393-7417-41b0-a200-43fd2b08a37f.png', variant: 'pay' },
      { url: '~/hf_20260912_110423_ba46182e-43bc-43a8-9007-a8234acf442d.png', variant: 'launch' },
      { url: '~/hf_20260912_110423_06cfbb84-6f96-48f6-be45-e03516510e48.png', variant: 'shop' },
      { url: '~/hf_20260912_110422_634bf390-f171-4f5d-9151-0d2c86c26e7b.png', variant: 'brand' },
      { url: '~/hf_20260912_110423_0cfe058d-db0e-4ee6-9708-7a297cc11a7a.png', variant: 'frete' },
      { url: '~/hf_20260912_110422_a90a35d7-ae20-4ce3-86d7-e3f6f658a6bc.png', variant: 'plain', caption: 'RITUAL REGIME' },
      { url: '~/hf_20260912_110422_de267714-7647-4d9a-a0a9-55325683b2a2.png', variant: 'power' },
      { url: '~/hf_20260912_110504_80eda275-e380-4ccb-b51f-332f25337079.png', variant: 'plain', caption: 'JUST ARRIVED' },
      { url: '~/hf_20260912_110422_d6ba08f5-4ff8-4f09-8abe-93ee6bb0e34e.png', variant: 'off' },
      { url: '~/hf_20260912_110423_87ec2115-3157-47ef-ac98-973f8ad6532d.png', variant: 'plain', caption: 'STREETWEAR' }
    ]
  },

  /* ------------------------------------------------------------------
     The mock browser window (the in-page "shop" preview)
     ------------------------------------------------------------------ */
  shop: {
    browserTitle: 'Shop Focused - Skin Care',
    announcement: 'Moisturized daily at home',
    name: 'GLOW',
    tagline: 'SKIN CARE',

    hero: {
      img: '~/hf_20260912_110504_0316394c-37bd-432b-a1f2-ee46a461c22b.png',
      imgAlt: 'Warm amber and ivory skincare collection in golden morning light',
      kicker: 'Just added',
      /* title may contain a <br> for a two-line lockup */
      title: 'Let your beauty<br>be sacred.',
      cta: 'EXPLORE TODAY'
    },

    sectionTitle: 'Best reviewed',
    sectionLink: 'see more',

    products: [
      {
        img: '~/hf_20260912_110423_3b5dcf24-cc07-4f3b-8423-b597fffcdbfb.png',
        imgAlt: 'Vitamin C serum in amber glass',
        name: 'Serum Radiance C',
        desc: 'Brightens · 30ml',
        price: '$ 129.90',
        oldPrice: '$ 169.90',
        tag: '-24%'
      },
      {
        img: '~/hf_20260912_110504_50ec81be-8341-447f-a0c2-a5673a465447.png',
        imgAlt: 'Nourishing lotion jar on soft linen',
        name: 'Nourishing Lotion',
        desc: 'Arid skin · 50g',
        price: '$ 89.90',
        oldPrice: null,
        tag: null
      },
      {
        img: '~/hf_20260912_110504_fd208d72-9112-4cde-b509-8d273b470c6f.png',
        imgAlt: 'Three-piece Sunset Renewal skincare kit',
        name: 'Kit Sunset Renewal',
        desc: '3 products',
        price: '$ 219.90',
        oldPrice: '$ 289.90',
        tag: 'SET'
      },
      {
        img: '~/hf_20260912_110504_9731544c-a83b-48c4-bacb-e31e4d4b9f42.png',
        imgAlt: 'Lightweight facial sunscreen beside clear water',
        name: 'Defender SPF 60',
        desc: 'Light feel · 40g',
        price: '$ 74.90',
        oldPrice: null,
        tag: 'JUST'
      }
    ],

    strip: [
      'Ships gratis north of $ 199',
      'Pay 12x nil rates',
      'Swaps in 30 days',
      'Hypoallergenically checked'
    ]
  }
};

/* Resolve every image ref against IMG_BASE once, so app.js can use the
   absolute URLs directly. */
CONFIG.carousel.shots.forEach(function (s) { s.url = img(s.url); });
CONFIG.shop.hero.img = img(CONFIG.shop.hero.img);
CONFIG.shop.products.forEach(function (p) { p.img = img(p.img); });

/* ---- tiny runtime API ------------------------------------------------
   Override any subset of the config before the page renders:
      SKIN_CONFIG.apply({ brand: { wordmark: 'NOVA' } });
   or read a single value:
      SKIN_CONFIG.get('shop.name');
------------------------------------------------------------------------- */
function deepMerge(target, src) {
  if (!src) return target;
  Object.keys(src).forEach(function (k) {
    if (src[k] && typeof src[k] === 'object' && !Array.isArray(src[k]) &&
        target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) {
      deepMerge(target[k], src[k]);
    } else {
      target[k] = src[k];
    }
  });
  return target;
}

const ORIGINAL = JSON.parse(JSON.stringify(CONFIG));

const SKIN_CONFIG = {
  /* the live config object */
  config: CONFIG,
  apply: function (patch) {
    deepMerge(CONFIG, patch);
    /* re-resolve image refs that may have been patched in raw form */
    if (patch.carousel) {
      (patch.carousel.shots || []).forEach(function (s, i) {
        var cur = CONFIG.carousel.shots[i];
        if (cur && s.url) {
          CONFIG.carousel.shots[i].url = img(cur.url);
        }
      });
    }
    return CONFIG;
  },
  reset: function () {
    var fresh = JSON.parse(JSON.stringify(ORIGINAL));
    fresh.carousel.shots.forEach(function (s) { s.url = img(s.url); });
    fresh.shop.hero.img = img(fresh.shop.hero.img);
    fresh.shop.products.forEach(function (p) { p.img = img(p.img); });
    deepMerge(CONFIG, fresh);
    return CONFIG;
  },
  get: function (path) {
    return path.split('.').reduce(function (o, k) {
      return (o == null) ? o : o[k];
    }, CONFIG);
  }
};

/* Expose globally for non-module consumers (backward compat) */
if (typeof window !== 'undefined') {
  window.SKIN_CONFIG = SKIN_CONFIG;
}

/* ES module export */
export default SKIN_CONFIG;