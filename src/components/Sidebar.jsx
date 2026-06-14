import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import ConfigModal from './ConfigModal'
import { useTour } from './tour-context'
import { logout, getSession } from '../auth'

const NAV = [
  { to: '/dashboard',   label: 'Início',      icon: <path d="M2 6L8 1.5L14 6V14H10V10H6V14H2V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/> },
  { to: '/missoes',     label: 'Missões',     icon: <><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
  { to: '/recompensas', label: 'Recompensas', icon: <><path d="M8 2L8 6M4 6H12V8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M2 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 12V14M10 12V14M4 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
  { to: '/conquistas',  label: 'Conquistas',  icon: <path d="M8 2L9.8 5.8L14 6.3L11 9.2L11.7 13.5L8 11.5L4.3 13.5L5 9.2L2 6.3L6.2 5.8L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/> },
  { to: '/ranking',     label: 'Ranking',     icon: <path d="M3 12L6 9M6 9L8 11L11 6M11 6L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> },
  { to: '/consultas',   label: 'Consultas',   icon: <><rect x="3" y="3" width="10" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 7H10M6 10H10M13 6H15C15.6 6 16 6.4 16 7V14C16 14.6 15.6 15 15 15H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></> },
]

const NAV_BASE = "relative flex items-center gap-2.5 px-5 py-[9px] text-[13px] font-medium no-underline cursor-pointer transition-colors hover:bg-black/[0.03] hover:text-text dark:hover:bg-white/[0.03]"
const NAV_ICON = "h-4 w-4 flex-shrink-0 opacity-60"
const NAV_HIGHLIGHT = "z-[50] rounded-lg bg-[rgba(0,184,97,0.1)] text-green ring-2 ring-green ring-offset-2 ring-offset-bg2"

export default function Sidebar() {
  const navigate = useNavigate()
  const { active: tourActive, target: tourTarget } = useTour()
  const [configOpen, setConfigOpen] = useState(false)
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('careplus_profile')
    return saved ? JSON.parse(saved) : { name: 'Gustavo Castilho', age: '', photo: null }
  })
  const session = getSession()

  function handleSaveProfile(data) {
    localStorage.setItem('careplus_profile', JSON.stringify(data))
    setProfile(data)
  }

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="relative z-[1] flex w-[230px] flex-shrink-0 flex-col border-r border-border bg-bg2 py-6 after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-[linear-gradient(180deg,transparent,rgba(0,184,97,0.2)_40%,rgba(0,184,97,0.08)_70%,transparent)] after:content-[''] dark:after:bg-[linear-gradient(180deg,transparent,rgba(0,229,122,0.3)_40%,rgba(0,229,122,0.1)_70%,transparent)]">
      <ConfigModal
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
      <div className="border-b border-border px-5 pb-6">
        <div className="relative mb-3 inline-block">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-green2 bg-[linear-gradient(135deg,#d4edda,#a8d5b5)] text-[22px] shadow-[0_0_12px_rgba(0,184,97,0.15)] dark:bg-[linear-gradient(135deg,#2d6a4f,#1b4332)] dark:shadow-[0_0_16px_rgba(0,229,122,0.25)]">
            {profile.photo
              ? <img src={profile.photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              : '🧑'
            }
          </div>
          <div className="absolute -bottom-1 -right-1.5 rounded-lg bg-green px-[5px] py-0.5 font-display text-[9px] font-bold tracking-[0.02em] text-white">LV 15</div>
        </div>
        <div className="text-[14px] font-semibold leading-[1.2] text-text">{profile.name}</div>
        <div className="mt-0.5 truncate text-[11px] text-muted">{session?.login || 'gustavo@email.com'}</div>
        <div className="mt-2.5">
          <div className="mb-[5px] flex justify-between text-[10px] text-muted"><span>XP 1.340</span><span>2.000</span></div>
          <div className="h-[5px] overflow-hidden rounded-[3px] bg-surface3"><div className="h-full w-[67%] rounded-[3px] bg-[linear-gradient(90deg,var(--color-green2),var(--color-green))]" /></div>
        </div>
      </div>

      <div className="px-5 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted2">Menu</div>

      {NAV.map(({ to, label, icon }) => {
        const highlighted = tourActive && tourTarget === to
        return (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `${NAV_BASE} ${highlighted ? NAV_HIGHLIGHT : isActive ? "text-green before:absolute before:inset-y-1 before:left-0 before:w-[3px] before:rounded-r-[2px] before:bg-green before:content-['']" : "text-muted"}`}
          >
            {({ isActive }) => (
              <>
                <svg className={`h-4 w-4 flex-shrink-0 ${isActive || highlighted ? 'opacity-100' : 'opacity-60'}`} viewBox="0 0 16 16" fill="none">{icon}</svg>
                {label}
              </>
            )}
          </NavLink>
        )
      })}

      <div className="flex-1" />

      <div className="px-5 pb-1.5 pt-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted2">Geral</div>
      <div className="border-t border-border pt-2">
        <button className={`${NAV_BASE} w-full border-none bg-transparent text-left text-muted`} onClick={() => setConfigOpen(true)}>
          <svg className={NAV_ICON} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.2 3.2L4.3 4.3M11.7 11.7L12.8 12.8M3.2 12.8L4.3 11.7M11.7 4.3L12.8 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Configurações
        </button>
        <a className={`${NAV_BASE} text-muted`} href="#">
          <svg className={NAV_ICON} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 11V10M8 7.5C8 6 10 6 10 7.5C10 8.5 8 9 8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Ajuda
        </a>
        <button className={`${NAV_BASE} w-full border-none bg-transparent text-left text-rose hover:bg-[rgba(232,54,93,0.05)] hover:text-rose`} onClick={handleLogout}>
          <svg className={NAV_ICON} viewBox="0 0 16 16" fill="none">
            <path d="M6 3H3C2.4 3 2 3.4 2 4V12C2 12.6 2.4 13 3 13H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 5L13 8L10 11M6 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sair
        </button>
      </div>
    </aside>
  )
}
