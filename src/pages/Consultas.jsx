import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'

const JOURNEYS = [
  {
    id: 'longevidade',
    title: 'Longevidade',
    desc: 'Protocolos de saúde para uma vida longa e com qualidade.',
    emoji: '🧬',
    color: 'journey-blue',
  },
  {
    id: 'mental',
    title: 'Equilíbrio Mental',
    desc: 'Cuide da sua mente com práticas preventivas e terapêuticas.',
    emoji: '🧘',
    color: 'journey-green',
  },
  {
    id: 'performance',
    title: 'Performance Física',
    desc: 'Maximize seu potencial com avaliações e treinos orientados.',
    emoji: '⚡',
    color: 'journey-purple',
  },
]

const BRANCHES = [
  {
    id: 'fisica',
    title: 'Saúde Física & Check-up',
    desc: 'Avaliações gerais e exames de rotina.',
    color: 'branch-blue',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M6 16C6 16 8 10 12 10C16 10 14 22 18 22C22 22 20 16 26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="26" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 23V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'mental',
    title: 'Saúde Mental',
    desc: 'Terapias de manutenção e gestão do estresse.',
    color: 'branch-teal',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <circle cx="16" cy="13" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="M13 13C13 11.3 14.3 10 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 22C10 19.8 12.7 18 16 18C19.3 18 22 19.8 22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 25V27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'nutricao',
    title: 'Nutrição e Metabolismo',
    desc: 'Planejamento alimentar e fortalecimento da imunidade.',
    color: 'branch-orange',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M16 6C12.7 6 10 8.7 10 12C10 15.3 12.7 18 16 18C19.3 18 22 15.3 22 12C22 8.7 19.3 6 16 6Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 18V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 22H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 8C22 6 24 6 24 6C24 6 24 8 22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'fisio',
    title: 'Fisioterapia Preventiva',
    desc: 'Prevenção de dores, postura e ergonomia.',
    color: 'branch-purple',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <circle cx="16" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 14L16 18L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 18L11 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 18L21 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'sono',
    title: 'Higiene do Sono',
    desc: 'Otimização do descanso e tratamento de insônia.',
    color: 'branch-indigo',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M20 8C17.8 9.2 16 11.4 16 14C16 18.4 19.6 22 24 22C24.7 22 25.4 21.9 26 21.7C24.4 24.3 21.4 26 18 26C12.5 26 8 21.5 8 16C8 10.5 12.5 6 18 6C18.7 6 19.4 6.1 20 6.3V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M24 10L25 8L26 10L28 11L26 12L25 14L24 12L22 11L24 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'financeira',
    title: 'Saúde Financeira',
    desc: 'Gestão do estresse financeiro e bem-estar econômico.',
    color: 'branch-emerald',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M6 22L12 16L16 20L22 12L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 8H26V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 26V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 24H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Consultas() {
  const [activeJourney, setActiveJourney] = useState('longevidade')
  const navigate = useNavigate()

  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Topbar title="Consultas Preventivas" subtitle="Agende sua próxima jornada de saúde" emoji="🩺" />

        <div className="consultas-scroll">

          {/* Jornadas */}
          <div className="consultas-section">
            <div className="section-header">
              <div className="section-title">Jornadas de Saúde</div>
              <span className="section-link">Ver todas →</span>
            </div>
            <div className="journeys-row">
              {JOURNEYS.map(j => (
                <div
                  key={j.id}
                  className={`journey-card ${j.color}${activeJourney === j.id ? ' journey-active' : ''}`}
                  onClick={() => setActiveJourney(j.id)}
                >
                  <div className="journey-emoji">{j.emoji}</div>
                  <div className="journey-title">{j.title}</div>
                  <div className="journey-desc">{j.desc}</div>
                  <button className="journey-btn">Explorar →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Ramos Preventivos */}
          <div className="consultas-section">
            <div className="section-header">
              <div className="section-title">Explorar Todos os Ramos</div>
              <span className="section-link">6 especialidades</span>
            </div>
            <div className="branches-grid">
              {BRANCHES.map((b, i) => (
                <div key={b.id} className={`branch-card ${b.color}`} style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => {
                    if (b.id === 'fisica') navigate('/consultas/saude-fisica')
                    if (b.id === 'mental') navigate('/consultas/saude-mental')
                  }}
                >
                  <div className="branch-icon-wrap">{b.icon}</div>
                  <div className="branch-title">{b.title}</div>
                  <div className="branch-desc">{b.desc}</div>
                  <button className="branch-btn">Ver Horários</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
