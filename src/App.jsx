import { Routes, Route, Navigate } from 'react-router-dom'
import Login       from './pages/Login.jsx'
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
import Nutricao    from './pages/Nutricao.jsx'
import PlanejamentoSaude from './pages/PlanejamentoSaude.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Tour from './components/Tour.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login"         element={<Login />} />
        <Route path="/onboarding/1"  element={<Loading1 />} />
        <Route path="/onboarding/2"  element={<Loading2 />} />
        <Route path="/onboarding/3"  element={<Loading3 />} />
        <Route path="/onboarding/4"  element={<Loading4 />} />

        <Route element={<RequireAuth />}>
          <Route path="/dashboard"     element={<Dashboard />} />
          <Route path="/planejamento-saude" element={<PlanejamentoSaude />} />
          <Route path="/missoes"       element={<Missoes />} />
          <Route path="/recompensas"   element={<Recompensas />} />
          <Route path="/conquistas"    element={<Conquistas />} />
          <Route path="/ranking"       element={<Ranking />} />
          <Route path="/consultas"     element={<Consultas />} />
          <Route path="/consultas/saude-fisica"  element={<SaudeFisica />} />
          <Route path="/consultas/saude-mental"  element={<SaudeMental />} />
          <Route path="/consultas/nutricao"      element={<Nutricao />} />
        </Route>

        <Route path="/"  element={<Navigate to="/dashboard" replace />} />
        <Route path="*"  element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Tour />
    </>
  )
}
