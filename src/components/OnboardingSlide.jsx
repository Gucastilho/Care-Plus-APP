import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const HERO_BG = {
  'hero-slide-1': 'bg-[linear-gradient(160deg,#44c08a_0%,#2aaa80_55%,#259e75_100%)]',
  'hero-slide-2': 'bg-[linear-gradient(160deg,#8ecb3a_0%,#5fbe3e_45%,#3db87a_100%)]',
  'hero-slide-3': 'bg-[linear-gradient(160deg,#5ecfa8_0%,#2aaa80_50%,#1d9e75_100%)]',
}

export default function OnboardingSlide({ step, heroClass, icon, title, body, prev, next }) {
  const navigate  = useNavigate()
  const screenRef = useRef(null)
  const TOTAL     = 4
  const isLast    = step === TOTAL - 1

  function go(path) {
    screenRef.current?.classList.add('animate-ob-slide-exit')
    setTimeout(() => navigate(path), 320)
  }

  return (
    <div ref={screenRef} className="flex h-screen flex-col overflow-hidden">
      <div className={`relative flex flex-[0_0_42vh] items-end justify-center overflow-visible animate-ob-hero ${HERO_BG[heroClass] || ''}`}>
        <div className="absolute bottom-[-56px] left-1/2 z-10 flex h-[120px] w-[120px] -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_32px_rgba(0,0,0,.15)] animate-ob-pop [&>svg]:h-[58px] [&>svg]:w-[58px]">{icon}</div>
      </div>

      <div className="flex-1 px-7 pt-20 animate-ob-fade-up [animation-delay:0.35s]">
        <h1 className="mb-[.65rem] font-display text-[1.5rem] font-bold leading-[1.3] text-ob-text">{title}</h1>
        <p className="text-[.95rem] font-normal leading-[1.65] text-ob-muted">{body}</p>
      </div>

      <div className="flex-[0_0_auto] bg-white px-5 pb-7 pt-3.5 animate-ob-fade-up [animation-delay:0.5s]">
        <div className="mb-3.5 flex items-center justify-between px-1">
          <div className="flex items-center gap-[7px]">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-[26px] rounded-[4px] bg-ob-green' : 'w-2 bg-[#d1d5db]'}`} />
            ))}
          </div>
          <span className="text-[.82rem] font-semibold text-ob-muted">{step + 1} de {TOTAL}</span>
        </div>

        <div className="flex items-center gap-[14px]">
          {prev && (
            <button className="flex flex-shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[50px] border-none bg-transparent px-2.5 py-4 font-sans text-base font-semibold text-ob-green transition-colors hover:bg-[rgba(42,170,128,.08)]" onClick={() => go(prev)}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M7 1.5L3 5L7 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar
            </button>
          )}
          <button className="flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[50px] border-none bg-[linear-gradient(135deg,var(--color-ob-green-light),var(--color-ob-green))] py-[18px] font-sans text-[1.05rem] font-bold text-white shadow-[0_6px_24px_rgba(42,170,128,.35)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(42,170,128,.45)] active:translate-y-0" onClick={() => go(next)}>
            <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/25">
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
