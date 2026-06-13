import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'

const MISSOES_DISPONIVEIS = [
  { id: 1, emoji: '🚶', title: 'Caminhada Matinal', desc: 'Caminhe 5.000 passos hoje', detalhes: 'Caminhar regularmente melhora a saúde cardiovascular e ajuda a manter o peso ideal.', pts: 50, progress: 0, done: false, color: 'var(--color-green)', grad: 'linear-gradient(90deg,var(--color-green2),var(--color-green))', offset: 144.51 },
  { id: 2, emoji: '💧', title: 'Hidratação', desc: 'Beba 2 litros de água', detalhes: 'Manter-se hidratado é essencial para o bom funcionamento do organismo e melhora a disposição.', pts: 30, progress: 0, done: false, color: 'var(--color-teal)', grad: 'linear-gradient(90deg,#009e9a,var(--color-teal))', offset: 144.51 },
  { id: 3, emoji: '🧘', title: 'Alongamento', desc: 'Faça 10 minutos de alongamento', detalhes: 'Alongar-se diariamente previne lesões, melhora a postura e reduz tensões musculares.', pts: 40, progress: 0, done: false, color: 'var(--color-blue)', grad: 'linear-gradient(90deg,#2e6fff,var(--color-blue))', offset: 144.51 },
  { id: 7, emoji: '🍎', title: 'Alimentação Saudável', desc: 'Registre 3 refeições saudáveis', detalhes: 'Uma alimentação balanceada fornece energia e nutrientes essenciais para o dia.', pts: 60, progress: 0, done: false, color: 'var(--color-amber)', grad: 'linear-gradient(90deg,#c07800,var(--color-amber))', offset: 144.51 },
  { id: 8, emoji: '😴', title: 'Sono de Qualidade', desc: 'Durma 7-8 horas', detalhes: 'Um sono reparador é fundamental para a recuperação física e mental.', pts: 50, progress: 0, done: false, color: '#7c3aed', grad: 'linear-gradient(90deg,#7c3aed,#a78bfa)', offset: 144.51 },
  { id: 9, emoji: '📚', title: 'Leitura Diária', desc: 'Leia por 20 minutos', detalhes: 'A leitura estimula o cérebro, reduz o estresse e melhora a concentração.', pts: 35, progress: 0, done: false, color: '#6366f1', grad: 'linear-gradient(90deg,#4338ca,#6366f1)', offset: 144.51 },
  { id: 10, emoji: '🏋️', title: 'Treino de Força', desc: 'Faça 30 minutos de musculação', detalhes: 'Exercícios de força aumentam a massa muscular e aceleram o metabolismo.', pts: 80, progress: 0, done: false, color: '#ea580c', grad: 'linear-gradient(90deg,#ea580c,#fb923c)', offset: 144.51 },
]

