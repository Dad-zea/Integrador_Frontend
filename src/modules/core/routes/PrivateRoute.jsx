import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

// Protege las rutas internas: si no hay usuario logueado, lo manda al login
// y recuerda a qué página quería entrar para devolverlo allí después.
export default function PrivateRoute() {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  return <Outlet />
}
