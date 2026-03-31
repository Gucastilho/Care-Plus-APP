import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'
import MissionCard from '../components/MissionCard'
import { consultations, dailyMissions } from '../data'

export default function Dashboard() {
  const { toasts, show } = useToast()
  const [appts, setAppts] = useState(consultations)

  function cancelAppt(id) {
    setAppts(a => a.filter(x => x.id !== id))
    show('Consulta cancelada com sucesso.')
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
              </div>
              <div className="boost-empty">
                <div className="boost-empty-icon">✦</div>
                <div className="boost-empty-text">Nenhuma meta ainda</div>
                <div className="boost-empty-sub">Adicione uma meta personalizada</div>
              </div>
              <div className="boost-add-btn">+ Adicionar Meta</div>
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
                <div className="appt-link">↗</div>
              </div>
              <div className="appt-list">
                {appts.length === 0
                  ? <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', padding: '16px 0' }}>Nenhuma consulta agendada</p>
                  : appts.map(c => (
                    <div key={c.id} className="appt-item">
                      <div className="appt-spec">{c.spec}</div>
                      <div className="appt-time"><div className="appt-time-dot" />{c.date} · {c.time}</div>
                      <div className="appt-doctor">{c.doctor}</div>
                      <div className="appt-actions">
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
    </div>
  )
}
