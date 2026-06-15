import { useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Icon } from './icons'
import { useUserStats, recordDailyAccess } from '../userStats'

export default function Topbar({ title, subtitle }) {
  const { theme, toggle } = useTheme()
  const { points, streak } = useUserStats()

  useEffect(() => {
    recordDailyAccess()
  }, [])

  return (
    <div className="flex items-center gap-4 px-7 pt-5">
      <div className="flex-1 animate-slide-right">
        <div className="font-display text-[26px] font-bold leading-[1.1] text-text">{title}</div>
        <div className="mt-[3px] text-[13px] text-muted">{subtitle}</div>
      </div>

      <div className="flex min-w-[130px] items-center gap-2.5 rounded-[14px] border border-[rgba(224,144,0,0.2)] bg-surface px-[18px] py-2.5 shadow-[0_2px_12px_rgba(224,144,0,0.07)]">
        <Icon name="trophy" className="h-5 w-5 text-amber" />
        <div>
          <div className="font-display text-[15px] font-bold leading-[1.1] text-amber">{points.toLocaleString('pt-BR')} pts</div>
          <div className="mt-px text-[10px] text-muted">Seus pontos</div>
        </div>
      </div>

      <div className="flex min-w-[130px] items-center gap-2.5 rounded-[14px] border border-[rgba(0,184,97,0.2)] bg-surface px-[18px] py-2.5 shadow-[0_2px_12px_rgba(0,184,97,0.07)]">
        <Icon name="fire" className="h-5 w-5 text-green" />
        <div>
          <div className="font-display text-[15px] font-bold leading-[1.1] text-green">{streak} {streak === 1 ? 'dia' : 'dias'}</div>
          <div className="mt-px text-[10px] text-muted">Sequência</div>
        </div>
      </div>

      <div className="relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-border2 bg-surface text-muted shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10.2 21a2 2 0 0 0 3.6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <div className="absolute right-2 top-[7px] h-[7px] w-[7px] rounded-full border-[1.5px] border-bg2 bg-rose animate-pulse-dot" />
      </div>

      <button
        className="flex h-[38px] w-[38px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-border2 bg-surface text-muted shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.08]"
        onClick={toggle}
        aria-label="Alternar tema"
      >
        {theme === 'dark'
          ? <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
              <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M12 2.5V4M12 20v1.5M4.2 4.2l1.1 1.1M18.7 18.7l1.1 1.1M2.5 12H4M20 12h1.5M4.2 19.8l1.1-1.1M18.7 5.3l1.1-1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          : <svg viewBox="0 0 24 24" fill="none" width="17" height="17">
              <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        }
      </button>
    </div>
  )
}
