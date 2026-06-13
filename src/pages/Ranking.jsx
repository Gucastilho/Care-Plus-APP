import { useState, useMemo } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { weeklyRanking, dailyRanking } from '../data'

const POS_BADGE = {
  gold:   'border-none bg-[linear-gradient(135deg,#fbbf24,#f59e0b)] text-white shadow-[0_2px_8px_rgba(245,158,11,0.3)]',
  silver: 'border-none bg-[linear-gradient(135deg,#e2e8f0,#94a3b8)] text-white',
  bronze: 'border-none bg-[linear-gradient(135deg,#fcd34d,#d97706)] text-white',
  user:   'border-[rgba(0,184,97,0.25)] bg-[rgba(0,184,97,0.1)] text-green dark:bg-[rgba(0,229,122,0.1)]',
}

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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Ranking" subtitle="Acompanhe seu progresso e inspire-se com a comunidade" emoji="📊" />

        <div className="flex flex-1 flex-row gap-5 overflow-hidden px-7 pb-6 pt-5">
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <div className="mb-3.5 flex flex-shrink-0 gap-1 border-b border-border">
              <button className={`relative -bottom-px cursor-pointer rounded-t-lg border-b-2 border-transparent bg-none px-4 py-2 font-sans text-[13px] font-semibold transition-[color,border-color] hover:text-text ${tab === 'diario' ? 'border-b-green text-green' : 'text-muted'}`}  onClick={() => setTab('diario')}>Ranking Diário</button>
              <button className={`relative -bottom-px cursor-pointer rounded-t-lg border-b-2 border-transparent bg-none px-4 py-2 font-sans text-[13px] font-semibold transition-[color,border-color] hover:text-text ${tab === 'semanal' ? 'border-b-green text-green' : 'text-muted'}`} onClick={() => setTab('semanal')}>Ranking Semanal</button>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden rounded-[18px] border border-border bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-5 pb-3.5 pt-4">
                <div>
                  <div className="font-display text-[15px] font-bold text-text">{tab === 'semanal' ? 'Top 10 — Esta Semana' : 'Top 10 — Hoje'}</div>
                  <div className="mt-0.5 text-[11px] text-muted">Usuários com melhor desempenho</div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-[3px]">
                {sorted.map((p, i) => {
                  const pos = i + 1
                  const posClass = p.isUser && pos > 3 ? 'user' : getPosClass(pos)
                  return (
                    <div key={p.name + i} className={`flex items-center gap-3 px-5 py-2.5 transition-colors animate-fade-up-sm hover:bg-surface2 ${p.isUser ? 'my-0.5 border-y border-[rgba(0,184,97,0.15)] bg-[rgba(0,184,97,0.06)] dark:border-[rgba(0,229,122,0.15)] dark:bg-[rgba(0,229,122,0.06)]' : ''}`} style={{ animationDelay: `${i * 0.04}s` }}>
                      <div className={`flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-[10px] text-[13px] font-bold ${posClass ? POS_BADGE[posClass] : 'border border-border bg-surface2 text-muted'}`}>{getPosContent(pos)}</div>
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: p.color }}>{p.initial}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-[7px] font-display text-[13px] font-bold text-text">
                          {p.name}
                          {p.isUser && <span className="rounded-full bg-green px-[7px] py-0.5 font-display text-[9px] font-bold text-white">Você</span>}
                        </div>
                        <div className="mt-px text-[11px] text-muted">Posição #{pos}</div>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-1.5 font-display text-[13px] font-bold text-text">
                        <span className="text-[14px] text-amber">🏆</span>
                        {p.pts.toLocaleString('pt-BR')} pts
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex w-[260px] flex-shrink-0 flex-col gap-3.5 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-[3px]">
            <div className="flex-shrink-0 overflow-hidden rounded-[18px] border border-border bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] px-[18px] py-4 text-white">
                <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] opacity-85">Sua Posição</div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-xl">🧑</div>
                  <div>
                    <div className="font-display text-[22px] font-bold leading-none">#{userPos}</div>
                    <div className="mt-0.5 text-xs opacity-90">Gustavo Castilho</div>
                  </div>
                </div>
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] opacity-85">
                  Seus pontos &nbsp;
                  <span className="font-display text-base font-bold">{userEntry?.pts.toLocaleString('pt-BR')} pts</span>
                </div>
              </div>
              <div className="px-[18px] py-4">
                <div className="mb-3 font-display text-xs font-semibold text-text">Estatísticas</div>
                <div className="mb-3">
                  <div className="mb-[5px] flex justify-between text-[11px] text-muted">
                    <span>Distância para #1</span>
                    <span className="font-bold text-text">{gapTop1.toLocaleString('pt-BR')} pts</span>
                  </div>
                  <div className="h-[5px] overflow-hidden rounded-full bg-surface3">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-green2),var(--color-green))]" style={{ width: pctTop1 + '%' }} />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-[5px] flex justify-between text-[11px] text-muted">
                    <span>Próxima posição</span>
                    <span className="font-bold text-text">{gapPrev > 0 ? gapPrev.toLocaleString('pt-BR') + ' pts' : '—'}</span>
                  </div>
                  <div className="h-[5px] overflow-hidden rounded-full bg-surface3">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#2e6fff,var(--color-blue))]" style={{ width: pctPrev + '%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 rounded-[18px] border border-[rgba(224,144,0,0.18)] bg-[rgba(224,144,0,0.06)] px-4 py-3.5 dark:border-[rgba(255,184,48,0.15)] dark:bg-[rgba(255,184,48,0.06)]">
              <div className="mb-1.5 font-display text-xs font-bold text-amber">💡 Lembre-se</div>
              <div className="text-[11px] leading-[1.6] text-muted">O ranking é apenas para motivação. Seu objetivo principal é sua saúde e bem-estar pessoal. Continue completando missões!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
