import { useState } from 'react'
import { Search, Plus } from 'lucide-react'

const badges = {
  Ativo: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Aprovado: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Válido: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Disponível: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Em estoque': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Receita: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Em uso': 'bg-sky-50 text-sky-700 ring-sky-200',
  Férias: 'bg-sky-50 text-sky-700 ring-sky-200',
  Manutenção: 'bg-amber-50 text-amber-700 ring-amber-200',
  Pendente: 'bg-amber-50 text-amber-700 ring-amber-200',
  Vencendo: 'bg-amber-50 text-amber-700 ring-amber-200',
  'Estoque baixo': 'bg-amber-50 text-amber-700 ring-amber-200',
  Baixado: 'bg-slate-100 text-slate-600 ring-slate-300',
  Inativo: 'bg-slate-100 text-slate-600 ring-slate-300',
  Vencido: 'bg-rose-50 text-rose-700 ring-rose-200',
  Esgotado: 'bg-rose-50 text-rose-700 ring-rose-200',
  Ausência: 'bg-rose-50 text-rose-700 ring-rose-200',
  Despesa: 'bg-rose-50 text-rose-700 ring-rose-200',
}

export default function Tabela({ pagina }) {
  const [busca, setBusca] = useState('')

  const linhas = pagina.linhas.filter((l) =>
    l.join(' ').toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{pagina.titulo}</h1>
          <p className="text-sm text-slate-500 mt-1">{pagina.subtitulo}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors">
          <Plus size={16} /> Novo
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-400 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
                {pagina.colunas.map((c) => (
                  <th key={c} className="px-5 py-3 font-semibold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {linhas.map((linha, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  {linha.map((celula, j) => (
                    <td key={j} className={`px-5 py-3.5 ${j === 0 ? 'font-medium text-slate-800' : 'text-slate-600'}`}>
                      {badges[celula] ? (
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badges[celula]}`}>
                          {celula}
                        </span>
                      ) : (
                        celula
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {linhas.length === 0 && (
                <tr>
                  <td colSpan={pagina.colunas.length} className="px-5 py-10 text-center text-slate-400">
                    Nada encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}