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
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-box config-modal-box" onClick={e => e.stopPropagation()}>
        <div className="config-modal-header">
          <span className="config-modal-title">Configurações de Perfil</span>
          <button className="config-modal-close" onClick={onClose}>
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div className="config-avatar-row">
          <div className="config-avatar" onClick={() => fileRef.current.click()}>
            {photo
              ? <img src={photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : <span style={{ fontSize: 28 }}>🧑</span>
            }
            <div className="config-avatar-overlay">
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path d="M2 11L5 8L7 10L10 6L14 11H2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhoto} />
          <button className="config-photo-btn" onClick={() => fileRef.current.click()}>
            {photo ? 'Trocar foto' : 'Adicionar foto'}
          </button>
        </div>

        {/* Fields */}
        <div className="config-field">
          <label className="config-label">Nome</label>
          <input
            className="config-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Seu nome"
          />
        </div>

        <div className="config-field">
          <label className="config-label">Idade</label>
          <input
            className="config-input"
            type="number"
            min="1" max="120"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="Sua idade"
          />
        </div>

        <div className="modal-actions" style={{ marginTop: 20 }}>
          <button className="modal-btn-confirm" onClick={handleSave}>Salvar alterações</button>
          <button className="modal-btn-cancel" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
