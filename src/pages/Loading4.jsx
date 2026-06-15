import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const NAV_BTN_BACK = "flex flex-shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[50px] border-none bg-transparent px-2.5 py-4 font-sans text-base font-semibold text-ob-green transition-colors hover:bg-[rgba(42,170,128,.08)]"

export default function Loading4() {
  const navigate   = useNavigate()
  const screenRef  = useRef(null)
  const [notify, setNotify] = useState(true)
  const [toast, setToast]   = useState(false)

  function prevStep() {
    screenRef.current?.classList.add('animate-ob-slide-exit')
    setTimeout(() => navigate('/onboarding/3'), 320)
  }

  function handleStart() {
    setToast(true)
    setTimeout(() => {
      screenRef.current?.classList.add('animate-ob-slide-exit')
    }, 2200)
    setTimeout(() => navigate('/dashboard'), 2550)
  }

  return (
    <>
      <div className={`fixed bottom-[100px] left-1/2 z-[999] -translate-x-1/2 whitespace-nowrap rounded-full bg-text px-6 py-3 font-display text-[.9rem] font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,.15)] pointer-events-none transition-[opacity,transform] ${toast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Bem-vindo ao Care Plus!</div>

      <div ref={screenRef} className="flex h-screen flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-7 pb-3 pt-9 animate-ob-fade-up [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#d1d5db] [&::-webkit-scrollbar]:w-[3px]">
          <h1 className="mb-[.55rem] font-display text-[1.5rem] font-bold leading-[1.3] text-ob-text">Consentimento LGPD</h1>
          <p className="mb-7 text-[.93rem] leading-[1.6] text-ob-muted">Para oferecer a melhor experiência, precisamos da sua autorização para coletar e processar alguns dados.</p>

          <div className="mb-6 flex items-start gap-[18px] animate-ob-fade-up">
            <div className="flex-shrink-0 pt-0.5">
              <label className="relative block h-7 w-12 cursor-pointer">
                <input type="checkbox" defaultChecked disabled className="peer absolute h-0 w-0 opacity-0" />
                <div className="absolute inset-0 rounded-full bg-[#d1d5db] transition-colors peer-checked:bg-ob-green peer-disabled:opacity-85" />
                <div className="absolute left-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.2)] transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-[5px] flex flex-wrap items-center gap-[7px] font-display text-[.97rem] font-bold leading-[1.3] text-ob-text">Coleta de dados de saúde <span className="text-[.72rem] font-bold text-ob-green">(Obrigatório)</span></div>
              <div className="text-[.85rem] leading-[1.6] text-ob-muted">Permite acessar dados de atividade física, sono e outros indicadores de saúde para personalizar suas missões.</div>
            </div>
          </div>

          <div className="mb-6 flex items-start gap-[18px] animate-ob-fade-up" style={{ animationDelay: '.08s' }}>
            <div className="flex-shrink-0 pt-0.5">
              <label className="relative block h-7 w-12 cursor-pointer">
                <input type="checkbox" defaultChecked disabled className="peer absolute h-0 w-0 opacity-0" />
                <div className="absolute inset-0 rounded-full bg-[#d1d5db] transition-colors peer-checked:bg-ob-green peer-disabled:opacity-85" />
                <div className="absolute left-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.2)] transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-[5px] flex flex-wrap items-center gap-[7px] font-display text-[.97rem] font-bold leading-[1.3] text-ob-text">Análise e personalização <span className="text-[.72rem] font-bold text-ob-green">(Obrigatório)</span></div>
              <div className="text-[.85rem] leading-[1.6] text-ob-muted">Permite analisar seu progresso e oferecer recomendações personalizadas.</div>
            </div>
          </div>

          <div className="mb-6 flex items-start gap-[18px] animate-ob-fade-up" style={{ animationDelay: '.16s' }}>
            <div className="flex-shrink-0 pt-0.5">
              <label className="relative block h-7 w-12 cursor-pointer">
                <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} className="peer absolute h-0 w-0 opacity-0" />
                <div className="absolute inset-0 rounded-full bg-[#d1d5db] transition-colors peer-checked:bg-ob-green peer-disabled:opacity-85" />
                <div className="absolute left-[3px] top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,.2)] transition-transform peer-checked:translate-x-5" />
              </label>
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-[5px] flex flex-wrap items-center gap-[7px] font-display text-[.97rem] font-bold leading-[1.3] text-ob-text">Comunicações e notificações <span className="text-[.72rem] font-bold text-[#9ca3af]">(Opcional)</span></div>
              <div className="text-[.85rem] leading-[1.6] text-ob-muted">Receba lembretes de missões, conquistas e novidades do programa.</div>
            </div>
          </div>

          <div className="mt-1 flex items-start gap-3.5 rounded-2xl border border-[rgba(42,170,128,.2)] bg-[rgba(42,170,128,.07)] px-[18px] py-4 animate-ob-fade-up [animation-delay:.3s]">
            <svg className="mt-0.5 h-7 w-7 flex-shrink-0" viewBox="0 0 30 34" fill="none">
              <path d="M15 2L3 7v11c0 7.18 5.15 13.88 12 15.5C21.85 31.88 27 25.18 27 18V7L15 2z" stroke="#2aaa80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M10 17l3.5 3.5L21 12" stroke="#2aaa80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="mb-1 font-display text-[.9rem] font-bold text-ob-green">Seus dados estão protegidos</div>
              <div className="text-[.82rem] leading-[1.55] text-ob-green opacity-85">Você pode revisar e alterar suas preferências de privacidade a qualquer momento nas configurações.</div>
            </div>
          </div>
        </div>

        <div className="flex-[0_0_auto] border-t border-[#f3f4f6] bg-white px-5 pb-7 pt-3.5 animate-ob-fade-up [animation-delay:.15s]">
          <div className="mb-3.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-[7px]">
              {[0,1,2,3].map(i => <div key={i} className={`h-2 rounded-full transition-all ${i === 3 ? 'w-[26px] rounded-[4px] bg-ob-green' : 'w-2 bg-[#d1d5db]'}`} />)}
            </div>
            <span className="text-[.82rem] font-semibold text-ob-muted">4 de 4</span>
          </div>
          <div className="flex items-center gap-[14px]">
            <button className={NAV_BTN_BACK} onClick={prevStep}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1.5L3 5L7 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar
            </button>
            <button className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[50px] border-none bg-[linear-gradient(135deg,var(--color-ob-green-light),var(--color-ob-green))] py-[18px] font-sans text-[1.05rem] font-bold text-white shadow-[0_6px_24px_rgba(42,170,128,.35)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(42,170,128,.45)] active:translate-y-0" onClick={handleStart}>
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/70">
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
