import { useState, useCallback } from 'react'

let _showToast = null

export function useToast() {
  const [toasts, setToasts] = useState([])

  const show = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3300)
  }, [])

  _showToast = show
  return { toasts, show }
}

export function showToast(msg, type = 'success') {
  _showToast?.(msg, type)
}

export default function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast-msg ${t.type}`}>{t.msg}</div>
      ))}
    </div>
  )
}
