/* ══════════════════════════════════════
   Care Plus — conquistas.js
   ══════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────
const earnedBadges = [
  { emoji: '⭐', medalClass: 'medal-gold',   name: 'Primeiro Passo',    desc: 'Complete sua primeira missão.',                    pts: 30,  date: '15 Nov 2025' },
  { emoji: '🔄', medalClass: 'medal-gold',   name: 'O Retorno',         desc: 'Abra o aplicativo 3 dias seguidos.',               pts: 30,  date: '15 Nov 2025' },
  { emoji: '🏃', medalClass: 'medal-orange', name: 'Fim de Semana Ativo',desc: 'Faça atividades no sábado e domingo.',            pts: 60,  date: '22 Nov 2025' },
  { emoji: '🌟', medalClass: 'medal-green',  name: 'Semana Perfeita',   desc: 'Bata a meta diária por 7 dias seguidos.',          pts: 50,  date: '29 Nov 2025' },
  { emoji: '💧', medalClass: 'medal-blue',   name: 'Hidratado',         desc: 'Beba 2L de água por 5 dias consecutivos.',         pts: 40,  date: '02 Dez 2025' },
  { emoji: '🧘', medalClass: 'medal-purple', name: 'Mente Sã',          desc: 'Complete 3 sessões de alongamento na semana.',     pts: 45,  date: '05 Dez 2025' },
];

const lockedBadges = [
  { emoji: '🏅', name: 'Maratonista Iniciante', desc: 'Complete 100.000 passos totais.',              pts: 350, progress: 38 },
  { emoji: '🔥', name: 'Queimando o Almoço',    desc: 'Queime 500 calorias em um único dia.',         pts: 250, progress: 12 },
  { emoji: '🥇', name: 'Top 1',                 desc: 'Fique em primeiro no ranking semanal.',        pts: 500, progress: 0  },
  { emoji: '💎', name: 'Super Dobro',            desc: 'Dobre seus pontos em uma única semana.',       pts: 400, progress: 5  },
  { emoji: '🌙', name: 'Coruja Noturna',         desc: 'Complete uma missão após as 22h.',             pts: 80,  progress: 0  },
  { emoji: '🍎', name: 'Nutrição em Dia',        desc: 'Registre 7 refeições saudáveis seguidas.',     pts: 200, progress: 14 },
];

// ── Render earned badges ───────────────────────────────────────
function renderEarned() {
  const container = document.getElementById('earned-list');
  if (!container) return;

  earnedBadges.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'badge-card';
    card.style.animationDelay = `${0.05 + i * 0.07}s`;
    card.innerHTML = `
      <div class="badge-pts">🏆 ${b.pts} pts</div>
      <div class="medal-wrap ${b.medalClass}">${b.emoji}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
      <div class="badge-date">Conquistado em ${b.date}</div>
    `;
    container.appendChild(card);
  });
}

// ── Render locked badges ───────────────────────────────────────
function renderLocked() {
  const container = document.getElementById('locked-list');
  if (!container) return;

  lockedBadges.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'badge-card locked';
    card.style.animationDelay = `${0.05 + i * 0.07}s`;
    card.innerHTML = `
      <div class="badge-pts">🏆 ${b.pts} pts</div>
      <div class="lock-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
      ${b.progress > 0 ? `
        <div class="badge-progress-wrap">
          <div class="badge-progress-track">
            <div class="badge-progress-fill" style="width:${b.progress}%"></div>
          </div>
          <div class="badge-progress-label">${b.progress}% concluído</div>
        </div>
      ` : ''}
    `;
    container.appendChild(card);
  });
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
  renderEarned();
  renderLocked();
  initTheme();
});
