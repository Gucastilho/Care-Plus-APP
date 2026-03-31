import Sidebar    from '../components/Sidebar'
import Topbar     from '../components/Topbar'
import MissionCard from '../components/MissionCard'
import { dailyMissions, weeklyMissions } from '../data'

export default function Missoes() {
  return (
    <div className="shell missions-page">
      <Sidebar />
      <div className="main">
        <Topbar title="Missões" subtitle="Acompanhe seu progresso diário e semanal" emoji="🎯" />

        <div className="content-row">
          <div className="col-missions">
            <div className="section-header">
              <div className="section-title">Missões Diárias</div>
              <div className="section-link">2 / 3 concluídas</div>
            </div>
            <div id="daily-list" style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', paddingRight: 4 }}>
              {dailyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
            </div>
          </div>

          <div className="col-missions">
            <div className="section-header">
              <div className="section-title">Missões Semanais</div>
              <div className="section-link">0 / 3 concluídas</div>
            </div>
            <div id="weekly-list" style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto', paddingRight: 4 }}>
              {weeklyMissions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
