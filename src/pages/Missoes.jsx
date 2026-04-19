import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'
import '../styles/missoes.css'

const MISSOES_DISPONIVEIS = [
  { id: 1, emoji: '🚶', title: 'Caminhada Matinal', desc: 'Caminhe 5.000 passos hoje', detalhes: 'Caminhar regularmente melhora a saúde cardiovascular e ajuda a manter o peso ideal.', pts: 50, progress: 0, done: false, color: 'var(--green)', grad: 'linear-gradient(90deg,var(--green2),var(--green))', offset: 144.51 },
  { id: 2, emoji: '💧', title: 'Hidratação', desc: 'Beba 2 litros de água', detalhes: 'Manter-se hidratado é essencial para o bom funcionamento do organismo e melhora a disposição.', pts: 30, progress: 0, done: false, color: 'var(--teal)', grad: 'linear-gradient(90deg,#009e9a,var(--teal))', offset: 144.51 },
  { id: 3, emoji: '🧘', title: 'Alongamento', desc: 'Faça 10 minutos de alongamento', detalhes: 'Alongar-se diariamente previne lesões, melhora a postura e reduz tensões musculares.', pts: 40, progress: 0, done: false, color: 'var(--blue)', grad: 'linear-gradient(90deg,#2e6fff,var(--blue))', offset: 144.51 },
  { id: 7, emoji: '🍎', title: 'Alimentação Saudável', desc: 'Registre 3 refeições saudáveis', detalhes: 'Uma alimentação balanceada fornece energia e nutrientes essenciais para o dia.', pts: 60, progress: 0, done: false, color: 'var(--amber)', grad: 'linear-gradient(90deg,#c07800,var(--amber))', offset: 144.51 },
  { id: 8, emoji: '😴', title: 'Sono de Qualidade', desc: 'Durma 7-8 horas', detalhes: 'Um sono reparador é fundamental para a recuperação física e mental.', pts: 50, progress: 0, done: false, color: 'var(--purple)', grad: 'linear-gradient(90deg,#7c3aed,#a78bfa)', offset: 144.51 },
  { id: 9, emoji: '📚', title: 'Leitura Diária', desc: 'Leia por 20 minutos', detalhes: 'A leitura estimula o cérebro, reduz o estresse e melhora a concentração.', pts: 35, progress: 0, done: false, color: 'var(--indigo)', grad: 'linear-gradient(90deg,#4338ca,#6366f1)', offset: 144.51 },
  { id: 10, emoji: '🏋️', title: 'Treino de Força', desc: 'Faça 30 minutos de musculação', detalhes: 'Exercícios de força aumentam a massa muscular e aceleram o metabolismo.', pts: 80, progress: 0, done: false, color: 'var(--orange)', grad: 'linear-gradient(90deg,#ea580c,#fb923c)', offset: 144.51 },
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
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Topbar title="Missões" subtitle="Acompanhe seu progresso diário e semanal" emoji="🎯" />

        <div className="missions-scroll">
          <div className="missions-section">
            <div className="section-header">
              <div className="section-title">Minhas Missões Diárias</div>
              <div className="section-link">{concluidas} / {missoesAtivas.length} concluídas</div>
            </div>
            <div className="missions-horizontal-list">
              {missoesAtivas.length === 0 ? (
                <div className="missoes-empty">
                  <div className="missoes-empty-icon">🎯</div>
                  <div className="missoes-empty-text">Nenhuma missão ativa</div>
                  <div className="missoes-empty-sub">Adicione missões da lista abaixo</div>
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

          <div className="missions-section">
            <div className="section-header">
              <div className="section-title">Missões Disponíveis</div>
              <div className="section-link">{missoesDisponiveis.length} missões</div>
            </div>
            <div className="missions-horizontal-list">
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
      className={`mission-card-expandable${expanded ? ' expanded' : ''}${done ? ' done' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="mission-card-main">
        <div className="ring-wrap">
          <svg width="58" height="58" viewBox="0 0 58 58">
            <circle className="ring-bg" cx="29" cy="29" r="23" />
            <circle
              className="ring-fill"
              cx="29" cy="29" r="23"
              stroke={color}
              style={{ strokeDasharray: 144.51, strokeDashoffset: offset, transition: 'stroke-dashoffset 1s cubic-bezier(.22,1,.36,1)' }}
            />
          </svg>
          <div className="ring-icon">{emoji}</div>
        </div>

        <div className="mission-body" onClick={onToggle} style={{ cursor: 'pointer', flex: 1 }}>
          <div className="mission-top">
            <div className="mission-name" style={{ color }}>{title}</div>
            <div className="mission-badge">🏆 {pts} pts</div>
          </div>
          <div className="mission-desc">{desc}</div>
          {done && <div className="done-badge">✔ Concluído</div>}
          <div className="mission-progress-wrap">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%`, background: grad, transition: 'width 1s cubic-bezier(.22,1,.36,1)' }}
              />
            </div>
            <div className="pct-label" style={{ color }}>{progress}%</div>
          </div>
        </div>

        <div className="mission-card-actions">
          {isAvailable ? (
            <button className="mission-btn mission-btn-add" onClick={onAdd}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Adicionar
            </button>
          ) : (
            <button className="mission-btn mission-btn-remove" onClick={onRemove}>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Remover
            </button>
          )}
        </div>

        <div className="mission-expand-icon" onClick={onToggle} style={{ cursor: 'pointer' }}>
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="mission-card-details">
          <div className="mission-details-content">
            <div className="mission-details-label">Detalhes da Missão</div>
            <div className="mission-details-text">{detalhes}</div>
          </div>
        </div>
      )}
    </div>
  )
}
