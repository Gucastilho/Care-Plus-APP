import OnboardingSlide from '../components/OnboardingSlide'

export default function Loading3() {
  return (
    <OnboardingSlide
      step={2}
      heroClass="hero-slide-3"
      icon={
        <svg viewBox="0 0 58 58" fill="none">
          <path d="M29 5L9 13v16c0 12.15 8.55 23.52 20 26 11.45-2.48 20-13.85 20-26V13L29 5z"
            stroke="#2aaa80" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      }
      title="Seus Dados, Sua Privacidade"
      body="Seus dados de saúde são tratados com máxima segurança. Você controla o que compartilhar e pode ajustar suas preferências a qualquer momento."
      prev="/onboarding/2"
      next="/onboarding/4"
    />
  )
}
