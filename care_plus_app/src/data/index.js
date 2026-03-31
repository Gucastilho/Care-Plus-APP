// ── Consultations ─────────────────────────────────────────────
export const consultations = [
  { id: 1, spec: 'Cardiologista', date: '12/12/2025', time: '13:00 – 14:00', doctor: 'Dr. Renan Andrey Cruz' },
  { id: 2, spec: 'Cardiologista', date: '12/12/2025', time: '13:00 – 14:00', doctor: 'Dr. Renan Andrey Cruz' },
  { id: 3, spec: 'Cardiologista', date: '12/12/2025', time: '13:00 – 14:00', doctor: 'Dr. Renan Andrey Cruz' },
]

// ── Daily missions ─────────────────────────────────────────────
export const dailyMissions = [
  { id: 1, emoji: '🚶', title: 'Caminhada Matinal',  desc: 'Caminhe 5.000 passos hoje · 3.750 / 5.000 passos', pts: 50,  progress: 75,  done: false, color: 'var(--green)', grad: 'linear-gradient(90deg,var(--green2),var(--green))',  offset: 36.1   },
  { id: 2, emoji: '💧', title: 'Hidratação',          desc: 'Beba 2 litros de água · 2.000ml / 2.000ml',        pts: 30,  progress: 100, done: true,  color: 'var(--teal)',  grad: 'linear-gradient(90deg,#009e9a,var(--teal))',          offset: 0      },
  { id: 3, emoji: '🧘', title: 'Alongamento',         desc: 'Faça 10 minutos de alongamento · Não iniciado',    pts: 40,  progress: 0,   done: false, color: 'var(--muted2)',grad: 'var(--muted2)',                                       offset: 144.51 },
]

// ── Weekly missions ────────────────────────────────────────────
export const weeklyMissions = [
  { id: 4, emoji: '🏃', title: 'Caminhada Semanal',  desc: 'Caminhe 25.000 passos essa semana · 3.500 / 25.000',    pts: 150, progress: 14, done: false, color: 'var(--green)', grad: 'linear-gradient(90deg,var(--green2),var(--green))',  offset: 124.3  },
  { id: 5, emoji: '💧', title: 'Hidratação Semanal', desc: 'Beba 10 litros de água essa semana · 400ml / 10.000ml', pts: 80,  progress: 4,  done: false, color: 'var(--blue)',  grad: 'linear-gradient(90deg,#2e6fff,var(--blue))',          offset: 138.7  },
  { id: 6, emoji: '🍎', title: 'Nutrição Saudável',  desc: 'Registre 5 refeições saudáveis · 1 / 5 refeições',     pts: 100, progress: 20, done: false, color: 'var(--amber)', grad: 'linear-gradient(90deg,#c07800,var(--amber))',         offset: 115.6  },
]

// ── Rewards ────────────────────────────────────────────────────
export const rewardsData = [
  { id: 0, emoji: '💆', imgClass: 'img-spa',      name: 'Desconto 20% no SPA',    desc: 'Vale desconto para um dia relaxante em qualquer unidade parceira.',              pts: 850,  redeemed: false },
  { id: 1, emoji: '💊', imgClass: 'img-farmacia', name: 'Desconto 30% Farmácia',  desc: 'Vale desconto em medicamentos e produtos de bem-estar nas farmácias parceiras.', pts: 700,  redeemed: false },
  { id: 2, emoji: '🏋️', imgClass: 'img-academia', name: 'Desconto 50% Wellhub',   desc: 'Vale desconto para sua mensalidade em academias da rede Wellhub.',               pts: 1000, redeemed: false },
  { id: 3, emoji: '🥗', imgClass: 'img-nutri',    name: 'Consulta Nutricionista', desc: 'Uma consulta gratuita com nutricionista parceiro para orientação alimentar.',    pts: 600,  redeemed: true  },
  { id: 4, emoji: '🧠', imgClass: 'img-mental',   name: 'Sessão de Psicologia',   desc: 'Uma sessão online gratuita com psicólogo parceiro credenciado.',                 pts: 750,  redeemed: true  },
  { id: 5, emoji: '🩺', imgClass: 'img-exame',    name: 'Check-up Laboratorial',  desc: 'Pacote de exames laboratoriais básicos com desconto de 40%.',                    pts: 500,  redeemed: false },
]

