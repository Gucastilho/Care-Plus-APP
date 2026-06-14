import { useState } from 'react'
import { markTourSeen } from '../auth'
import { TOUR_STEPS, TourContext } from './tour-context'

export function TourProvider({ children }) {
  const [step, setStep] = useState(-1)

  const active = step >= 0
  const total = TOUR_STEPS.length
  const current = active ? TOUR_STEPS[step] : null
  const target = current ? current.to : null

  const start = () => setStep(0)

  const finish = () => {
    markTourSeen()
    setStep(-1)
  }

  const next = () => {
    if (step + 1 >= total) finish()
    else setStep(step + 1)
  }

  const skip = () => finish()

  return (
    <TourContext.Provider value={{ active, step, total, current, target, start, next, skip }}>
      {children}
    </TourContext.Provider>
  )
}
