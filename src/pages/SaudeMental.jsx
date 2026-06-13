import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'

const SCROLL = "flex flex-1 flex-col gap-7 overflow-y-auto px-7 pb-8 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1"
const CARD = "relative flex flex-col gap-2.5 overflow-hidden rounded-[22px] border border-border bg-surface px-5 pb-[18px] pt-[22px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] animate-fade-up hover:-translate-y-[3px] hover:border-[rgba(13,148,136,0.22)] hover:shadow-[0_16px_40px_rgba(13,148,136,0.13)] dark:hover:border-[rgba(94,234,212,0.2)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-[22px] before:bg-[linear-gradient(90deg,#0d9488,#a78bfa)] before:content-['']"
const ICON = "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f0fdfa,#ede9fe)] text-[#0d9488] dark:bg-[linear-gradient(135deg,rgba(13,148,136,0.18),rgba(124,58,237,0.15))] dark:text-[#5eead4]"
const TAG = "whitespace-nowrap rounded-full border border-[rgba(13,148,136,0.18)] bg-[rgba(13,148,136,0.08)] px-2.5 py-[3px] font-display text-[10px] font-bold text-[#0d9488] dark:border-[rgba(94,234,212,0.2)] dark:bg-[rgba(94,234,212,0.1)] dark:text-[#5eead4]"
const TAG_MUTED = "whitespace-nowrap rounded-full border border-border2 bg-surface2 px-2.5 py-[3px] font-display text-[10px] font-bold text-muted"