// ── Earned badges ──────────────────────────────────────────────
export const earnedBadges = [
  { id: 1, emoji: '⭐', medalClass: 'medal-gold',   name: 'Primeiro Passo',     desc: 'Complete sua primeira missão.',               pts: 30, date: '15 Nov 2025' },
  { id: 2, emoji: '🔄', medalClass: 'medal-gold',   name: 'O Retorno',          desc: 'Abra o aplicativo 3 dias seguidos.',          pts: 30, date: '15 Nov 2025' },
  { id: 3, emoji: '🏃', medalClass: 'medal-orange', name: 'Fim de Semana Ativo',desc: 'Faça atividades no sábado e domingo.',        pts: 60, date: '22 Nov 2025' },
  { id: 4, emoji: '🌟', medalClass: 'medal-green',  name: 'Semana Perfeita',    desc: 'Bata a meta diária por 7 dias seguidos.',     pts: 50, date: '29 Nov 2025' },
  { id: 5, emoji: '💧', medalClass: 'medal-blue',   name: 'Hidratado',          desc: 'Beba 2L de água por 5 dias consecutivos.',   pts: 40, date: '02 Dez 2025' },
  { id: 6, emoji: '🧘', medalClass: 'medal-purple', name: 'Mente Sã',           desc: 'Complete 3 sessões de alongamento na semana.',pts: 45, date: '05 Dez 2025' },
]

// ── Locked badges ──────────────────────────────────────────────
export const lockedBadges = [
  { id: 7,  emoji: '🏅', name: 'Maratonista Iniciante', desc: 'Complete 100.000 passos totais.',        pts: 350, progress: 38 },
  { id: 8,  emoji: '🔥', name: 'Queimando o Almoço',    desc: 'Queime 500 calorias em um único dia.',   pts: 250, progress: 12 },
  { id: 9,  emoji: '🥇', name: 'Top 1',                 desc: 'Fique em primeiro no ranking semanal.',  pts: 500, progress: 0  },
  { id: 10, emoji: '💎', name: 'Super Dobro',            desc: 'Dobre seus pontos em uma única semana.', pts: 400, progress: 5  },
  { id: 11, emoji: '🌙', name: 'Coruja Noturna',         desc: 'Complete uma missão após as 22h.',       pts: 80,  progress: 0  },
  { id: 12, emoji: '🍎', name: 'Nutrição em Dia',        desc: 'Registre 7 refeições saudáveis seguidas.',pts: 200, progress: 14 },
]

// ── Ranking ────────────────────────────────────────────────────
export const weeklyRanking = [
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
]

export const dailyRanking = [
  { name: 'Pedro R.',    initial: 'P', pts: 420, color: 'linear-gradient(135deg,#fb923c,#f97316)' },
  { name: 'Ana C.',      initial: 'A', pts: 390, color: 'linear-gradient(135deg,#fcd34d,#d97706)' },
  { name: 'Beatriz L.',  initial: 'B', pts: 360, color: 'linear-gradient(135deg,#818cf8,#6366f1)' },
  { name: 'Maria S.',    initial: 'M', pts: 340, color: 'linear-gradient(135deg,#fde68a,#f59e0b)' },
  { name: 'Carlos M.',   initial: 'C', pts: 310, color: 'linear-gradient(135deg,#6ee7b7,#059669)' },
  { name: 'Juliana F.',  initial: 'J', pts: 290, color: 'linear-gradient(135deg,#f472b6,#ec4899)' },
  { name: 'João P.',     initial: 'J', pts: 270, color: 'linear-gradient(135deg,#e2e8f0,#94a3b8)' },
  { name: 'Rafael D.',   initial: 'R', pts: 250, color: 'linear-gradient(135deg,#a78bfa,#7c3aed)' },
  { name: 'Fernanda G.', initial: 'F', pts: 230, color: 'linear-gradient(135deg,#6ee7b7,#059669)' },
  { name: 'Gustavo C.',  initial: 'G', pts: 120, color: 'linear-gradient(135deg,#34d399,#00b861)', isUser: true },
]
