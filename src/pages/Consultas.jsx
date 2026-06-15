import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'
import { Icon } from '../components/icons'

const JOURNEY_COLOR = {
  'journey-blue':   'bg-[linear-gradient(135deg,#eff6ff,#dbeafe)] text-[#2563eb] dark:bg-[linear-gradient(135deg,#1e3a5f_0%,#1e3a8a_100%)] dark:text-[#93c5fd]',
  'journey-green':  'bg-[linear-gradient(135deg,#f0fdf4,#dcfce7)] text-[#16a34a] dark:bg-[linear-gradient(135deg,#052e16_0%,#14532d_100%)] dark:text-[#86efac]',
  'journey-purple': 'bg-[linear-gradient(135deg,#faf5ff,#ede9fe)] text-[#7c3aed] dark:bg-[linear-gradient(135deg,#2e1065_0%,#4c1d95_100%)] dark:text-[#c4b5fd]',
}

const BRANCH_BEFORE = {
  'branch-blue':    "before:bg-[linear-gradient(90deg,#3b82f6,#60a5fa)]",
  'branch-teal':    "before:bg-[linear-gradient(90deg,#14b8a6,#2dd4bf)]",
  'branch-orange':  "before:bg-[linear-gradient(90deg,#f97316,#fb923c)]",
  'branch-purple':  "before:bg-[linear-gradient(90deg,#8b5cf6,#a78bfa)]",
  'branch-indigo':  "before:bg-[linear-gradient(90deg,#6366f1,#818cf8)]",
  'branch-emerald': "before:bg-[linear-gradient(90deg,#10b981,#34d399)]",
}
const BRANCH_ICON = {
  'branch-blue':    "bg-[#eff6ff] text-[#2563eb] dark:bg-[rgba(59,130,246,0.15)]",
  'branch-teal':    "bg-[#f0fdfa] text-[#0d9488] dark:bg-[rgba(20,184,166,0.15)]",
  'branch-orange':  "bg-[#fff7ed] text-[#ea580c] dark:bg-[rgba(249,115,22,0.15)]",
  'branch-purple':  "bg-[#faf5ff] text-[#7c3aed] dark:bg-[rgba(139,92,246,0.15)]",
  'branch-indigo':  "bg-[#eef2ff] text-[#4338ca] dark:bg-[rgba(99,102,241,0.15)]",
  'branch-emerald': "bg-[#f0fdf4] text-[#059669] dark:bg-[rgba(16,185,129,0.15)]",
}
const BRANCH_BTN = {
  'branch-blue':    "text-[#2563eb] border-[rgba(37,99,235,0.25)] hover:bg-[rgba(37,99,235,0.07)] hover:border-[#2563eb]",
  'branch-teal':    "text-[#0d9488] border-[rgba(13,148,136,0.25)] hover:bg-[rgba(13,148,136,0.07)] hover:border-[#0d9488]",
  'branch-orange':  "text-[#ea580c] border-[rgba(234,88,12,0.25)] hover:bg-[rgba(234,88,12,0.07)] hover:border-[#ea580c]",
  'branch-purple':  "text-[#7c3aed] border-[rgba(124,58,237,0.25)] hover:bg-[rgba(124,58,237,0.07)] hover:border-[#7c3aed]",
  'branch-indigo':  "text-[#4338ca] border-[rgba(67,56,202,0.25)] hover:bg-[rgba(67,56,202,0.07)] hover:border-[#4338ca]",
  'branch-emerald': "text-[#059669] border-[rgba(5,150,105,0.25)] hover:bg-[rgba(5,150,105,0.07)] hover:border-[#059669]",
}

