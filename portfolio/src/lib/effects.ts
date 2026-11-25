const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Révèle les éléments [data-reveal] au scroll, avec décalage (stagger). */
export function initReveal(root: ParentNode = document): void {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      (e.target as HTMLElement).classList.add('in');
      io.unobserve(e.target);
    }
  }, { threshold: 0.12 });
  els.forEach((el, i) => { el.style.setProperty('--d', `${(i % 6) * 70}ms`); io.observe(el); });
}

/** Barre de progression du scroll + lien de navigation actif. */
export function initScroll(bar: HTMLElement): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.nav a[href^="#"]')];
  const sections = links.map((a) => document.querySelector<HTMLElement>(a.hash)).filter((s): s is HTMLElement => !!s);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    const cur = sections.filter((s) => s.offsetTop - 140 <= scrollY).pop();
    links.forEach((a) => a.classList.toggle('active', !!cur && a.hash === `#${cur.id}`));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/** Halo qui suit la souris + inclinaison 3D des cartes. */
export function initPointer(): void {
  if (reduced) return;
  addEventListener('pointermove', (e) => {
    document.body.style.setProperty('--mx', `${e.clientX}px`);
    document.body.style.setProperty('--my', `${e.clientY}px`);
  }, { passive: true });
  document.querySelectorAll<HTMLElement>('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
      card.style.setProperty('--gx', `${x * 100}%`);
      card.style.setProperty('--gy', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
  });
}

/** Effet machine à écrire en boucle. */
export function typewriter(el: HTMLElement, words: string[], speed = 70, pause = 1400): void {
  if (reduced) { el.textContent = words[0] ?? ''; return; }
  let w = 0, i = 0, del = false;
  const tick = (): void => {
    const word = words[w] ?? '';
    el.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; setTimeout(tick, pause); return; }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? speed / 2 : speed);
  };
  tick();
}

/** Thème clair / sombre persistant. */
export function initTheme(btn: HTMLButtonElement): void {
  const root = document.documentElement;
  try { root.dataset.theme = localStorage.getItem('theme') ?? root.dataset.theme ?? 'dark'; } catch { /* ignore */ }
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch { /* ignore */ }
  });
}

/** Compteurs animés [data-count]. */
export function initCounters(): void {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    if (reduced) { el.textContent = String(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t: number): void => {
        const k = Math.min(1, (t - t0) / 1400);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
  });
}

/** Boutons « magnétiques ». */
export function initMagnetic(): void {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

/** Parallaxe de la photo du hero. */
export function initParallax(): void {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (reduced || !hero) return;
  hero.addEventListener('pointermove', (e) => {
    hero.style.setProperty('--px', String(e.clientX / innerWidth - 0.5));
    hero.style.setProperty('--py', String(e.clientY / innerHeight - 0.5));
  });
}

/** Bouton retour en haut. */
export function initTopButton(): void {
  const b = document.getElementById('top-btn');
  if (!b) return;
  addEventListener('scroll', () => b.classList.toggle('show', scrollY > 600), { passive: true });
  b.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
}

/** Réseau de particules en canvas (se met en pause hors écran). */
export function particles(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (reduced || !ctx) return;
  interface P { x: number; y: number; vx: number; vy: number }
  let w = 0, h = 0, visible = true;
  const pts: P[] = [];
  const resize = (): void => {
    w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight;
    pts.length = 0;
    const n = Math.min(70, Math.floor((w * h) / 16000));
    for (let i = 0; i < n; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 });
  };
  resize();
  addEventListener('resize', resize);
  new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; }).observe(canvas);
  const loop = (): void => {
    if (visible) {
      ctx.clearRect(0, 0, w, h);
      const col = getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim() || '#22d3ee';
      ctx.fillStyle = col; ctx.strokeStyle = col;
      for (const p of pts) {
        p.x = (p.x + p.vx + w) % w; p.y = (p.y + p.vy + h) % h;
        ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 6.283); ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        if (!a || !b) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) { ctx.globalAlpha = (1 - d / 120) * 0.3; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
    }
    requestAnimationFrame(loop);
  };
  loop();
}
