import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'

const SCROLL = "flex flex-1 flex-col gap-7 overflow-y-auto px-7 pb-8 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1"
const CARD = "relative flex flex-col gap-2.5 overflow-hidden rounded-[22px] border border-border bg-surface px-5 pb-[18px] pt-[22px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] animate-fade-up hover:-translate-y-[3px] hover:border-[rgba(37,99,235,0.2)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] dark:hover:border-[rgba(147,197,253,0.2)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-[22px] before:bg-[linear-gradient(90deg,#3b82f6,#60a5fa)] before:content-['']"
const ICON = "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#eff6ff] text-[#2563eb] dark:bg-[rgba(59,130,246,0.15)] dark:text-[#93c5fd]"
const TAG = "whitespace-nowrap rounded-full border border-[rgba(37,99,235,0.15)] bg-[rgba(37,99,235,0.08)] px-2.5 py-[3px] font-display text-[10px] font-bold text-[#2563eb] dark:border-[rgba(147,197,253,0.2)] dark:bg-[rgba(147,197,253,0.1)] dark:text-[#93c5fd]"
const TAG_MUTED = "whitespace-nowrap rounded-full border border-border2 bg-surface2 px-2.5 py-[3px] font-display text-[10px] font-bold text-muted"

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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Saúde Física & Check-up" subtitle="Avaliações gerais e exames de rotina" />

        <div className={SCROLL}>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="cursor-pointer font-medium text-blue transition-opacity hover:opacity-75" onClick={() => navigate('/consultas')}>Consultas Preventivas</span>
            <span className="text-muted2">›</span>
            <span className="font-semibold text-text">Saúde Física</span>
          </div>

          <div className="flex items-center gap-4 rounded-[20px] border border-[rgba(37,99,235,0.15)] bg-[linear-gradient(135deg,#eff6ff,#dbeafe)] px-6 py-5 shadow-[0_2px_12px_rgba(37,99,235,0.07)] dark:border-[rgba(147,197,253,0.15)] dark:bg-[linear-gradient(135deg,#1e3a5f,#1e3a8a)]">
            <div>
              <div className="mb-[3px] font-display text-[15px] font-bold text-[#1d4ed8] dark:text-[#93c5fd]">Agendar Nova Consulta Preventiva</div>
              <div className="text-xs text-[#3b82f6] opacity-85 dark:text-[#93c5fd] dark:opacity-70">Escolha uma especialidade abaixo e reserve seu horário com um clique.</div>
            </div>
            <div className="ml-auto flex-shrink-0 rounded-full border border-[rgba(37,99,235,0.2)] bg-[rgba(37,99,235,0.1)] px-3.5 py-[5px] font-display text-[11px] font-bold text-[#2563eb] dark:border-[rgba(147,197,253,0.2)] dark:bg-[rgba(147,197,253,0.1)] dark:text-[#93c5fd]">5 especialidades disponíveis</div>
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
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-green">
                    <span className="h-[7px] w-[7px] rounded-full bg-green animate-pulse-dot" />
                    Horários disponíveis
                  </div>
                  <button
                    className="cursor-pointer rounded-[10px] border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] px-4 py-[7px] font-display text-xs font-bold text-white shadow-[0_4px_14px_rgba(0,184,97,0.25)] transition hover:scale-[0.98] hover:opacity-90"
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
