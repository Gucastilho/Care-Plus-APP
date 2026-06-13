import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'
import MissionCard from '../components/MissionCard'
import MetasModal from '../components/MetasModal'
import ConsultaModal from '../components/ConsultaModal'
import { dailyMissions } from '../data'

export default function Dashboard() {
  const navigate = useNavigate()
  const { toasts, show } = useToast()
  const [appts, setAppts] = useState([])
  const [metas, setMetas] = useState([])
  const [metasModalOpen, setMetasModalOpen] = useState(false)
  const [consultaSelecionada, setConsultaSelecionada] = useState(null)

  useEffect(() => {
    const carregarConsultas = () => {
      const consultasSalvas = localStorage.getItem('consultas_agendadas')
      if (consultasSalvas) {
        setAppts(JSON.parse(consultasSalvas))
      }
    }

    carregarConsultas()

    const metasSalvas = localStorage.getItem('metas_usuario')
    if (metasSalvas) {
      setMetas(JSON.parse(metasSalvas))
    }

    window.addEventListener('focus', carregarConsultas)

    return () => {
      window.removeEventListener('focus', carregarConsultas)
    }
  }, [])

  function handleAddMeta(meta) {
    setMetas(prevMetas => {
      const metaComId = { ...meta, id: `${meta.id}_${Date.now()}`, adicionadaEm: new Date().toISOString() }
      const novasMetas = [...prevMetas, metaComId]
      localStorage.setItem('metas_usuario', JSON.stringify(novasMetas))
      return novasMetas
    })
  }

  function handleRemoverMeta(metaId) {
    const novasMetas = metas.filter(m => m.id !== metaId)
    setMetas(novasMetas)
    localStorage.setItem('metas_usuario', JSON.stringify(novasMetas))
    show('Meta removida.')
  }

  function cancelAppt(id) {
    const novasConsultas = appts.filter(x => x.id !== id)
    setAppts(novasConsultas)
    localStorage.setItem('consultas_agendadas', JSON.stringify(novasConsultas))
    show('Consulta cancelada com sucesso.')
    setConsultaSelecionada(null)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Olá, Gustavo" subtitle="Continue sua jornada de bem-estar" emoji="👋" />

        <div className="flex flex-1 gap-5 overflow-hidden px-7 py-5">
          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            <div>
              <div className="mb-1 flex items-center justify-between animate-fade-in">
                <div className="font-display text-base font-semibold text-text">Missões Diárias</div>
                <Link className="flex items-center gap-1 text-xs text-green" to="/missoes">Ver todas →</Link>
              </div>
              {dailyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
            </div>

            <div className="flex flex-1 flex-col gap-2.5 animate-slide-up">
              <div className="mb-1 flex items-center justify-between animate-fade-in">
                <div className="font-display text-base font-semibold text-text">Impulsione sua saúde</div>
                {metas.length > 0 && <div className="text-xs text-green">{metas.length} meta{metas.length !== 1 ? 's' : ''}</div>}
              </div>

              {metas.length === 0 ? (
                <>
                  <div className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-[18px] border-[1.5px] border-dashed border-border2 bg-surface text-muted transition-[border-color,background] hover:border-green hover:bg-[rgba(0,184,97,0.03)]">
                    <div className="text-[28px] opacity-35">✦</div>
                    <div className="text-[13px] font-medium">Nenhuma meta ainda</div>
                    <div className="text-[11px] text-muted2">Crie um plano personalizado ou adicione metas manualmente</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-[linear-gradient(135deg,#2e6fff,var(--color-blue))] p-2.5 font-display text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(43,127,255,0.25)] transition hover:scale-[0.99] hover:opacity-90" onClick={() => navigate('/planejamento-saude')}>
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                        <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Criar Plano Personalizado
                    </button>
                    <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] p-2.5 font-display text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,184,97,0.2)] transition hover:scale-[0.99] hover:opacity-90" onClick={() => setMetasModalOpen(true)}>+ Adicionar Meta</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-2.5 flex max-h-[300px] flex-col gap-2.5 overflow-y-auto pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-[3px]">
                    {metas.map((meta, i) => (
                      <div key={meta.id} className="group relative flex items-center gap-3 rounded-[14px] border border-border bg-surface px-4 py-3.5 transition animate-fade-up hover:border-border2 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]" style={{ animationDelay: `${i * 0.08}s` }}>
                        <div className="flex-shrink-0 text-2xl">{meta.emoji}</div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-[3px] font-display text-[13px] font-bold text-text">{meta.titulo}</div>
                          <div className="mb-1 text-[11px] leading-[1.5] text-muted">{meta.desc}</div>
                          <div className="text-[10px] font-bold text-amber">⏱ {meta.prazo}</div>
                        </div>
                        <button className="flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border border-[rgba(232,54,93,0.2)] bg-[rgba(232,54,93,0.1)] text-[11px] text-rose opacity-0 transition-opacity hover:bg-[rgba(232,54,93,0.15)] group-hover:opacity-100" onClick={() => handleRemoverMeta(meta.id)}>✕</button>
                      </div>
                    ))}
                  </div>
                  <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] p-2.5 font-display text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,184,97,0.2)] transition hover:scale-[0.99] hover:opacity-90" onClick={() => setMetasModalOpen(true)}>+ Adicionar Meta</button>
                </>
              )}
            </div>
          </div>

          <div className="flex w-[280px] flex-shrink-0 flex-col gap-3.5">
            <div className="rounded-[18px] border border-border bg-surface p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] animate-slide-right">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Score de Bem-estar</div>
                <div className="text-[11px] text-blue cursor-pointer">Detalhes →</div>
              </div>
              <div className="flex items-center gap-3.5">
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="29" fill="none" stroke="var(--color-surface3)" strokeWidth="7"/>
                  <circle cx="36" cy="36" r="29" fill="none" stroke="var(--color-green)" strokeWidth="7"
                    strokeLinecap="round" strokeDasharray="182.2" strokeDashoffset="54.7"
                    transform="rotate(-90 36 36)"/>
                  <text x="36" y="41" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="17" fontWeight="700" fill="var(--color-green)">70</text>
                </svg>
                <div className="flex flex-1 flex-col gap-[7px]">
                  {[['Atividade','75','var(--color-green)'],['Hidratação','37','var(--color-blue)'],['Sono','80','var(--color-teal)'],['Nutrição','60','var(--color-amber)']].map(([label, val, color]) => (
                    <div key={label} className="flex items-center gap-1.5 text-[11px]">
                      <span className="flex-1 text-muted">{label}</span>
                      <div className="h-[3px] flex-[2] overflow-hidden rounded-[2px] bg-surface3"><div className="h-full rounded-[2px]" style={{ width: val+'%', background: color }} /></div>
                      <span className="min-w-[24px] text-right font-display text-[11px] font-semibold" style={{ color }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-[18px] border border-border bg-surface p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] animate-slide-up">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Consultas e Exames</div>
                <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[7px] border border-border2 bg-surface2 text-xs text-muted" onClick={() => navigate('/consultas')}>↗</div>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-[3px]">
                {appts.length === 0
                  ? <p className="py-4 text-center text-xs text-muted">Nenhuma consulta agendada</p>
                  : appts.map(c => (
                    <div key={c.id} className="relative cursor-pointer overflow-hidden rounded-xl border border-border bg-surface2 px-3 py-[11px] before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-l-[3px] before:bg-[linear-gradient(180deg,var(--color-blue),var(--color-teal))] before:content-['']" onClick={() => setConsultaSelecionada(c)}>
                      <div className="mb-0.5 text-xs font-semibold text-text">{c.tipo}</div>
                      <div className="mb-[5px] flex items-center gap-1.5 text-[10px] text-muted"><div className="h-1 w-1 rounded-full bg-blue" />{c.data} · {c.horario}</div>
                      <div className="mb-[7px] text-[11px] text-muted">{c.medico}</div>
                      <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button className="flex-1 rounded-[7px] border border-[rgba(43,127,255,0.18)] bg-[rgba(43,127,255,0.08)] py-[5px] text-center font-display text-[10px] font-semibold text-blue transition-opacity hover:opacity-75">Remarcar</button>
                        <button className="flex-1 rounded-[7px] border border-[rgba(232,54,93,0.18)] bg-[rgba(232,54,93,0.08)] py-[5px] text-center font-display text-[10px] font-semibold text-rose transition-opacity hover:opacity-75" onClick={() => cancelAppt(c.id)}>Cancelar</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} />
      <MetasModal
        open={metasModalOpen}
        onClose={() => setMetasModalOpen(false)}
        onAddMeta={handleAddMeta}
      />
      <ConsultaModal
        consulta={consultaSelecionada}
        onClose={() => setConsultaSelecionada(null)}
        onCancel={cancelAppt}
      />
    </div>
  )
}
