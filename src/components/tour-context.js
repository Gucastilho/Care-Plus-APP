import { createContext, useContext } from 'react'

export const TOUR_STEPS = [
  { to: '/dashboard',   emoji: '🏠', title: 'Início',      desc: 'Seu painel principal: score de bem-estar, missões do dia e próximas consultas.' },
  { to: '/missoes',     emoji: '🎯', title: 'Missões',     desc: 'Complete missões diárias e semanais para acumular pontos e evoluir de nível.' },
  { to: '/recompensas', emoji: '🎁', title: 'Recompensas', desc: 'Troque os pontos conquistados por benefícios e descontos exclusivos.' },
  { to: '/conquistas',  emoji: '🏆', title: 'Conquistas',  desc: 'Acompanhe seus badges desbloqueados e celebre cada progresso.' },
  { to: '/ranking',     emoji: '📊', title: 'Ranking',     desc: 'Veja sua posição e inspire-se comparando seu desempenho com a comunidade.' },
  { to: '/consultas',   emoji: '🩺', title: 'Consultas',   desc: 'Agende consultas preventivas e explore as jornadas de saúde disponíveis.' },
]

export const TourContext = createContext(null)

export function useTour() {
  return useContext(TourContext)
}
