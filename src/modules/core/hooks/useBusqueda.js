import { useContext } from 'react'
import { BusquedaContext } from '../states/BusquedaContext'

export function useBusqueda() {
  const contexto = useContext(BusquedaContext)
  if (!contexto) {
    throw new Error('useBusqueda debe usarse dentro de <BusquedaProvider>')
  }
  return contexto
}
