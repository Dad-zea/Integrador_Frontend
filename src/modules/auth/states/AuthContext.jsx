import { createContext, useState } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext(null)

// Guarda el usuario logueado y lo comparte con toda la aplicación.
// Al recargar la página la sesión se recupera desde localStorage.
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => authService.obtenerSesion())

  const iniciarSesion = async (correo, contrasena) => {
    const sesion = await authService.iniciarSesion(correo, contrasena)
    setUsuario(sesion)
  }

  const registrar = async (datos) => {
    const sesion = await authService.registrar(datos)
    setUsuario(sesion)
  }

  const cerrarSesion = () => {
    authService.cerrarSesion()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}
