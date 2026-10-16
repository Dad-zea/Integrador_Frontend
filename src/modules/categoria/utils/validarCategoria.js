import { esVacio } from '../../core/utils/validaciones'
import { limpiar } from '../../core/utils/formato'

export function validarCategoria(valores) {
  return {
    nombre: esVacio(valores.nombre) ? 'Selecciona una categoría.' : undefined,
    descripcion: limpiar(valores.descripcion).length < 10 ? 'Describe la categoría (mínimo 10 caracteres).' : undefined,
    area_responsable: esVacio(valores.area_responsable) ? 'Selecciona el área responsable.' : undefined,
  }
}

export function normalizarCategoria(valores) {
  return {
    nombre: valores.nombre,
    descripcion: limpiar(valores.descripcion),
    area_responsable: valores.area_responsable,
  }
}
