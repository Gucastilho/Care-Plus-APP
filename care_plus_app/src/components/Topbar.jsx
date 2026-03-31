import { useTheme } from '../hooks/useTheme'

export default function Topbar({ title, subtitle, emoji }) {
  const { theme, toggle } = useTheme()

  return (
    <div className="topbar">
      <div className="greeting-block">
        <div className="greeting-hi">
          {title}
          <span className="greeting-wave">{emoji}</span>
        </div>
        <div className="greeting-sub">{subtitle}</div>
      </div>

      <div className="stat-pill pill-pts">
        <div className="stat-icon">🏆</div>
        <div className="stat-info">
          <div className="stat-val">1.500 pts</div>
          <div className="stat-label">Seus pontos</div>
        </div>
      </div>

      <div className="stat-pill pill-seq">
        <div className="stat-icon">🔥</div>
        <div className="stat-info">
          <div className="stat-val">7 dias</div>
          <div className="stat-label">Sequência</div>
        </div>
      </div>

      <div className="notif-btn">
        🔔
        <div className="notif-dot" />
      </div>

      <button className="theme-toggle" onClick={toggle} aria-label="Alternar tema">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
