import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const PERGUNTAS = [
  {
    id: 1,
    pergunta: 'Como você avalia sua saúde física atual?',
    opcoes: ['Excelente', 'Boa', 'Regular', 'Precisa melhorar']
  },
  {
    id: 2,
    pergunta: 'Qual é seu principal objetivo de saúde?',
    opcoes: ['Perder peso', 'Ganhar massa muscular', 'Melhorar condicionamento', 'Manter saúde', 'Prevenir doenças']
  },
  {
    id: 3,
    pergunta: 'Como está sua alimentação?',
    opcoes: ['Muito saudável', 'Equilibrada', 'Precisa melhorar', 'Irregular']
  },
  {
    id: 4,
    pergunta: 'Quantas horas você dorme por noite?',
    opcoes: ['Menos de 5h', '5-6h', '7-8h', 'Mais de 8h']
  },
  {
    id: 5,
    pergunta: 'Como está seu nível de estresse?',
    opcoes: ['Baixo', 'Moderado', 'Alto', 'Muito alto']
  },
  {
    id: 6,
    pergunta: 'Você pratica atividade física regularmente?',
    opcoes: ['Sim, diariamente', 'Sim, 3-4x por semana', 'Raramente', 'Não pratico']
  },
  {
    id: 7,
    pergunta: 'Tem alguma condição de saúde pré-existente?',
    opcoes: ['Não', 'Hipertensão', 'Diabetes', 'Problemas cardíacos', 'Outros']
  }
]

function gerarPlano(respostas) {
  const plano = {
    consultas: [],
    missoes: [],
    metas: []
  }

  // Lógica de geração baseada nas respostas
  const resp = respostas

  // Consultas baseadas nas respostas
  if (resp[1] === 'Perder peso' || resp[2] === 'Precisa melhorar') {
    plano.consultas.push({ id: 'nutri1', tipo: 'Nutrição Funcional & Longevidade', especialidade: 'Nutrição' })
  }
  
  if (resp[4] === 'Alto' || resp[4] === 'Muito alto') {
    plano.consultas.push({ id: 'mental1', tipo: 'Gestão do Estresse', especialidade: 'Psicologia' })
    plano.consultas.push({ id: 'mental2', tipo: 'Higiene do Sono', especialidade: 'Sono' })
  }

  if (resp[5] === 'Raramente' || resp[5] === 'Não pratico') {
    plano.consultas.push({ id: 'fisica1', tipo: 'Avaliação Cardiovascular', especialidade: 'Cardiologia' })
  }

  if (resp[6] !== 'Não') {
    plano.consultas.push({ id: 'fisica2', tipo: 'Check-up Médico Anual', especialidade: 'Clínica Geral' })
  }

  // Sempre incluir check-up geral
  if (!plano.consultas.find(c => c.id === 'fisica2')) {
    plano.consultas.push({ id: 'fisica2', tipo: 'Check-up Médico Anual', especialidade: 'Clínica Geral' })
  }

  // Missões baseadas nas respostas
  if (resp[5] === 'Raramente' || resp[5] === 'Não pratico') {
    plano.missoes.push({ id: 'm1', emoji: '🚶', titulo: 'Caminhada Diária', desc: 'Caminhe 5.000 passos por dia', pts: 50 })
    plano.missoes.push({ id: 'm2', emoji: '🏃', titulo: 'Atividade Semanal', desc: 'Pratique 150 minutos de atividade física por semana', pts: 150 })
  }

  if (resp[2] === 'Precisa melhorar' || resp[2] === 'Irregular') {
    plano.missoes.push({ id: 'm3', emoji: '🍎', titulo: 'Alimentação Saudável', desc: 'Registre 5 refeições saudáveis por semana', pts: 100 })
  }

  if (resp[3] === 'Menos de 5h' || resp[3] === '5-6h') {
    plano.missoes.push({ id: 'm4', emoji: '😴', titulo: 'Sono de Qualidade', desc: 'Durma 7-8 horas por noite durante 5 dias', pts: 80 })
  }

  plano.missoes.push({ id: 'm5', emoji: '💧', titulo: 'Hidratação', desc: 'Beba 2 litros de água por dia', pts: 30 })

  if (resp[4] === 'Alto' || resp[4] === 'Muito alto') {
    plano.missoes.push({ id: 'm6', emoji: '🧘', titulo: 'Meditação Diária', desc: 'Pratique 10 minutos de meditação por dia', pts: 40 })
  }

  // Metas baseadas nas respostas
  if (resp[1] === 'Perder peso') {
    plano.metas.push({ id: 'meta1', emoji: '🏋️', titulo: 'Perda de Peso Saudável', desc: 'Perder 5kg em 3 meses', prazo: '3 meses' })
  }

  if (resp[1] === 'Ganhar massa muscular') {
    plano.metas.push({ id: 'meta2', emoji: '💪', titulo: 'Ganho de Massa Muscular', desc: 'Ganhar 3kg de massa magra em 2 meses', prazo: '2 meses' })
  }

  if (resp[1] === 'Melhorar condicionamento') {
    plano.metas.push({ id: 'meta3', emoji: '❤️', titulo: 'Condicionamento Físico', desc: 'Correr 5km sem parar em 6 semanas', prazo: '6 semanas' })
  }

  if (resp[4] === 'Alto' || resp[4] === 'Muito alto') {
    plano.metas.push({ id: 'meta4', emoji: '🧘', titulo: 'Redução de Estresse', desc: 'Reduzir nível de estresse em 50% em 2 meses', prazo: '2 meses' })
  }

  if (resp[3] === 'Menos de 5h' || resp[3] === '5-6h') {
    plano.metas.push({ id: 'meta5', emoji: '😴', titulo: 'Melhora do Sono', desc: 'Dormir 7-8h por noite consistentemente', prazo: '4 semanas' })
  }

  return plano
}

