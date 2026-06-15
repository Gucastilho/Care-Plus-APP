import { useState, useEffect } from 'react'
import { getCurrentUser, updateCurrentUser, registerDailyAccess } from './auth'

const STARTING_POINTS = 1500

const listeners = new Set()
function emit() {
  listeners.forEach(l => l())
}

export function getStats() {
  const user = getCurrentUser()
  return {
    points: user?.points ?? STARTING_POINTS,
    streak: user?.streak ?? 1,
  }
}

export function addPoints(delta) {
  const user = getCurrentUser()
  if (!user) return
  const current = user.points ?? STARTING_POINTS
  updateCurrentUser({ points: Math.max(0, current + delta) })
  emit()
}

export function recordDailyAccess() {
  registerDailyAccess()
  emit()
}

export function useUserStats() {
  const [stats, setStats] = useState(getStats)
  useEffect(() => {
    const update = () => setStats(getStats())
    listeners.add(update)
    update()
    return () => listeners.delete(update)
  }, [])
  return stats
}
