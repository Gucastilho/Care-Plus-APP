import { useEffect, useRef } from 'react'

export default function MissionCard({ mission, index = 0 }) {
  const { emoji, title, desc, pts, progress, done, color, grad, offset } = mission
  const ringRef = useRef(null)
  const barRef  = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      if (ringRef.current) ringRef.current.style.strokeDashoffset = offset
      if (barRef.current)  barRef.current.style.width = progress + '%'
      obs.unobserve(card)
    }, { threshold: 0.25 })
    obs.observe(card)
    return () => obs.disconnect()
  }, [offset, progress])

  function handleClick(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const span = document.createElement('span')
    span.style.cssText = `position:absolute;border-radius:9999px;background:rgba(0,184,97,0.12);pointer-events:none;animation:ripple 0.55s ease-out forwards;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
    card.appendChild(span)
    span.addEventListener('animationend', () => span.remove())
  }

  const nameColor = done ? 'var(--color-green)' : color

  return (
    <div
      ref={cardRef}
      className={`relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-[18px] border bg-surface px-5 py-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[border-color,transform,box-shadow] hover:-translate-y-px hover:border-border2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${done ? 'border-[rgba(0,184,97,0.25)] bg-[#f6fdf9] dark:bg-[rgba(0,229,122,0.04)]' : 'border-border'}`}
      style={{ animation: `slideUp 0.5s cubic-bezier(.22,1,.36,1) ${0.1 + index * 0.12}s both` }}
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <svg width="58" height="58" viewBox="0 0 58 58" className="-rotate-90">
          <circle className="fill-none stroke-surface3 [stroke-width:5]" cx="29" cy="29" r="23" />
          <circle
            ref={ringRef}
            className="fill-none [stroke-linecap:round] [stroke-width:5]"
            cx="29" cy="29" r="23"
            stroke={color}
            style={{ strokeDasharray: 144.51, strokeDashoffset: 144.51, transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg animate-float">{emoji}</div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <div className="font-display text-[15px] font-semibold" style={{ color: nameColor }}>{title}</div>
          <div className="flex items-center gap-1 rounded-lg border border-[rgba(224,144,0,0.18)] bg-[rgba(224,144,0,0.08)] px-2 py-[3px] font-display text-[11px] font-semibold text-amber">🏆 {pts} pts</div>
        </div>
        <div className="mb-2.5 text-xs text-muted">{desc}</div>
        {done && <div className="mt-1.5 inline-flex items-center gap-[5px] rounded-full border border-[rgba(0,184,97,0.2)] bg-[rgba(0,184,97,0.1)] px-2.5 py-[3px] font-display text-[10px] font-bold text-green animate-done-pop">✔ Concluído</div>}
        <div className="flex items-center gap-2.5">
          <div className="h-[5px] flex-1 overflow-hidden rounded-[3px] bg-surface3">
            <div
              ref={barRef}
              className="h-full rounded-[3px]"
              style={{ width: 0, background: grad, transition: 'width 1s cubic-bezier(.22,1,.36,1)' }}
            />
          </div>
          <div className="min-w-[32px] text-right font-display text-xs font-bold" style={{ color }}>{progress}%</div>
        </div>
      </div>
    </div>
  )
}
