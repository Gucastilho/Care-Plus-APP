/* ══════════════════════════════════════
   Care Plus — index.js
   ══════════════════════════════════════ */

// ── Data ──────────────────────────────────────────────────────
const consultations = [
  { spec: 'Cardiologista', date: '12/12/2025', time: '13:00 – 14:00', doctor: 'Dr. Renan Andrey Cruz' },
  { spec: 'Cardiologista', date: '12/12/2025', time: '13:00 – 14:00', doctor: 'Dr. Renan Andrey Cruz' },
  { spec: 'Cardiologista', date: '12/12/2025', time: '13:00 – 14:00', doctor: 'Dr. Renan Andrey Cruz' },
];

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

// ── Animated counter ──────────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 900) {
  const start     = performance.now();
  const startVal  = 0;
  el.classList.add('anim-count');

  function tick(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(startVal + (target - startVal) * ease);
    el.textContent = current.toLocaleString('pt-BR') + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ── Ripple on mission card click ──────────────────────────────
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

// ── Animate rings with IntersectionObserver ───────────────────
function animateRings() {
  const rings = document.querySelectorAll('.ring-fill');
  if (!rings.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-draw');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  rings.forEach(r => observer.observe(r));
}

// ── Animate progress bars ─────────────────────────────────────
function animateBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-bar');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

// ── Stagger mission cards ─────────────────────────────────────
function staggerMissionCards() {
  const cards = document.querySelectorAll('.mission-card');
  cards.forEach((card, i) => {
    card.classList.add(`anim-card-${i + 1}`);
    addRipple(card);
  });
}

// ── Stagger appt items ────────────────────────────────────────
function staggerApptItems(items) {
  items.forEach((item, i) => {
    item.classList.add('anim-appt');
    item.style.animationDelay = `${0.45 + i * 0.1}s`;
  });
}



// ── Render appointments ────────────────────────────────────────
function renderAppointments() {
  const list = document.getElementById('appt-list');
  if (!list) return;
  list.innerHTML = '';

  if (consultations.length === 0) {
    list.innerHTML = '<p style="font-size:12px;color:var(--muted);text-align:center;padding:16px 0;">Nenhuma consulta agendada</p>';
    return;
  }

  const items = [];
  consultations.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = 'appt-item';
    item.innerHTML = `
      <div class="appt-spec">${c.spec}</div>
      <div class="appt-time">
        <div class="appt-time-dot"></div>
        ${c.date} · ${c.time}
      </div>
      <div class="appt-doctor">${c.doctor}</div>
      <div class="appt-actions">
        <button class="appt-btn appt-btn-remark">Remarcar</button>
        <button class="appt-btn appt-btn-cancel">Cancelar</button>
      </div>
    `;

    item.querySelector('.appt-btn-cancel').addEventListener('click', () => {
      item.style.transition = 'opacity .35s, transform .35s';
      item.style.opacity    = '0';
      item.style.transform  = 'translateX(24px)';
      setTimeout(() => {
        item.remove();
        showToast('Consulta cancelada com sucesso.');
        if (list.children.length === 0) {
          list.innerHTML = '<p style="font-size:12px;color:var(--muted);text-align:center;padding:16px 0;">Nenhuma consulta agendada</p>';
        }
      }, 350);
    });

    list.appendChild(item);
    items.push(item);
  });

  staggerApptItems(items);
}

// ── Sidebar nav ───────────────────────────────────────────────
function initNav() {
  const items = document.querySelectorAll('.nav-item[data-href]');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const href = item.dataset.href;
      if (href && href !== '#') { window.location.href = href; return; }
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
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
  renderAppointments();
  initNav();
  initTheme();
  staggerMissionCards();
  animateRings();
  animateBars();

});
