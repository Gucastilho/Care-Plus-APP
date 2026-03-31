import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/onboarding.css'

export default function OnboardingSlide({ step, heroClass, icon, title, body, prev, next }) {
  const navigate  = useNavigate()
  const screenRef = useRef(null)
  const TOTAL     = 4
  const isLast    = step === TOTAL - 1

  function go(path) {
    screenRef.current?.classList.add('slide-exit')
    setTimeout(() => navigate(path), 320)
  }

  return (
    <div ref={screenRef} className="screen">
      <div className={`hero ${heroClass}`}>
        <div className="icon-circle">{icon}</div>
      </div>

      <div className="content">
        <h1>{title}</h1>
        <p>{body}</p>
      </div>

      <div className="footer-bar">
        <div className="nav-row">
          <div className="dots">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} className={`dot${i === step ? ' active' : ''}`} />
            ))}
          </div>
          <span className="step-label">{step + 1} de {TOTAL}</span>
        </div>

        <div className="btn-row">
          {prev && (
            <button className="btn-voltar" onClick={() => go(prev)}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1.5L3 5L7 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar
            </button>
          )}
          <button className="btn-continuar" onClick={() => go(next)}>
            <span className="chevron">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                {isLast
                  ? <path d="M2 5H8M5 2l3 3-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  : <path d="M3 1.5L7 5L3 8.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                }
              </svg>
            </span>
            {isLast ? 'Começar' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  )
}
