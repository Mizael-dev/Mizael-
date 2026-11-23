/* =========================================================
   Interações do site. O conteúdo vem de js/data.js.
   ========================================================= */
(() => {
  const S = window.SITE;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Texto que rola: o mesmo texto duplicado, sobe no hover */
  const roll = (t) => `<span class="roll"><span class="roll-inner"><span>${esc(t)}</span><span aria-hidden="true">${esc(t)}</span></span></span>`;

  const NAV = [
    { href: "trabalhos.html", label: "Design", key: "trabalhos", count: S.projects.length },
    { href: "portfolio.html", label: "Portfólio", key: "portfolio" },
    { href: "sobre.html", label: "Sobre", key: "sobre" },
    { href: "contato.html", label: "Contato", key: "contato" }
  ];

  /* Ícones das redes sociais (herdam a cor do texto) */
  const SOCIAL_ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.03c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-4z"/></svg>'
  };
  const socialIcon = (name) => {
    const svg = SOCIAL_ICONS[String(name).toLowerCase()];
    return svg ? svg.replace("<svg", '<svg class="social-icon" aria-hidden="true"') : "";
  };

  /* Logo: usada como máscara para herdar a cor do texto (preto/branco) */
  const logoMark = () => S.logo
    ? `<span class="logo-img" style="--logo:url('${esc(new URL(S.logo, location.href).href)}')" role="img" aria-label="${esc(S.brand)}"></span>`
    : esc(S.brand);

  /* ---------- Cabeçalho + menu mobile ---------- */
  function renderHeader() {
    const current = page === "projeto" ? "trabalhos" : page;
    const links = NAV.map((n) =>
      `<a href="${n.href}" class="${n.key === current ? "current" : ""}${n.count ? " has-count" : ""}">${roll(n.label)}${n.count ? `<span class="count">${n.count}</span>` : ""}</a>`
    ).join("");
    const cta = `<a href="${esc(S.bookingUrl)}" target="_blank" rel="noopener">${roll("Vamos conversar ↗")}</a>`;

    document.body.insertAdjacentHTML("afterbegin", `
      <div class="curtain" aria-hidden="true"></div>
      <header class="site-header">
        <a href="index.html" class="logo" aria-label="${esc(S.brand)} — início">${logoMark()}</a>
        <nav class="nav" aria-label="Principal">${links}${cta}</nav>
        <button class="menu-btn" aria-expanded="false" aria-controls="mobile-menu">Menu</button>
      </header>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <nav aria-label="Menu mobile">${NAV.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join("")}
          <a href="${esc(S.bookingUrl)}" target="_blank" rel="noopener">Vamos conversar ↗</a></nav>
        <div class="socials-small">${S.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${socialIcon(s.name)}${esc(s.name)}</a>`).join("")}</div>
      </div>`);

    const btn = $(".menu-btn"), menu = $("#mobile-menu");
    const setOpen = (open) => {
      menu.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      btn.textContent = open ? "Fechar" : "Menu";
      btn.setAttribute("aria-expanded", open);
      menu.setAttribute("aria-hidden", !open);
    };
    btn.addEventListener("click", () => { const o = !menu.classList.contains("open"); setOpen(o); lockScroll(o); });
    $$("a", menu).forEach((a) => a.addEventListener("click", () => lockScroll(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) { setOpen(false); lockScroll(false); } });
  }

  /* ---------- Rodapé ---------- */
  function renderFooter() {
    const services = S.about.services.map((s) => `<a href="sobre.html#servicos">${roll(s.title)}</a>`).join("");
    const socials = S.socials.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}" title="${esc(s.name)}">${socialIcon(s.name) || esc(s.name.slice(0, 2))}</a>`).join("");
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="site-footer">
        <h2 class="display slogan">${S.slogan.map(esc).join("<br>")}</h2>
        <a href="index.html" class="footer-logo" aria-label="${esc(S.brand)} — início">${logoMark()}</a>
        <div class="footer-row"><span class="label">Serviços</span><div class="list-links">${services}</div></div>
        <div class="footer-row"><span class="label">Siga</span><div class="socials">${socials}</div></div>
        <div class="footer-bottom">
          <a href="#top" class="back-top">${roll("Voltar ao topo ↑")}</a>
          <a href="${esc(S.bookingUrl)}" target="_blank" rel="noopener" class="big-cta">${roll("Vamos conversar ↗")}</a>
        </div>
        <div class="footer-bottom" style="margin-top:18px;border:0">
          <span>© ${new Date().getFullYear()} ${esc(S.brand)}</span>
          <span>${S.footerLine.map(esc).join(" • ")}</span>
        </div>
      </footer>`);
    $(".back-top").addEventListener("click", (e) => { e.preventDefault(); scrollToTop(); });
  }

  /* ---------- Transição entre páginas (cortina) ---------- */
  function initCurtain() {
    const c = $(".curtain");
    const reveal = () => requestAnimationFrame(() => c.classList.add("out"));
    reveal();
    // Ao voltar com o botão "voltar" do navegador, a página vem do cache com a cortina fechada
    addEventListener("pageshow", (e) => { if (e.persisted) { c.className = "curtain out"; } });

    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      e.preventDefault();
      if (reduceMotion) { location.href = url.href; return; }
      c.className = "curtain reset";
      void c.offsetWidth;          // força o navegador a aplicar a posição inicial
      c.className = "curtain in";
      setTimeout(() => (location.href = url.href), 480);
    });
  }

  /* ---------- Aparecer ao rolar ---------- */
  function initReveal() {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
    }), { threshold: 0.15 });
    $$("[data-reveal]").forEach((el) => io.observe(el));
  }

  /* Loop de rolagem compartilhado (um único requestAnimationFrame) */
  const scrollFns = [];
  let ticking = false;
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { scrollFns.forEach((f) => f()); ticking = false; }); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- Rolagem suave com inércia (Lenis) ---------- */
  let lenis = null;
  function initSmoothScroll() {
    if (reduceMotion || !window.Lenis) return; // sem a biblioteca, a rolagem nativa continua funcionando
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    // Âncoras da mesma página (ex.: #servicos) também rolam suavemente
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.classList.contains("back-top")) return;
      const target = a.getAttribute("href") !== "#" && document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -80 }); }
    });
  }
  const scrollToTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  const lockScroll = (on) => { if (lenis) on ? lenis.stop() : lenis.start(); document.documentElement.style.overflow = on ? "hidden" : ""; };

  /* ---------- Parallax nas imagens: [data-parallax] com uma <img> dentro ---------- */
  function initParallax() {
    const els = $$("[data-parallax]");
    if (!els.length || reduceMotion) return;
    scrollFns.push(() => {
      const vh = innerHeight;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;          // fora da tela: não calcula
        // -1 quando está entrando por baixo, +1 saindo por cima
        const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
        el.firstElementChild.style.translate = `0 ${(-8.33 + p * 8.33).toFixed(2)}%`;
      });
    });
  }

  /* =================== HOME =================== */
  function home() {
    const main = $("main");
    const slides = S.heroSlides.map((s, i) => `
      <div class="hero-slide${i === 0 ? " active" : ""}${s.dark ? " dark" : ""}${s.cutout ? " cutout" : ""}${s.studio ? " studio" : ""}" style="background:linear-gradient(to top, ${s.from}, ${s.to});color:${s.text || "inherit"}">
        <${i ? "p" : "h1"} class="display hero-title"><span class="word"><span>Para</span></span><span class="word"><span>${esc(s.word)}</span></span></${i ? "p" : "h1"}>
        <img src="${esc(s.image)}" alt="" ${i ? 'loading="lazy"' : ""}>
      </div>`).join("");
    const dots = S.heroSlides.map((s, i) => `<button aria-label="Slide ${i + 1}: ${esc(s.word)}"><i></i></button>`).join("");

    const featured = S.projects.filter((p) => p.featured);
    const stack = featured.map((p) => `
      <section class="stack-item">
        <div class="stack-media">
          ${p.video ? `<video src="${esc(p.video)}" muted loop playsinline autoplay poster="${esc(p.cover)}"></video>` : `<img src="${esc(p.cover)}" alt="" loading="lazy">`}
        </div>
        <div class="stack-content">
          <h2>${esc(p.title)}</h2>
          <img class="stack-thumb" src="${esc(p.thumb)}" alt="${esc(p.title)}" loading="lazy">
          <a class="btn-ghost" href="projeto.html?p=${encodeURIComponent(p.slug)}">VER PROJETO</a>
        </div>
      </section>`).join("");

    main.innerHTML = `
      <section class="hero">
        ${slides}
        <p class="hero-intro"><span class="arrow">↘</span>${esc(S.tagline)}</p>
        <div class="hero-dots">${dots}</div>
      </section>
      <div class="stack">${stack}</div>`;

    /* Slider automático com barras de progresso */
    const hero = $(".hero"), slideEls = $$(".hero-slide"), dotEls = $$(".hero-dots button");
    const DURATION = 5000;
    hero.style.setProperty("--dur", DURATION + "ms");
    let idx = 0, timer;
    const go = (n) => {
      idx = (n + slideEls.length) % slideEls.length;
      slideEls.forEach((s, i) => s.classList.toggle("active", i === idx));
      dotEls.forEach((d, i) => {
        d.classList.remove("active");
        d.classList.toggle("done", i < idx);
      });
      void dotEls[idx].offsetWidth; // reinicia a animação da barra
      dotEls[idx].classList.add("active");
      clearTimeout(timer);
      if (!reduceMotion) timer = setTimeout(() => go(idx + 1), DURATION);
    };
    dotEls.forEach((d, i) => d.addEventListener("click", () => go(i)));
    document.addEventListener("visibilitychange", () => (document.hidden ? clearTimeout(timer) : go(idx)));
    go(0);

    /* Parallax do topo: título sobe e some, foto desce devagar, texto sobe */
    if (!reduceMotion) scrollFns.push(() => {
      const hp = Math.min(1, Math.max(0, scrollY / innerHeight));
      hero.style.setProperty("--hp", hp.toFixed(4));
    });

    /* Cards empilhados: o card "abre" (recorte diminui) enquanto sobe */
    const items = $$(".stack-item");
    scrollFns.push(() => {
      const vh = innerHeight;
      items.forEach((it) => {
        const top = it.getBoundingClientRect().top;
        // p = 0 quando o card entra por baixo, 1 quando encosta no topo
        const p = Math.min(1, Math.max(0, 1 - top / vh));
        const m = $(".stack-media", it);
        m.style.setProperty("--clip", `${(1 - p) * 14}% ${(1 - p) * 8}%`);
        m.style.setProperty("--radius", `${(1 - p) * 24}px`);
        m.style.setProperty("--zoom", 1.15 - p * 0.15);
        $(".stack-content", it).style.setProperty("--content", Math.max(0, p * 1.6 - 0.6));
      });
    });
    onScroll();
  }

  /* =================== TRABALHOS =================== */
  const workCard = (p) => `
    <a class="work-card" href="projeto.html?p=${encodeURIComponent(p.slug)}" data-reveal>
      <div class="media" data-parallax><img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="work-meta"><span class="label">${esc(p.category)}</span><span class="label">${esc(p.year)}</span></div>
      <h2 class="display">${esc(p.title)}</h2>
      <div class="service">${esc(p.service)}</div>
    </a>`;

  function trabalhos() {
    $("main").innerHTML = `
      <div class="wrap page-top">
        <h1 class="sr-only">Design — projetos de identidade visual</h1>
        <div class="work-list">${S.projects.map(workCard).join("")}</div>
        <a href="portfolio.html" class="display explore">Ver portfólio ↘</a>
      </div>`;
  }

  /* =================== PROJETO =================== */
  function projeto() {
    const slug = new URLSearchParams(location.search).get("p");
    const p = S.projects.find((x) => x.slug === slug) || S.projects[0];
    document.title = `${p.title} — ${S.brand}`;
    const others = S.projects.filter((x) => x !== p);
    $("main").innerHTML = `
      <article class="wrap page-top">
        <h1 class="display case-title">${esc(p.title)}</h1>
        <div class="case-hero" data-parallax><img src="${esc(p.cover)}" alt="${esc(p.title)}"></div>
        <div class="case-grid">
          <div data-reveal>
            <span class="label">${esc(p.service)}</span>
            <p class="intro">${esc(p.intro)}</p>
            ${p.body.map((t) => `<p>${esc(t).replace(/\*(.+?)\*/g, "<em>$1</em>")}</p>`).join("")}
          </div>
          <div class="info-table" data-reveal>
            <span class="label">Informações do projeto</span>
            <div><span>Ano</span><span>${esc(p.year)}</span></div>
            <div><span>Setor</span><span>${esc(p.category)}</span></div>
            <div><span>Serviços</span><span>${p.services.map(esc).join("<br>")}</span></div>
            ${p.link && p.link !== "#" ? `<div><span>Visitar</span><a href="${esc(p.link)}" target="_blank" rel="noopener">${esc(p.title)} ↗</a></div>` : ""}
          </div>
        </div>
        <div class="case-gallery">${p.gallery.map((g, i) => {
          // Aceita "caminho.jpg" ou { src, size: "full" | "half" | "third" }
          const src = typeof g === "string" ? g : g.src;
          const size = (typeof g === "object" && g.size) || (i === 0 ? "full" : "half");
          return `<img class="g-${esc(size)}" src="${esc(src)}" alt="" loading="lazy" data-reveal>`;
        }).join("")}</div>
        <section class="more-work">
          <h3 class="label">Mais trabalhos</h3>
          <div class="more-grid">${others.map(workCard).join("")}</div>
          <a href="trabalhos.html" class="view-all">Ver todos os trabalhos</a>
        </section>
      </article>`;
  }

  /* =================== PORTFÓLIO =================== */
  const isVideo = (src) => /\.(mp4|webm|mov)(\?|$)/i.test(src);
  const url = (src) => esc(encodeURI(src).replace(/#/g, "%23"));
  /* Bloco/capa: vídeo toca sozinho, sem som */
  const media = (src, attrs = "") => isVideo(src)
    ? `<video src="${url(src)}" muted loop playsinline autoplay ${attrs}></video>`
    : `<img src="${url(src)}" alt="" loading="lazy" ${attrs}>`;
  /* Item do mosaico: vídeo fica parado no 1º quadro, com ícone de play */
  const PLAY = '<span class="play-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>';
  const tile = (src, i) => isVideo(src)
    ? `<button class="video-tile" data-i="${i}" aria-label="Assistir vídeo ${i + 1}">
         <video src="${url(src)}#t=0.5" muted playsinline loop preload="metadata"></video>${PLAY}</button>`
    : `<img src="${url(src)}" alt="" loading="lazy" data-i="${i}">`;

  function portfolio() {
    const slug = new URLSearchParams(location.search).get("s");
    const sec = S.portfolio.find((x) => x.slug === slug);
    return sec ? portfolioSection(sec) : portfolioIndex();
  }

  /* Página principal: 3 blocos clicáveis (Design, Motion, Web Design) */
  function portfolioIndex() {
    document.title = `Portfólio — ${S.brand}`;
    $("main").innerHTML = `
      <div class="wrap page-top pf-head">
        <h1 class="display">Portfólio</h1>
      </div>
      <div class="wrap pf-list">
        ${S.portfolio.map((s, i) => `
          <a class="pf-card" href="portfolio.html?s=${encodeURIComponent(s.slug)}" data-reveal>
            <div class="pf-media"${s.coverPosition ? ` style="--pos:${esc(s.coverPosition)}"` : ""}>${media(s.cover)}</div>
            <div class="pf-info">
              <span class="pf-num">${String(i + 1).padStart(2, "0")}</span>
              <h2 class="display">${esc(s.title)}</h2>
              <p>${esc(s.text)}</p>
              <span class="pf-go">Ver trabalhos <b>→</b></span>
            </div>
          </a>`).join("")}
      </div>`;
  }

  /* Página de cada seção: mosaico com parallax + lightbox */
  function portfolioSection(sec) {
    document.title = `${sec.title} — Portfólio — ${S.brand}`;
    const items = sec.items;
    const others = S.portfolio.filter((x) => x !== sec);
    const cols = [[], [], []];
    items.forEach((src, i) => cols[i % 3].push({ src, i }));
    $("main").innerHTML = `
      <div class="photo-head">
        <a class="pf-back" href="portfolio.html">← Portfólio</a>
        <h1 class="display">${esc(sec.title)}</h1>
        <p class="pf-sub">${esc(sec.text)}</p>
      </div>
      ${sec.layout === "pages"
        /* Sites: miniaturas do mesmo tamanho, a imagem rola ao passar o mouse */
        ? `<div class="wrap web-grid">${items.map((src, i) => `
            <button class="web-tile" data-i="${i}" aria-label="Ver site ${i + 1} inteiro">
              <img src="${url(src)}" alt="" loading="lazy"><span class="web-zoom">Ver site inteiro ↗</span>
            </button>`).join("")}</div>`
        : `<div class="wrap masonry">
        ${cols.map((c, k) => `<div class="col" data-speed="${[0.04, 0, 0.08][k]}" style="margin-top:${[80, 0, 50][k]}px">
          ${c.map((ph) => tile(ph.src, ph.i)).join("")}</div>`).join("")}
      </div>`}
      <nav class="wrap pf-next" aria-label="Outras seções">
        ${others.map((o) => `<a href="portfolio.html?s=${encodeURIComponent(o.slug)}" class="display">${esc(o.title)} →</a>`).join("")}
      </nav>
      <div class="lightbox" role="dialog" aria-modal="true" aria-label="Imagem ampliada">
        <div class="lb-stage" data-lenis-prevent></div>
        <button class="lb-close">Fechar ✕</button>
        <button class="lb-prev" aria-label="Anterior">←</button>
        <button class="lb-next" aria-label="Próxima">→</button>
        <span class="lb-count"></span>
      </div>`;

    /* Título some e colunas se movem em velocidades diferentes (parallax) */
    const head = $(".photo-head"), colEls = $$(".masonry .col");
    scrollFns.push(() => {
      const y = scrollY;
      head.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.7));
      if (!reduceMotion && innerWidth > 760) colEls.forEach((c) => (c.style.transform = `translateY(${-y * c.dataset.speed}px)`));
      else colEls.forEach((c) => (c.style.transform = ""));
    });
    onScroll();

    /* Lightbox: clique, setas do teclado, ESC */
    const lb = $(".lightbox"), stage = $(".lb-stage", lb), count = $(".lb-count", lb);
    let cur = 0, lastFocus;
    const show = (i) => {
      cur = (i + items.length) % items.length;
      stage.innerHTML = isVideo(items[cur])
        ? `<video src="${url(items[cur])}" controls autoplay playsinline></video>`
        : `<img src="${url(items[cur])}" alt="">`;
      count.textContent = `${cur + 1} / ${items.length}`;
      /* Imagem bem comprida (print de site): abre na largura e rola */
      lb.classList.remove("lb-tall");
      stage.scrollTop = 0;
      const im = $("img", stage);
      if (im) {
        const fit = () => {
          const r = im.naturalHeight / im.naturalWidth;
          lb.classList.toggle("lb-tall", r > 1.6);
          lb.classList.toggle("lb-phone", r > 7); // print de celular: largura de celular
        };
        im.complete ? fit() : im.addEventListener("load", fit, { once: true });
      }
    };
    const open = (i) => { lastFocus = document.activeElement; show(i); lb.classList.add("open"); lockScroll(true); $(".lb-close", lb).focus({ preventScroll: true }); };
    const close = () => { lb.classList.remove("open"); stage.innerHTML = ""; lockScroll(false); lastFocus && lastFocus.focus({ preventScroll: true }); };
    $(".masonry, .web-grid").addEventListener("click", (e) => { const m = e.target.closest("[data-i]"); if (m) open(+m.dataset.i); });
    /* Sites: a velocidade da rolagem ao passar o mouse acompanha o tamanho da página */
    $$(".web-tile img").forEach((im) => {
      const set = () => {
        const r = im.naturalHeight / im.naturalWidth;
        im.parentElement.style.setProperty("--dur", Math.min(14, Math.max(3, r * 1.6)).toFixed(1) + "s");
        im.parentElement.classList.toggle("is-phone", r > 7); // print de celular: miniatura menor, em formato de celular
      };
      im.complete ? set() : im.addEventListener("load", set, { once: true });
    });
    /* Prévia: no computador, o vídeo toca sem som ao passar o mouse */
    if (matchMedia("(hover: hover)").matches) $$(".video-tile").forEach((t) => {
      const v = $("video", t);
      t.addEventListener("mouseenter", () => v.play().catch(() => {}));
      t.addEventListener("mouseleave", () => v.pause());
    });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", () => show(cur - 1));
    $(".lb-next", lb).addEventListener("click", () => show(cur + 1));
    lb.addEventListener("click", (e) => (e.target === lb || e.target === stage) && close());
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  /* =================== SOBRE =================== */
  function sobre() {
    const a = S.about, n = a.services.length;
    $("main").innerHTML = `
      <div class="wrap page-top">
        <div class="about-id" data-reveal>
          <h1>${esc(a.fullName || S.name)}</h1>
          <p class="about-roles">${(a.roles || []).map(esc).join(" · ")}</p>
          ${a.availability ? `<span class="about-badge"><i></i>${esc(a.availability)}</span>` : ""}
        </div>
        <p class="about-lead" data-reveal>${esc(a.lead)}</p>
        <div class="about-split">
          <div class="portrait" data-parallax data-reveal><img src="${esc(a.portrait)}" alt="Retrato de ${esc(a.fullName || S.name)}"></div>
          <div class="about-bio" data-reveal>${a.bio.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        </div>

        <div class="section-head" data-reveal><h2>EXPERIÊNCIA ↓</h2><span class="num">①</span></div>
        ${a.experience.map((x) => `
          <div class="exp-row${x.recent ? " is-recent" : ""}" data-reveal>
            <span class="exp-years">${esc(x.years)}</span>
            <div class="exp-main"><strong>${esc(x.company)}</strong><span class="exp-role">${esc(x.role)}</span></div>
            <ul class="exp-items">${x.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
          </div>`).join("")}

        <div class="section-head" data-reveal><h2>COMPETÊNCIAS ↓</h2><span class="num">②</span></div>
        <div class="skills">${a.skills.map((s) => `
          <div class="skill" data-reveal><h3>${esc(s.area)}</h3><ul>${s.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}
        </div>

        <div class="section-head" id="servicos" data-reveal><h2>O QUE FAÇO ↓</h2><span class="num">③</span></div>
        ${a.services.map((s, i) => `
          <div class="svc" data-reveal>
            <h3 class="display">${esc(s.title)}</h3>
            <div><div class="idx">${i + 1}/${n}</div><p>${esc(s.text)}</p></div>
            <ul>${s.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
          </div>`).join("")}

        <div class="section-head" data-reveal><h2>FORMAÇÃO E CURSOS ↓</h2><span class="num">④</span></div>
        ${a.education.map((e) => `
          <div class="edu-row${e.degree ? " is-degree" : ""}" data-reveal>
            <span class="exp-years">${esc(e.years)}</span>
            <strong>${esc(e.title)}</strong>
            <span class="edu-place">${esc(e.place)}</span>
          </div>`).join("")}
      </div>`;
  }

  /* =================== CONTATO =================== */
  function contato() {
    const words = S.greetings.map((g) => `<span class="display">${esc(g)}</span>`).join("");
    const tel = S.phone.replace(/[^\d+]/g, "");
    const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.address);
    $("main").innerHTML = `
      <h1 class="sr-only">Contato — ${esc(S.brand)}</h1>
      <div class="marquee" aria-label="Olá em vários idiomas"><div class="marquee-track">${words}${words}</div></div>
      <div class="wrap contact-list">
        <a href="${S.whatsapp ? esc(S.whatsapp) : `tel:${esc(tel)}`}"${S.whatsapp ? ' target="_blank" rel="noopener"' : ""}><span class="label">${S.whatsapp ? "WhatsApp" : "Ligue"}</span><span class="value">${esc(S.phone)}</span><span class="go">→</span></a>
        <a href="mailto:${esc(S.email)}"><span class="label">E-mail</span><span class="value">${esc(S.email)}</span><span class="go">→</span></a>
        <a href="${maps}" target="_blank" rel="noopener"><span class="label">Visite</span><span class="value">${esc(S.address)}</span><span class="go">→</span></a>
        <a href="${esc(S.bookingUrl)}" target="_blank" rel="noopener"><span class="label">Agende</span><span class="value">Marcar uma conversa</span><span class="go">→</span></a>
      </div>`;
  }

  /* ---------- Inicialização ---------- */
  document.body.id = "top";
  renderHeader();
  ({ home, trabalhos, projeto, portfolio, sobre, contato }[page] || (() => {}))();
  renderFooter();
  /* Todo link para outro site abre em nova aba, sem sair do portfólio */
  $$("a[href]").forEach((a) => {
    if (/^https?:/i.test(a.href) && new URL(a.href).origin !== location.origin) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  });
  initCurtain();
  initReveal();
  initSmoothScroll();
  initParallax();
  onScroll();
})();
