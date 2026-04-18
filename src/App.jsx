import { Routes, Route, Navigate } from 'react-router-dom'
import Loading     from './pages/Loading.jsx'
import Loading1    from './pages/Loading1.jsx'
import Loading2    from './pages/Loading2.jsx'
import Loading3    from './pages/Loading3.jsx'
import Loading4    from './pages/Loading4.jsx'
import Dashboard   from './pages/Dashboard.jsx'
import Missoes     from './pages/Missoes.jsx'
import Recompensas from './pages/Recompensas.jsx'
import Conquistas  from './pages/Conquistas.jsx'
import Ranking     from './pages/Ranking.jsx'
import Consultas   from './pages/Consultas.jsx'
import SaudeFisica from './pages/SaudeFisica.jsx'
import SaudeMental from './pages/SaudeMental.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/"              element={<Navigate to="/dashboard" replace />} />
      <Route path="/onboarding/1"  element={<Loading1 />} />
      <Route path="/onboarding/2"  element={<Loading2 />} />
      <Route path="/onboarding/3"  element={<Loading3 />} />
      <Route path="/onboarding/4"  element={<Loading4 />} />
      <Route path="/dashboard"     element={<Dashboard />} />
      <Route path="/missoes"       element={<Missoes />} />
      <Route path="/recompensas"   element={<Recompensas />} />
      <Route path="/conquistas"    element={<Conquistas />} />
      <Route path="/ranking"       element={<Ranking />} />
      <Route path="/consultas"     element={<Consultas />} />
      <Route path="/consultas/saude-fisica"  element={<SaudeFisica />} />
      <Route path="/consultas/saude-mental"  element={<SaudeMental />} />
      <Route path="*"              element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
