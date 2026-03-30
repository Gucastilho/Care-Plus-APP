/* ══════════════════════════════════════
   Care Plus — missoes.js
   ══════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────
const missionsData = {
  daily: [
    { emoji: '🚶', title: 'Caminhada Matinal',  desc: 'Caminhe 5.000 passos hoje · 3.750 / 5.000 passos',        pts: 50,  progress: 75,  done: false, color: 'var(--green)', grad: 'linear-gradient(90deg,var(--green2),var(--green))',   offset: 36.1   },
    { emoji: '💧', title: 'Hidratação',          desc: 'Beba 2 litros de água · 2.000ml / 2.000ml',               pts: 30,  progress: 100, done: true,  color: 'var(--teal)',  grad: 'linear-gradient(90deg,#009e9a,var(--teal))',           offset: 0      },
    { emoji: '🧘', title: 'Alongamento',         desc: 'Faça 10 minutos de alongamento · Não iniciado',           pts: 40,  progress: 0,   done: false, color: 'var(--muted2)',grad: 'var(--muted2)',                                        offset: 144.51 },
  ],
  weekly: [
    { emoji: '🏃', title: 'Caminhada Semanal',  desc: 'Caminhe 25.000 passos essa semana · 3.500 / 25.000',      pts: 150, progress: 14,  done: false, color: 'var(--green)', grad: 'linear-gradient(90deg,var(--green2),var(--green))',   offset: 124.3  },
    { emoji: '💧', title: 'Hidratação Semanal', desc: 'Beba 10 litros de água essa semana · 400ml / 10.000ml',   pts: 80,  progress: 4,   done: false, color: 'var(--blue)',  grad: 'linear-gradient(90deg,#2e6fff,var(--blue))',           offset: 138.7  },
    { emoji: '🍎', title: 'Nutrição Saudável',  desc: 'Registre 5 refeições saudáveis · 1 / 5 refeições',        pts: 100, progress: 20,  done: false, color: 'var(--amber)', grad: 'linear-gradient(90deg,#c07800,var(--amber))',          offset: 115.6  },
  ],
};

// ── Ripple ────────────────────────────────────────────────────
function addRipple(card) {
  card.addEventListener('click', e => {
    const rect   = card.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-el';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    card.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
}

// ── Build mission card ─────────────────────────────────────────
function buildCard(m, index) {
  const card = document.createElement('div');
  card.className = 'mission-card' + (m.done ? ' done' : '');
  // stagger entrance
  card.style.animation = `slideUp 0.5s cubic-bezier(.22,1,.36,1) ${0.1 + index * 0.12}s both`;

  const nameColor = m.done ? 'var(--green)' : m.color;
  const doneBadge = m.done ? `<div class="done-badge">✔ Concluído</div>` : '';

  // start ring at full offset (invisible), animate via JS after mount
  card.innerHTML = `
    <div class="ring-wrap">
      <svg width="58" height="58" viewBox="0 0 58 58">
        <circle class="ring-bg" cx="29" cy="29" r="23"/>
        <circle class="ring-fill" cx="29" cy="29" r="23"
          stroke="${m.color}"
          style="stroke-dasharray:144.51;stroke-dashoffset:144.51;transition:stroke-dashoffset 1s cubic-bezier(.22,1,.36,1);"/>
      </svg>
      <div class="ring-icon">${m.emoji}</div>
    </div>
    <div class="mission-body">
      <div class="mission-top">
        <div class="mission-name" style="color:${nameColor}">${m.title}</div>
        <div class="mission-badge">🏆 ${m.pts} pts</div>
      </div>
      <div class="mission-desc">${m.desc}</div>
      ${doneBadge}
      <div class="mission-progress-wrap">
        <div class="progress-track">
          <div class="progress-fill"
            style="width:0%;background:${m.grad};transition:width 1s cubic-bezier(.22,1,.36,1);"
            data-target="${m.progress}">
          </div>
        </div>
        <div class="pct-label" style="color:${m.color}" data-target="${m.progress}">0%</div>
      </div>
    </div>
  `;

  addRipple(card);
  return card;
}

// ── Animate rings & bars via IntersectionObserver ─────────────
function observeCards() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const card = entry.target;

      // animate ring
      const ring = card.querySelector('.ring-fill');
      if (ring) {
        const target = parseFloat(ring.style.strokeDasharray) || 144.51;
        const offset = parseFloat(ring.getAttribute('data-offset') || ring.style.strokeDashoffset);
        setTimeout(() => { ring.style.strokeDashoffset = offset; }, 80);
      }

      // animate progress bar + counter
      const bar   = card.querySelector('.progress-fill[data-target]');
      const label = card.querySelector('.pct-label[data-target]');
      if (bar) {
        const pct = parseInt(bar.dataset.target, 10);
        setTimeout(() => {
          bar.style.width = pct + '%';
          if (label) animatePctLabel(label, pct);
        }, 120);
      }

      observer.unobserve(card);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.mission-card').forEach(card => {
    // store the real offset on the ring element
    const ring = card.querySelector('.ring-fill');
    if (ring) {
      const m = [...missionsData.daily, ...missionsData.weekly]
        .find(x => card.querySelector('.mission-name')?.textContent.trim() === x.title);
      if (m) ring.setAttribute('data-offset', m.offset);
    }
    observer.observe(card);
  });
}

// ── Animate percentage label ──────────────────────────────────
function animatePctLabel(el, target, duration = 900) {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * ease) + '%';
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── Render all missions ────────────────────────────────────────
function renderMissions() {
  const dailyEl  = document.getElementById('daily-list');
  const weeklyEl = document.getElementById('weekly-list');
  if (!dailyEl || !weeklyEl) return;

  missionsData.daily.forEach((m, i)  => dailyEl.appendChild(buildCard(m, i)));
  missionsData.weekly.forEach((m, i) => weeklyEl.appendChild(buildCard(m, i)));

  // observe after DOM is populated
  requestAnimationFrame(() => setTimeout(observeCards, 50));
}

// ── Toast ──────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'opacity .3s, transform .3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Theme toggle ───────────────────────────────────────────────
function initTheme() {
  const btn  = document.getElementById('themeToggle');
  const root = document.documentElement;

  const saved = localStorage.getItem('cp-theme') || 'light';
  root.setAttribute('data-theme', saved);
  btn.textContent = saved === 'dark' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('cp-theme', next);
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderMissions();
  initTheme();
});
