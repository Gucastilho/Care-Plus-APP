import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'
import { rewardsData } from '../data'
import { Icon } from '../components/icons'
import { useUserStats, addPoints } from '../userStats'

const REWARD_BG = {
  'img-spa':      'bg-[linear-gradient(135deg,#fde68a,#fbbf24)] dark:bg-[linear-gradient(135deg,#78350f,#b45309)]',
  'img-farmacia': 'bg-[linear-gradient(135deg,#bfdbfe,#60a5fa)] dark:bg-[linear-gradient(135deg,#1e3a5f,#1d4ed8)]',
  'img-academia': 'bg-[linear-gradient(135deg,#d1fae5,#34d399)] dark:bg-[linear-gradient(135deg,#064e3b,#059669)]',
  'img-nutri':    'bg-[linear-gradient(135deg,#fce7f3,#f472b6)] dark:bg-[linear-gradient(135deg,#500724,#be185d)]',
  'img-mental':   'bg-[linear-gradient(135deg,#ede9fe,#a78bfa)] dark:bg-[linear-gradient(135deg,#2e1065,#7c3aed)]',
  'img-exame':    'bg-[linear-gradient(135deg,#cffafe,#22d3ee)] dark:bg-[linear-gradient(135deg,#164e63,#0891b2)]',
}

export default function Recompensas() {
  const { toasts, show } = useToast()
  const { points: userPts } = useUserStats()
  const [rewards, setRewards] = useState(rewardsData)
  const [modal, setModal]     = useState(null)

  function openModal(r) { setModal(r) }
  function closeModal()  { setModal(null) }

  function confirmRedeem() {
    if (!modal) return
    setRewards(rs => rs.map(r => r.id === modal.id ? { ...r, redeemed: true } : r))
    addPoints(-modal.pts)
    show(`"${modal.name}" resgatado com sucesso! Verifique seu email.`)
    closeModal()
  }

  const redeemed = rewards.filter(r => r.redeemed).length

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Recompensas" subtitle="Troque seus pontos por benefícios exclusivos" />

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-7 pb-7 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1">
          <div className="flex flex-shrink-0 items-start gap-3.5 rounded-[18px] border border-[rgba(0,184,97,0.18)] bg-[rgba(0,184,97,0.07)] px-5 py-4 dark:border-[rgba(0,229,122,0.15)] dark:bg-[rgba(0,229,122,0.06)]">
            <div>
              <div className="mb-1 font-display text-[13px] font-bold text-green">Como funcionam os resgates</div>
              <div className="text-xs leading-[1.6] text-muted">Escolha uma recompensa e troque por seus pontos. Você receberá um voucher por email em até 24h.</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-display text-base font-semibold text-text">Recompensas Disponíveis</div>
            <div className="text-xs text-green">{redeemed} resgatada{redeemed !== 1 ? 's' : ''}</div>
          </div>

          <div className="grid grid-cols-3 gap-3.5">
            {rewards.map((r, i) => {
              const canAfford = userPts >= r.pts
              return (
                <div key={r.id} className={`overflow-hidden rounded-[18px] border border-border bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,border-color] animate-fade-up hover:-translate-y-0.5 hover:border-border2 hover:shadow-[0_10px_28px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.35)] ${r.redeemed ? 'opacity-60 hover:translate-y-0 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]' : ''}`} style={{ animationDelay: `${0.04 + i * 0.06}s` }}>
                  <div className={`flex h-[120px] w-full flex-shrink-0 items-center justify-center ${REWARD_BG[r.imgClass] || ''}`}><Icon name={r.icon} className="h-12 w-12 text-black/40 dark:text-white/80" /></div>
                  <div className="px-4 pb-4 pt-3.5">
                    <div className="mb-1.5 flex items-start justify-between gap-2">
                      <div className={`font-display text-[14px] font-bold leading-[1.3] ${r.redeemed ? 'text-muted line-through' : 'text-text'}`}>{r.name}</div>
                      <div className={`flex flex-shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2 py-[3px] font-display text-[10px] font-bold ${r.redeemed ? 'border border-border bg-surface2 text-muted2' : 'border border-[rgba(224,144,0,0.18)] bg-[rgba(224,144,0,0.08)] text-amber'}`}>{r.pts} pts</div>
                    </div>
                    <div className="mb-3 text-[11px] leading-[1.5] text-muted">{r.desc}</div>
                    {r.redeemed
                      ? <button className="w-full cursor-not-allowed rounded-[10px] border border-border bg-surface2 py-[9px] font-display text-xs font-bold text-muted2" disabled>Resgatado</button>
                      : <button
                          className="w-full cursor-pointer rounded-[10px] border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] py-[9px] font-display text-xs font-bold text-white shadow-[0_4px_14px_rgba(0,184,97,0.2)] transition hover:scale-[0.99] hover:opacity-90"
                          disabled={!canAfford}
                          style={!canAfford ? { opacity: .45, cursor: 'not-allowed', boxShadow: 'none' } : {}}
                          onClick={() => openModal(r)}
                        >
                          {canAfford ? 'Resgatar' : 'Pontos insuficientes'}
                        </button>
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/45 backdrop-blur-[4px] transition-opacity ${modal ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} onClick={e => e.target === e.currentTarget && closeModal()}>
        <div className="w-full max-w-[380px] rounded-[22px] border border-border2 bg-surface p-7 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
          <div className="mb-3 text-green">{modal && <Icon name={modal.icon} className="h-10 w-10" />}</div>
          <div className="mb-1.5 font-display text-[18px] font-bold text-text">Confirmar Resgate</div>
          <div className="mb-4 text-xs leading-[1.5] text-muted">Você está prestes a resgatar:</div>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--color-text)', marginBottom: 12 }}>{modal?.name}</div>
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-[10px] border border-[rgba(224,144,0,0.18)] bg-[rgba(224,144,0,0.08)] px-3.5 py-1.5 font-display text-[14px] font-bold text-amber">{modal?.pts} pts</div>
          <div style={{ fontSize: 11, color: 'var(--color-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Saldo atual: <strong style={{ color: 'var(--color-text)' }}>{userPts.toLocaleString('pt-BR')} pts</strong> →{' '}
            Após resgate: <strong style={{ color: 'var(--color-green)' }}>{modal ? (userPts - modal.pts).toLocaleString('pt-BR') : 0} pts</strong>
          </div>
          <div className="flex flex-col gap-2">
            <button className="w-full cursor-pointer rounded-xl border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] py-3 font-display text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(0,184,97,0.25)] transition hover:scale-[0.99] hover:opacity-90" onClick={confirmRedeem}>✓ Confirmar Resgate</button>
            <button className="w-full cursor-pointer rounded-xl border border-border2 bg-transparent py-[11px] font-display text-[13px] font-semibold text-muted transition-colors hover:bg-surface2"  onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  )
}
