import {
  ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip,
  CartesianGrid, AreaChart, Area, Legend,
} from 'recharts'
import { Users, Package, HardHat, Clock } from 'lucide-react'
import { resumo, ativosPorStatus, financeiro, pendencias } from '../data'

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const cards = [
  { rotulo: 'Funcionários ativos', valor: resumo.funcionariosAtivos, Icone: Users, cor: 'bg-emerald-50 text-emerald-600' },
  { rotulo: 'Ativos cadastrados', valor: resumo.ativosCadastrados, Icone: Package, cor: 'bg-sky-50 text-sky-600' },
  { rotulo: 'EPIs em posse', valor: resumo.episEmPosse, Icone: HardHat, cor: 'bg-violet-50 text-violet-600' },
  { rotulo: 'Lançamentos pendentes', valor: resumo.lancamentosPendentes, Icone: Clock, cor: 'bg-amber-50 text-amber-600' },
]

const coresStatus = ['#10b981', '#0ea5e9', '#f59e0b', '#94a3b8']

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 12px rgb(0 0 0 / 0.06)',
  fontSize: 13,
}

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Visão geral do sistema.</p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.rotulo} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${c.cor}`}>
              <c.Icone size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{c.valor}</p>
              <p className="text-sm text-slate-500">{c.rotulo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800">Ativos por status</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ativosPorStatus}>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="status" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={tooltipStyle} />
                <Bar dataKey="qtd" name="Quantidade" radius={[6, 6, 0, 0]}>
                  {ativosPorStatus.map((e, i) => <Cell key={i} fill={coresStatus[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800">Financeiro (últimos 6 meses)</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financeiro}>
                <defs>
                  <linearGradient id="gReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gDespesa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `R$ ${v / 1000}k`} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip formatter={(v) => brl(v)} contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 13 }} />
                <Area type="monotone" dataKey="receita" name="Receita" stroke="#10b981" strokeWidth={2} fill="url(#gReceita)" />
                <Area type="monotone" dataKey="despesa" name="Despesa" stroke="#f43f5e" strokeWidth={2} fill="url(#gDespesa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pendências */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Lançamentos pendentes</h3>
          <span className="text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 rounded-full px-2.5 py-0.5">
            {pendencias.length} aguardando
          </span>
        </div>
        <ul className="divide-y divide-slate-100">
          {pendencias.map((p) => (
            <li key={p.id} className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-700">{p.titulo}</p>
                <p className="text-xs text-slate-400">{p.origem} • {p.data}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 rounded-full px-2.5 py-0.5">Pendente</span>
                <button className="text-xs font-medium text-emerald-600 hover:text-emerald-500 px-2 py-1">Aprovar</button>
                <button className="text-xs font-medium text-rose-500 hover:text-rose-400 px-2 py-1">Recusar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}