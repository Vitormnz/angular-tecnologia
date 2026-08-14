import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Tabela from './components/Tabela'
import { paginas } from './data'

function Privado({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Privado><Sidebar /></Privado>}>
        <Route index element={<Dashboard />} />
        {paginas.map((p) => (
          <Route key={p.rota} path={p.rota} element={<Tabela pagina={p} />} />
        ))}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}