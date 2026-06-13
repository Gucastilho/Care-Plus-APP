import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import { earnedBadges, lockedBadges } from '../data'

const MEDAL_BG = {
  'medal-gold':   'bg-[linear-gradient(135deg,#fbbf24,#f59e0b)] shadow-[0_6px_20px_rgba(245,158,11,0.35)]',
  'medal-orange': 'bg-[linear-gradient(135deg,#fb923c,#f97316)] shadow-[0_6px_20px_rgba(249,115,22,0.35)]',
  'medal-green':  'bg-[linear-gradient(135deg,#34d399,#00b861)] shadow-[0_6px_20px_rgba(0,184,97,0.35)]',
  'medal-blue':   'bg-[linear-gradient(135deg,#60a5fa,#2b7fff)] shadow-[0_6px_20px_rgba(43,127,255,0.35)]',
  'medal-purple': 'bg-[linear-gradient(135deg,#a78bfa,#7c3aed)] shadow-[0_6px_20px_rgba(124,58,237,0.35)]',
  'medal-rose':   'bg-[linear-gradient(135deg,#fb7185,#e8365d)] shadow-[0_6px_20px_rgba(232,54,93,0.35)]',
}

const STAT_VALUE_COLOR = { amber: 'text-amber', blue: 'text-blue', green: 'text-green' }

export default function Conquistas() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Conquistas" subtitle="Celebre suas vitórias e acompanhe seu progresso" emoji="🏆" />

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-7 pb-7 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1">
          <div className="grid flex-shrink-0 grid-cols-3 gap-3.5">
            {[
              { icon: '🔥', label: 'Sequência Atual',      value: '7 dias consecutivos',  cls: 'amber' },
              { icon: '⚡', label: 'Melhor Sequência',     value: '14 dias consecutivos', cls: 'blue'  },
              { icon: '🎖️', label: 'Badges Conquistados', value: '6 / 12 badges',        cls: 'green' },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-3.5 rounded-[18px] border border-border bg-surface px-[18px] py-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] animate-fade-up" style={{ animationDelay: `${0.04 + i * 0.06}s` }}>
                <div className="flex-shrink-0 text-[28px]">{s.icon}</div>
                <div>
                  <div className="mb-[3px] text-[11px] font-medium text-muted">{s.label}</div>
                  <div className={`font-display text-[15px] font-bold leading-[1.2] ${STAT_VALUE_COLOR[s.cls]}`}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-display text-base font-semibold text-text">Badges Conquistados</div>
              <div className="text-xs text-green">6 conquistados</div>
            </div>
            <div className="flex gap-3.5 overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:h-1">
              {earnedBadges.map((b, i) => (
                <div key={b.id} className="relative flex min-w-[180px] max-w-[190px] flex-shrink-0 flex-col items-center rounded-[18px] border border-border bg-surface px-4 pb-4 pt-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] animate-fade-up hover:-translate-y-0.5 hover:border-border2 hover:shadow-[0_10px_28px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)]" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
                  <div className="absolute right-3 top-3 rounded-full border border-[rgba(224,144,0,0.18)] bg-[rgba(224,144,0,0.08)] px-2 py-0.5 font-display text-[10px] font-bold text-amber">🏆 {b.pts} pts</div>
                  <div className={`relative mb-3 flex h-20 w-20 items-center justify-center rounded-full text-[32px] before:absolute before:inset-[6px] before:rounded-full before:border-2 before:border-white/35 before:content-[''] ${MEDAL_BG[b.medalClass] || ''}`}>{b.emoji}</div>
                  <div className="mb-[5px] text-center font-display text-[13px] font-bold leading-[1.3] text-text">{b.name}</div>
                  <div className="mb-2 text-center text-[11px] leading-[1.5] text-muted">{b.desc}</div>
                  <div className="font-display text-[10px] font-bold text-green">Conquistado em {b.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-display text-base font-semibold text-text">Badges Bloqueados</div>
              <div className="text-xs text-green">6 restantes</div>
            </div>
            <div className="flex gap-3.5 overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:h-1">
              {lockedBadges.map((b, i) => (
                <div key={b.id} className="relative flex min-w-[180px] max-w-[190px] flex-shrink-0 flex-col items-center rounded-[18px] border border-border bg-surface px-4 pb-4 pt-5 opacity-55 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
                  <div className="absolute right-3 top-3 rounded-full border border-[rgba(224,144,0,0.18)] bg-[rgba(224,144,0,0.08)] px-2 py-0.5 font-display text-[10px] font-bold text-amber">🏆 {b.pts} pts</div>
                  <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-surface3">
                    <svg className="h-8 w-8 text-muted2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <div className="mb-[5px] text-center font-display text-[13px] font-bold leading-[1.3] text-muted">{b.name}</div>
                  <div className="mb-2 text-center text-[11px] leading-[1.5] text-muted">{b.desc}</div>
                  {b.progress > 0 && (
                    <div className="mt-1 flex w-full flex-col gap-1">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-surface3">
                        <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-green2),var(--color-green))]" style={{ width: b.progress + '%' }} />
                      </div>
                      <div className="text-right font-display text-[10px] font-bold text-muted2">{b.progress}% concluído</div>
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
