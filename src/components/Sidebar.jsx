import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ConfigModal from './ConfigModal'

const NAV = [
  { to: '/dashboard',   label: 'Início',      icon: <path d="M2 6L8 1.5L14 6V14H10V10H6V14H2V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/> },
  { to: '/missoes',     label: 'Missões',     icon: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
  { to: '/recompensas', label: 'Recompensas', icon: <><path d="M8 2L8 6M4 6H12V8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M2 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 12V14M10 12V14M4 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
  { to: '/conquistas',  label: 'Conquistas',  icon: <path d="M8 2L9.8 5.8L14 6.3L11 9.2L11.7 13.5L8 11.5L4.3 13.5L5 9.2L2 6.3L6.2 5.8L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/> },
  { to: '/ranking',     label: 'Ranking',     icon: <path d="M3 12L6 9M6 9L8 11L11 6M11 6L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> },
  { to: '/consultas',   label: 'Consultas',   icon: <><rect x="3" y="3" width="10" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 7H10M6 10H10M13 6H15C15.6 6 16 6.4 16 7V14C16 14.6 15.6 15 15 15H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
]

export default function Sidebar() {
  const [configOpen, setConfigOpen] = useState(false)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('careplus_profile')
    return saved ? JSON.parse(saved) : { name: 'Gustavo Castilho', age: '', photo: null }
  })

  function handleSaveProfile(data) {
    localStorage.setItem('careplus_profile', JSON.stringify(data))
    setProfile(data)
  }

  return (
    <aside className="sidebar">
      <ConfigModal
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
      <div className="profile">
        <div className="avatar-wrap">
          <div className="avatar">
            {profile.photo
              ? <img src={profile.photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : '🧑'
            }
          </div>
          <div className="avatar-lvl">LV 15</div>
        </div>
        <div className="profile-name">{profile.name}</div>
        <div className="profile-email">gustavo@email.com</div>
        <div className="xp-bar-wrap">
          <div className="xp-label"><span>XP 1.340</span><span>2.000</span></div>
          <div className="xp-track"><div className="xp-fill" /></div>
        </div>
      </div>

      <div className="nav-section-label">Menu</div>

      {NAV.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
        >
          <svg className="nav-icon" viewBox="0 0 16 16" fill="none">{icon}</svg>
          {label}
        </NavLink>
      ))}

      <div className="nav-spacer" />

      <div className="nav-section-label">Geral</div>
      <div className="nav-bottom">
        <button className="nav-item" onClick={() => setConfigOpen(true)} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
          <svg className="nav-icon" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.2 3.2L4.3 4.3M11.7 11.7L12.8 12.8M3.2 12.8L4.3 11.7M11.7 4.3L12.8 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Configurações
        </button>
        <a className="nav-item" href="#">
          <svg className="nav-icon" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 11V10M8 7.5C8 6 10 6 10 7.5C10 8.5 8 9 8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Ajuda
        </a>
        <a className="nav-item logout" href="#" style={{ color: 'var(--rose)' }}>
          <svg className="nav-icon" viewBox="0 0 16 16" fill="none">
            <path d="M6 3H3C2.4 3 2 3.4 2 4V12C2 12.6 2.4 13 3 13H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 5L13 8L10 11M6 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sair
        </a>
      </div>
    </aside>
  )
}
