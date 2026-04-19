import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar  from '../components/Topbar'
import ToastContainer, { useToast } from '../components/Toast'

const JOURNEYS = [
  {
    id: 'longevidade',
    title: 'Longevidade',
    desc: 'Protocolos de saúde para uma vida longa e com qualidade.',
    emoji: '🧬',
    color: 'journey-blue',
    consultas: [
      { nome: 'Check-up Médico Anual', especialidade: 'Clínica Geral' },
      { nome: 'Avaliação Cardiovascular', especialidade: 'Cardiologia' },
      { nome: 'Dermatologia Preventiva', especialidade: 'Dermatologia' }
    ],
    medicos: [
      { 
        nome: 'Dr. Carlos Mendes', 
        foto: '👨‍⚕️', 
        especialidade: 'Cardiologista',
        rm: 'CRM 45.892-SP',
        regiao: 'Zona Sul - São Paulo',
        descricao: 'Especialista em cardiologia preventiva com mais de 15 anos de experiência. Foco em longevidade cardiovascular e prevenção de doenças crônicas.',
        avaliacoes: [
          { paciente: 'Maria S.', nota: 5, comentario: 'Excelente profissional! Muito atencioso e explica tudo detalhadamente.' },
          { paciente: 'João P.', nota: 5, comentario: 'Salvou minha vida com o diagnóstico precoce. Recomendo muito!' }
        ],
        indicacoes: ['Hipertensão', 'Prevenção cardiovascular', 'Check-up executivo']
      },
      { 
        nome: 'Dra. Ana Silva', 
        foto: '👩‍⚕️', 
        especialidade: 'Geriatra',
        rm: 'CRM 38.124-SP',
        regiao: 'Zona Oeste - São Paulo',
        descricao: 'Médica geriatra especializada em envelhecimento saudável e qualidade de vida. Atendimento humanizado focado em longevidade ativa.',
        avaliacoes: [
          { paciente: 'Roberto M.', nota: 5, comentario: 'Profissional excepcional! Cuida da minha mãe com muito carinho.' },
          { paciente: 'Carla F.', nota: 5, comentario: 'Muito competente e atualizada. Melhor geriatra que já consultei.' }
        ],
        indicacoes: ['Envelhecimento saudável', 'Prevenção de quedas', 'Memória e cognição']
      }
    ],
    habitos: [
      { emoji: '🚶', titulo: 'Caminhada Diária', desc: '5.000 passos por dia' },
      { emoji: '💧', titulo: 'Hidratação', desc: '2 litros de água' }
    ]
  },
  {
    id: 'mental',
    title: 'Equilíbrio Mental',
    desc: 'Cuide da sua mente com práticas preventivas e terapêuticas.',
    emoji: '🧘',
    color: 'journey-green',
    consultas: [
      { nome: 'Gestão do Estresse', especialidade: 'Psicologia' },
      { nome: 'Higiene do Sono', especialidade: 'Sono' },
      { nome: 'Terapia de Manutenção', especialidade: 'Psicoterapia' }
    ],
    medicos: [
      { 
        nome: 'Dra. Beatriz Costa', 
        foto: '👩‍⚕️', 
        especialidade: 'Psicóloga',
        rm: 'CRP 06/89.234',
        regiao: 'Centro - São Paulo',
        descricao: 'Psicóloga clínica com abordagem cognitivo-comportamental. Especialista em ansiedade, estresse e desenvolvimento pessoal.',
        avaliacoes: [
          { paciente: 'Lucas T.', nota: 5, comentario: 'Transformou minha vida! Aprendi a lidar com a ansiedade de forma saudável.' },
          { paciente: 'Fernanda L.', nota: 5, comentario: 'Profissional incrível, muito empática e eficiente.' }
        ],
        indicacoes: ['Ansiedade', 'Estresse', 'Desenvolvimento pessoal']
      },
      { 
        nome: 'Dr. Rafael Santos', 
        foto: '👨‍⚕️', 
        especialidade: 'Psiquiatra',
        rm: 'CRM 52.678-SP',
        regiao: 'Zona Norte - São Paulo',
        descricao: 'Psiquiatra com foco em saúde mental preventiva e tratamento integrado. Especialista em transtornos de humor e sono.',
        avaliacoes: [
          { paciente: 'Paula R.', nota: 5, comentario: 'Médico excepcional! Finalmente consegui controlar minha depressão.' },
          { paciente: 'André C.', nota: 5, comentario: 'Muito profissional e atencioso. Recomendo fortemente!' }
        ],
        indicacoes: ['Depressão', 'Transtornos de ansiedade', 'Insônia']
      }
    ],
    habitos: [
      { emoji: '🧘', titulo: 'Meditação', desc: '10 minutos diários' },
      { emoji: '😴', titulo: 'Sono de Qualidade', desc: '7-8 horas por noite' }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Física',
    desc: 'Maximize seu potencial com avaliações e treinos orientados.',
    emoji: '⚡',
    color: 'journey-purple',
    consultas: [
      { nome: 'Nutrição Esportiva', especialidade: 'Nutrição' },
      { nome: 'Fisioterapia Preventiva', especialidade: 'Fisioterapia' },
      { nome: 'Avaliação Física', especialidade: 'Educação Física' }
    ],
    medicos: [
      { 
        nome: 'Dr. Pedro Alves', 
        foto: '👨‍⚕️', 
        especialidade: 'Fisiologista do Exercício',
        rm: 'CREF 012345-G/SP',
        regiao: 'Zona Sul - São Paulo',
        descricao: 'Fisiologista especializado em performance esportiva e condicionamento físico. Trabalha com atletas e pessoas que buscam alta performance.',
        avaliacoes: [
          { paciente: 'Marcos V.', nota: 5, comentario: 'Melhorei meu desempenho em 40%! Profissional top!' },
          { paciente: 'Juliana M.', nota: 5, comentario: 'Treinos personalizados e resultados incríveis. Super recomendo!' }
        ],
        indicacoes: ['Performance esportiva', 'Condicionamento físico', 'Reabilitação atlética']
      },
      { 
        nome: 'Dra. Juliana Rocha', 
        foto: '👩‍⚕️', 
        especialidade: 'Nutricionista Esportiva',
        rm: 'CRN-3 45.789',
        regiao: 'Zona Oeste - São Paulo',
        descricao: 'Nutricionista especializada em nutrição esportiva e emagrecimento saudável. Planos alimentares personalizados para alta performance.',
        avaliacoes: [
          { paciente: 'Ricardo B.', nota: 5, comentario: 'Perdi 15kg de forma saudável! Excelente profissional.' },
          { paciente: 'Camila S.', nota: 5, comentario: 'Melhor nutricionista! Aprendi a comer bem e ter energia.' }
        ],
        indicacoes: ['Nutrição esportiva', 'Emagrecimento', 'Ganho de massa muscular']
      }
    ],
    habitos: [
      { emoji: '🏃', titulo: 'Treino Semanal', desc: '150 min de atividade' },
      { emoji: '🍎', titulo: 'Nutrição Balanceada', desc: '5 refeições saudáveis' }
    ]
  },
]

const BRANCHES = [
  {
    id: 'fisica',
    title: 'Saúde Física & Check-up',
    desc: 'Avaliações gerais e exames de rotina.',
    color: 'branch-blue',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M6 16C6 16 8 10 12 10C16 10 14 22 18 22C22 22 20 16 26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="26" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 23V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'mental',
    title: 'Saúde Mental',
    desc: 'Terapias de manutenção e gestão do estresse.',
    color: 'branch-teal',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <circle cx="16" cy="13" r="7" stroke="currentColor" strokeWidth="2"/>
        <path d="M13 13C13 11.3 14.3 10 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 22C10 19.8 12.7 18 16 18C19.3 18 22 19.8 22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 25V27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'nutricao',
    title: 'Nutrição e Metabolismo',
    desc: 'Planejamento alimentar e fortalecimento da imunidade.',
    color: 'branch-orange',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M16 6C12.7 6 10 8.7 10 12C10 15.3 12.7 18 16 18C19.3 18 22 15.3 22 12C22 8.7 19.3 6 16 6Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 18V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 22H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 8C22 6 24 6 24 6C24 6 24 8 22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'fisio',
    title: 'Fisioterapia Preventiva',
    desc: 'Prevenção de dores, postura e ergonomia.',
    color: 'branch-purple',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <circle cx="16" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 14L16 18L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 18L11 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 18L21 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'sono',
    title: 'Higiene do Sono',
    desc: 'Otimização do descanso e tratamento de insônia.',
    color: 'branch-indigo',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M20 8C17.8 9.2 16 11.4 16 14C16 18.4 19.6 22 24 22C24.7 22 25.4 21.9 26 21.7C24.4 24.3 21.4 26 18 26C12.5 26 8 21.5 8 16C8 10.5 12.5 6 18 6C18.7 6 19.4 6.1 20 6.3V8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M24 10L25 8L26 10L28 11L26 12L25 14L24 12L22 11L24 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'financeira',
    title: 'Saúde Financeira',
    desc: 'Gestão do estresse financeiro e bem-estar econômico.',
    color: 'branch-emerald',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
        <path d="M6 22L12 16L16 20L22 12L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 8H26V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 26V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 24H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Consultas() {
  const [activeJourney, setActiveJourney] = useState(null)
  const navigate = useNavigate()
  const { toasts, show } = useToast()

  const journeyAtiva = JOURNEYS.find(j => j.id === activeJourney)

  function agendarConsulta(medico) {
    const novaConsulta = {
      id: `consulta_${Date.now()}`,
      tipo: `Consulta de ${medico.especialidade}`,
      data: '15 Jan 2025',
      horario: '14:30',
      medico: medico.nome,
      especialidade: medico.especialidade,
      local: 'Clínica Care Plus',
      endereco: `${medico.regiao}`,
      plano: 'Care Plus Premium',
      motivo: 'Consulta preventiva',
      observacoes: 'Primeira consulta'
    }

    console.log('Nova consulta criada:', novaConsulta)

    const consultasExistentes = JSON.parse(localStorage.getItem('consultas_agendadas') || '[]')
    console.log('Consultas existentes:', consultasExistentes)
    
    consultasExistentes.push(novaConsulta)
    localStorage.setItem('consultas_agendadas', JSON.stringify(consultasExistentes))
    
    console.log('Consultas salvas no localStorage:', localStorage.getItem('consultas_agendadas'))
    
    show(`Consulta agendada com ${medico.nome}!`)
    setTimeout(() => navigate('/dashboard'), 1500)
  }

  return (
    <div className="shell">
      <Sidebar />
      <div className="main">
        <Topbar title="Consultas Preventivas" subtitle="Agende sua próxima jornada de saúde" emoji="🩺" />

        <div className="consultas-scroll">

          {/* Jornadas */}
          <div className="consultas-section">
            <div className="section-header">
              <div className="section-title">Jornadas de Saúde</div>
              <span className="section-link">Ver todas →</span>
            </div>
            <div className="journeys-row">
              {JOURNEYS.map(j => (
                <div
                  key={j.id}
                  className={`journey-card ${j.color}${activeJourney === j.id ? ' journey-active' : ''}`}
                  onClick={() => setActiveJourney(activeJourney === j.id ? null : j.id)}
                >
                  <div className="journey-emoji">{j.emoji}</div>
                  <div className="journey-title">{j.title}</div>
                  <div className="journey-desc">{j.desc}</div>
                  <button className="journey-btn">{activeJourney === j.id ? 'Fechar' : 'Explorar'} →</button>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes da Jornada Ativa */}
          {journeyAtiva && (
            <div className="journey-details">
              <div className="journey-details-header">
                <div className="journey-details-icon">{journeyAtiva.emoji}</div>
                <div>
                  <div className="journey-details-title">{journeyAtiva.title}</div>
                  <div className="journey-details-subtitle">Plano completo para sua jornada</div>
                </div>
              </div>

              {/* Consultas Recomendadas */}
              <div className="journey-subsection">
                <div className="journey-subsection-title">📋 Consultas Recomendadas</div>
                <div className="journey-items-grid">
                  {journeyAtiva.consultas.map((c, i) => (
                    <div key={i} className="journey-item" style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="journey-item-icon">🩺</div>
                      <div className="journey-item-body">
                        <div className="journey-item-nome">{c.nome}</div>
                        <div className="journey-item-tag">{c.especialidade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Médicos Especialistas */}
              <div className="journey-subsection">
                <div className="journey-subsection-title">👨‍⚕️ Médicos Especialistas</div>
                <div className="journey-medicos">
                  {journeyAtiva.medicos.map((m, i) => (
                    <div key={i} className="journey-medico-expandable" style={{ animationDelay: `${i * 0.08}s` }}>
                      <div className="journey-medico-header">
                        <div className="journey-medico-foto">{m.foto}</div>
                        <div className="journey-medico-body">
                          <div className="journey-medico-nome">{m.nome}</div>
                          <div className="journey-medico-esp">{m.especialidade}</div>
                          <div className="journey-medico-rm">{m.rm}</div>
                          <div className="journey-medico-regiao">📍 {m.regiao}</div>
                        </div>
                        <button className="journey-medico-btn" onClick={(e) => {
                          e.stopPropagation()
                          agendarConsulta(m)
                        }}>Agendar</button>
                      </div>
                      
                      <div className="journey-medico-details">
                        <div className="medico-desc">{m.descricao}</div>
                        
                        <div className="medico-indicacoes">
                          <div className="medico-label">Indicações:</div>
                          <div className="medico-tags">
                            {m.indicacoes.map((ind, idx) => (
                              <span key={idx} className="medico-tag">{ind}</span>
                            ))}
                          </div>
                        </div>

                        <div className="medico-avaliacoes">
                          <div className="medico-label">Avaliações de Pacientes:</div>
                          {m.avaliacoes.map((av, idx) => (
                            <div key={idx} className="medico-avaliacao">
                              <div className="avaliacao-header">
                                <span className="avaliacao-paciente">{av.paciente}</span>
                                <span className="avaliacao-nota">{'⭐'.repeat(av.nota)}</span>
                              </div>
                              <div className="avaliacao-comentario">"{av.comentario}"</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hábitos e Desafios */}
              <div className="journey-subsection">
                <div className="journey-subsection-title">🎯 Hábitos e Desafios</div>
                <div className="journey-items-grid">
                  {journeyAtiva.habitos.map((h, i) => (
                    <div key={i} className="journey-item" style={{ animationDelay: `${i * 0.06}s` }}>
                      <div className="journey-item-icon">{h.emoji}</div>
                      <div className="journey-item-body">
                        <div className="journey-item-nome">{h.titulo}</div>
                        <div className="journey-item-desc">{h.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ramos Preventivos */}
          <div className="consultas-section">
            <div className="section-header">
              <div className="section-title">Explorar Todos os Ramos</div>
              <span className="section-link">6 especialidades</span>
            </div>
            <div className="branches-grid">
              {BRANCHES.map((b, i) => (
                <div key={b.id} className={`branch-card ${b.color}`} style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => {
                    if (b.id === 'fisica') navigate('/consultas/saude-fisica')
                    if (b.id === 'mental') navigate('/consultas/saude-mental')
                    if (b.id === 'nutricao') navigate('/consultas/nutricao')
                  }}
                >
                  <div className="branch-icon-wrap">{b.icon}</div>
                  <div className="branch-title">{b.title}</div>
                  <div className="branch-desc">{b.desc}</div>
                  <button className="branch-btn">Ver Horários</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <ToastContainer toasts={toasts} />
    </div>
  )
}