export default function Missoes() {
  const { toasts, show } = useToast()
  const [missoesAtivas, setMissoesAtivas] = useState([])
  const [missoesDisponiveis, setMissoesDisponiveis] = useState(MISSOES_DISPONIVEIS)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    const salvas = localStorage.getItem('missoes_ativas')
    if (salvas) {
      const parsed = JSON.parse(salvas)
      setMissoesAtivas(parsed)
      setMissoesDisponiveis(MISSOES_DISPONIVEIS.filter(m => !parsed.find(p => p.id === m.id)))
    }
  }, [])

  function handleAdicionarMissao(missao) {
    const novaMissao = { ...missao, adicionadaEm: new Date().toISOString() }
    const novasMissoesAtivas = [...missoesAtivas, novaMissao]
    setMissoesAtivas(novasMissoesAtivas)
    setMissoesDisponiveis(missoesDisponiveis.filter(m => m.id !== missao.id))
    localStorage.setItem('missoes_ativas', JSON.stringify(novasMissoesAtivas))
    show('Missão adicionada com sucesso!')
    setExpandedId(null)
  }

  function handleRemoverMissao(missaoId) {
    const missao = missoesAtivas.find(m => m.id === missaoId)
    const novasMissoesAtivas = missoesAtivas.filter(m => m.id !== missaoId)
    setMissoesAtivas(novasMissoesAtivas)
    setMissoesDisponiveis([...missoesDisponiveis, missao].sort((a, b) => a.id - b.id))
    localStorage.setItem('missoes_ativas', JSON.stringify(novasMissoesAtivas))
    show('Missão removida.')
    setExpandedId(null)
  }

  function handleToggleExpand(missaoId) {
    setExpandedId(expandedId === missaoId ? null : missaoId)
  }

  const concluidas = missoesAtivas.filter(m => m.done).length

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Missões" subtitle="Acompanhe seu progresso diário e semanal" emoji="🎯" />

        <div className="flex flex-1 flex-col gap-8 overflow-y-auto px-7 pb-7 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1">
          <div className="flex flex-col gap-3.5">
            <div className="mb-1 flex items-center justify-between animate-fade-in">
              <div className="font-display text-base font-semibold text-text">Minhas Missões Diárias</div>
              <div className="text-xs text-green">{concluidas} / {missoesAtivas.length} concluídas</div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-3.5">
              {missoesAtivas.length === 0 ? (
                <div className="flex min-w-full flex-col items-center justify-center rounded-[18px] border-[1.5px] border-dashed border-border2 bg-surface px-5 py-[60px] text-center">
                  <div className="mb-3 text-[48px] opacity-30">🎯</div>
                  <div className="mb-1.5 font-display text-[15px] font-semibold text-text">Nenhuma missão ativa</div>
                  <div className="text-xs text-muted">Adicione missões da lista abaixo</div>
                </div>
              ) : (
                missoesAtivas.map((m, i) => (
                  <MissionCardExpanded
                    key={m.id}
                    mission={m}
                    index={i}
                    expanded={expandedId === m.id}
                    onToggle={() => handleToggleExpand(m.id)}
                    onRemove={() => handleRemoverMissao(m.id)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            <div className="mb-1 flex items-center justify-between animate-fade-in">
              <div className="font-display text-base font-semibold text-text">Missões Disponíveis</div>
              <div className="text-xs text-green">{missoesDisponiveis.length} missões</div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-3.5">
              {missoesDisponiveis.map((m, i) => (
                <MissionCardExpanded
                  key={m.id}
                  mission={m}
                  index={i}
                  expanded={expandedId === m.id}
                  onToggle={() => handleToggleExpand(m.id)}
                  onAdd={() => handleAdicionarMissao(m)}
                  isAvailable
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  )
}

function MissionCardExpanded({ mission, index, expanded, onToggle, onAdd, onRemove, isAvailable }) {
  const { emoji, title, desc, detalhes, pts, progress, done, color, grad, offset } = mission

  return (
    <div
      className={`overflow-hidden rounded-[18px] border bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all animate-fade-up hover:-translate-y-0.5 hover:border-border2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] ${done ? 'border-[rgba(0,184,97,0.25)] bg-[#f6fdf9] dark:bg-[rgba(0,229,122,0.04)]' : 'border-border'}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="relative flex items-center gap-3.5 px-5 py-[18px]">
        <div className="relative flex-shrink-0">
          <svg width="58" height="58" viewBox="0 0 58 58" className="-rotate-90">
            <circle className="fill-none stroke-surface3 [stroke-width:5]" cx="29" cy="29" r="23" />
            <circle
              className="fill-none [stroke-linecap:round] [stroke-width:5]"
              cx="29" cy="29" r="23"
              stroke={color}
              style={{ strokeDasharray: 144.51, strokeDashoffset: offset, transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-lg animate-float">{emoji}</div>
        </div>

        <div className="min-w-0 flex-1 cursor-pointer" onClick={onToggle}>
          <div className="mb-1 flex items-center justify-between">
            <div className="font-display text-[15px] font-semibold" style={{ color }}>{title}</div>
            <div className="flex items-center gap-1 rounded-lg border border-[rgba(224,144,0,0.18)] bg-[rgba(224,144,0,0.08)] px-2 py-[3px] font-display text-[11px] font-semibold text-amber">🏆 {pts} pts</div>
          </div>
          <div className="mb-2.5 text-xs text-muted">{desc}</div>
          {done && <div className="mt-1.5 inline-flex items-center gap-[5px] rounded-full border border-[rgba(0,184,97,0.2)] bg-[rgba(0,184,97,0.1)] px-2.5 py-[3px] font-display text-[10px] font-bold text-green animate-done-pop">✔ Concluído</div>}
          <div className="flex items-center gap-2.5">
            <div className="h-[5px] flex-1 overflow-hidden rounded-[3px] bg-surface3">
              <div
                className="h-full rounded-[3px]"
                style={{ width: `${progress}%`, background: grad, transition: 'width 1s cubic-bezier(.22,1,.36,1)' }}
              />
            </div>
            <div className="min-w-[32px] text-right font-display text-xs font-bold" style={{ color }}>{progress}%</div>
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col gap-1.5">
          {isAvailable ? (
            <button className="flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] px-3.5 py-2 font-display text-[11px] font-bold text-white shadow-[0_4px_14px_rgba(0,184,97,0.25)] transition hover:scale-[0.98] hover:opacity-90" onClick={onAdd}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Adicionar
            </button>
          ) : (
            <button className="flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] border border-[rgba(232,54,93,0.2)] bg-[rgba(232,54,93,0.1)] px-3.5 py-2 font-display text-[11px] font-bold text-rose transition hover:border-rose hover:bg-[rgba(232,54,93,0.15)]" onClick={onRemove}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Remover
            </button>
          )}
        </div>

        <div className="flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center text-muted transition-transform" onClick={onToggle} style={expanded ? { transform: 'rotate(180deg)' } : undefined}>
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-border bg-surface2 px-5 py-4 animate-expand">
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-muted">Detalhes da Missão</div>
            <div className="text-xs leading-[1.6] text-text">{detalhes}</div>
          </div>
        </div>
      )}
    </div>
  )
}
