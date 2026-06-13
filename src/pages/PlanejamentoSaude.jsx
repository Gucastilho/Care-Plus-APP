import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const PERGUNTAS = [
  { id: 1, pergunta: 'Como você avalia sua saúde física atual?', opcoes: ['Excelente', 'Boa', 'Regular', 'Precisa melhorar'] },
  { id: 2, pergunta: 'Qual é seu principal objetivo de saúde?', opcoes: ['Perder peso', 'Ganhar massa muscular', 'Melhorar condicionamento', 'Manter saúde', 'Prevenir doenças'] },
  { id: 3, pergunta: 'Como está sua alimentação?', opcoes: ['Muito saudável', 'Equilibrada', 'Precisa melhorar', 'Irregular'] },
  { id: 4, pergunta: 'Quantas horas você dorme por noite?', opcoes: ['Menos de 5h', '5-6h', '7-8h', 'Mais de 8h'] },
  { id: 5, pergunta: 'Como está seu nível de estresse?', opcoes: ['Baixo', 'Moderado', 'Alto', 'Muito alto'] },
  { id: 6, pergunta: 'Você pratica atividade física regularmente?', opcoes: ['Sim, diariamente', 'Sim, 3-4x por semana', 'Raramente', 'Não pratico'] },
  { id: 7, pergunta: 'Tem alguma condição de saúde pré-existente?', opcoes: ['Não', 'Hipertensão', 'Diabetes', 'Problemas cardíacos', 'Outros'] }
]

