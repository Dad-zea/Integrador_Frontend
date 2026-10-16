import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'

// Login y Registro: si el usuario ya inició sesión, no tiene sentido verlos.
// Lo enviamos a la página que intentaba abrir (o al dashboard).
export default function PublicRoute() {
  const { usuario } = useAuth()
  const location = useLocation()

  if (usuario) {
    return <Navigate to={location.state?.desde ?? '/dashboard'} replace />
  }

  return <Outlet />
}
