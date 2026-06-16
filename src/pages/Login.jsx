import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { login as doLogin, register as doRegister, isAuthenticated } from '../auth'
import { useTour } from '../components/tour-context'

const INPUT = "w-full rounded-[12px] border border-border2 bg-surface2 px-4 py-3 text-[14px] text-text outline-none transition-[border-color,box-shadow] placeholder:text-muted2 focus:border-green focus:shadow-[0_0_0_3px_rgba(0,184,97,0.12)]"
const LABEL = "mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.05em] text-muted"

function validarIdentificador(valor) {
  const v = valor.trim()
  if (v.includes('@')) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  return v.replace(/\D/g, '').length === 11
}

export default function Login() {
  const navigate = useNavigate()
  const { start } = useTour()
  const [nome, setNome] = useState('')
  const [identificador, setIdentificador] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  if (isAuthenticated()) return <Navigate to="/dashboard" replace />

  function autenticar(modo) {
    setErro('')
    if (modo === 'register' && !nome.trim()) {
      setErro('Informe seu nome para se cadastrar.')
      return
    }
    if (!identificador.trim() || !senha.trim()) {
      setErro('Preencha o CPF/e-mail e a senha.')
      return
    }
    if (!validarIdentificador(identificador)) {
      setErro('Informe um CPF (11 dígitos) ou e-mail válido.')
      return
    }
    const resultado = modo === 'login'
      ? doLogin(identificador.trim(), senha)
      : doRegister(identificador.trim(), senha, nome.trim())

    if (!resultado.ok) {
      setErro(resultado.error)
      return
    }
    navigate('/dashboard')
    if (resultado.firstAccess) start()
  }

  return (
    <div className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden bg-bg px-4">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,184,97,0.18),transparent_70%)] blur-2xl" />

      <form
        onSubmit={(e) => { e.preventDefault(); autenticar('login') }}
        className="relative z-10 w-full max-w-[400px] rounded-[24px] border border-border bg-surface p-8 shadow-[0_24px_60px_rgba(0,0,0,0.12)] animate-fade-up"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] shadow-[0_8px_24px_rgba(0,184,97,0.3)]">
            <svg className="h-8 w-8" viewBox="0 0 52 48" fill="none">
              <path d="M26 44S4 30.5 4 15.5C4 9.1 9.1 4 15.5 4c3.8 0 7.2 1.9 9.4 4.8L26 10.2l1.1-1.4C29.3 5.9 32.7 4 36.5 4 42.9 4 48 9.1 48 15.5 48 30.5 26 44 26 44Z" fill="#fff"/>
            </svg>
          </div>
          <div className="font-display text-[24px] font-bold text-text">Care Plus</div>
          <div className="mt-1 text-[13px] text-muted">Entre para continuar sua jornada de bem-estar</div>
        </div>

        <div className="mb-4">
          <label className={LABEL} htmlFor="nome">Nome <span className="font-normal lowercase tracking-normal text-muted2">(para cadastro)</span></label>
          <input
            id="nome"
            className={INPUT}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            autoComplete="name"
          />
        </div>

        <div className="mb-4">
          <label className={LABEL} htmlFor="identificador">CPF ou e-mail</label>
          <input
            id="identificador"
            className={INPUT}
            value={identificador}
            onChange={(e) => setIdentificador(e.target.value)}
            placeholder="000.000.000-00 ou voce@email.com"
            autoComplete="username"
          />
        </div>

        <div className="mb-2">
          <label className={LABEL} htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            className={INPUT}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Sua senha"
            autoComplete="current-password"
          />
        </div>

        {erro && <div className="mb-2 text-[12px] font-medium text-rose">{erro}</div>}

        <div className="mt-5 flex flex-col gap-2.5">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-[12px] border-none bg-[linear-gradient(135deg,var(--color-green2),var(--color-green))] py-3 font-display text-[14px] font-bold text-white shadow-[0_4px_16px_rgba(0,184,97,0.25)] transition hover:scale-[0.99] hover:opacity-90"
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => autenticar('register')}
            className="w-full cursor-pointer rounded-[12px] border border-border2 bg-transparent py-3 font-display text-[13px] font-semibold text-text transition-colors hover:bg-surface2"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
}
