import { useState } from 'react'

// Hook genérico que conecta un servicio CRUD con el estado de React.
// Después de cada cambio vuelve a leer la lista para que la vista se actualice.
export function useCrud(servicio) {
  const [items, setItems] = useState(() => servicio.obtenerTodos())

  const recargar = () => setItems(servicio.obtenerTodos())

  const crear = (datos) => {
    const nuevo = servicio.crear(datos)
    recargar()
    return nuevo
  }

  const actualizar = (id, datos) => {
    const actualizado = servicio.actualizar(id, datos)
    recargar()
    return actualizado
  }

  const eliminar = (id) => {
    servicio.eliminar(id)
    recargar()
  }

  return { items, crear, actualizar, eliminar }
}
