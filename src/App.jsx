import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './modules/core/routes/PrivateRoute'
import PublicRoute from './modules/core/routes/PublicRoute'
import DashboardLayout from './modules/core/components/DashboardLayout'
import NotFoundPage from './modules/core/components/NotFoundPage'
import LoginPage from './modules/auth/pages/LoginPage'
import RegisterPage from './modules/auth/pages/RegisterPage'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import EmpresasPage from './modules/empresa/pages/EmpresasPage'
import RetosPage from './modules/reto/pages/RetosPage'
import CategoriasPage from './modules/categoria/pages/CategoriasPage'
import PrioridadesPage from './modules/prioridad/pages/PrioridadesPage'
import RegistrosPage from './modules/registro/pages/RegistrosPage'

export default function App() {
  return (
    <Routes>
      {/* Rutas públicas: si ya hay sesión, redirigen al dashboard */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
      </Route>

      {/* Rutas privadas: sin sesión, redirigen al login */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/empresas" element={<EmpresasPage />} />
          <Route path="/retos" element={<RetosPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/prioridades" element={<PrioridadesPage />} />
          <Route path="/registros" element={<RegistrosPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
