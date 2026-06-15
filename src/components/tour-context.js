import { createContext, useContext } from 'react'

export const TOUR_STEPS = [
  { to: '/dashboard',   icon: 'home',        title: 'Início',      desc: 'Seu painel principal reúne três destaques: as Missões Diárias (tarefas de saúde do dia que rendem pontos), o bloco Impulsione sua Saúde (onde você cria metas e um plano personalizado) e o Score de Bem-estar (índice que resume sua atividade, hidratação, sono e nutrição).' },
  { to: '/missoes',     icon: 'target',      title: 'Missões',     desc: 'Complete missões diárias e semanais para acumular pontos e evoluir de nível.' },
  { to: '/recompensas', icon: 'gift',        title: 'Recompensas', desc: 'Troque os pontos conquistados por benefícios e descontos exclusivos.' },
  { to: '/conquistas',  icon: 'trophy',      title: 'Conquistas',  desc: 'Acompanhe seus badges desbloqueados e celebre cada progresso.' },
  { to: '/ranking',     icon: 'chart',       title: 'Ranking',     desc: 'Veja sua posição e inspire-se comparando seu desempenho com a comunidade.' },
  { to: '/consultas',   icon: 'stethoscope', title: 'Consultas',   desc: 'Agende consultas preventivas e explore as jornadas de saúde disponíveis.' },
]

export const TourContext = createContext(null)

export function useTour() {
  return useContext(TourContext)
}
