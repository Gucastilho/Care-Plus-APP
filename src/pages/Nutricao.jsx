import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'

const SCROLL = "flex flex-1 flex-col gap-7 overflow-y-auto px-7 pb-8 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1"
const CARD = "relative flex flex-col gap-2.5 overflow-hidden rounded-[22px] border border-border bg-surface px-5 pb-[18px] pt-[22px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] animate-fade-up hover:-translate-y-[3px] hover:border-[rgba(234,88,12,0.22)] hover:shadow-[0_16px_40px_rgba(234,88,12,0.13)] dark:hover:border-[rgba(253,186,116,0.2)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-[22px] before:bg-[linear-gradient(90deg,#f97316,#fb923c)] before:content-['']"
const ICON = "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c] dark:bg-[rgba(249,115,22,0.15)] dark:text-[#fdba74]"
const TAG = "whitespace-nowrap rounded-full border border-[rgba(234,88,12,0.18)] bg-[rgba(234,88,12,0.08)] px-2.5 py-[3px] font-display text-[10px] font-bold text-[#ea580c] dark:border-[rgba(253,186,116,0.2)] dark:bg-[rgba(253,186,116,0.1)] dark:text-[#fdba74]"
const TAG_MUTED = "whitespace-nowrap rounded-full border border-border2 bg-surface2 px-2.5 py-[3px] font-display text-[10px] font-bold text-muted"

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
        <circle cx="28" cy="28" r="7" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.8"/>
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Nutrição e Metabolismo" subtitle="Planejamento alimentar e fortalecimento da imunidade" />

        <div className={SCROLL}>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="cursor-pointer font-medium text-blue transition-opacity hover:opacity-75" onClick={() => navigate('/consultas')}>Consultas Preventivas</span>
            <span className="text-muted2">›</span>
            <span className="font-semibold text-text">Nutrição e Metabolismo</span>
          </div>

          <div className="flex items-center gap-4 rounded-[20px] border border-[rgba(234,88,12,0.15)] bg-[linear-gradient(135deg,#fff7ed,#ffedd5)] px-6 py-5 shadow-[0_2px_12px_rgba(234,88,12,0.07)] dark:border-[rgba(253,186,116,0.15)] dark:bg-[linear-gradient(135deg,#431407,#7c2d12)]">
            <div>
              <div className="mb-[3px] font-display text-[15px] font-bold text-[#c2410c] dark:text-[#fdba74]">Agendar Nova Consulta Preventiva</div>
              <div className="text-xs text-[#ea580c] opacity-85 dark:text-[#fdba74] dark:opacity-70">Escolha uma especialidade abaixo e reserve seu horário com um clique.</div>
            </div>
            <div className="ml-auto flex-shrink-0 rounded-full border border-[rgba(234,88,12,0.2)] bg-[rgba(234,88,12,0.1)] px-3.5 py-[5px] font-display text-[11px] font-bold text-[#ea580c] dark:border-[rgba(253,186,116,0.2)] dark:bg-[rgba(253,186,116,0.1)] dark:text-[#fdba74]">5 especialidades disponíveis</div>
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
