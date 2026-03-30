/* ══════════════════════════════════════
   Care Plus — recompensas.js
   ══════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────
const rewards = [
  { id: 0, emoji: '💆', imgClass: 'img-spa',      name: 'Desconto 20% no SPA',       desc: 'Vale desconto para um dia relaxante em qualquer unidade parceira.',          pts: 850,  redeemed: false },
  { id: 1, emoji: '💊', imgClass: 'img-farmacia', name: 'Desconto 30% Farmácia',      desc: 'Vale desconto em medicamentos e produtos de bem-estar nas farmácias parceiras.', pts: 700,  redeemed: false },
  { id: 2, emoji: '🏋️', imgClass: 'img-academia', name: 'Desconto 50% Wellhub',       desc: 'Vale desconto para sua mensalidade em academias da rede Wellhub.',           pts: 1000, redeemed: false },
  { id: 3, emoji: '🥗', imgClass: 'img-nutri',    name: 'Consulta Nutricionista',     desc: 'Uma consulta gratuita com nutricionista parceiro para orientação alimentar.', pts: 600,  redeemed: true  },
  { id: 4, emoji: '🧠', imgClass: 'img-mental',   name: 'Sessão de Psicologia',       desc: 'Uma sessão online gratuita com psicólogo parceiro credenciado.',             pts: 750,  redeemed: true  },
  { id: 5, emoji: '🩺', imgClass: 'img-exame',    name: 'Check-up Laboratorial',      desc: 'Pacote de exames laboratoriais básicos com desconto de 40%.',                pts: 500,  redeemed: false },
];

let userPoints = 1500;
let pendingId  = null;

// ── Render rewards grid ────────────────────────────────────────
function renderRewards() {
  const grid = document.getElementById('rewards-grid');
  if (!grid) return;
  grid.innerHTML = '';

  rewards.forEach(r => {
    const card = document.createElement('div');
    card.className = 'reward-card' + (r.redeemed ? ' redeemed' : '');
    card.id = `reward-card-${r.id}`;

    const canAfford = userPoints >= r.pts;

    card.innerHTML = `
      <div class="reward-img ${r.imgClass}">${r.emoji}</div>
      <div class="reward-body">
        <div class="reward-header">
          <div class="reward-name${r.redeemed ? ' struck' : ''}">${r.name}</div>
          <div class="reward-pts${r.redeemed ? ' struck' : ''}">🛒 ${r.pts} pts</div>
        </div>
        <div class="reward-desc">${r.desc}</div>
        ${r.redeemed
          ? `<button class="btn-resgatado" disabled>✔ Resgatado</button>`
          : `<button class="btn-resgatar" ${!canAfford ? 'disabled style="opacity:.45;cursor:not-allowed;box-shadow:none;"' : ''}
               onclick="openModal(${r.id})">
               ${canAfford ? 'Resgatar' : 'Pontos insuficientes'}
             </button>`
        }
      </div>
    `;
    grid.appendChild(card);
  });

  updatePointsDisplay();
  updateRedeemedCount();
}

// ── Redeemed count ─────────────────────────────────────────────
function updateRedeemedCount() {
  const el = document.getElementById('redeemed-count');
  if (el) {
    const count = rewards.filter(r => r.redeemed).length;
    el.textContent = `${count} resgatada${count !== 1 ? 's' : ''}`;
  }
}

// ── Points display ─────────────────────────────────────────────
function updatePointsDisplay() {
  const el = document.getElementById('user-points');
  if (el) el.textContent = userPoints.toLocaleString('pt-BR') + ' pts';
}

// ── Modal ──────────────────────────────────────────────────────
function openModal(id) {
  const r = rewards.find(x => x.id === id);
  if (!r || r.redeemed) return;

  pendingId = id;
  document.getElementById('modal-emoji').textContent   = r.emoji;
  document.getElementById('modal-name').textContent    = r.name;
  document.getElementById('modal-pts').textContent     = r.pts.toLocaleString('pt-BR') + ' pts';
  document.getElementById('modal-balance').textContent = userPoints.toLocaleString('pt-BR') + ' pts';
  document.getElementById('modal-after').textContent   = (userPoints - r.pts).toLocaleString('pt-BR') + ' pts';

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  pendingId = null;
}

function confirmRedeem() {
  if (pendingId === null) return;
  const r = rewards.find(x => x.id === pendingId);
  if (!r) return;

  r.redeemed  = true;
  userPoints -= r.pts;

  closeModal();
  renderRewards();
  showToast(`"${r.name}" resgatado com sucesso! Verifique seu email.`);
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
  renderRewards();
  initTheme();

  // close modal on overlay click
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});
