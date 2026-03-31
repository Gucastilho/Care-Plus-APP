import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('cp-theme') || 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('cp-theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return { theme, toggle }
}
