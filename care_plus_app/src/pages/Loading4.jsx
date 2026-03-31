import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/onboarding.css'

export default function Loading4() {
  const navigate   = useNavigate()
  const screenRef  = useRef(null)
  const [notify, setNotify] = useState(true)
  const [toast, setToast]   = useState(false)

  function prevStep() {
    screenRef.current?.classList.add('slide-exit')
    setTimeout(() => navigate('/onboarding/3'), 320)
  }

  function handleStart() {
    setToast(true)
    setTimeout(() => {
      screenRef.current?.classList.add('slide-exit')
    }, 2200)
    setTimeout(() => navigate('/dashboard'), 2550)
  }

  return (
    <>
      <div className={`welcome-toast${toast ? ' show' : ''}`}>✅ Bem-vindo ao Care Plus!</div>

      <div ref={screenRef} className="screen screen-lgpd">
        <div className="content-lgpd">
          <h1>Consentimento LGPD</h1>
          <p>Para oferecer a melhor experiência, precisamos da sua autorização para coletar e processar alguns dados.</p>

          <div className="consent-item">
            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked disabled />
                <div className="toggle-track" />
                <div className="toggle-thumb" />
              </label>
            </div>
            <div className="consent-body">
              <div className="consent-title">Coleta de dados de saúde <span className="required-tag">(Obrigatório)</span></div>
              <div className="consent-desc">Permite acessar dados de atividade física, sono e outros indicadores de saúde para personalizar suas missões.</div>
            </div>
          </div>

          <div className="consent-item">
            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" defaultChecked disabled />
                <div className="toggle-track" />
                <div className="toggle-thumb" />
              </label>
            </div>
            <div className="consent-body">
              <div className="consent-title">Análise e personalização <span className="required-tag">(Obrigatório)</span></div>
              <div className="consent-desc">Permite analisar seu progresso e oferecer recomendações personalizadas.</div>
            </div>
          </div>

          <div className="consent-item">
            <div className="toggle-wrap">
              <label className="toggle">
                <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} />
                <div className="toggle-track" />
                <div className="toggle-thumb" />
              </label>
            </div>
            <div className="consent-body">
              <div className="consent-title">Comunicações e notificações <span className="optional-tag">(Opcional)</span></div>
              <div className="consent-desc">Receba lembretes de missões, conquistas e novidades do programa.</div>
            </div>
          </div>

          <div className="protection-banner">
            <svg viewBox="0 0 30 34" fill="none">
              <path d="M15 2L3 7v11c0 7.18 5.15 13.88 12 15.5C21.85 31.88 27 25.18 27 18V7L15 2z" stroke="#2aaa80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M10 17l3.5 3.5L21 12" stroke="#2aaa80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="prot-title">Seus dados estão protegidos</div>
              <div className="prot-desc">Você pode revisar e alterar suas preferências de privacidade a qualquer momento nas configurações.</div>
            </div>
          </div>
        </div>

        <div className="footer-lgpd">
          <div className="nav-row">
            <div className="dots">
              {[0,1,2,3].map(i => <div key={i} className={`dot${i === 3 ? ' active' : ''}`} />)}
            </div>
            <span className="step-label">4 de 4</span>
          </div>
          <div className="btn-row">
            <button className="btn-voltar" onClick={prevStep}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1.5L3 5L7 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar
            </button>
            <button className="btn-comecar" onClick={handleStart}>
              <span className="check-circle">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6.5l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Começar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
