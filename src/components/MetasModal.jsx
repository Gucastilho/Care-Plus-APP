import { useState } from 'react'
import { showToast } from './Toast'
import { Icon } from './icons'

const METAS_DISPONIVEIS = [
  { id: 'meta1', icon: 'run', titulo: 'Perda de Peso Saudável', desc: 'Perder peso de forma gradual e sustentável', prazo: '3 meses', categoria: 'Físico' },
  { id: 'meta2', icon: 'muscle', titulo: 'Ganho de Massa Muscular', desc: 'Aumentar massa magra com treino e nutrição', prazo: '2 meses', categoria: 'Físico' },
  { id: 'meta3', icon: 'heart', titulo: 'Saúde Cardiovascular', desc: 'Melhorar condicionamento e saúde do coração', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta4', icon: 'apple', titulo: 'Alimentação Equilibrada', desc: 'Adotar hábitos alimentares mais saudáveis', prazo: '4 semanas', categoria: 'Nutrição' },
  { id: 'meta5', icon: 'sleep', titulo: 'Melhora do Sono', desc: 'Estabelecer rotina de sono de qualidade', prazo: '4 semanas', categoria: 'Bem-estar' },
  { id: 'meta6', icon: 'meditation', titulo: 'Redução de Estresse', desc: 'Gerenciar estresse com técnicas de relaxamento', prazo: '2 meses', categoria: 'Mental' },
  { id: 'meta7', icon: 'water', titulo: 'Hidratação Adequada', desc: 'Manter corpo hidratado diariamente', prazo: '2 semanas', categoria: 'Bem-estar' },
  { id: 'meta8', icon: 'walk', titulo: 'Vida Ativa', desc: 'Aumentar atividade física no dia a dia', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta9', icon: 'brain', titulo: 'Saúde Mental', desc: 'Cuidar da saúde emocional e psicológica', prazo: '3 meses', categoria: 'Mental' },
  { id: 'meta10', icon: 'bone', titulo: 'Fortalecimento Ósseo', desc: 'Prevenir osteoporose e fortalecer ossos', prazo: '3 meses', categoria: 'Físico' },
  { id: 'meta11', icon: 'heart', titulo: 'Controle de Pressão', desc: 'Manter pressão arterial em níveis saudáveis', prazo: '2 meses', categoria: 'Saúde' },
  { id: 'meta12', icon: 'drop', titulo: 'Controle Glicêmico', desc: 'Manter glicose no sangue equilibrada', prazo: '3 meses', categoria: 'Saúde' },
  { id: 'meta13', icon: 'meditation', titulo: 'Flexibilidade', desc: 'Melhorar flexibilidade e mobilidade', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta14', icon: 'leaf', titulo: 'Desintoxicação', desc: 'Eliminar toxinas e melhorar metabolismo', prazo: '4 semanas', categoria: 'Nutrição' },
  { id: 'meta15', icon: 'smile', titulo: 'Bem-estar Geral', desc: 'Aumentar qualidade de vida e felicidade', prazo: '3 meses', categoria: 'Bem-estar' },
  { id: 'meta16', icon: 'dumbbell', titulo: 'Força Muscular', desc: 'Aumentar força e resistência muscular', prazo: '8 semanas', categoria: 'Físico' },
  { id: 'meta17', icon: 'lungs', titulo: 'Capacidade Respiratória', desc: 'Melhorar função pulmonar e respiração', prazo: '6 semanas', categoria: 'Físico' },
  { id: 'meta18', icon: 'meditation', titulo: 'Mindfulness', desc: 'Praticar atenção plena e meditação', prazo: '4 semanas', categoria: 'Mental' },
  { id: 'meta19', icon: 'salad', titulo: 'Dieta Balanceada', desc: 'Equilibrar macronutrientes e micronutrientes', prazo: '2 meses', categoria: 'Nutrição' },
  { id: 'meta20', icon: 'bolt', titulo: 'Mais Energia', desc: 'Aumentar disposição e vitalidade', prazo: '4 semanas', categoria: 'Bem-estar' }
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
    showToast(`${metasSelecionadas.length} meta${metasSelecionadas.length > 1 ? 's adicionadas' : ' adicionada'} com sucesso!`)
    setMetasSelecionadas([])
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/45 backdrop-blur-[4px] animate-fade-in" onClick={onClose}>
      <div className="flex max-h-[85vh] w-full max-w-[700px] flex-col rounded-[22px] border border-border2 bg-surface p-7 shadow-[0_24px_60px_rgba(0,0,0,0.2)]" onClick={e => e.stopPropagation()}>
        <div className="mb-5 flex flex-shrink-0 items-start justify-between">
          <div>
            <div className="mb-1 font-display text-[18px] font-bold text-text">Adicionar Metas</div>
            <div className="text-xs leading-[1.5] text-muted">Selecione as metas que deseja adicionar ao seu plano</div>
          </div>
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-border2 bg-surface2 text-muted transition-colors hover:bg-surface3 hover:text-text" onClick={onClose}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="mb-4 flex flex-shrink-0 flex-wrap gap-2">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition ${categoriaFiltro === cat ? 'border-green bg-green text-white' : 'border-border bg-surface2 text-muted hover:bg-surface3 hover:text-text'}`}
              onClick={() => setCategoriaFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-5 flex flex-1 flex-col gap-2.5 overflow-y-auto pr-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-[3px]">
          {metasFiltradas.map((meta, i) => {
            const selecionada = metasSelecionadas.find(m => m.id === meta.id)
            return (
              <div
                key={meta.id}
                className={`flex cursor-pointer items-center gap-3 rounded-[14px] border-2 bg-surface2 px-4 py-3.5 transition animate-fade-up-sm ${selecionada ? 'border-green bg-[rgba(0,184,97,0.08)]' : 'border-border hover:border-green hover:bg-[rgba(0,184,97,0.04)]'}`}
                onClick={() => handleToggleMeta(meta)}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border-2 text-white transition ${selecionada ? 'border-green bg-green' : 'border-border2'}`}>
                  {selecionada && <svg viewBox="0 0 12 12" fill="none" width="12" height="12">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>}
                </div>
                <div className="flex-shrink-0 text-muted"><Icon name={meta.icon} className="h-6 w-6" /></div>
                <div className="min-w-0 flex-1">
                  <div className="mb-[3px] font-display text-[13px] font-bold text-text">{meta.titulo}</div>
                  <div className="mb-1.5 text-[11px] leading-[1.5] text-muted">{meta.desc}</div>
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-full border border-[rgba(0,184,97,0.2)] bg-[rgba(0,184,97,0.1)] px-2 py-0.5 text-[10px] font-bold text-green">{meta.categoria}</span>
                    <span className="text-[10px] font-semibold text-muted">⏱ {meta.prazo}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-shrink-0 flex-col gap-2">
          <button
            className="w-full cursor-pointer rounded-xl border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] py-3 font-display text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(0,184,97,0.25)] transition hover:scale-[0.99] hover:opacity-90"
            onClick={handleConfirmar}
            disabled={metasSelecionadas.length === 0}
            style={metasSelecionadas.length === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          >
            ✓ Adicionar {metasSelecionadas.length > 0 ? `(${metasSelecionadas.length})` : ''}
          </button>
          <button className="w-full cursor-pointer rounded-xl border border-border2 bg-transparent py-[11px] font-display text-[13px] font-semibold text-muted transition-colors hover:bg-surface2" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
