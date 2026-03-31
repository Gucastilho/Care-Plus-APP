import OnboardingSlide from '../components/OnboardingSlide'

export default function Loading2() {
  return (
    <OnboardingSlide
      step={1}
      heroClass="hero-slide-2"
      icon={
        <svg viewBox="0 0 58 56" fill="none">
          <path d="M14 6h30v20c0 8.284-6.716 15-15 15s-15-6.716-15-15V6z" stroke="#2aaa80" strokeWidth="3.2" strokeLinejoin="round" fill="none"/>
          <path d="M14 10H8a4 4 0 0 0 0 8h6" stroke="#2aaa80" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
          <path d="M44 10h6a4 4 0 0 1 0 8h-6" stroke="#2aaa80" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
          <line x1="29" y1="41" x2="29" y2="49" stroke="#2aaa80" strokeWidth="3.2" strokeLinecap="round"/>
          <path d="M19 49h20" stroke="#2aaa80" strokeWidth="3.2" strokeLinecap="round"/>
        </svg>
      }
      title="Gamificação Ética"
      body="Progresso sem pressão. Aqui você evolui no seu ritmo, sem rankings obrigatórios ou punições. Cada conquista é uma vitória pessoal."
      prev="/onboarding/1"
      next="/onboarding/3"
    />
  )
}
