/* ══════════════════════════════════════
   VidaPlus Dashboard — main.js
   ══════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────
const consultations = [
  {
    type:   'Cardiologista',
    date:   '12/12/2025',
    time:   '13:00 – 14:00',
    doctor: 'Dr. Renan Andrey Cruz',
    addr:   'Alameda Francisco Alves (11) 91331-1202'
  },
  {
    type:   'Cardiologista',
    date:   '12/12/2025',
    time:   '13:00 – 14:00',
    doctor: 'Dr. Renan Andrey Cruz',
    addr:   'Alameda Francisco Alves (11) 91331-1202'
  },
  {
    type:   'Cardiologista',
    date:   '12/12/2025',
    time:   '13:00 – 14:00',
    doctor: 'Dr. Renan Andrey Cruz',
    addr:   'Alameda Francisco Alves (11) 91331-1202'
  }
];

// ── Render consultation cards ─────────────────────────────────
function renderConsultations() {
  const container = document.getElementById('consultations');
  if (!container) return;

  container.innerHTML = '';

  consultations.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'consult-card';
    card.innerHTML = `
      <div class="consult-top">
        <div>
          <div class="consult-type">${c.type}</div>
          <div class="consult-date">${c.date} &nbsp; ${c.time}</div>
        </div>
        <button class="reschedule-btn" title="Reagendar">
          <i class="bi bi-arrow-up-right"></i>
        </button>
      </div>
      <div class="consult-doctor">${c.doctor}</div>
      <div class="consult-addr">${c.addr}</div>
      <button class="btn-cancel">Cancelar</button>
    `;

    // Cancel button handler
    card.querySelector('.btn-cancel').addEventListener('click', () => {
      cancelConsult(card, i);
    });

    container.appendChild(card);
  });
}

// ── Cancel a consultation with animation ─────────────────────
function cancelConsult(card, idx) {
  card.style.transition = 'opacity .4s, transform .4s';
  card.style.opacity    = '0';
  card.style.transform  = 'translateX(30px)';
  setTimeout(() => card.remove(), 400);
}

// ── Sidebar active nav state ──────────────────────────────────
function initNav() {
  const links = document.querySelectorAll('.nav-link-item');

  // Mark active link based on current page filename
  const page = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  // Click navigation
  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href !== '#') return; // let real links navigate
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// ══════════════════════════════════════
//  MISSIONS PAGE — missoes.html
// ══════════════════════════════════════

const missionsData = {
  daily: [
    { icon: 'bi-person-walking', title: 'Caminhada Matinal', desc: 'Caminhe 5.000 passos hoje',      pts: 50, progress: 75,  done: false },
    { icon: 'bi-droplet-fill',   title: 'Hidratação',        desc: 'Beba 2 litros de água',           pts: 30, progress: 100, done: true  }
  ],
  weekly: [
    { icon: 'bi-person-walking', title: 'Caminhada Semanal', desc: 'Caminhe 25000 passos essa semana', pts: 50, progress: 14, done: false },
    { icon: 'bi-droplet-fill',   title: 'Hidratação',        desc: 'Beba 10 litros de água essa semana', pts: 30, progress: 4, done: false }
  ]
};

function buildMissionCard(m) {
  const card = document.createElement('div');
  card.className = 'mission-card-full';

  const doneBadge = m.done
    ? `<span class="badge-done"><i class="bi bi-check-circle-fill"></i> Concluído</span>`
    : '';

  card.innerHTML = `
    <div class="mission-header">
      <div class="mission-title">
        <i class="bi ${m.icon}"></i>
        ${m.title}
      </div>
      <div class="pts-badge">
        <i class="bi bi-trophy-fill"></i> ${m.pts} pts
      </div>
    </div>
    <div class="mission-desc">${m.desc}</div>
    ${doneBadge}
    <div class="mission-progress-bottom">
      <div class="mission-pct-row">${m.progress}%</div>
      <div class="mission-bar-flush">
        <div class="bar-fill" style="width:0%" data-target="${m.progress}"></div>
      </div>
    </div>
  `;
  return card;
}

function renderMissions() {
  const dailyEl  = document.getElementById('daily-missions');
  const weeklyEl = document.getElementById('weekly-missions');
  if (!dailyEl || !weeklyEl) return;

  missionsData.daily.forEach(m  => dailyEl.appendChild(buildMissionCard(m)));
  missionsData.weekly.forEach(m => weeklyEl.appendChild(buildMissionCard(m)));

  // Animate bars after paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.bar-fill[data-target]').forEach(bar => {
        bar.style.transition = 'width 1.1s ease';
        bar.style.width = bar.dataset.target + '%';
      });
    }, 120);
  });
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderConsultations();
  renderMissions();
  initNav();
});
