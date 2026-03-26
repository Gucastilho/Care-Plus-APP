const TOTAL = 4;
let current = 0;

function nextStep() {
  if (current < TOTAL - 1) {
    current++;
    updateDots();
  }
}

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
  document.getElementById('step-label').textContent = `${current + 1} de ${TOTAL}`;

  const btn = document.getElementById('btn-continuar');
  if (current === TOTAL - 1) {
    btn.innerHTML = `
      <span class="chevron">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5H8M5 2l3 3-3 3" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      Começar`;
  }
}
