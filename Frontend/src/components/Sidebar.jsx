import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Clock, HardHat, Users, Package, Shirt,
    Wallet, UserCog, LogOut, Menu, X, ShieldCheck,
} from 'lucide-react'

const itens = [
    { para: '/', rotulo: 'Dashboard', Icone: LayoutDashboard, exato: true },
    { para: '/meu-ponto', rotulo: 'Meu Ponto', Icone: Clock },
    { para: '/meus-epis', rotulo: 'Meus EPIs', Icone: HardHat },
    { para: '/funcionarios', rotulo: 'Funcionários', Icone: Users },
    { para: '/ativos', rotulo: 'Ativos', Icone: Package },
    { para: '/epis', rotulo: 'EPIs', Icone: Shirt },
    { para: '/financeiro', rotulo: 'Financeiro', Icone: Wallet },
    { para: '/usuarios', rotulo: 'Usuários', Icone: UserCog },
]

export default function Sidebar() {
    const [aberto, setAberto] = useState(false)
    const navigate = useNavigate()

    const hoje = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric',
    })

    function sair() {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {aberto && (
                <div className="fixed inset-0 bg-slate-900/50 z-30 md:hidden" onClick={() => setAberto(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-white text-slate-600 border-r border-slate-200 flex flex-col shrink-0 transition-transform md:translate-x-0 ${aberto ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-200">
                    <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center">
                        <ShieldCheck size={25} className="text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 leading-tight">Angular Tecnologia</p>
                        <p className="text-xs text-slate-500">Gestão Operacional</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {itens.map(({ para, rotulo, Icone, exato }) => (
                        <NavLink
                            key={para}
                            to={para}
                            end={exato}
                            onClick={() => setAberto(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/60 hover:text-white'
                                }`
                            }
                        >
                            <Icone size={18} />
                            {rotulo}
                        </NavLink>
                    ))}
                </nav>

                <div className="px-3 py-4 border-t border-slate-800">
                    <button
                        onClick={sair}
                        className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-800/60 hover:text-white transition-colors"
                    >
                        <LogOut size={18} /> Sair
                    </button>
                </div>
            </aside>

            {/* Conteúdo */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200 flex items-center justify-between px-4 md:px-8 py-3">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden text-slate-600" onClick={() => setAberto(!aberto)}>
                            {aberto ? <X size={22} /> : <Menu size={22} />}
                        </button>
                        <p className="text-sm text-slate-500 capitalize">{hoje}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-700">Ronaldo Estevão</p>
                            <p className="text-xs text-slate-400">Administrador</p>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-white flex items-center justify-center text-sm font-bold">
                            AD
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-4 md:px-8 py-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}