import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'
import { rewardsData } from '../data'

export default function Recompensas() {
  const { toasts, show } = useToast()
  const [rewards, setRewards] = useState(rewardsData)
  const [userPts, setUserPts] = useState(1500)
  const [modal, setModal]     = useState(null)

  function openModal(r) { setModal(r) }
  function closeModal()  { setModal(null) }

  function confirmRedeem() {
    if (!modal) return
    setRewards(rs => rs.map(r => r.id === modal.id ? { ...r, redeemed: true } : r))
    setUserPts(p => p - modal.pts)
    show(`"${modal.name}" resgatado com sucesso! Verifique seu email.`)
    closeModal()
  }

  const redeemed = rewards.filter(r => r.redeemed).length

  return (
    <div className="shell recompensas-page">
      <Sidebar />
      <div className="main">
        <Topbar title="Recompensas" subtitle="Troque seus pontos por benefícios exclusivos" emoji="🎁" />

        <div className="content-row">
          <div className="info-banner">
            <div className="info-banner-icon">💡</div>
            <div>
              <div className="info-banner-title">Como funcionam os resgates</div>
              <div className="info-banner-text">Escolha uma recompensa e troque por seus pontos. Você receberá um voucher por email em até 24h.</div>
            </div>
          </div>

          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="section-title">Recompensas Disponíveis</div>
            <div className="section-link">{redeemed} resgatada{redeemed !== 1 ? 's' : ''}</div>
          </div>

          <div className="rewards-grid">
            {rewards.map(r => {
              const canAfford = userPts >= r.pts
              return (
                <div key={r.id} className={`reward-card${r.redeemed ? ' redeemed' : ''}`}>
                  <div className={`reward-img ${r.imgClass}`}>{r.emoji}</div>
                  <div className="reward-body">
                    <div className="reward-header">
                      <div className={`reward-name${r.redeemed ? ' struck' : ''}`}>{r.name}</div>
                      <div className={`reward-pts${r.redeemed ? ' struck' : ''}`}>🛒 {r.pts} pts</div>
                    </div>
                    <div className="reward-desc">{r.desc}</div>
                    {r.redeemed
                      ? <button className="btn-resgatado" disabled>✔ Resgatado</button>
                      : <button
                          className="btn-resgatar"
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

      <div className={`modal-overlay${modal ? ' open' : ''}`} onClick={e => e.target === e.currentTarget && closeModal()}>
        <div className="modal-box">
          <div className="modal-emoji">{modal?.emoji}</div>
          <div className="modal-title">Confirmar Resgate</div>
          <div className="modal-subtitle">Você está prestes a resgatar:</div>
          <div style={{ fontFamily: 'Outfit,sans-serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{modal?.name}</div>
          <div className="modal-pts-row">🛒 {modal?.pts} pts</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Saldo atual: <strong style={{ color: 'var(--text)' }}>{userPts.toLocaleString('pt-BR')} pts</strong> →{' '}
            Após resgate: <strong style={{ color: 'var(--green)' }}>{modal ? (userPts - modal.pts).toLocaleString('pt-BR') : 0} pts</strong>
          </div>
          <div className="modal-actions">
            <button className="modal-btn-confirm" onClick={confirmRedeem}>✓ Confirmar Resgate</button>
            <button className="modal-btn-cancel"  onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  )
}
