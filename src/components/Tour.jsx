import { useTour } from './tour-context'
import { Icon } from './icons'

export default function Tour() {
  const { active, step, total, current, next, prev, skip } = useTour()

  if (!active) return null

  const isLast = step === total - 1

  return (
    <>
      <div className="fixed inset-y-0 left-[230px] right-0 z-[40] bg-black/50 backdrop-blur-[1px]" />

      <div className="fixed left-[calc(50%+115px)] top-1/2 z-[50] w-[400px] max-w-[calc(100vw-280px)] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-border2 bg-surface p-7 shadow-[0_24px_60px_rgba(0,0,0,0.3)] animate-fade-up">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[rgba(0,184,97,0.1)] text-green"><Icon name={current.icon} className="h-6 w-6" /></div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-green">Tour · {step + 1} de {total}</div>
            <div className="font-display text-[18px] font-bold text-text">{current.title}</div>
          </div>
        </div>

        <div className="mb-5 text-[13px] leading-[1.6] text-muted">{current.desc}</div>

        <div className="mb-5 flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-6 bg-green' : 'w-1.5 bg-surface3'}`} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={skip} className="cursor-pointer rounded-[10px] border border-border2 bg-transparent px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:bg-surface2 hover:text-text">Pular</button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button onClick={prev} className="cursor-pointer rounded-[10px] border border-border2 bg-transparent px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:bg-surface2 hover:text-text">← Voltar</button>
            )}
            <button onClick={next} className="cursor-pointer rounded-[10px] border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] px-5 py-2 font-display text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(0,184,97,0.25)] transition hover:scale-[0.98] hover:opacity-90">{isLast ? 'Concluir' : 'Continuar →'}</button>
          </div>
        </div>
      </div>
    </>
  )
}
