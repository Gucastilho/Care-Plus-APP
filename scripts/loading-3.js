/* ══════════════════════════════════════
   Care Plus — loading-3.js
   Onboarding slide 3 of 4
   ══════════════════════════════════════ */

function nextStep() {
  const screen = document.querySelector('.screen');
  screen.classList.add('slide-exit');
  setTimeout(() => {
    window.location.href = 'loading-4.html';
  }, 320);
}

function prevStep() {
  const screen = document.querySelector('.screen');
  screen.classList.add('slide-exit');
  setTimeout(() => {
    window.location.href = 'loading-2.html';
  }, 320);
}