function gerarPlano(respostas) {
  const plano = { consultas: [], missoes: [], metas: [] }
  const resp = respostas

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
  if (!plano.consultas.find(c => c.id === 'fisica2')) {
    plano.consultas.push({ id: 'fisica2', tipo: 'Check-up Médico Anual', especialidade: 'Clínica Geral' })
  }
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
  const [etapa, setEtapa] = useState('formulario')
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState({})
  const [planoGerado, setPlanoGerado] = useState(null)

  function handleResposta(resposta) {
    const novasRespostas = { ...respostas, [perguntaAtual]: resposta }
    setRespostas(novasRespostas)
    if (perguntaAtual < PERGUNTAS.length - 1) {
      setPerguntaAtual(perguntaAtual + 1)
    } else {
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
    setPlanoGerado(prev => ({ ...prev, [tipo]: prev[tipo].filter(item => item.id !== id) }))
  }

  function handleConfirmar() {
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
    localStorage.setItem('plano_saude', JSON.stringify(planoGerado))
    navigate('/dashboard')
  }

  if (etapa === 'resultado') {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar title="Seu Plano Personalizado" subtitle="Revise e ajuste seu planejamento de saúde" emoji="📋" />

          <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-7 pb-8 pt-5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-surface3 [&::-webkit-scrollbar]:w-1">
            <div className="flex items-center gap-4 rounded-[20px] border border-[rgba(0,184,97,0.2)] bg-[linear-gradient(135deg,rgba(0,184,97,0.08),rgba(0,184,97,0.04))] px-6 py-5 animate-fade-up dark:border-[rgba(0,229,122,0.2)] dark:bg-[linear-gradient(135deg,rgba(0,229,122,0.08),rgba(0,229,122,0.04))]">
              <div className="flex-shrink-0 text-[32px]">✨</div>
              <div>
                <div className="mb-1 font-display text-base font-bold text-green">Plano Gerado com Sucesso!</div>
                <div className="text-xs leading-[1.6] text-muted">
                  Baseado nas suas respostas, criamos um plano personalizado. Clique em qualquer item para removê-lo.
                </div>
              </div>
            </div>

            {planoGerado.consultas.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="mb-1 flex items-center justify-between animate-fade-in">
                  <div className="font-display text-base font-semibold text-text">Consultas Recomendadas</div>
                  <div className="text-xs text-green">{planoGerado.consultas.length} consultas</div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
                  {planoGerado.consultas.map((c, i) => (
                    <div key={c.id} className="group relative flex cursor-pointer items-center gap-3.5 rounded-[18px] border border-border bg-surface px-5 py-[18px] transition-all animate-fade-up hover:-translate-y-0.5 hover:border-rose hover:bg-[rgba(232,54,93,0.04)] hover:shadow-[0_8px_24px_rgba(232,54,93,0.12)]" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => handleRemoverItem('consultas', c.id)}>
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-[rgba(43,127,255,0.1)] text-[22px]">🩺</div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 font-display text-[14px] font-bold leading-[1.3] text-text">{c.tipo}</div>
                        <div className="text-[11px] leading-[1.5] text-muted">{c.especialidade}</div>
                      </div>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[rgba(232,54,93,0.2)] bg-[rgba(232,54,93,0.1)] text-xs text-rose opacity-0 transition-opacity group-hover:opacity-100">✕</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {planoGerado.missoes.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="mb-1 flex items-center justify-between animate-fade-in">
                  <div className="font-display text-base font-semibold text-text">Missões Sugeridas</div>
                  <div className="text-xs text-green">{planoGerado.missoes.length} missões</div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
                  {planoGerado.missoes.map((m, i) => (
                    <div key={m.id} className="group relative flex cursor-pointer items-center gap-3.5 rounded-[18px] border border-border bg-surface px-5 py-[18px] transition-all animate-fade-up hover:-translate-y-0.5 hover:border-rose hover:bg-[rgba(232,54,93,0.04)] hover:shadow-[0_8px_24px_rgba(232,54,93,0.12)]" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => handleRemoverItem('missoes', m.id)}>
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-[rgba(0,184,97,0.1)] text-[22px]">{m.emoji}</div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 font-display text-[14px] font-bold leading-[1.3] text-text">{m.titulo}</div>
                        <div className="text-[11px] leading-[1.5] text-muted">{m.desc}</div>
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-amber">🏆 {m.pts} pts</div>
                      </div>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[rgba(232,54,93,0.2)] bg-[rgba(232,54,93,0.1)] text-xs text-rose opacity-0 transition-opacity group-hover:opacity-100">✕</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {planoGerado.metas.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="mb-1 flex items-center justify-between animate-fade-in">
                  <div className="font-display text-base font-semibold text-text">Metas Definidas</div>
                  <div className="text-xs text-green">{planoGerado.metas.length} metas</div>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3.5">
                  {planoGerado.metas.map((m, i) => (
                    <div key={m.id} className="group relative flex cursor-pointer items-center gap-3.5 rounded-[18px] border border-border bg-surface px-5 py-[18px] transition-all animate-fade-up hover:-translate-y-0.5 hover:border-rose hover:bg-[rgba(232,54,93,0.04)] hover:shadow-[0_8px_24px_rgba(232,54,93,0.12)]" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => handleRemoverItem('metas', m.id)}>
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-[rgba(224,144,0,0.1)] text-[22px]">🎯</div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 font-display text-[14px] font-bold leading-[1.3] text-text">{m.titulo}</div>
                        <div className="text-[11px] leading-[1.5] text-muted">{m.desc}</div>
                        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-amber">⏱ {m.prazo}</div>
                      </div>
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-[rgba(232,54,93,0.2)] bg-[rgba(232,54,93,0.1)] text-xs text-rose opacity-0 transition-opacity group-hover:opacity-100">✕</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-3">
              <button className="flex-1 cursor-pointer rounded-[14px] border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] p-3.5 font-display text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(0,184,97,0.25)] transition hover:scale-[0.99] hover:opacity-90" onClick={handleConfirmar}>
                ✓ Confirmar Plano
              </button>
              <button className="cursor-pointer rounded-[14px] border border-border2 bg-none px-6 py-3.5 font-display text-[13px] font-semibold text-muted transition-all hover:bg-surface2 hover:text-text" onClick={() => { setEtapa('formulario'); setPerguntaAtual(0); setRespostas({}) }}>
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Planejamento de Saúde" subtitle="Responda algumas perguntas para criar seu plano" emoji="📝" />

        <div className="flex flex-1 flex-col items-center justify-center px-7 py-10">
          <div className="w-full max-w-[600px] rounded-3xl border border-border bg-surface p-10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] animate-fade-up">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-green">Pergunta {perguntaAtual + 1}</div>
            <div className="mb-7 font-display text-[22px] font-bold leading-[1.3] text-text">{pergunta.pergunta}</div>

            <div className="mb-6 flex flex-col gap-3">
              {pergunta.opcoes.map((opcao, i) => {
                const selecionada = respostas[perguntaAtual] === opcao
                return (
                  <button
                    key={i}
                    className={`group flex cursor-pointer items-center gap-3.5 rounded-[14px] border-2 bg-surface2 px-5 py-4 text-left text-[14px] font-medium text-text transition-all animate-fade-up-sm hover:translate-x-1 hover:border-green hover:bg-[rgba(0,184,97,0.04)] ${selecionada ? 'border-green bg-[rgba(0,184,97,0.08)]' : 'border-border'}`}
                    onClick={() => handleResposta(opcao)}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors group-hover:border-green ${selecionada ? 'border-green' : 'border-border2'}`}>
                      {selecionada && <div className="h-2.5 w-2.5 rounded-full bg-green animate-scale-in" />}
                    </div>
                    {opcao}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-start">
              <button className="cursor-pointer rounded-[10px] border border-border2 bg-none px-5 py-2.5 text-[13px] font-semibold text-muted transition-all hover:bg-surface2 hover:text-text" onClick={handleVoltar}>
                ← Voltar
              </button>
            </div>
          </div>

          <div className="mt-8 w-full max-w-[600px]">
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-surface3">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-green2),var(--color-green))] transition-[width]" style={{ width: `${progresso}%` }} />
            </div>
            <div className="text-center text-[11px] font-semibold text-muted">
              Pergunta {perguntaAtual + 1} de {PERGUNTAS.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