const JOURNEYS = [
  {
    id: 'longevidade',
    title: 'Longevidade',
    desc: 'Protocolos de saúde para uma vida longa e com qualidade.',
    icon: 'dna',
    color: 'journey-blue',
    consultas: [
      { nome: 'Check-up Médico Anual', especialidade: 'Clínica Geral' },
      { nome: 'Avaliação Cardiovascular', especialidade: 'Cardiologia' },
      { nome: 'Dermatologia Preventiva', especialidade: 'Dermatologia' }
    ],
    medicos: [
      {
        nome: 'Dr. Carlos Mendes',
        especialidade: 'Cardiologista',
        rm: 'CRM 45.892-SP',
        regiao: 'Zona Sul - São Paulo',
        descricao: 'Especialista em cardiologia preventiva com mais de 15 anos de experiência. Foco em longevidade cardiovascular e prevenção de doenças crônicas.',
        avaliacoes: [
          { paciente: 'Maria S.', nota: 5, comentario: 'Excelente profissional! Muito atencioso e explica tudo detalhadamente.' },
          { paciente: 'João P.', nota: 5, comentario: 'Salvou minha vida com o diagnóstico precoce. Recomendo muito!' }
        ],
        indicacoes: ['Hipertensão', 'Prevenção cardiovascular', 'Check-up executivo']
      },
      {
        nome: 'Dra. Ana Silva',
        especialidade: 'Geriatra',
        rm: 'CRM 38.124-SP',
        regiao: 'Zona Oeste - São Paulo',
        descricao: 'Médica geriatra especializada em envelhecimento saudável e qualidade de vida. Atendimento humanizado focado em longevidade ativa.',
        avaliacoes: [
          { paciente: 'Roberto M.', nota: 5, comentario: 'Profissional excepcional! Cuida da minha mãe com muito carinho.' },
          { paciente: 'Carla F.', nota: 5, comentario: 'Muito competente e atualizada. Melhor geriatra que já consultei.' }
        ],
        indicacoes: ['Envelhecimento saudável', 'Prevenção de quedas', 'Memória e cognição']
      }
    ],
    habitos: [
      { icon: 'walk', titulo: 'Caminhada Diária', desc: '5.000 passos por dia' },
      { icon: 'water', titulo: 'Hidratação', desc: '2 litros de água' }
    ]
  },
  {
    id: 'mental',
    title: 'Equilíbrio Mental',
    desc: 'Cuide da sua mente com práticas preventivas e terapêuticas.',
    icon: 'meditation',
    color: 'journey-green',
    consultas: [
      { nome: 'Gestão do Estresse', especialidade: 'Psicologia' },
      { nome: 'Higiene do Sono', especialidade: 'Sono' },
      { nome: 'Terapia de Manutenção', especialidade: 'Psicoterapia' }
    ],
    medicos: [
      {
        nome: 'Dra. Beatriz Costa',
        especialidade: 'Psicóloga',
        rm: 'CRP 06/89.234',
        regiao: 'Centro - São Paulo',
        descricao: 'Psicóloga clínica com abordagem cognitivo-comportamental. Especialista em ansiedade, estresse e desenvolvimento pessoal.',
        avaliacoes: [
          { paciente: 'Lucas T.', nota: 5, comentario: 'Transformou minha vida! Aprendi a lidar com a ansiedade de forma saudável.' },
          { paciente: 'Fernanda L.', nota: 5, comentario: 'Profissional incrível, muito empática e eficiente.' }
        ],
        indicacoes: ['Ansiedade', 'Estresse', 'Desenvolvimento pessoal']
      },
      {
        nome: 'Dr. Rafael Santos',
        especialidade: 'Psiquiatra',
        rm: 'CRM 52.678-SP',
        regiao: 'Zona Norte - São Paulo',
        descricao: 'Psiquiatra com foco em saúde mental preventiva e tratamento integrado. Especialista em transtornos de humor e sono.',
        avaliacoes: [
          { paciente: 'Paula R.', nota: 5, comentario: 'Médico excepcional! Finalmente consegui controlar minha depressão.' },
          { paciente: 'André C.', nota: 5, comentario: 'Muito profissional e atencioso. Recomendo fortemente!' }
        ],
        indicacoes: ['Depressão', 'Transtornos de ansiedade', 'Insônia']
      }
    ],
    habitos: [
      { icon: 'meditation', titulo: 'Meditação', desc: '10 minutos diários' },
      { icon: 'sleep', titulo: 'Sono de Qualidade', desc: '7-8 horas por noite' }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Física',
    desc: 'Maximize seu potencial com avaliações e treinos orientados.',
    icon: 'bolt',
    color: 'journey-purple',
    consultas: [
      { nome: 'Nutrição Esportiva', especialidade: 'Nutrição' },
      { nome: 'Fisioterapia Preventiva', especialidade: 'Fisioterapia' },
      { nome: 'Avaliação Física', especialidade: 'Educação Física' }
    ],
    medicos: [
      {
        nome: 'Dr. Pedro Alves',
        especialidade: 'Fisiologista do Exercício',
        rm: 'CREF 012345-G/SP',
        regiao: 'Zona Sul - São Paulo',
        descricao: 'Fisiologista especializado em performance esportiva e condicionamento físico. Trabalha com atletas e pessoas que buscam alta performance.',
        avaliacoes: [
          { paciente: 'Marcos V.', nota: 5, comentario: 'Melhorei meu desempenho em 40%! Profissional top!' },
          { paciente: 'Juliana M.', nota: 5, comentario: 'Treinos personalizados e resultados incríveis. Super recomendo!' }
        ],
        indicacoes: ['Performance esportiva', 'Condicionamento físico', 'Reabilitação atlética']
      },
      {
        nome: 'Dra. Juliana Rocha',
        especialidade: 'Nutricionista Esportiva',
        rm: 'CRN-3 45.789',
        regiao: 'Zona Oeste - São Paulo',
        descricao: 'Nutricionista especializada em nutrição esportiva e emagrecimento saudável. Planos alimentares personalizados para alta performance.',
        avaliacoes: [
          { paciente: 'Ricardo B.', nota: 5, comentario: 'Perdi 15kg de forma saudável! Excelente profissional.' },
          { paciente: 'Camila S.', nota: 5, comentario: 'Melhor nutricionista! Aprendi a comer bem e ter energia.' }
        ],
        indicacoes: ['Nutrição esportiva', 'Emagrecimento', 'Ganho de massa muscular']
      }
    ],
    habitos: [
      { icon: 'run', titulo: 'Treino Semanal', desc: '150 min de atividade' },
      { icon: 'apple', titulo: 'Nutrição Balanceada', desc: '5 refeições saudáveis' }
    ]
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
  const [activeJourney, setActiveJourney] = useState(null)
  const navigate = useNavigate()
  const { toasts, show } = useToast()

  const journeyAtiva = JOURNEYS.find(j => j.id === activeJourney)

  function agendarConsulta(medico) {
    const novaConsulta = {
      id: `consulta_${Date.now()}`,
      tipo: `Consulta de ${medico.especialidade}`,
      data: '15 Jan 2025',
      horario: '14:30',
      medico: medico.nome,
      especialidade: medico.especialidade,
      local: 'Clínica Care Plus',
      endereco: `${medico.regiao}`,
      plano: 'Care Plus Premium',
      motivo: 'Consulta preventiva',
      observacoes: 'Primeira consulta'
    }

    const consultasExistentes = JSON.parse(localStorage.getItem('consultas_agendadas') || '[]')
    consultasExistentes.push(novaConsulta)
    localStorage.setItem('consultas_agendadas', JSON.stringify(consultasExistentes))

    show(`Consulta agendada com ${medico.nome}!`)
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Consultas Preventivas" subtitle="Agende sua próxima jornada de saúde" />

        <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-7 pb-8 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1">

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="font-display text-base font-semibold text-text">Jornadas de Saúde</div>
              <span className="text-xs text-green">Ver todas →</span>
            </div>
            <div className="grid grid-cols-3 gap-3.5">
              {JOURNEYS.map(j => (
                <div
                  key={j.id}
                  className={`relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-[20px] border-2 px-5 pb-[18px] pt-[22px] transition-[transform,box-shadow,border-color] animate-fade-up hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] ${JOURNEY_COLOR[j.color]} ${activeJourney === j.id ? 'border-current shadow-[0_8px_28px_rgba(0,0,0,0.1)]' : 'border-transparent'}`}
                  onClick={() => setActiveJourney(activeJourney === j.id ? null : j.id)}
                >
                  <Icon name={j.icon} className="h-7 w-7" />
                  <div className="font-display text-[15px] font-bold">{j.title}</div>
                  <div className="flex-1 text-xs leading-[1.5] opacity-75">{j.desc}</div>
                  <button className="mt-1 cursor-pointer self-start rounded-lg border border-white/80 bg-white/55 px-3 py-[5px] text-[11px] font-bold text-inherit backdrop-blur-[4px] transition-colors hover:bg-white/80 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/[0.18]">{activeJourney === j.id ? 'Fechar' : 'Explorar'} →</button>
                </div>
              ))}
            </div>
          </div>

          {journeyAtiva && (
            <div className="rounded-3xl border border-border bg-surface p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] animate-fade-up">
              <div className="mb-8 flex items-center gap-4 border-b border-border pb-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] text-white shadow-[0_6px_20px_rgba(0,184,97,0.25)]"><Icon name={journeyAtiva.icon} className="h-8 w-8" /></div>
                <div>
                  <div className="mb-1 font-display text-[22px] font-bold text-text">{journeyAtiva.title}</div>
                  <div className="text-[13px] text-muted">Plano completo para sua jornada</div>
                </div>
              </div>

              <div className="mb-7 last:mb-0">
                <div className="mb-3.5 flex items-center gap-2 font-display text-[15px] font-bold text-text">Consultas Recomendadas</div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
                  {journeyAtiva.consultas.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-[14px] border border-border bg-surface2 px-4 py-3.5 transition-all animate-fade-up-sm hover:-translate-y-0.5 hover:border-border2 hover:bg-surface hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]" style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="flex-shrink-0 text-green"><Icon name="stethoscope" className="h-6 w-6" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 font-display text-[13px] font-bold text-text">{c.nome}</div>
                        <div className="text-[11px] text-muted">{c.especialidade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-7 last:mb-0">
                <div className="mb-3.5 flex items-center gap-2 font-display text-[15px] font-bold text-text">Médicos Especialistas</div>
                <div className="flex flex-col gap-3">
                  {journeyAtiva.medicos.map((m, i) => (
                    <div key={i} className="overflow-hidden rounded-[14px] border border-border bg-surface2 transition-all animate-fade-up-sm hover:-translate-y-0.5 hover:border-border2 hover:bg-surface hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="flex items-center gap-3.5 px-[18px] py-4">
                        <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full border-2 border-green2 bg-[linear-gradient(135deg,#d4edda,#a8d5b5)] text-green2"><Icon name="doctor" className="h-7 w-7" /></div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-0.5 font-display text-[14px] font-bold text-text">{m.nome}</div>
                          <div className="text-xs text-muted">{m.especialidade}</div>
                          <div className="mt-0.5 text-[10px] font-semibold text-muted">{m.rm}</div>
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted"><Icon name="pin" className="h-3 w-3" />{m.regiao}</div>
                        </div>
                        <button className="flex-shrink-0 cursor-pointer rounded-lg border border-border2 bg-none px-3.5 py-1.5 text-[11px] font-semibold text-muted transition-all hover:border-green hover:bg-surface3 hover:text-text" onClick={(e) => {
                          e.stopPropagation()
                          agendarConsulta(m)
                        }}>Agendar</button>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-border px-[18px] py-4">
                        <div className="text-xs leading-[1.6] text-text">{m.descricao}</div>

                        <div className="flex flex-col">
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-muted">Indicações:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {m.indicacoes.map((ind, idx) => (
                              <span key={idx} className="rounded-full border border-[rgba(0,184,97,0.18)] bg-[rgba(0,184,97,0.08)] px-2.5 py-1 text-[10px] font-semibold text-green">{ind}</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-muted">Avaliações de Pacientes:</div>
                          {m.avaliacoes.map((av, idx) => (
                            <div key={idx} className="mb-2 rounded-[10px] border border-border bg-surface p-3 last:mb-0">
                              <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-[11px] font-bold text-text">{av.paciente}</span>
                                <span className="flex gap-0.5 text-amber">{Array.from({ length: av.nota }).map((_, k) => <Icon key={k} name="star" className="h-3 w-3" />)}</span>
                              </div>
                              <div className="text-[11px] italic leading-[1.5] text-muted">"{av.comentario}"</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-7 last:mb-0">
                <div className="mb-3.5 flex items-center gap-2 font-display text-[15px] font-bold text-text">Hábitos e Desafios</div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
                  {journeyAtiva.habitos.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-[14px] border border-border bg-surface2 px-4 py-3.5 transition-all animate-fade-up-sm hover:-translate-y-0.5 hover:border-border2 hover:bg-surface hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]" style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="flex-shrink-0 text-green"><Icon name={h.icon} className="h-6 w-6" /></div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-0.5 font-display text-[13px] font-bold text-text">{h.titulo}</div>
                        <div className="text-[11px] text-muted">{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="font-display text-base font-semibold text-text">Explorar Todos os Ramos</div>
              <span className="text-xs text-green">6 especialidades</span>
            </div>
            <div className="grid grid-cols-3 gap-3.5">
              {BRANCHES.map((b, i) => (
                <div key={b.id} className={`relative flex cursor-pointer flex-col gap-2.5 overflow-hidden rounded-[20px] border border-border bg-surface px-5 pb-[18px] pt-[22px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] animate-fade-up hover:-translate-y-0.5 hover:border-border2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:rounded-t-[20px] before:content-[''] ${BRANCH_BEFORE[b.color]}`} style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => {
                    if (b.id === 'fisica') navigate('/consultas/saude-fisica')
                    if (b.id === 'mental') navigate('/consultas/saude-mental')
                    if (b.id === 'nutricao') navigate('/consultas/nutricao')
                  }}
                >
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] ${BRANCH_ICON[b.color]}`}>{b.icon}</div>
                  <div className="font-display text-[14px] font-bold leading-[1.3] text-text">{b.title}</div>
                  <div className="flex-1 text-xs leading-[1.5] text-muted">{b.desc}</div>
                  <button className={`mt-0.5 cursor-pointer self-start rounded-lg border bg-none px-3 py-[5px] text-[11px] font-bold transition-all ${BRANCH_BTN[b.color]}`}>Ver Horários</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  )
}
