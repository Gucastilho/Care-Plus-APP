# Care Plus - Plataforma de Saúde Preventiva

---

## Visão Geral

Este projeto é uma aplicação web desenvolvida em React que transforma a gestão de saúde preventiva em uma experiência gamificada e engajadora para a empresa Care Plus. A plataforma permite que usuários acompanhem suas consultas médicas, completem missões diárias de saúde, acumulem pontos, desbloqueiem conquistas e compitam em rankings.

### Objetivos

- Incentivar hábitos saudáveis através de gamificação
- Facilitar o agendamento e acompanhamento de consultas preventivas
- Criar uma jornada personalizada de saúde para cada usuário
- Promover engajamento através de recompensas e conquistas

---

## Seções e Funcionalidades

### Dashboard
- Score de bem-estar em tempo real
- Visualização de missões diárias
- Consultas e exames agendados
- Metas de saúde personalizadas
- Estatísticas de progresso

### Missões
- Missões diárias de saúde
- Sistema de pontos e recompensas
- Progresso visual com barras circulares
- Expansão de detalhes ao clicar
- Adicionar/remover missões dinamicamente

### Consultas
- Jornadas de saúde personalizadas (Longevidade, Equilíbrio Mental, Performance Física)
- Perfis completos de médicos especialistas
- Agendamento de consultas
- Detalhes completos: data, horário, local, médico, plano
- Modal expansível com todas as informações
- Persistência de dados no localStorage

### Conquistas
- Badges desbloqueáveis
- Sistema de progressão
- Conquistas por categoria
- Estatísticas de conquistas

### Ranking
- Posição do usuário destacada
- Sistema de pontos
- Comparação com outros usuários

### Recompensas
- Loja de recompensas
- Resgate com pontos acumulados
- Descontos em serviços de saúde
- Histórico de resgates

### Planejamento de Saúde
- Questionário personalizado
- Geração automática de plano de saúde
- Recomendações de consultas
- Sugestões de missões e metas

---

## Setup Local do Projeto

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/care-plus-app.git
cd care-plus-app
```

2. **Instale as dependências**

```bash
npm install
```

3. **Execute o projeto**

```bash
npm run dev
```

4. **Acesse a aplicação**

Abra seu navegador e acesse: `http://localhost:5173`

---

## Estrutura de Diretórios do Projeto

```
care-plus-app/
│
├── src/                        # Pasta raíz da aplicação
│   │
│   ├── assets/                 # Recursos estáticos
│   │   ├── hero.png            # Imagem hero
│   │   ├── react.svg           # Logo React
│   │   └── vite.svg            # Logo Vite
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── ConfigModal.jsx     # Modal de configurações
│   │   ├── ConsultaModal.jsx   # Modal de detalhes da consulta
│   │   ├── MetasModal.jsx      # Modal de seleção de metas
│   │   ├── MissionCard.jsx     # Card de missão
│   │   ├── OnboardingSlide.jsx # Slide de onboarding
│   │   ├── Sidebar.jsx         # Barra lateral de navegação
│   │   ├── Toast.jsx           # Sistema de notificações
│   │   └── Topbar.jsx          # Barra superior
│   │
│   ├── data/                   # Dados estáticos
│   │   └── index.js            # Dados de missões, conquistas, etc.
│   │
│   ├── hooks/                  # Custom Hooks
│   │   └── useTheme.js         # Hook para tema claro/escuro
│   │
│   ├── pages/                  # Páginas da aplicação
│   │   ├── Conquistas.jsx      # Página de conquistas
│   │   ├── Consultas.jsx       # Página de consultas
│   │   ├── Dashboard.jsx       # Página inicial
│   │   ├── Loading.jsx         # Tela de carregamento
│   │   ├── Loading1.jsx        # Onboarding slide 1
│   │   ├── Loading2.jsx        # Onboarding slide 2
│   │   ├── Loading3.jsx        # Onboarding slide 3
│   │   ├── Loading4.jsx        # Onboarding slide 4
│   │   ├── Missoes.jsx         # Página de missões
│   │   ├── Nutricao.jsx        # Consultas de nutrição
│   │   ├── PlanejamentoSaude.jsx # Planejamento personalizado
│   │   ├── Ranking.jsx         # Página de ranking
│   │   ├── Recompensas.jsx     # Loja de recompensas
│   │   ├── SaudeFisica.jsx     # Consultas de saúde física
│   │   └── SaudeMental.jsx     # Consultas de saúde mental
│   │
│   ├── styles/                 # Arquivos de estilo
│   │   ├── app.css             # Estilos principais
│   │   ├── missoes.css         # Estilos de missões
│   │   └── onboarding.css      # Estilos de onboarding
│   │
│   ├── App.css                 # Estilos do App
│   ├── App.jsx                 # Componente principal
│   ├── index.css               # Estilos globais
│   └── main.jsx                # Ponto de entrada
│
├── .gitignore                  # Arquivos ignorados pelo Git
├── eslint.config.js            # Configuração do ESLint
├── index.html                  # HTML principal
├── package.json                # Dependências e scripts
├── README.md                   # Documentação
└── vite.config.js              # Configuração do Vite
```

## Persistência de Dados

A aplicação utiliza **localStorage** para persistir dados do usuário:

### Dados Armazenados

```javascript
// Consultas agendadas
localStorage.getItem('consultas_agendadas')

// Metas do usuário
localStorage.getItem('metas_usuario')

// Missões ativas
localStorage.getItem('missoes_ativas')

// Plano de saúde
localStorage.getItem('plano_saude')
```

### Estrutura de Dados

**Consulta:**
```javascript
{
  id: "consulta_1234567890",
  tipo: "Consulta de Cardiologista",
  data: "15 Jan 2025",
  horario: "14:30",
  medico: "Dr. Carlos Mendes",
  especialidade: "Cardiologista",
  local: "Clínica Care Plus",
  endereco: "Zona Sul - São Paulo",
  plano: "Care Plus Premium",
  motivo: "Consulta preventiva",
  observacoes: "Primeira consulta"
}
```

**Meta:**
```javascript
{
  id: "meta_1234567890",
  emoji: "🏋️",
  titulo: "Perda de Peso Saudável",
  desc: "Perder 5kg em 3 meses",
  prazo: "3 meses",
  adicionadaEm: "2025-01-15T10:30:00.000Z"
}
```

---

## Configurações de Preferências

A aplicação suporta **modo claro** e **modo escuro**.

### Alternar Tema

O botão de tema está localizado na **Sidebar**, no topo da navegação.


---

---

## Responsividade

A aplicação é otimizada para diferentes tamanhos de tela:

- 🖥️ **Desktop** (1920px+)
- 💻 **Laptop** (1366px - 1920px)

---

## Segurança

- Dados armazenados localmente no navegador
- Sem envio de dados para servidores externos
- Validação de formulários
- Sanitização de inputs

## Time Responsável

- Lucca Ghiraldi Urso - RM566739
- Gustavo Moretim Canzi - RM567683
- Gustavo Castilho Gonçalves - RM566970
- Eduarda da Silva Brito - RM567347
