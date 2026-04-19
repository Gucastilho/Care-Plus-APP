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
    // Função para carregar consultas
    const carregarConsultas = () => {
      const consultasSalvas = localStorage.getItem('consultas_agendadas')
      console.log('Consultas carregadas:', consultasSalvas)
      if (consultasSalvas) {
        setAppts(JSON.parse(consultasSalvas))
      }
    }

    // Carregar consultas inicialmente
    carregarConsultas()

    // Carregar metas do localStorage
    const metasSalvas = localStorage.getItem('metas_usuario')
    if (metasSalvas) {
      setMetas(JSON.parse(metasSalvas))
    }

    // Adicionar listener para quando a janela ganhar foco
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
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Topbar title="Olá, Gustavo" subtitle="Continue sua jornada de bem-estar" emoji="👋" />

        <div className="content-row">
          {/* LEFT */}
          <div className="col-missions">
            <div>
              <div className="section-header">
                <div className="section-title">Missões Diárias</div>
                <Link className="section-link" to="/missoes">Ver todas →</Link>
              </div>
              {dailyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
            </div>

            <div className="boost-section">
              <div className="section-header">
                <div className="section-title">Impulsione sua saúde</div>
                {metas.length > 0 && <div className="section-link">{metas.length} meta{metas.length !== 1 ? 's' : ''}</div>}
              </div>
              
              {metas.length === 0 ? (
                <>
                  <div className="boost-empty">
                    <div className="boost-empty-icon">✦</div>
                    <div className="boost-empty-text">Nenhuma meta ainda</div>
                    <div className="boost-empty-sub">Crie um plano personalizado ou adicione metas manualmente</div>
                  </div>
                  <div className="boost-actions">
                    <button className="boost-plano-btn" onClick={() => navigate('/planejamento-saude')}>
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                        <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Criar Plano Personalizado
                    </button>
                    <button className="boost-add-btn" onClick={() => setMetasModalOpen(true)}>+ Adicionar Meta</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="metas-list">
                    {metas.map((meta, i) => (
                      <div key={meta.id} className="meta-card" style={{ animationDelay: `${i * 0.08}s` }}>
                        <div className="meta-card-emoji">{meta.emoji}</div>
                        <div className="meta-card-body">
                          <div className="meta-card-titulo">{meta.titulo}</div>
                          <div className="meta-card-desc">{meta.desc}</div>
                          <div className="meta-card-prazo">⏱ {meta.prazo}</div>
                        </div>
                        <button className="meta-card-remove" onClick={() => handleRemoverMeta(meta.id)}>✕</button>
                      </div>
                    ))}
                  </div>
                  <button className="boost-add-btn" onClick={() => setMetasModalOpen(true)}>+ Adicionar Meta</button>
                </>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-right">
            <div className="score-card">
              <div className="score-header">
                <div className="score-title">Score de Bem-estar</div>
                <div className="score-link">Detalhes →</div>
              </div>
              <div className="score-ring-row">
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="29" fill="none" stroke="var(--surface3)" strokeWidth="7"/>
                  <circle cx="36" cy="36" r="29" fill="none" stroke="var(--green)" strokeWidth="7"
                    strokeLinecap="round" strokeDasharray="182.2" strokeDashoffset="54.7"
                    transform="rotate(-90 36 36)"/>
                  <text x="36" y="41" textAnchor="middle" fontFamily="Outfit,sans-serif" fontSize="17" fontWeight="700" fill="var(--green)">70</text>
                </svg>
                <div className="score-dims">
                  {[['Atividade','75','var(--green)'],['Hidratação','37','var(--blue)'],['Sono','80','var(--teal)'],['Nutrição','60','var(--amber)']].map(([label, val, color]) => (
                    <div key={label} className="dim-row">
                      <span className="dim-label">{label}</span>
                      <div className="dim-track"><div className="dim-fill" style={{ width: val+'%', background: color }} /></div>
                      <span className="dim-val" style={{ color }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="appt-card">
              <div className="appt-header">
                <div className="appt-title">Consultas e Exames</div>
                <div className="appt-link" onClick={() => navigate('/consultas')}>↗</div>
              </div>
              <div className="appt-list">
                {appts.length === 0
                  ? <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', padding: '16px 0' }}>Nenhuma consulta agendada</p>
                  : appts.map(c => (
                    <div key={c.id} className="appt-item" onClick={() => setConsultaSelecionada(c)} style={{ cursor: 'pointer' }}>
                      <div className="appt-spec">{c.tipo}</div>
                      <div className="appt-time"><div className="appt-time-dot" />{c.data} · {c.horario}</div>
                      <div className="appt-doctor">{c.medico}</div>
                      <div className="appt-actions" onClick={(e) => e.stopPropagation()}>
                        <button className="appt-btn appt-btn-remark">Remarcar</button>
                        <button className="appt-btn appt-btn-cancel" onClick={() => cancelAppt(c.id)}>Cancelar</button>
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
