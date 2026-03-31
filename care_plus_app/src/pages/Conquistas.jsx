import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { earnedBadges, lockedBadges } from '../data'

export default function Conquistas() {
  return (
    <div className="shell conquistas-page">
      <Sidebar />
      <div className="main">
        <Topbar title="Conquistas" subtitle="Celebre suas vitórias e acompanhe seu progresso" emoji="🏆" />

        <div className="content-row">
          {/* Stats */}
          <div className="stats-row">
            {[
              { icon: '🔥', label: 'Sequência Atual',      value: '7 dias consecutivos',  cls: 'amber' },
              { icon: '⚡', label: 'Melhor Sequência',     value: '14 dias consecutivos', cls: 'blue'  },
              { icon: '🎖️', label: 'Badges Conquistados', value: '6 / 12 badges',        cls: 'green' },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-card-icon">{s.icon}</div>
                <div>
                  <div className="stat-card-label">{s.label}</div>
                  <div className={`stat-card-value ${s.cls}`}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Earned */}
          <div>
            <div className="section-header" style={{ marginBottom: 12 }}>
              <div className="section-title">Badges Conquistados</div>
              <div className="section-link">6 conquistados</div>
            </div>
            <div className="badges-scroll">
              {earnedBadges.map((b, i) => (
                <div key={b.id} className="badge-card" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
                  <div className="badge-pts">🏆 {b.pts} pts</div>
                  <div className={`medal-wrap ${b.medalClass}`}>{b.emoji}</div>
                  <div className="badge-name">{b.name}</div>
                  <div className="badge-desc">{b.desc}</div>
                  <div className="badge-date">Conquistado em {b.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Locked */}
          <div>
            <div className="section-header" style={{ marginBottom: 12 }}>
              <div className="section-title">Badges Bloqueados</div>
              <div className="section-link">6 restantes</div>
            </div>
            <div className="badges-scroll">
              {lockedBadges.map((b, i) => (
                <div key={b.id} className="badge-card locked" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
                  <div className="badge-pts">🏆 {b.pts} pts</div>
                  <div className="lock-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <div className="badge-name">{b.name}</div>
                  <div className="badge-desc">{b.desc}</div>
                  {b.progress > 0 && (
                    <div className="badge-progress-wrap">
                      <div className="badge-progress-track">
                        <div className="badge-progress-fill" style={{ width: b.progress + '%' }} />
                      </div>
                      <div className="badge-progress-label">{b.progress}% concluído</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
