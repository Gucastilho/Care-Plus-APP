import { useState, useMemo } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { weeklyRanking, dailyRanking } from '../data'

function getPosClass(pos) {
  if (pos === 1) return 'gold'
  if (pos === 2) return 'silver'
  if (pos === 3) return 'bronze'
  return ''
}

function getPosContent(pos) {
  if (pos === 1) return '🥇'
  if (pos === 2) return '🥈'
  if (pos === 3) return '🥉'
  return pos
}

export default function Ranking() {
  const [tab, setTab] = useState('semanal')
  const raw = tab === 'semanal' ? weeklyRanking : dailyRanking
  const sorted = useMemo(() => [...raw].sort((a, b) => b.pts - a.pts), [raw])

  const userEntry = sorted.find(p => p.isUser)
  const userPos   = userEntry ? sorted.indexOf(userEntry) + 1 : '-'
  const top1Pts   = sorted[0]?.pts || 1
  const prevPts   = userPos > 1 ? sorted[userPos - 2]?.pts : userEntry?.pts
  const gapTop1   = top1Pts - (userEntry?.pts || 0)
  const gapPrev   = prevPts && prevPts !== userEntry?.pts ? prevPts - (userEntry?.pts || 0) : 0
  const pctTop1   = Math.round(((userEntry?.pts || 0) / top1Pts) * 100)
  const pctPrev   = gapPrev > 0 ? Math.round(((userEntry?.pts || 0) / prevPts) * 100) : 100

  return (
    <div className="shell ranking-page">
      <Sidebar />
      <div className="main">
        <Topbar title="Ranking" subtitle="Acompanhe seu progresso e inspire-se com a comunidade" emoji="📊" />

        <div className="content-row">
          <div className="ranking-left">
            <div className="tabs">
              <button className={`tab-btn${tab === 'diario' ? ' active' : ''}`}  onClick={() => setTab('diario')}>Ranking Diário</button>
              <button className={`tab-btn${tab === 'semanal' ? ' active' : ''}`} onClick={() => setTab('semanal')}>Ranking Semanal</button>
            </div>

            <div className="ranking-card">
              <div className="ranking-card-header">
                <div>
                  <div className="ranking-card-title">{tab === 'semanal' ? 'Top 10 — Esta Semana' : 'Top 10 — Hoje'}</div>
                  <div className="ranking-card-sub">Usuários com melhor desempenho</div>
                </div>
              </div>
              <div className="ranking-rows">
                {sorted.map((p, i) => {
                  const pos = i + 1
                  const posClass = p.isUser && pos > 3 ? 'user' : getPosClass(pos)
                  return (
                    <div key={p.name + i} className={`ranking-row${p.isUser ? ' is-user' : ''}`} style={{ animationDelay: `${i * 0.04}s` }}>
                      <div className={`pos-badge ${posClass}`}>{getPosContent(pos)}</div>
                      <div className="rank-av" style={{ background: p.color }}>{p.initial}</div>
                      <div className="row-info">
                        <div className="row-name">
                          {p.name}
                          {p.isUser && <span className="you-tag">Você</span>}
                        </div>
                        <div className="row-sub">Posição #{pos}</div>
                      </div>
                      <div className="row-pts">
                        <span className="row-pts-icon">🏆</span>
                        {p.pts.toLocaleString('pt-BR')} pts
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="ranking-right">
            <div className="your-pos-card">
              <div className="your-pos-header">
                <div className="your-pos-label">Sua Posição</div>
                <div className="your-pos-user">
                  <div className="your-av">🧑</div>
                  <div>
                    <div className="your-pos-num">#{userPos}</div>
                    <div className="your-pos-name">Gustavo Castilho</div>
                  </div>
                </div>
                <div className="your-pts-row">
                  Seus pontos &nbsp;
                  <span className="your-pts-val">{userEntry?.pts.toLocaleString('pt-BR')} pts</span>
                </div>
              </div>
              <div className="your-pos-body">
                <div className="section-title">Estatísticas</div>
                <div className="stat-progress-row">
                  <div className="stat-progress-label">
                    <span>Distância para #1</span>
                    <span>{gapTop1.toLocaleString('pt-BR')} pts</span>
                  </div>
                  <div className="stat-progress-track">
                    <div className="stat-progress-fill" style={{ width: pctTop1 + '%' }} />
                  </div>
                </div>
                <div className="stat-progress-row">
                  <div className="stat-progress-label">
                    <span>Próxima posição</span>
                    <span>{gapPrev > 0 ? gapPrev.toLocaleString('pt-BR') + ' pts' : '—'}</span>
                  </div>
                  <div className="stat-progress-track">
                    <div className="stat-progress-fill blue" style={{ width: pctPrev + '%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="reminder-card">
              <div className="reminder-title">💡 Lembre-se</div>
              <div className="reminder-text">O ranking é apenas para motivação. Seu objetivo principal é sua saúde e bem-estar pessoal. Continue completando missões!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
