import { useTheme } from '../hooks/useTheme'

export default function Topbar({ title, subtitle, emoji }) {
  const { theme, toggle } = useTheme()

  return (
    <div className="flex items-center gap-4 px-7 pt-5">
      <div className="flex-1 animate-slide-right">
        <div className="flex items-center gap-2 font-display text-[26px] font-bold leading-[1.1] text-text">
          {title}
          <span className="text-[22px]">{emoji}</span>
        </div>
        <div className="mt-[3px] text-[13px] text-muted">{subtitle}</div>
      </div>

      <div className="flex min-w-[130px] items-center gap-2.5 rounded-[14px] border border-[rgba(224,144,0,0.2)] bg-surface px-[18px] py-2.5 shadow-[0_2px_12px_rgba(224,144,0,0.07)]">
        <div className="text-xl">🏆</div>
        <div>
          <div className="font-display text-[15px] font-bold leading-[1.1] text-amber">1.500 pts</div>
          <div className="mt-px text-[10px] text-muted">Seus pontos</div>
        </div>
      </div>

      <div className="flex min-w-[130px] items-center gap-2.5 rounded-[14px] border border-[rgba(0,184,97,0.2)] bg-surface px-[18px] py-2.5 shadow-[0_2px_12px_rgba(0,184,97,0.07)]">
        <div className="text-xl">🔥</div>
        <div>
          <div className="font-display text-[15px] font-bold leading-[1.1] text-green">7 dias</div>
          <div className="mt-px text-[10px] text-muted">Sequência</div>
        </div>
      </div>

      <div className="relative flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-border2 bg-surface text-base shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
        🔔
        <div className="absolute right-2 top-[7px] h-[7px] w-[7px] rounded-full border-[1.5px] border-bg2 bg-rose animate-pulse-dot" />
      </div>

      <button
        className="flex h-[38px] w-[38px] flex-shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-border2 bg-surface text-base shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-transform hover:scale-[1.08]"
        onClick={toggle}
        aria-label="Alternar tema"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
