import { useState } from 'react'
import { showToast } from './Toast'

const METAS_DISPONIVEIS = [
  { id: 'meta1', emoji: '🏃', titulo: 'Perda de Peso Saudável', desc: 'Perder peso de forma gradual e sustentável', prazo: '3 meses', categoria: 'Físico' },
  { id: 'meta2', emoji: '💪', titulo: 'Ganho de Massa Muscular', desc: 'Aumentar massa magra com treino e nutrição', prazo: '2 meses', categoria: 'Físico' },
  { id: 'meta3', emoji: '❤️', titulo: 'Saúde Cardiovascular', desc: 'Melhorar condicionamento e saúde do coração', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta4', emoji: '🍎', titulo: 'Alimentação Equilibrada', desc: 'Adotar hábitos alimentares mais saudáveis', prazo: '4 semanas', categoria: 'Nutrição' },
  { id: 'meta5', emoji: '😴', titulo: 'Melhora do Sono', desc: 'Estabelecer rotina de sono de qualidade', prazo: '4 semanas', categoria: 'Bem-estar' },
  { id: 'meta6', emoji: '🧘', titulo: 'Redução de Estresse', desc: 'Gerenciar estresse com técnicas de relaxamento', prazo: '2 meses', categoria: 'Mental' },
  { id: 'meta7', emoji: '💧', titulo: 'Hidratação Adequada', desc: 'Manter corpo hidratado diariamente', prazo: '2 semanas', categoria: 'Bem-estar' },
  { id: 'meta8', emoji: '🚶', titulo: 'Vida Ativa', desc: 'Aumentar atividade física no dia a dia', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta9', emoji: '🧠', titulo: 'Saúde Mental', desc: 'Cuidar da saúde emocional e psicológica', prazo: '3 meses', categoria: 'Mental' },
  { id: 'meta10', emoji: '🦴', titulo: 'Fortalecimento Ósseo', desc: 'Prevenir osteoporose e fortalecer ossos', prazo: '3 meses', categoria: 'Físico' },
  { id: 'meta11', emoji: '🫀', titulo: 'Controle de Pressão', desc: 'Manter pressão arterial em níveis saudáveis', prazo: '2 meses', categoria: 'Saúde' },
  { id: 'meta12', emoji: '🩸', titulo: 'Controle Glicêmico', desc: 'Manter glicose no sangue equilibrada', prazo: '3 meses', categoria: 'Saúde' },
  { id: 'meta13', emoji: '🧘‍♀️', titulo: 'Flexibilidade', desc: 'Melhorar flexibilidade e mobilidade', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta14', emoji: '🌿', titulo: 'Desintoxicação', desc: 'Eliminar toxinas e melhorar metabolismo', prazo: '4 semanas', categoria: 'Nutrição' },
  { id: 'meta15', emoji: '😊', titulo: 'Bem-estar Geral', desc: 'Aumentar qualidade de vida e felicidade', prazo: '3 meses', categoria: 'Bem-estar' },
  { id: 'meta16', emoji: '🏋️', titulo: 'Força Muscular', desc: 'Aumentar força e resistência muscular', prazo: '8 semanas', categoria: 'Físico' },
  { id: 'meta17', emoji: '🫁', titulo: 'Capacidade Respiratória', desc: 'Melhorar função pulmonar e respiração', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta18', emoji: '🧘‍♂️', titulo: 'Mindfulness', desc: 'Praticar atenção plena e meditação', prazo: '4 semanas', categoria: 'Mental' },
  { id: 'meta19', emoji: '🥗', titulo: 'Dieta Balanceada', desc: 'Equilibrar macronutrientes e micronutrientes', prazo: '2 meses', categoria: 'Nutrição' },
  { id: 'meta20', emoji: '⚡', titulo: 'Mais Energia', desc: 'Aumentar disposição e vitalidade', prazo: '4 semanas', categoria: 'Bem-estar' }
]

export default function MetasModal({ open, onClose, onAddMeta }) {
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todos')
  const [metasSelecionadas, setMetasSelecionadas] = useState([])

  const categorias = ['Todos', 'Físico', 'Mental', 'Nutrição', 'Saúde', 'Bem-estar']

  const metasFiltradas = categoriaFiltro === 'Todos'
    ? METAS_DISPONIVEIS
    : METAS_DISPONIVEIS.filter(m => m.categoria === categoriaFiltro)

  function handleToggleMeta(meta) {
    if (metasSelecionadas.find(m => m.id === meta.id)) {
      setMetasSelecionadas(metasSelecionadas.filter(m => m.id !== meta.id))
    } else {
      setMetasSelecionadas([...metasSelecionadas, meta])
    }
  }

  function handleConfirmar() {
    metasSelecionadas.forEach(meta => onAddMeta(meta))
    show(`${metasSelecionadas.length} meta${metasSelecionadas.length > 1 ? 's adicionadas' : ' adicionada'} com sucesso!`)
    setMetasSelecionadas([])
    onClose()
  }

  if (!open) return null

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-box metas-modal-box" onClick={e => e.stopPropagation()}>
        <div className="metas-modal-header">
          <div>
            <div className="metas-modal-title">Adicionar Metas</div>
            <div className="metas-modal-subtitle">Selecione as metas que deseja adicionar ao seu plano</div>
          </div>
          <button className="config-modal-close" onClick={onClose}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Filtros */}
        <div className="metas-filtros">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`metas-filtro-btn${categoriaFiltro === cat ? ' active' : ''}`}
              onClick={() => setCategoriaFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de metas */}
        <div className="metas-lista">
          {metasFiltradas.map((meta, i) => {
            const selecionada = metasSelecionadas.find(m => m.id === meta.id)
            return (
              <div
                key={meta.id}
                className={`meta-item${selecionada ? ' selected' : ''}`}
                onClick={() => handleToggleMeta(meta)}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="meta-item-checkbox">
                  {selecionada && <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>}
                </div>
                <div className="meta-item-emoji">{meta.emoji}</div>
                <div className="meta-item-body">
                  <div className="meta-item-titulo">{meta.titulo}</div>
                  <div className="meta-item-desc">{meta.desc}</div>
                  <div className="meta-item-footer">
                    <span className="meta-item-categoria">{meta.categoria}</span>
                    <span className="meta-item-prazo">⏱ {meta.prazo}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Ações */}
        <div className="metas-modal-actions">
          <button
            className="modal-btn-confirm"
            onClick={handleConfirmar}
            disabled={metasSelecionadas.length === 0}
            style={metasSelecionadas.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            ✓ Adicionar {metasSelecionadas.length > 0 ? `(${metasSelecionadas.length})` : ''}
          </button>
          <button className="modal-btn-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
