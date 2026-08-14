import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { ShieldCheck, LogIn, Loader2 } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  if (localStorage.getItem('token')) return <Navigate to="/" replace />

  async function entrar(e) {
    e.preventDefault()
    setErro('')
    if (!email || !senha) return setErro('Email ou senha inválidos.')

    setCarregando(true)
    try {
      // ==========================================================
      // A fazer: plugar no backend .NET quando estiver pronto:
      //Ex:
      // const res = await fetch('https://localhost:5000/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, senha }),
      // })
      // if (!res.ok) throw new Error('E-mail ou senha inválidos.')
      // const dados = await res.json()
      // localStorage.setItem('token', dados.token)
      // ==========================================================

      await new Promise((r) => setTimeout(r, 700)) // simula a API
      localStorage.setItem('token', 'token-demo')
      navigate('/')
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">
      {/* Painel de branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="flex items-center gap-3 relative">
          <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center">
            <ShieldCheck size={25} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white">SGO - Angular Tecnologia</p>
            <p className="text-xs text-slate-400">Gestão Operacional</p>
          </div>
        </div>

        <div className="relative">
          <h2 className="text-3xl font-bold text-white leading-snug">
            Ponto, EPIs, ativos e financeiro<br />em um só lugar.
          </h2>
          <p className="text-slate-400 mt-4 max-w-md">
            Controle completo da operação: registros de ponto, entrega de EPIs,
            patrimônio e lançamentos financeiros.
          </p>
        </div>

        <p className="text-xs text-slate-500 relative">© 2026 SGO — Todos os direitos reservados.</p>
      </div>

      {/* Formulário */}
      <div className="flex items-center justify-center p-6 bg-slate-50">
        <form onSubmit={entrar} className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-xl font-bold text-slate-800">Bem-vindo de volta 👋</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">Entre com suas credenciais para acessar o painel.</p>

          <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@empresa.com"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition mb-4"
          />

          <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition mb-4"
          />

          {erro && (
            <p className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 mb-4">{erro}</p>
          )}

          <button
            disabled={carregando}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600  py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60 transition-colors"
          >
            {carregando ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-xs text-slate-400 text-center mt-4">Demonstração: use qualquer e-mail e senha.</p>
        </form>
      </div>
    </div>
  )
}