const CARDS = [
  {
    id: 'sono',
    title: 'Higiene do Sono',
    desc: 'Consultas para otimizar o descanso e prevenir insônia cronificada.',
    tag: 'Sono',
    duration: '50 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M22 9C19.4 10.4 17.5 13 17.5 16C17.5 20.9 21.6 25 26.5 25C27.3 25 28 24.9 28.7 24.7C26.9 27.7 23.7 29.5 20 29.5C14.2 29.5 9.5 24.8 9.5 19C9.5 13.2 14.2 8.5 20 8.5C20.7 8.5 21.4 8.6 22 8.8V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M28 11L29 9L30 11L32 12L30 13L29 15L28 13L26 12L28 11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="33" cy="9" r="1.2" fill="currentColor" opacity="0.5"/>
        <circle cx="25" cy="7" r="1" fill="currentColor" opacity="0.4"/>
        <path d="M13 19C13 19 14.5 16 17 17C19.5 18 18 22 20.5 22C23 22 22 19 24 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'estresse',
    title: 'Gestão do Estresse',
    desc: 'Estratégias para prevenir Burnout e lidar com pressões diárias.',
    tag: 'Psicologia',
    duration: '55 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M10 18C10 18 8 14 8 11C8 8.8 9.8 7 12 7C13.5 7 14.8 7.8 15.5 9C16.2 7.8 17.5 7 19 7C21.2 7 23 8.8 23 11C23 14 21 18 21 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 22C8 22 7 20 10 19C13 18 15.5 20 15.5 20C15.5 20 18 18 21 19C24 20 23 22 23 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M15.5 20V28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 28H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M27 10L29 8M29 10L27 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M30 17L32 15M32 17L30 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M26 23L28 21M28 23L26 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'terapia',
    title: 'Terapia de Manutenção',
    desc: 'Consultas para inteligência emocional e autoconhecimento.',
    tag: 'Psicoterapia',
    duration: '60 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <circle cx="13" cy="13" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M10 13C10 11.3 11.3 10 13 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="25" cy="13" r="6" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M22 13C22 11.3 23.3 10 25 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M19 20C19 20 17 23 13 25C9 27 8 31 8 31" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M19 20C19 20 21 23 25 25C29 27 30 31 30 31" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M16 20H22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'cognitiva',
    title: 'Avaliação Cognitiva',
    desc: 'Acompanhamento preventivo da memória e atenção (Neuropsicologia).',
    tag: 'Neuropsicologia',
    duration: '75 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M20 8C14.5 8 10 12.5 10 18C10 21.2 11.5 24 14 25.8V30H26V25.8C28.5 24 30 21.2 30 18C30 12.5 25.5 8 20 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 30H26" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M15 33H25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M20 12V18M17 15H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M13 16C13 16 11 17 11 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M27 16C27 16 29 17 29 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'psiquiatria',
    title: 'Psiquiatria do Estilo de Vida',
    desc: 'Abordagem médica preventiva integrando mente e corpo.',
    tag: 'Psiquiatria',
    duration: '60 min',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" width="36" height="36">
        <path d="M20 6V10M20 30V34M6 20H10M30 20H34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M17 17C17 15.3 18.3 14 20 14C21.7 14 23 15.3 23 17C23 18.5 22 19.5 20 20.5V22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="20" cy="25" r="1.2" fill="currentColor"/>
        <path d="M14.1 14.1L11.3 11.3M25.9 25.9L28.7 28.7M25.9 14.1L28.7 11.3M14.1 25.9L11.3 28.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function SaudeMental() {
  const navigate = useNavigate()
  const [scheduled, setScheduled] = useState(null)

  function handleAgendar(id) {
    setScheduled(id)
    setTimeout(() => setScheduled(null), 2000)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Saúde Mental" subtitle="Terapias de manutenção e gestão do estresse" emoji="🧠" />

        <div className={SCROLL}>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="cursor-pointer font-medium text-blue transition-opacity hover:opacity-75" onClick={() => navigate('/consultas')}>Consultas Preventivas</span>
            <span className="text-muted2">›</span>
            <span className="font-semibold text-text">Saúde Mental</span>
          </div>

          <div className="flex items-center gap-4 rounded-[20px] border border-[rgba(13,148,136,0.15)] bg-[linear-gradient(135deg,#f0fdfa,#ccfbf1)] px-6 py-5 shadow-[0_2px_12px_rgba(13,148,136,0.07)] dark:border-[rgba(94,234,212,0.15)] dark:bg-[linear-gradient(135deg,#042f2e,#134e4a)]">
            <div className="flex-shrink-0 text-[32px]">🧘</div>
            <div>
              <div className="mb-[3px] font-display text-[15px] font-bold text-[#0f766e] dark:text-[#5eead4]">Agendar Nova Consulta Preventiva</div>
              <div className="text-xs text-[#0d9488] opacity-85 dark:text-[#5eead4] dark:opacity-70">Cuide da sua mente com especialistas em bem-estar emocional e cognitivo.</div>
            </div>
            <div className="ml-auto flex-shrink-0 rounded-full border border-[rgba(13,148,136,0.2)] bg-[rgba(13,148,136,0.1)] px-3.5 py-[5px] font-display text-[11px] font-bold text-[#0d9488] dark:border-[rgba(94,234,212,0.2)] dark:bg-[rgba(94,234,212,0.1)] dark:text-[#5eead4]">5 especialidades disponíveis</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {CARDS.map((c, i) => (
              <div
                key={c.id}
                className={`${CARD} ${scheduled === c.id ? '!border-green !shadow-[0_0_0_3px_rgba(0,184,97,0.12)]' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="mb-1 flex items-start justify-between">
                  <div className={ICON}>{c.icon}</div>
                  <div className="flex flex-col items-end gap-[5px]">
                    <span className={TAG}>{c.tag}</span>
                    <span className={TAG_MUTED}>⏱ {c.duration}</span>
                  </div>
                </div>

                <div className="font-display text-[15px] font-bold leading-[1.3] text-text">{c.title}</div>
                <div className="flex-1 text-xs leading-[1.6] text-muted">{c.desc}</div>

                <div className="mt-1.5 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0d9488] dark:text-[#5eead4]">
                    <span className="h-[7px] w-[7px] rounded-full bg-[#0d9488] animate-pulse-dot dark:bg-[#5eead4]" />
                    Horários disponíveis
                  </div>
                  <button className="cursor-pointer rounded-[10px] border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] px-4 py-[7px] font-display text-xs font-bold text-white shadow-[0_4px_14px_rgba(0,184,97,0.25)] transition hover:scale-[0.98] hover:opacity-90" onClick={() => handleAgendar(c.id)}>
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
