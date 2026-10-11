/* =====================================================================
   SKIN ENGINE  —  reads SKIN_CONFIG and drives the layout,
   type-fitter, 3D carousel ring, starfield and responsive adaptation.
   ===================================================================== */
import { default as SKIN_CONFIG } from './config.js';

  'use strict';

  var CFG = (SKIN_CONFIG && SKIN_CONFIG.config) || {};
  var brand = CFG.brand || {};
  var navCfg = CFG.nav || {};
  var hero = CFG.hero || {};
  var shop = CFG.shop || {};
  var carousel = CFG.carousel || {};
  var action = CFG.action || {};

  /* ---- 0. HYDRATE DOM FROM CONFIG ------------------------------------ */
  function hydrate() {
    /* Document level */
    if (brand.title) document.title = brand.title;
    if (brand.lang) document.documentElement.lang = brand.lang;

    /* Wordmark */
    var wmName = document.getElementById('wmName');
    if (wmName && brand.wordmark) wmName.textContent = brand.wordmark;
    var wmKick = document.querySelector('.wm .kick');
    if (wmKick && brand.wordmarkKicker) wmKick.textContent = brand.wordmarkKicker;

    /* Nav links */
    var links = document.getElementById('links');
    if (links && navCfg.links && navCfg.links.length) {
      links.innerHTML = '';
      navCfg.links.forEach(function (l) {
        var a = document.createElement('a');
        a.href = l.href || '#';
        a.textContent = l.label || '';
        links.appendChild(a);
      });
    }

    /* Nav CTA */
    var ctaBtn = document.getElementById('ctaBtn');
    var ctaLabel = document.getElementById('ctaLabel');
    if (ctaBtn && navCfg.cta) {
      if (navCfg.cta.href) ctaBtn.href = navCfg.cta.href;
      if (ctaLabel && navCfg.cta.label) ctaLabel.textContent = navCfg.cta.label;
    }

    /* Hero badge + copy + CTA */
    var badgeTxt = document.getElementById('badgeTxt');
    if (badgeTxt && hero.badge) badgeTxt.textContent = hero.badge;

    var h1a = document.getElementById('h1a');
    if (h1a && hero.h1a) h1a.textContent = hero.h1a;
    var h1b = document.getElementById('h1b');
    if (h1b && hero.h1b) h1b.textContent = hero.h1b;

    var sub1 = document.getElementById('sub1');
    if (sub1 && hero.sub1) {
      sub1.innerHTML =
        '<b>' + (hero.sub1.bold || '') + '<span class="nb">' + (hero.sub1.tag || '') + '</span></b>' +
        (hero.sub1.tail || '');
    }

    var sub2 = document.getElementById('sub2');
    if (sub2 && hero.sub2) sub2.textContent = hero.sub2;

    var vpBtn = document.getElementById('vpBtn');
    var vpLabel = document.getElementById('vpLabel');
    if (vpBtn && hero.cta) {
      if (hero.cta.href) vpBtn.href = hero.cta.href;
      if (vpLabel && hero.cta.label) vpLabel.textContent = hero.cta.label;
    }

    /* WhatsApp / floating action */
    var wa = document.querySelector('.wa');
    if (wa) {
      if (action.enabled === false) {
        wa.style.display = 'none';
      } else {
        if (action.href) wa.href = action.href;
        if (action.label) wa.setAttribute('aria-label', action.label);
      }
    }

    /* Mock browser content */
    var omniSpan = document.querySelector('.omni span');
    if (omniSpan && shop.browserTitle) omniSpan.textContent = shop.browserTitle;

    var annSpan = document.querySelector('.ann span');
    if (annSpan && shop.announcement) annSpan.textContent = shop.announcement;

    var shopLogo = document.querySelector('.shoplogo');
    if (shopLogo) {
      if (shop.name) {
        var em = shopLogo.querySelector('em');
        if (em) em.textContent = shop.name;
      }
      if (shop.tagline) {
        var it = shopLogo.querySelector('i');
        if (it) it.textContent = shop.tagline;
      }
    }

    /* Shop hero banner */
    var pghero = document.querySelector('.pghero');
    if (pghero && shop.hero) {
      var heroImg = pghero.querySelector('img');
      if (heroImg && shop.hero.img) {
        heroImg.src = shop.hero.img;
        if (shop.hero.imgAlt) heroImg.alt = shop.hero.imgAlt;
      }
      var copy = pghero.querySelector('.copy');
      if (copy) {
        var u = copy.querySelector('u');
        if (u && shop.hero.kicker) u.textContent = shop.hero.kicker;
        var emCopy = copy.querySelector('em');
        if (emCopy && shop.hero.title) emCopy.innerHTML = shop.hero.title;
        var iCopy = copy.querySelector('i');
        if (iCopy && shop.hero.cta) iCopy.textContent = shop.hero.cta;
      }
    }

    /* Shop products section header */
    var pgsec = document.querySelector('.pgsec');
    if (pgsec) {
      var secB = pgsec.querySelector('b');
      if (secB && shop.sectionTitle) secB.textContent = shop.sectionTitle;
      var secU = pgsec.querySelector('u');
      if (secU && shop.sectionLink) secU.textContent = shop.sectionLink;
    }

    /* Shop products grid */
    var pggrid = document.querySelector('.pggrid');
    if (pggrid && shop.products && shop.products.length) {
      pggrid.innerHTML = '';
      shop.products.forEach(function (p) {
        var card = document.createElement('div');
        card.className = 'pgcard';

        var ph = document.createElement('div');
        ph.className = 'ph';
        var img = document.createElement('img');
        img.alt = p.imgAlt || p.name || '';
        img.src = p.img || '';
        ph.appendChild(img);
        if (p.tag) {
          var tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = p.tag;
          ph.appendChild(tag);
        }
        card.appendChild(ph);

        var b = document.createElement('b');
        b.textContent = p.name || '';
        card.appendChild(b);

        if (p.desc) {
          var i = document.createElement('i');
          i.innerHTML = p.desc;
          card.appendChild(i);
        }

        var s = document.createElement('s');
        s.textContent = (p.price || '') + ' ';
        if (p.oldPrice) {
          var span = document.createElement('span');
          span.textContent = p.oldPrice;
          s.appendChild(span);
        }
        card.appendChild(s);

        pggrid.appendChild(card);
      });
    }

    /* Shop strip */
    var pgstrip = document.querySelector('.pgstrip');
    if (pgstrip && shop.strip && shop.strip.length) {
      pgstrip.innerHTML = '';
      shop.strip.forEach(function (text) {
        var sp = document.createElement('span');
        sp.textContent = text;
        pgstrip.appendChild(sp);
      });
    }
  }

  hydrate();

  /* ---- 1. STARFIELD --------------------------------------------------- */
  function starfield(el, count, blur, aMin, aMax) {
    if (!el) return;
    var out = [];
    for (var i = 0; i < count; i++) {
      var a = (aMin + Math.random() * (aMax - aMin)).toFixed(3);
      out.push(
        (Math.random() * 100).toFixed(2) + 'vw ' +
        (Math.random() * 100).toFixed(2) + 'vh ' +
        blur + 'px 0 rgba(255,255,255,' + a + ')'
      );
    }
    el.style.boxShadow = out.join(',');
  }

  starfield(document.getElementById('stA'), 150, 0, 0.05, 0.30);
  starfield(document.getElementById('stB'), 18, 1.2, 0.35, 0.70);

  /* ---- 7. CARD CREATIVES ---------------------------------------------- */
  function creative(d) {
    var im = '<img alt="" src="' + d.url + '">';

    if (d.variant === 'pay') {
      return '<div class="fill" style="background:#efedea"></div>' +
        '<div class="ph" style="top:112px;bottom:0">' + im + '</div>' +
        '<svg class="ph" style="top:118px;bottom:0" viewBox="0 0 130 182" preserveAspectRatio="none">' +
          '<g stroke="#e5202f" stroke-width="8" fill="none" opacity=".92" stroke-linecap="square">' +
            '<path d="M2 42h30M14 30v96M4 100l26-16"></path>' +
            '<path d="M96 34v58M120 34v58M96 92q12 15 24 0"></path>' +
            '<path d="M92 108l14 34M126 108l-12 34"></path>' +
          '</g></svg>' +
        '<div class="cv" style="top:20px;text-align:right;font-size:3.4px;letter-spacing:.15em;color:#8d9298">METHOD OF CHECKOUTS</div>' +
        '<div class="cv t-big" style="top:32px;font-size:14px;color:#16171b">Checkouts</div>' +
        '<div class="cv t-big" style="top:47px;font-size:14px;color:#e5202f">Quick n simple</div>' +
        '<div class="cv" style="top:76px;font-size:5.2px;font-weight:700;color:#16171b;line-height:1.7">' +
          '<div><b class="dot"></b>SPEND VIA <b>ACH</b></div>' +
          '<div style="margin-top:8px"><b class="dot sq"></b>OR AT MAX <b>12X</b><br>' +
          '<span style="margin-left:11px">ON CREDIT</span></div>' +
        '</div>';
    }

    if (d.variant === 'launch') {
      return '<div class="fill" style="background:linear-gradient(168deg,#f9d9e5,#f3bdd2 55%,#e8a3c0)"></div>' +
        '<div class="ph" style="top:100px;bottom:0">' + im +
          '<div class="fill" style="background:linear-gradient(180deg,rgba(249,217,229,.97),rgba(249,217,229,0) 30%)"></div>' +
        '</div>' +
        '<div class="cv t-serif" style="top:36px;font-size:17px;color:#b03a63">COLLECTION</div>' +
        '<div class="cv t-serif" style="top:55px;font-size:17px;color:#b03a63">EXCLUSIVE!</div>';
    }

    if (d.variant === 'shop') {
      return '<div class="fill" style="background:#fff"></div>' +
        '<div class="ph" style="top:0;height:148px">' + im + '</div>' +
        '<div class="cv" style="top:158px;font-size:5.4px;font-weight:700;letter-spacing:.09em;color:#16171b">REGIME AT DAWNS</div>' +
        '<div class="cv" style="top:168px;font-size:4.2px;color:#7b8087">Cleanse &middot; Serum &middot; Moisturize</div>' +
        '<div style="position:absolute;left:10px;top:180px;padding:4px 11px;border-radius:20px;background:#16171b;font-size:4.6px;font-weight:600;color:#fff;letter-spacing:.05em">Acquire today</div>';
    }

    if (d.variant === 'brand') {
      var brandName = (brand && brand.wordmark) ? brand.wordmark : 'Vertex';
      return '<div class="fill" style="background:linear-gradient(180deg,#0a2a4a,#0d3a63 50%,#08192b)"></div>' +
        '<div class="ph" style="top:92px;bottom:0">' + im +
          '<div class="fill" style="background:linear-gradient(180deg,rgba(10,42,74,.98),rgba(10,42,74,0) 36%)"></div>' +
        '</div>' +
        '<div class="cv" style="top:16px;font-size:4.2px;line-height:1.7;color:rgba(255,255,255,.82);width:74px">Formulas light, assessed hypoallergenically n designed with a new ritual &mdash; revealing since a starting moment.</div>' +
        '<div style="position:absolute;right:10px;top:16px;font-size:5.4px;font-weight:600;color:#fff;opacity:.92">&#10035; ' + brandName + '</div>';
    }

    if (d.variant === 'frete') {
      return '<div class="fill" style="background:linear-gradient(158deg,#4a0c80 0%,#7a16a6 40%,#a81fc6 66%,#5c0e90 100%)"></div>' +
        '<div class="ph" style="top:140px;bottom:0;opacity:.45;mix-blend-mode:screen">' + im + '</div>' +
        '<div class="fill" style="background:radial-gradient(44% 16% at 50% 62%, rgba(255,255,255,.92), rgba(255,255,255,0) 72%)"></div>' +
        '<div style="position:absolute;left:-6px;right:-6px;top:44px;height:13px;background:#ff2d8a;transform:rotate(-2.6deg);box-shadow:0 4px 12px rgba(255,45,138,.5)"></div>' +
        '<div style="position:absolute;left:0;right:0;top:45.5px;transform:rotate(-2.6deg);text-align:center;font-size:5.6px;font-weight:700;letter-spacing:.05em;color:#fff">OBTAIN AT HOME AND</div>' +
        '<div class="cv t-big" style="top:64px;font-size:24px;color:#fff;text-shadow:0 3px 0 rgba(84,9,124,.6)">Ships</div>' +
        '<div class="cv t-big" style="top:87px;font-size:24px;color:#fff;text-shadow:0 3px 0 rgba(84,9,124,.6)">Gratis</div>' +
        '<div class="cv t-big" style="top:113px;font-size:19px;color:#fff">+</div>';
    }

    if (d.variant === 'power') {
      return '<div class="ph phf">' + im + '</div>' +
        '<div class="fill" style="background:linear-gradient(180deg,rgba(6,5,10,0) 34%,rgba(6,5,10,.55) 52%,rgba(6,5,10,.92) 72%)"></div>' +
        '<div class="cv t-serif" style="top:132px;font-size:16px;color:#fff">A POWER</div>' +
        '<div class="cv t-serif" style="top:150px;font-size:16px;color:#fff">FEMININE</div>' +
        '<div class="cv" style="top:171px;font-size:4.4px;letter-spacing:.07em;color:rgba(255,255,255,.85)">is echoing in all we acquire</div>';
    }

    if (d.variant === 'off') {
      return '<div class="ph phf">' + im + '</div>' +
        '<div class="fill" style="background:linear-gradient(180deg,rgba(3,9,20,0) 30%,rgba(3,9,20,.6) 48%,rgba(3,9,20,.95) 70%)"></div>' +
        '<div class="cv t-big" style="top:126px;font-size:10px;color:#fff;opacity:.9">On sale &middot; til</div>' +
        '<div class="cv t-big" style="top:139px;font-size:22px;color:#3fe3ff;text-shadow:0 0 16px rgba(63,227,255,.5)">50% off</div>';
    }

    /* variant === 'plain' — default caption */
    var caption = d.caption || '';
    return '<div class="ph phf">' + im + '</div>' +
      '<div class="fill" style="background:linear-gradient(180deg,rgba(4,8,16,0) 38%,rgba(4,8,16,.85) 68%)"></div>' +
      '<div class="cv" style="top:150px;font-size:5.4px;font-weight:600;letter-spacing:.2em;color:#fff">' + caption + '</div>';
  }

  /* ---- 11. THE TYPE FITTER -------------------------------------------- */
  var canvasEl = document.getElementById('canvas');
  var nav = document.getElementById('nav');
  var links = document.getElementById('links');
  var ring = document.getElementById('ring');
  var burger = document.getElementById('burger');
  var h1a = document.getElementById('h1a'), h1b = document.getElementById('h1b');
  var sub1 = document.getElementById('sub1'), sub2 = document.getElementById('sub2');
  var badgeTxt = document.getElementById('badgeTxt'), wmName = document.getElementById('wmName');
  var ctaBtn = document.getElementById('ctaBtn'), ctaLabel = document.getElementById('ctaLabel');
  var vpBtn = document.getElementById('vpBtn'), vpLabel = document.getElementById('vpLabel');

  var mctx = document.createElement('canvas').getContext('2d');
  var k = 1, isPhone = false, isTablet = false, tboost = 1;

  function unit() { return isPhone ? 1 : k; }

  function fontOf(el) {
    var cs = getComputedStyle(el);
    var size = parseFloat(cs.fontSize);
    return { css: cs.fontWeight + ' ' + size + 'px ' + cs.fontFamily, size: size };
  }

  /* ink width in raw design px (the canvas is scaled by k, so undo it) */
  function inkWidth(el) { return el.getBoundingClientRect().width / unit(); }

  /* cap height per 1px of font-size, read from a detached 2D context */
  function capRatio(el) {
    var f = fontOf(el);
    mctx.font = '100px ' + f.css.split(' ').slice(2).join(' ');
    var m = mctx.measureText('H');
    return (m.actualBoundingBoxAscent || 70) / 100;
  }

  /* exact cap height AND exact ink width */
  function fitBox(el, tw, tc, pre) {
    pre = pre || '';
    el.style.transform = pre; // drop previous scaleX first
    el.style.fontSize = (tc / capRatio(el)) + 'px';
    var w = inkWidth(el) || 1;
    el.style.transform = pre + ' scaleX(' + (tw / w) + ')';
  }

  /* place first baseline on a design-pixel y */
  function baseline(el, y) {
    var f = fontOf(el);
    mctx.font = f.css;
    var m = mctx.measureText('Hg');
    var A = m.fontBoundingBoxAscent || f.size * 0.8;
    var D = m.fontBoundingBoxDescent || f.size * 0.2;
    el.style.top = (y - ((f.size - (A + D)) / 2 + A)) + 'px';
  }

  /* optical vertical centring inside buttons */
  function centreLabel(btn, el, capPx) {
    el.style.top = '0px';
    var probe = document.createElement('i');
    probe.setAttribute('style',
      'display:inline-block;width:0;height:0;margin:0;padding:0;border:0;vertical-align:baseline');
    el.appendChild(probe);
    var br = btn.getBoundingClientRect();
    var H = br.height / unit();
    var base = (probe.getBoundingClientRect().bottom - br.top) / unit();
    probe.remove();
    el.style.top = ((H / 2) - (base - capPx / 2) + 1.1) + 'px';
  }

  /* ---- 6. 3D CAROUSEL PLACEMENT --------------------------------------- */
  var R = carousel.radius || 891;
  var N = carousel.count || 37;
  var STEP = 360 / N;
  var CULL = carousel.cull || 42;
  var SPEED = carousel.speed || 1.9;
  var shots = (carousel.shots && carousel.shots.length) ? carousel.shots : [];

  var phase = -2;
  var cards = [];

  function buildRing() {
    if (!ring || !shots.length) return;
    ring.innerHTML = '';
    cards = [];
    for (var i = 0; i < N; i++) {
      var d = shots[i % shots.length];
      var el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = creative(d) + '<div class="edge"></div>';
      (function (node) {
        var img = node.querySelector('img');
        if (img) img.addEventListener('error', function () { node.classList.add('broken'); });
      })(el);
      ring.appendChild(el);
      cards.push(el);
    }
  }

  function placeCards() {
    for (var i = 0; i < cards.length; i++) {
      var el = cards[i];
      var a = ((i * STEP + phase) % 360 + 540) % 360 - 180;
      if (Math.abs(a) > CULL) { el.style.visibility = 'hidden'; continue; }
      el.style.visibility = 'visible';
      var r = a * Math.PI / 180, c = Math.cos(r);
      el.style.transform = 'translate3d(' + (R * Math.sin(r)).toFixed(2) + 'px,0,' +
        (R * (1 - c)).toFixed(2) + 'px) rotateY(' + (-a).toFixed(3) + 'deg)';
      el.style.filter = 'brightness(' + (0.84 + 0.5 * (1 / c - 1)).toFixed(3) + ')';
    }
  }

  /* ---- 11. LAYOUT ----------------------------------------------------- */
  function clearFitter() {
    var els = [h1a, h1b, sub1, sub2, badgeTxt, wmName, ctaLabel, vpLabel];
    for (var i = 0; i < els.length; i++) {
      if (!els[i]) continue;
      els[i].style.fontSize = '';
      els[i].style.top = '';
      els[i].style.transform = '';
    }
    if (links) {
      links.style.fontSize = '';
      links.style.transform = '';
      for (var j = 0; j < links.children.length; j++) links.children[j].style.fontSize = '';
    }
  }

  function layout() {
    if (isPhone) {
      clearFitter();
      placeCards();
      return;
    }

    var T = isTablet ? tboost : 1;

    if (h1a) { fitBox(h1a, 563.5 * T, 37.2 * T, 'translateX(-50%)'); baseline(h1a, 204.5); }
    if (h1b) { fitBox(h1b, 197.5 * T, 37.2 * T, 'translateX(-50%)'); baseline(h1b, 258.5); }
    if (sub1) { fitBox(sub1, 389 * T, 8.4 * T, 'translateX(-50%)'); baseline(sub1, 300.5); }
    if (sub2) { fitBox(sub2, 311 * T, 8.4 * T, 'translateX(-50%)'); baseline(sub2, 316.5); }
    if (badgeTxt) { fitBox(badgeTxt, 184 * T, 9.4 * T, 'translate(2px,-1px)'); }
    if (wmName) { fitBox(wmName, 51 * T, 11.4 * T); baseline(wmName, 38.5); }

    if (!isTablet) {
      if (ctaBtn && ctaLabel) { fitBox(ctaLabel, 87 * T, 8.9 * T); centreLabel(ctaBtn, ctaLabel, 8.9 * T); }
      if (vpBtn && vpLabel) { fitBox(vpLabel, 76 * T, 9.5 * T); centreLabel(vpBtn, vpLabel, 9.5 * T); }

      if (links && links.children.length) {
        links.style.transform = '';
        for (var i = 0; i < links.children.length; i++) links.children[i].style.fontSize = '';
        var fs = 7.9 / capRatio(links.children[0]);
        for (var j = 0; j < links.children.length; j++) links.children[j].style.fontSize = fs + 'px';
        var w = links.getBoundingClientRect().width / k;
        links.style.transform = 'scaleX(' + (317 / w) + ')';
      }
    } else {
      if (links) {
        links.style.transform = '';
        for (var m = 0; m < links.children.length; m++) links.children[m].style.fontSize = '';
      }
      if (ctaLabel) { ctaLabel.style.fontSize = ''; ctaLabel.style.transform = ''; ctaLabel.style.top = ''; }
      if (vpLabel) { vpLabel.style.fontSize = ''; vpLabel.style.transform = ''; vpLabel.style.top = ''; }
    }

    placeCards();
  }

  /* ---- 10. RESIZE ----------------------------------------------------- */
  var DW_MIN = 920, TAB_MAX = 1080, TAB_MIN = 701, CW = 1172;

  function resize() {
    var vw = innerWidth, vh = innerHeight;
    isPhone = vw <= 700;
    isTablet = !isPhone && vw <= TAB_MAX;

    if (isPhone) {
      k = 1; tboost = 1;
      canvasEl.style.removeProperty('--k');
      canvasEl.style.removeProperty('--fill');
      canvasEl.style.removeProperty('--stshift');
      canvasEl.style.removeProperty('--sshift');
      canvasEl.style.removeProperty('--rs');
      if (nav && nav.classList.contains('open')) closeMenu(false);
      layout();
      return;
    }

    var W = CW;
    if (isTablet) {
      W = DW_MIN + (vw - TAB_MIN) * (CW - DW_MIN) / (TAB_MAX - TAB_MIN);
      if (vh > vw * 1.15) W = Math.min(W, 900);
    }

    k = Math.min(vw / W, vh / 560);

    var ramp = isTablet ? Math.min(1, (TAB_MAX - vw) / 120) : 0;
    tboost = 1 + 0.14 * ramp;

    var fill = Math.max(0, vh / k - 657);
    var ss = 0, rs = 1, st = 0;
    if (fill > 0) {
      ss = Math.min(fill * 0.55, 420) * ramp;
      rs = 1 + Math.min(fill / 1100, 0.75) * ramp;
      var slack = 219.5 - 125 * rs + ss;
      st = Math.max(0, slack / 2 - 28) * ramp;
      fill -= ss;
    }

    canvasEl.style.setProperty('--k', k);
    canvasEl.style.setProperty('--fill', fill + 'px');
    canvasEl.style.setProperty('--stshift', st + 'px');
    canvasEl.style.setProperty('--sshift', ss + 'px');
    canvasEl.style.setProperty('--rs', rs);

    layout();
  }

  /* ---- 6. SPIN LOOP --------------------------------------------------- */
  var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var last = performance.now();

  function tick(t) {
    var dt = Math.min((t - last) / 1000, 0.1);
    last = t;
    if (!REDUCE) { phase -= SPEED * dt; placeCards(); }
    requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) last = performance.now();
  });

  /* ---- MENU ----------------------------------------------------------- */
  var lastFocus = null;
  function closeMenu(refocus) {
    if (!nav || !nav.classList.contains('open')) return;
    nav.classList.remove('open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (refocus && lastFocus) lastFocus.focus();
  }

  if (burger) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) lastFocus = burger;
    });
  }

  document.addEventListener('click', function (e) {
    if (nav && !nav.contains(e.target)) closeMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu(true);
  });

  var navmenu = document.getElementById('navmenu');
  if (navmenu) {
    navmenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu(false);
    });
  }

  addEventListener('resize', function () {
    if (innerWidth > 1080) closeMenu(false);
  });

  /* ---- 12. MASTER ENTRANCE TIMELINE ----------------------------------- */
  (function () {
    var root = document.documentElement;
    var D = innerWidth <= 700 ? 0.66 : 1;
    var EXPO = 'cubic-bezier(.16,1,.3,1)', SOFT = 'cubic-bezier(.22,.61,.36,1)';
    var n = 0, lastAnim = null, lastEnd = -1;

    function Y(px) { return '0 ' + (px * D) + 'px'; }

    function play(el, from, dur, delay, ease) {
      if (!el || !el.animate) return;
      var to = { opacity: 1 };
      if (from.translate) to.translate = '0 0';
      if (from.scale != null) to.scale = '1';
      if (from.clipPath) to.clipPath = 'inset(-30% 0 -30% 0)';
      var a = el.animate([from, to], { duration: dur, delay: delay, easing: ease, fill: 'both' });
      a.id = 'intro:' + (n++);
      if (delay + dur > lastEnd) { lastEnd = delay + dur; lastAnim = a; }
    }

    function settle() {
      document.getAnimations().forEach(function (a) {
        if (a.id && a.id.indexOf('intro:') === 0) a.cancel();
      });
      root.classList.remove('intro');
    }

    if (!root.classList.contains('intro')) return settle();
    if (REDUCE) return settle();
    if (!Element.prototype.animate) return settle();

    play(document.getElementById('nav'), { opacity: 0, translate: Y(-9) }, 620, 60, EXPO);
    play(document.querySelector('.mark'), { opacity: 0, translate: Y(6) }, 520, 150, SOFT);
    play(document.querySelector('.wm'), { opacity: 0, translate: Y(6) }, 520, 185, SOFT);
    if (links) {
      [].forEach.call(links.children, function (a, i) {
        play(a, { opacity: 0, translate: Y(6) }, 460, 215 + i * 45, SOFT);
      });
    }
    play(burger, { opacity: 0, translate: Y(6) }, 460, 300, SOFT);
    play(ctaBtn, { opacity: 0, translate: Y(6) }, 500, 400, SOFT);

    play(document.querySelector('.badge'), { opacity: 0, translate: Y(11), scale: 0.985 }, 560, 270, EXPO);
    play(h1a, { opacity: 0, translate: Y(15), clipPath: 'inset(100% 0 -30% 0)' }, 900, 380, EXPO);
    play(h1b, { opacity: 0, translate: Y(15), clipPath: 'inset(100% 0 -30% 0)' }, 900, 470, EXPO);
    play(sub1, { opacity: 0, translate: Y(10) }, 620, 690, EXPO);
    play(sub2, { opacity: 0, translate: Y(10) }, 620, 745, EXPO);
    play(vpBtn, { opacity: 0, translate: Y(13), scale: 0.985 }, 620, 830, EXPO);

    play(ring, { opacity: 0, translate: Y(18), scale: 0.99 }, 950, 700, EXPO);
    play(document.getElementById('browser'), { opacity: 0, translate: Y(26) }, 900, 900, EXPO);
    play(document.querySelector('.wa'), { opacity: 0, scale: 0.88 }, 500, 1260, EXPO);

    if (lastAnim && lastAnim.finished) {
      lastAnim.finished.then(settle, settle);
    } else {
      settle();
    }
  })();

  /* ---- WIRING --------------------------------------------------------- */
  buildRing();
  addEventListener('resize', resize);
  if (window.visualViewport) visualViewport.addEventListener('resize', resize);
  resize();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(layout);
  }
  setTimeout(layout, 400);
  setTimeout(layout, 1400);
  requestAnimationFrame(tick);