export default function PlanejamentoSaude() {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState('formulario') // 'formulario' | 'resultado'
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [planoGerado, setPlanoGerado] = useState(null)

  function handleResposta(resposta) {
    const novasRespostas = { ...respostas, [perguntaAtual]: resposta }
    setRespostas(novasRespostas)

    if (perguntaAtual < PERGUNTAS.length - 1) {
      setPerguntaAtual(perguntaAtual + 1)
    } else {
      // Gerar plano
      const plano = gerarPlano(novasRespostas)
      setPlanoGerado(plano)
      setEtapa('resultado')
    }
  }

  function handleVoltar() {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1)
    } else {
      navigate('/dashboard')
    }
  }

  function handleRemoverItem(tipo, id) {
    setPlanoGerado(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter(item => item.id !== id)
    }))
  }

  function handleConfirmar() {
    // Salvar metas no localStorage
    if (planoGerado.metas.length > 0) {
      const metasExistentes = JSON.parse(localStorage.getItem('metas_usuario') || '[]')
      const novasMetas = planoGerado.metas.map(meta => ({
        ...meta,
        emoji: '🎯',
        id: `${meta.id}_${Date.now()}_${Math.random()}`,
        adicionadaEm: new Date().toISOString()
      }))
      const metasAtualizadas = [...metasExistentes, ...novasMetas]
      localStorage.setItem('metas_usuario', JSON.stringify(metasAtualizadas))
    }

    // Salvar plano completo
    localStorage.setItem('plano_saude', JSON.stringify(planoGerado))
    navigate('/dashboard')
  }

  if (etapa === 'resultado') {
    return (
      <div className="shell">
        <Sidebar />
        <div className="main">
          <Topbar title="Seu Plano Personalizado" subtitle="Revise e ajuste seu planejamento de saúde" emoji="📋" />

          <div className="plano-scroll">
            <div className="plano-intro">
              <div className="plano-intro-icon">✨</div>
              <div>
                <div className="plano-intro-title">Plano Gerado com Sucesso!</div>
                <div className="plano-intro-text">
                  Baseado nas suas respostas, criamos um plano personalizado. Clique em qualquer item para removê-lo.
                </div>
              </div>
            </div>

            {/* Consultas */}
            {planoGerado.consultas.length > 0 && (
              <div className="plano-section">
                <div className="section-header">
                  <div className="section-title">Consultas Recomendadas</div>
                  <div className="section-link">{planoGerado.consultas.length} consultas</div>
                </div>
                <div className="plano-grid">
                  {planoGerado.consultas.map((c, i) => (
                    <div
                      key={c.id}
                      className="plano-card plano-card-consulta"
                      style={{ animationDelay: `${i * 0.08}s` }}
                      onClick={() => handleRemoverItem('consultas', c.id)}
                    >
                      <div className="plano-card-icon">🩺</div>
                      <div className="plano-card-body">
                        <div className="plano-card-title">{c.tipo}</div>
                        <div className="plano-card-tag">{c.especialidade}</div>
                      </div>
                      <div className="plano-card-remove">✕</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missões */}
            {planoGerado.missoes.length > 0 && (
              <div className="plano-section">
                <div className="section-header">
                  <div className="section-title">Missões Sugeridas</div>
                  <div className="section-link">{planoGerado.missoes.length} missões</div>
                </div>
                <div className="plano-grid">
                  {planoGerado.missoes.map((m, i) => (
                    <div
                      key={m.id}
                      className="plano-card plano-card-missao"
                      style={{ animationDelay: `${i * 0.08}s` }}
                      onClick={() => handleRemoverItem('missoes', m.id)}
                    >
                      <div className="plano-card-icon">{m.emoji}</div>
                      <div className="plano-card-body">
                        <div className="plano-card-title">{m.titulo}</div>
                        <div className="plano-card-desc">{m.desc}</div>
                        <div className="plano-card-pts">🏆 {m.pts} pts</div>
                      </div>
                      <div className="plano-card-remove">✕</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Metas */}
            {planoGerado.metas.length > 0 && (
              <div className="plano-section">
                <div className="section-header">
                  <div className="section-title">Metas Definidas</div>
                  <div className="section-link">{planoGerado.metas.length} metas</div>
                </div>
                <div className="plano-grid">
                  {planoGerado.metas.map((m, i) => (
                    <div
                      key={m.id}
                      className="plano-card plano-card-meta"
                      style={{ animationDelay: `${i * 0.08}s` }}
                      onClick={() => handleRemoverItem('metas', m.id)}
                    >
                      <div className="plano-card-icon">🎯</div>
                      <div className="plano-card-body">
                        <div className="plano-card-title">{m.titulo}</div>
                        <div className="plano-card-desc">{m.desc}</div>
                        <div className="plano-card-prazo">⏱ {m.prazo}</div>
                      </div>
                      <div className="plano-card-remove">✕</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="plano-actions">
              <button className="plano-btn-confirmar" onClick={handleConfirmar}>
                ✓ Confirmar Plano
              </button>
              <button className="plano-btn-refazer" onClick={() => { setEtapa('formulario'); setPerguntaAtual(0); setRespostas({}) }}>
                ↻ Refazer Questionário
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const pergunta = PERGUNTAS[perguntaAtual]
  const progresso = ((perguntaAtual + 1) / PERGUNTAS.length) * 100

  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Topbar title="Planejamento de Saúde" subtitle="Responda algumas perguntas para criar seu plano" emoji="📝" />

        <div className="questionario-container">
          <div className="questionario-card">
            <div className="questionario-numero">Pergunta {perguntaAtual + 1}</div>
            <div className="questionario-pergunta">{pergunta.pergunta}</div>

            <div className="questionario-opcoes">
              {pergunta.opcoes.map((opcao, i) => (
                <button
                  key={i}
                  className={`questionario-opcao${respostas[perguntaAtual] === opcao ? ' selected' : ''}`}
                  onClick={() => handleResposta(opcao)}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="questionario-opcao-radio">
                    {respostas[perguntaAtual] === opcao && <div className="questionario-opcao-radio-dot" />}
                  </div>
                  {opcao}
                </button>
              ))}
            </div>

            <div className="questionario-nav">
              <button className="questionario-btn-voltar" onClick={handleVoltar}>
                ← Voltar
              </button>
            </div>
          </div>

          <div className="questionario-progress-wrap">
            <div className="questionario-progress-bar">
              <div className="questionario-progress-fill" style={{ width: `${progresso}%` }} />
            </div>
            <div className="questionario-progress-label">
              Pergunta {perguntaAtual + 1} de {PERGUNTAS.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
