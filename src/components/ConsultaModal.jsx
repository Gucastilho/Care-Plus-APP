export default function ConsultaModal({ consulta, onClose, onCancel }) {
  if (!consulta) return null

  return (
    <div className={`modal-overlay${consulta ? ' open' : ''}`} onClick={onClose}>
      <div className="consulta-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="consulta-modal-header">
          <div className="consulta-modal-icon">🩺</div>
          <button className="consulta-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="consulta-modal-content">
          <div className="consulta-modal-title">{consulta.tipo}</div>
          <div className="consulta-modal-subtitle">Detalhes da consulta agendada</div>

          <div className="consulta-info-grid">
            <div className="consulta-info-item">
              <div className="consulta-info-label">📅 Data e Horário</div>
              <div className="consulta-info-value">{consulta.data} às {consulta.horario}</div>
            </div>

            <div className="consulta-info-item">
              <div className="consulta-info-label">👨⚕️ Médico</div>
              <div className="consulta-info-value">{consulta.medico}</div>
              <div className="consulta-info-sub">{consulta.especialidade}</div>
            </div>

            <div className="consulta-info-item">
              <div className="consulta-info-label">📍 Local</div>
              <div className="consulta-info-value">{consulta.local}</div>
              <div className="consulta-info-sub">{consulta.endereco}</div>
            </div>

            <div className="consulta-info-item">
              <div className="consulta-info-label">💳 Plano Utilizado</div>
              <div className="consulta-info-value">{consulta.plano}</div>
            </div>

            <div className="consulta-info-item">
              <div className="consulta-info-label">📋 Motivo da Consulta</div>
              <div className="consulta-info-value">{consulta.motivo}</div>
            </div>

            {consulta.observacoes && (
              <div className="consulta-info-item consulta-info-full">
                <div className="consulta-info-label">📝 Observações</div>
                <div className="consulta-info-value">{consulta.observacoes}</div>
              </div>
            )}
          </div>

          <div className="consulta-modal-actions">
            <button className="consulta-btn consulta-btn-remarcar">
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M8 2V8L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 8C14 11.3 11.3 14 8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Remarcar Consulta
            </button>
            <button 
              className="consulta-btn consulta-btn-cancelar" 
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
