import { Icon } from './icons'

export default function ConsultaModal({ consulta, onClose, onCancel }) {
  if (!consulta) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/45 backdrop-blur-[4px] animate-fade-in" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-[22px] border border-border2 bg-surface p-7 shadow-[0_24px_60px_rgba(0,0,0,0.2)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1" onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-blue),#60a5fa)] text-white shadow-[0_6px_20px_rgba(43,127,255,0.25)]"><Icon name="stethoscope" className="h-7 w-7" /></div>
          <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border2 bg-surface2 text-base text-muted transition-colors hover:bg-surface3 hover:text-text" onClick={onClose}>✕</button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="font-display text-[22px] font-bold leading-[1.2] text-text">{consulta.tipo}</div>
          <div className="-mt-4 text-[13px] text-muted">Detalhes da consulta agendada</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-surface2 px-4 py-3.5">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted"><Icon name="calendar" className="h-3.5 w-3.5" />Data e Horário</div>
              <div className="text-[14px] font-semibold leading-[1.4] text-text">{consulta.data} às {consulta.horario}</div>
            </div>

            <div className="rounded-xl border border-border bg-surface2 px-4 py-3.5">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted"><Icon name="doctor" className="h-3.5 w-3.5" />Médico</div>
              <div className="text-[14px] font-semibold leading-[1.4] text-text">{consulta.medico}</div>
              <div className="mt-1 text-xs text-muted">{consulta.especialidade}</div>
            </div>

            <div className="rounded-xl border border-border bg-surface2 px-4 py-3.5">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted"><Icon name="pin" className="h-3.5 w-3.5" />Local</div>
              <div className="text-[14px] font-semibold leading-[1.4] text-text">{consulta.local}</div>
              <div className="mt-1 text-xs text-muted">{consulta.endereco}</div>
            </div>

            <div className="rounded-xl border border-border bg-surface2 px-4 py-3.5">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted"><Icon name="card" className="h-3.5 w-3.5" />Plano Utilizado</div>
              <div className="text-[14px] font-semibold leading-[1.4] text-text">{consulta.plano}</div>
            </div>

            <div className="rounded-xl border border-border bg-surface2 px-4 py-3.5">
              <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted"><Icon name="clipboard" className="h-3.5 w-3.5" />Motivo da Consulta</div>
              <div className="text-[14px] font-semibold leading-[1.4] text-text">{consulta.motivo}</div>
            </div>

            {consulta.observacoes && (
              <div className="col-span-2 rounded-xl border border-border bg-surface2 px-4 py-3.5">
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-muted"><Icon name="note" className="h-3.5 w-3.5" />Observações</div>
                <div className="text-[14px] font-semibold leading-[1.4] text-text">{consulta.observacoes}</div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-[linear-gradient(135deg,var(--color-blue),#60a5fa)] px-5 py-3 font-display text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(43,127,255,0.25)] transition hover:scale-[0.99] hover:opacity-90">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M8 2V8L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Remarcar Consulta
            </button>
            <button
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[rgba(232,54,93,0.2)] bg-[rgba(232,54,93,0.1)] px-5 py-3 font-display text-[13px] font-bold text-rose transition hover:border-rose hover:bg-[rgba(232,54,93,0.15)]"
              onClick={() => {
                if (window.confirm('Tem certeza que deseja cancelar esta consulta?')) {
                  onCancel(consulta.id)
                }
              }}
            >
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Cancelar Consulta
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
