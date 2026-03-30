/* ══════════════════════════════════════
   Care Plus — loading-2.js
   Onboarding slide 2 of 4
   ══════════════════════════════════════ */

const TOTAL   = 4;
const CURRENT = 1; // 0-indexed, this is slide 2

function nextStep() {
  const screen = document.querySelector('.screen');
  screen.classList.add('slide-exit');
  setTimeout(() => {
    // slide 3 would be loading-3.html; for now goes to index
    window.location.href = 'loading-3.html';
  }, 320);
}

function prevStep() {
  const screen = document.querySelector('.screen');
  screen.classList.add('slide-exit');
  setTimeout(() => {
    window.location.href = 'loading-1.html';
  }, 320);
}

document.addEventListener('DOMContentLoaded', () => {
  // sync dots & label
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === CURRENT);
  });
  document.getElementById('step-label').textContent = `${CURRENT + 1} de ${TOTAL}`;
});
