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
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5">
      {toasts.map(t => {
        const bg = t.type === 'error' ? 'bg-rose' : t.type === 'success' ? 'bg-green2' : 'bg-text'
        return (
          <div
            key={t.id}
            className={`flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] animate-toast ${bg}`}
          >
            {t.msg}
          </div>
        )
      })}
    </div>
  )
}
