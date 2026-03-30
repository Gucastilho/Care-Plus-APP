/* ══════════════════════════════════════
   Care Plus — ranking.js
   ══════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────
const USER_ID = 7; // Gustavo is index 7 (position #8)

const weeklyData = [
  { name: 'Maria S.',    initial: 'M', pts: 2850, color: 'linear-gradient(135deg,#fde68a,#f59e0b)' },
  { name: 'João P.',     initial: 'J', pts: 2640, color: 'linear-gradient(135deg,#e2e8f0,#94a3b8)' },
  { name: 'Ana C.',      initial: 'A', pts: 2520, color: 'linear-gradient(135deg,#fcd34d,#d97706)' },
  { name: 'Carlos M.',   initial: 'C', pts: 2310, color: 'linear-gradient(135deg,#6ee7b7,#059669)' },
  { name: 'Beatriz L.',  initial: 'B', pts: 2180, color: 'linear-gradient(135deg,#818cf8,#6366f1)' },
  { name: 'Pedro R.',    initial: 'P', pts: 2050, color: 'linear-gradient(135deg,#fb923c,#f97316)' },
  { name: 'Juliana F.',  initial: 'J', pts: 1920, color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
  { name: 'Gustavo C.',  initial: 'G', pts: 1500, color: 'linear-gradient(135deg,#34d399,#00b861)', isUser: true },
  { name: 'Rafael D.',   initial: 'R', pts: 1720, color: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { name: 'Fernanda G.', initial: 'F', pts: 1680, color: 'linear-gradient(135deg,#6ee7b7,#059669)' },
];

const dailyData = [
  { name: 'Pedro R.',    initial: 'P', pts: 420,  color: 'linear-gradient(135deg,#fb923c,#f97316)' },
  { name: 'Ana C.',      initial: 'A', pts: 390,  color: 'linear-gradient(135deg,#fcd34d,#d97706)' },
  { name: 'Beatriz L.',  initial: 'B', pts: 360,  color: 'linear-gradient(135deg,#818cf8,#6366f1)' },
  { name: 'Maria S.',    initial: 'M', pts: 340,  color: 'linear-gradient(135deg,#fde68a,#f59e0b)' },
  { name: 'Gustavo C.',  initial: 'G', pts: 120,  color: 'linear-gradient(135deg,#34d399,#00b861)', isUser: true },
  { name: 'Carlos M.',   initial: 'C', pts: 310,  color: 'linear-gradient(135deg,#6ee7b7,#059669)' },
  { name: 'Juliana F.',  initial: 'J', pts: 290,  color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
  { name: 'João P.',     initial: 'J', pts: 270,  color: 'linear-gradient(135deg,#e2e8f0,#94a3b8)' },
  { name: 'Rafael D.',   initial: 'R', pts: 250,  color: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { name: 'Fernanda G.', initial: 'F', pts: 230,  color: 'linear-gradient(135deg,#6ee7b7,#059669)' },
];

let currentTab = 'semanal';

// ── Render ranking rows ────────────────────────────────────────
function renderRanking(data) {
  const container = document.getElementById('ranking-rows');
  const titleEl   = document.getElementById('ranking-title');
  const subEl     = document.getElementById('ranking-sub');

  if (currentTab === 'semanal') {
    titleEl.textContent = 'Top 10 — Esta Semana';
    subEl.textContent   = 'Usuários com melhor desempenho na semana';
  } else {
    titleEl.textContent = 'Top 10 — Hoje';
    subEl.textContent   = 'Usuários com melhor desempenho hoje';
  }

  // sort by pts desc
  const sorted = [...data].sort((a, b) => b.pts - a.pts);

  container.innerHTML = '';

  sorted.forEach((p, i) => {
    const pos  = i + 1;
    const row  = document.createElement('div');
    row.className = 'ranking-row' + (p.isUser ? ' is-user' : '');
    row.style.animationDelay = `${i * 0.04}s`;

    let posClass = '';
    let posContent = pos;
    if (pos === 1) { posClass = 'gold';   posContent = '🥇'; }
    if (pos === 2) { posClass = 'silver'; posContent = '🥈'; }
    if (pos === 3) { posClass = 'bronze'; posContent = '🥉'; }
    if (p.isUser && pos > 3) posClass = 'user';

    const youTag = p.isUser ? `<span class="you-tag">Você</span>` : '';

    row.innerHTML = `
      <div class="pos-badge ${posClass}">${posContent}</div>
      <div class="rank-av" style="background:${p.color}">${p.initial}</div>
      <div class="row-info">
        <div class="row-name">${p.name} ${youTag}</div>
        <div class="row-sub">Posição #${pos}</div>
      </div>
      <div class="row-pts">
        <span class="row-pts-icon">🏆</span>
        ${p.pts.toLocaleString('pt-BR')} pts
      </div>
    `;
    container.appendChild(row);

    // update right panel if user
    if (p.isUser) updateUserPanel(p, pos, sorted);
  });
}

// ── Update right panel ─────────────────────────────────────────
function updateUserPanel(user, pos, sorted) {
  document.getElementById('your-pos-num').textContent  = `#${pos}`;
  document.getElementById('your-pts-val').textContent  = user.pts.toLocaleString('pt-BR') + ' pts';

  const top1pts  = sorted[0].pts;
  const prevPts  = pos > 1 ? sorted[pos - 2].pts : user.pts;
  const gapTop1  = top1pts - user.pts;
  const gapPrev  = prevPts - user.pts;
  const pctTop1  = Math.round((user.pts / top1pts) * 100);
  const pctPrev  = gapPrev > 0 ? Math.round((user.pts / prevPts) * 100) : 100;

  document.getElementById('gap-top1').textContent  = gapTop1.toLocaleString('pt-BR') + ' pts';
  document.getElementById('gap-prev').textContent  = gapPrev > 0 ? gapPrev.toLocaleString('pt-BR') + ' pts' : '—';
  document.getElementById('fill-top1').style.width = pctTop1 + '%';
  document.getElementById('fill-prev').style.width = pctPrev + '%';
}

// ── Tab switch ─────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  renderRanking(tab === 'semanal' ? weeklyData : dailyData);
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
  renderRanking(weeklyData);
  initTheme();
});
