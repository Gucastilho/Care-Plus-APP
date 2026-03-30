/* ══════════════════════════════════════
   Care Plus — missoes.js
   ══════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────
const missionsData = {
  daily: [
    { emoji: '🚶', title: 'Caminhada Matinal',  desc: 'Caminhe 5.000 passos hoje · 3.750 / 5.000 passos',        pts: 50,  progress: 75,  done: false, color: 'var(--green)', grad: 'linear-gradient(90deg,var(--green2),var(--green))',   offset: 36.1  },
    { emoji: '💧', title: 'Hidratação',          desc: 'Beba 2 litros de água · 2.000ml / 2.000ml',               pts: 30,  progress: 100, done: true,  color: 'var(--teal)',  grad: 'linear-gradient(90deg,#009e9a,var(--teal))',           offset: 0     },
    { emoji: '🧘', title: 'Alongamento',         desc: 'Faça 10 minutos de alongamento · Não iniciado',           pts: 40,  progress: 0,   done: false, color: 'var(--muted2)',grad: 'var(--muted2)',                                        offset: 144.51},
  ],
  weekly: [
    { emoji: '🏃', title: 'Caminhada Semanal',  desc: 'Caminhe 25.000 passos essa semana · 3.500 / 25.000',      pts: 150, progress: 14,  done: false, color: 'var(--green)', grad: 'linear-gradient(90deg,var(--green2),var(--green))',   offset: 124.3 },
    { emoji: '💧', title: 'Hidratação Semanal', desc: 'Beba 10 litros de água essa semana · 400ml / 10.000ml',   pts: 80,  progress: 4,   done: false, color: 'var(--blue)',  grad: 'linear-gradient(90deg,#2e6fff,var(--blue))',           offset: 138.7 },
    { emoji: '🍎', title: 'Nutrição Saudável',  desc: 'Registre 5 refeições saudáveis · 1 / 5 refeições',        pts: 100, progress: 20,  done: false, color: 'var(--amber)', grad: 'linear-gradient(90deg,#c07800,var(--amber))',          offset: 115.6 },
  ],
};

// ── Build mission card ─────────────────────────────────────────
function buildCard(m) {
  const card = document.createElement('div');
  card.className = 'mission-card' + (m.done ? ' done' : '');

  const nameColor  = m.done ? 'var(--green)' : m.color;
  const doneBadge  = m.done
    ? `<div class="done-badge">✔ Concluído</div>`
    : '';

  card.innerHTML = `
    <div class="ring-wrap">
      <svg width="58" height="58" viewBox="0 0 58 58">
        <circle class="ring-bg" cx="29" cy="29" r="23"/>
        <circle class="ring-fill" cx="29" cy="29" r="23"
          stroke="${m.color}"
          style="stroke-dasharray:144.51;stroke-dashoffset:${m.offset};"/>
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
          <div class="progress-fill" style="width:${m.progress}%;background:${m.grad};"></div>
        </div>
        <div class="pct-label" style="color:${m.color}">${m.progress}%</div>
      </div>
    </div>
  `;
  return card;
}

// ── Render all missions ────────────────────────────────────────
function renderMissions() {
  const dailyEl  = document.getElementById('daily-list');
  const weeklyEl = document.getElementById('weekly-list');
  if (!dailyEl || !weeklyEl) return;

  missionsData.daily.forEach(m  => dailyEl.appendChild(buildCard(m)));
  missionsData.weekly.forEach(m => weeklyEl.appendChild(buildCard(m)));
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
