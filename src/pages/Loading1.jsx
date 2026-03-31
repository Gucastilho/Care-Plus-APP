import OnboardingSlide from '../components/OnboardingSlide'

export default function Loading1() {
  return (
    <OnboardingSlide
      step={0}
      heroClass="hero-slide-1"
      icon={
        <svg viewBox="0 0 60 54" fill="none">
          <path d="M30 50C30 50 5 35.5 5 18.5C5 11.1 11.1 5 18.5 5C22.6 5 26.3 6.9 28.8 9.9L30 11.4L31.2 9.9C33.7 6.9 37.4 5 41.5 5C48.9 5 55 11.1 55 18.5C55 35.5 30 50 30 50Z"
            stroke="#2aaa80" strokeWidth="4" strokeLinejoin="round" fill="none"/>
        </svg>
      }
      title="Bem-vindo ao Challenge Care Plus"
      body="Transforme sua saúde em uma jornada recompensadora. Complete missões diárias e semanais para ganhar pontos e conquistar benefícios exclusivos."
      prev={null}
      next="/onboarding/2"
    />
  )
}
