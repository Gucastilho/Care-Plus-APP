const USERS_KEY = 'careplus_users'
const SESSION_KEY = 'careplus_session'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
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

export function register(login, senha) {
  const users = getUsers()
  if (users.some(u => u.login === login)) {
    return { ok: false, error: 'Já existe uma conta com esse CPF ou e-mail.' }
  }
  users.push({ login, senha, seenTour: false })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
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
  const session = getSession()
  if (!session) return
  const users = getUsers().map(u =>
    u.login === session.login ? { ...u, seenTour: true } : u
  )
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
