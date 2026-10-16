import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const BusquedaContext = createContext(null)

// El buscador está en el menú lateral, pero cada página filtra sus propios datos.
// Este contexto comparte el texto buscado y lo limpia al cambiar de página.
export function BusquedaProvider({ children }) {
  const [busqueda, setBusqueda] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    setBusqueda('')
  }, [pathname])

  return <BusquedaContext.Provider value={{ busqueda, setBusqueda }}>{children}</BusquedaContext.Provider>
}
