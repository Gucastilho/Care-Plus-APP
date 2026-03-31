import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/onboarding.css'

export default function Loading() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding/1'), 2800)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="loading-page-wrapper">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="splash-card">
        <div className="app-icon-wrap">
          <div className="app-icon">
            <svg className="heart" viewBox="0 0 52 48" fill="none">
              <path d="M26 44S4 30.5 4 15.5C4 9.1 9.1 4 15.5 4c3.8 0 7.2 1.9 9.4 4.8L26 10.2l1.1-1.4C29.3 5.9 32.7 4 36.5 4 42.9 4 48 9.1 48 15.5 48 30.5 26 44 26 44Z" fill="#2aaa7a"/>
            </svg>
          </div>
          <div className="sparkle">
            <svg viewBox="0 0 26 26" fill="none">
              <path d="M13 2 L14.5 10 L22 11.5 L14.5 13 L13 21 L11.5 13 L4 11.5 L11.5 10 Z" fill="#9fd630" stroke="#9fd630" strokeLinejoin="round"/>
              <circle cx="20" cy="5" r="2" fill="#9fd630" opacity=".7"/>
            </svg>
          </div>
        </div>
        <h1 className="app-name">Care Plus</h1>
        <p className="app-tagline">Transformando hábitos em conquistas. Aguarde, estamos preparando tudo para você!</p>
        <div className="loading-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}
