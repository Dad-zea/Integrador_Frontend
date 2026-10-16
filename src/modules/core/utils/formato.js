// Quita espacios sobrantes (equivale a .strip() en Python).
export const limpiar = (texto) => (texto ?? '').toString().trim()

// Normaliza para comparar sin tildes ni mayúsculas: " LOGÍSTICA " -> "logistica"
export const normalizar = (texto) =>
  limpiar(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export const coincide = (texto, busqueda) => normalizar(texto).includes(normalizar(busqueda))

export function formatearFecha(valor) {
  if (!valor) return '—'
  const fecha = new Date(valor.length === 10 ? `${valor}T00:00:00` : valor)
  return fecha.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatearFechaHora(valor) {
  if (!valor) return '—'
  return new Date(valor).toLocaleString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
