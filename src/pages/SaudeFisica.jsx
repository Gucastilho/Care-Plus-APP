import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'

const CARDS = [
  {
    id: 'checkup',
    title: 'Check-up Médico Anual',
    desc: 'Consulta geral, avaliação de sinais vitais e histórico familiar.',
    tag: 'Clínica Geral',
    duration: '60 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <rect x="10" y="6" width="18" height="22" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 12H22M14 16H22M14 20H18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="27" cy="30" r="7" fill="var(--sf-bg)" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M24 30C24 30 25 28 27 28C29 28 30 30 30 30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M27 30V32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'cardio',
    title: 'Avaliação Cardiovascular',
    desc: 'Rastreamento de hipertensão, colesterol e risco cardíaco.',
    tag: 'Cardiologia',
    duration: '45 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M20 32C20 32 8 24 8 15C8 11.1 11.1 8 15 8C17.2 8 19.2 9 20 10.6C20.8 9 22.8 8 25 8C28.9 8 32 11.1 32 15C32 24 20 32 20 32Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M6 20H11L14 15L17 24L20 18L22 21H34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'dermato',
    title: 'Dermatologia Preventiva',
    desc: 'Mapeamento de manchas e prevenção de câncer de pele.',
    tag: 'Dermatologia',
    duration: '30 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M16 8C11.6 8 8 11.6 8 16C8 20.4 11.6 24 16 24C20.4 24 24 20.4 24 16C24 11.6 20.4 8 16 8Z" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M22 22L30 30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="30" cy="30" r="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M28.5 30H31.5M30 28.5V31.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'masculina',
    title: 'Saúde Masculina',
    desc: 'Consulta urológica de rotina e exames preventivos (PSA).',
    tag: 'Urologia',
    duration: '40 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <circle cx="18" cy="20" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M25 13L32 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M28 6H32V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 20H22M18 16V24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'feminina',
    title: 'Saúde Feminina',
    desc: 'Consulta ginecológica anual e exame Papanicolau.',
    tag: 'Ginecologia',
    duration: '45 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <circle cx="20" cy="16" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 26V34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M15 31H25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 13C16 13 17 10 20 10C23 10 24 13 24 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M17 17C18 19 22 19 23 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="20" cy="16" r="2" fill="currentColor" opacity="0.2"/>
      </svg>
    ),
  },
]

export default function SaudeFisica() {
  const navigate = useNavigate()
  const [scheduled, setScheduled] = useState(null)

  function handleAgendar(id) {
    setScheduled(id)
    setTimeout(() => setScheduled(null), 2000)
  }

  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Topbar title="Saúde Física & Check-up" subtitle="Avaliações gerais e exames de rotina" emoji="🩺" />

        <div className="consultas-scroll">

          {/* Breadcrumb */}
          <div className="sf-breadcrumb">
            <span className="sf-breadcrumb-link" onClick={() => navigate('/consultas')}>Consultas Preventivas</span>
            <span className="sf-breadcrumb-sep">›</span>
            <span className="sf-breadcrumb-current">Saúde Física</span>
          </div>

          {/* Header banner */}
          <div className="sf-banner">
            <div className="sf-banner-icon">🫀</div>
            <div>
              <div className="sf-banner-title">Agendar Nova Consulta Preventiva</div>
              <div className="sf-banner-sub">Escolha uma especialidade abaixo e reserve seu horário com um clique.</div>
            </div>
            <div className="sf-banner-badge">5 especialidades disponíveis</div>
          </div>

          {/* Cards grid */}
          <div className="sf-grid">
            {CARDS.map((c, i) => (
              <div
                key={c.id}
                className={`sf-card${scheduled === c.id ? ' sf-card-scheduled' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Top accent + icon */}
                <div className="sf-card-top">
                  <div className="sf-icon-wrap">{c.icon}</div>
                  <div className="sf-tags">
                    <span className="sf-tag">{c.tag}</span>
                    <span className="sf-tag sf-tag-muted">⏱ {c.duration}</span>
                  </div>
                </div>

                <div className="sf-card-title">{c.title}</div>
                <div className="sf-card-desc">{c.desc}</div>

                <div className="sf-card-footer">
                  <div className="sf-avail">
                    <span className="sf-avail-dot" />
                    Horários disponíveis
                  </div>
                  <button
                    className="sf-btn"
                    onClick={() => handleAgendar(c.id)}
                  >
                    {scheduled === c.id ? '✓ Agendado' : 'Agendar →'}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
