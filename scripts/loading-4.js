/* ══════════════════════════════════════
   Care Plus — loading-4.js
   Onboarding slide 4 of 4 — LGPD consent
   ══════════════════════════════════════ */

function prevStep() {
  const screen = document.querySelector('.screen');
  screen.classList.add('slide-exit');
  setTimeout(() => {
    window.location.href = 'loading-3.html';
  }, 320);
}

function handleStart() {
  const toast = document.getElementById('welcomeToast');
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);

  setTimeout(() => {
    const screen = document.querySelector('.screen');
    screen.classList.add('slide-exit');
  }, 2200);

  setTimeout(() => {
    window.location.href = '../index.html';
  }, 2550);
}
