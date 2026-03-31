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

  // ripple
  function handleClick(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const span = document.createElement('span')
    span.className = 'ripple-el'
    span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
    card.appendChild(span)
    span.addEventListener('animationend', () => span.remove())
  }

  const nameColor = done ? 'var(--green)' : color

  return (
    <div
      ref={cardRef}
      className={`mission-card${done ? ' done' : ''}`}
      style={{ animation: `slideUp 0.5s cubic-bezier(.22,1,.36,1) ${0.1 + index * 0.12}s both` }}
      onClick={handleClick}
    >
      <div className="ring-wrap">
        <svg width="58" height="58" viewBox="0 0 58 58">
          <circle className="ring-bg" cx="29" cy="29" r="23" />
          <circle
            ref={ringRef}
            className="ring-fill"
            cx="29" cy="29" r="23"
            stroke={color}
            style={{ strokeDasharray: 144.51, strokeDashoffset: 144.51, transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }}
          />
        </svg>
        <div className="ring-icon">{emoji}</div>
      </div>

      <div className="mission-body">
        <div className="mission-top">
          <div className="mission-name" style={{ color: nameColor }}>{title}</div>
          <div className="mission-badge">🏆 {pts} pts</div>
        </div>
        <div className="mission-desc">{desc}</div>
        {done && <div className="done-badge">✔ Concluído</div>}
        <div className="mission-progress-wrap">
          <div className="progress-track">
            <div
              ref={barRef}
              className="progress-fill"
              style={{ width: 0, background: grad, transition: 'width 1s cubic-bezier(.22,1,.36,1)' }}
            />
          </div>
          <div className="pct-label" style={{ color }}>{progress}%</div>
        </div>
      </div>
    </div>
  )
}
