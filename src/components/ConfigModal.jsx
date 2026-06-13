import { useState, useRef } from 'react'

export default function ConfigModal({ open, onClose, profile, onSave }) {
  const [name, setName]   = useState(profile.name)
  const [age, setAge]     = useState(profile.age)
  const [photo, setPhoto] = useState(profile.photo)
  const fileRef = useRef()

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhoto(ev.target.result)
    reader.readAsDataURL(file)
  }

  function handleSave() {
    onSave({ name, age, photo })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/45 backdrop-blur-[4px] animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-[360px] rounded-[22px] border border-border2 bg-surface p-7 shadow-[0_24px_60px_rgba(0,0,0,0.2)]" onClick={e => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <span className="font-display text-base font-bold text-text">Configurações de Perfil</span>
          <button className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-border2 bg-surface2 text-muted transition-colors hover:bg-surface3 hover:text-text" onClick={onClose}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="mb-5 flex flex-col items-center gap-2.5">
          <div className="group relative flex h-[72px] w-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-green2 bg-[linear-gradient(135deg,#d4edda,#a8d5b5)] shadow-[0_0_12px_rgba(0,184,97,0.15)]" onClick={() => fileRef.current.click()}>
            {photo
              ? <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : <span style={{ fontSize: 28 }}>🧑</span>
            }
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path d="M2 11L5 8L7 10L10 6L14 11H2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
          <button className="cursor-pointer rounded-lg border border-border2 bg-transparent px-3.5 py-[5px] text-xs font-semibold text-muted transition-colors hover:bg-surface2 hover:text-text" onClick={() => fileRef.current.click()}>
            {photo ? 'Trocar foto' : 'Adicionar foto'}
          </button>
        </div>

        <div className="mb-3.5 flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Nome</label>
          <input
            className="rounded-[10px] border border-border2 bg-surface2 px-3.5 py-2.5 font-sans text-[13px] font-medium text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted2 focus:border-green focus:shadow-[0_0_0_3px_rgba(0,184,97,0.12)]"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </div>

        <div className="mb-3.5 flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">Idade</label>
          <input
            className="rounded-[10px] border border-border2 bg-surface2 px-3.5 py-2.5 font-sans text-[13px] font-medium text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted2 focus:border-green focus:shadow-[0_0_0_3px_rgba(0,184,97,0.12)]"
            type="number"
            min="1" max="120"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="Sua idade"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button className="w-full cursor-pointer rounded-xl border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] py-3 font-display text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(0,184,97,0.25)] transition hover:scale-[0.99] hover:opacity-90" onClick={handleSave}>Salvar alterações</button>
          <button className="w-full cursor-pointer rounded-xl border border-border2 bg-transparent py-[11px] font-display text-[13px] font-semibold text-muted transition-colors hover:bg-surface2" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
