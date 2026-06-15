const USERS_KEY = 'careplus_users'
const SESSION_KEY = 'careplus_session'

const STARTING_POINTS = 1500

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function ymd(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function getUsers() {
  return read(USERS_KEY, [])
}

export function getSession() {
  return read(SESSION_KEY, null)
}

export function isAuthenticated() {
  return !!getSession()
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser() {
  const session = getSession()
  if (!session) return null
  return getUsers().find(u => u.login === session.login) || null
}

export function updateCurrentUser(patch) {
  const session = getSession()
  if (!session) return null
  let updated = null
  const users = getUsers().map(u => {
    if (u.login !== session.login) return u
    updated = { ...u, ...patch }
    return updated
  })
  saveUsers(users)
  return updated
}

export function register(login, senha) {
  const users = getUsers()
  if (users.some(u => u.login === login)) {
    return { ok: false, error: 'Já existe uma conta com esse CPF ou e-mail.' }
  }
  users.push({
    login,
    senha,
    seenTour: false,
    points: STARTING_POINTS,
    streak: 1,
    lastAccess: ymd(new Date()),
  })
  saveUsers(users)
  localStorage.setItem(SESSION_KEY, JSON.stringify({ login }))
  return { ok: true, firstAccess: true }
}

export function login(loginValue, senha) {
  const user = getUsers().find(u => u.login === loginValue)
  if (!user || user.senha !== senha) {
    return { ok: false, error: 'CPF/e-mail ou senha incorretos.' }
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({ login: loginValue }))
  return { ok: true, firstAccess: !user.seenTour }
}

export function markTourSeen() {
  updateCurrentUser({ seenTour: true })
}

// Updates the consecutive-days streak based on the last access date.
// Same day: no change. Previous day: +1. Any larger gap (or first time): reset to 1.
export function registerDailyAccess() {
  const user = getCurrentUser()
  if (!user) return
  const today = ymd(new Date())
  if (user.lastAccess === today) return
  const y = new Date()
  y.setDate(y.getDate() - 1)
  const yesterday = ymd(y)
  const streak = user.lastAccess === yesterday ? (user.streak || 0) + 1 : 1
  updateCurrentUser({ streak, lastAccess: today })
}
