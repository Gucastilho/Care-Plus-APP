import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'

const CARDS = [
  {
    id: 'funcional',
    title: 'Nutrição Funcional & Longevidade',
    desc: 'Foco no equilíbrio metabólico e uso de alimentos para otimizar as funções do organismo e prevenir doenças.',
    tag: 'Nutrição Funcional',
    duration: '60 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M20 6C15.6 6 12 9.6 12 14C12 18.4 15.6 22 20 22C24.4 22 28 18.4 28 14C28 9.6 24.4 6 20 6Z" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M20 22V32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M15 28H25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M25 8C27 6 29 6 29 6C29 6 29 8 27 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M16 13C16 11 18 10 20 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 17C18.5 19 21.5 19 23 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'educacao',
    title: 'Educação Alimentar Prática',
    desc: 'Consultoria para aprender a ler rótulos, entender ingredientes e fazer escolhas conscientes no dia a dia.',
    tag: 'Educação Alimentar',
    duration: '50 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <rect x="8" y="7" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 13H22M12 17H22M12 21H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="28" cy="28" r="7" fill="var(--surface)" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M25.5 28H30.5M28 25.5V30.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'esportiva',
    title: 'Nutrição Esportiva Preventiva',
    desc: 'Planejamento focado em performance, prevenção de lesões e recuperação muscular para praticantes de atividades físicas.',
    tag: 'Nutrição Esportiva',
    duration: '55 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M8 20C8 20 10 14 14 12C18 10 20 14 20 14C20 14 22 10 26 12C30 14 32 20 32 20C32 20 30 26 26 28C22 30 20 26 20 26C20 26 18 30 14 28C10 26 8 20 8 20Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 20H26M20 14V26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'comportamental',
    title: 'Nutrição Comportamental',
    desc: 'Abordagem voltada para a relação emocional com a comida, focando no equilíbrio mental e prevenção de transtornos.',
    tag: 'Comportamental',
    duration: '60 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <circle cx="20" cy="14" r="7" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M17 14C17 12.3 18.3 11 20 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M13 28C13 24.7 16.1 22 20 22C23.9 22 27 24.7 27 28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M16 32C16 32 17 30 20 30C23 30 24 32 24 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 17C18 19 22 19 23 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'bioimpedancia',
    title: 'Check-up de Bioimpedância',
    desc: 'Análise detalhada da composição corporal (massa magra, gordura e hidratação) para ajuste de metas de saúde.',
    tag: 'Nutrologia',
    duration: '45 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <rect x="8" y="10" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M14 20H18L20 15L22 25L24 20H26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 34H28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M20 30V34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Nutricao() {
  const navigate = useNavigate()
  const [scheduled, setScheduled] = useState(null)

  function handleAgendar(id) {
    setScheduled(id)
    setTimeout(() => setScheduled(null), 2000)
  }

  return (
    <div className="shell nutricao-page">
      <Sidebar />
      <div className="main">
        <Topbar title="Nutrição e Metabolismo" subtitle="Planejamento alimentar e fortalecimento da imunidade" emoji="🥗" />

        <div className="consultas-scroll">

          {/* Breadcrumb */}
          <div className="sf-breadcrumb">
            <span className="sf-breadcrumb-link" onClick={() => navigate('/consultas')}>Consultas Preventivas</span>
            <span className="sf-breadcrumb-sep">›</span>
            <span className="sf-breadcrumb-current">Nutrição e Metabolismo</span>
          </div>

          {/* Banner */}
          <div className="sf-banner">
            <div className="sf-banner-icon">🍎</div>
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
                  <button className="sf-btn" onClick={() => handleAgendar(c.id)}>
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
