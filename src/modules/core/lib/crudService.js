import { leer, guardar } from './storage'
import { generarId } from '../utils/id'

// Fábrica de servicios CRUD sobre localStorage.
// Cada módulo crea el suyo: crearCrudService('empresas', datosIniciales)
// La primera vez que se lee, se guardan los datos iniciales (semilla).
export function crearCrudService(clave, semilla = []) {
  function obtenerTodos() {
    const datos = leer(clave)
    if (datos === null) {
      guardar(clave, semilla)
      return semilla
    }
    return datos
  }

  function obtenerPorId(id) {
    return obtenerTodos().find((item) => item.id === id) ?? null
  }

  function crear(datos) {
    const nuevo = { id: generarId(), ...datos }
    guardar(clave, [...obtenerTodos(), nuevo])
    return nuevo
  }

  function actualizar(id, datos) {
    const lista = obtenerTodos().map((item) => (item.id === id ? { ...item, ...datos, id } : item))
    guardar(clave, lista)
    return lista.find((item) => item.id === id)
  }

  function eliminar(id) {
    guardar(clave, obtenerTodos().filter((item) => item.id !== id))
  }

  return { obtenerTodos, obtenerPorId, crear, actualizar, eliminar }
}
