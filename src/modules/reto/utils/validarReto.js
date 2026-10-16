import { esVacio } from '../../core/utils/validaciones'
import { limpiar } from '../../core/utils/formato'

export function validarReto(valores) {
  const { fecha_inicio, fecha_fin } = valores
  let errorFin
  if (esVacio(fecha_fin)) errorFin = 'Selecciona la fecha de finalización.'
  // En Python se detectaba este error lógico: fecha_fin anterior a fecha_inicio
  else if (fecha_inicio && fecha_fin < fecha_inicio) errorFin = 'La fecha fin no puede ser anterior a la fecha de inicio.'

  return {
    nombre: limpiar(valores.nombre).length < 5 ? 'El nombre debe tener al menos 5 caracteres.' : undefined,
    descripcion: limpiar(valores.descripcion).length < 10 ? 'Describe el reto (mínimo 10 caracteres).' : undefined,
    fecha_inicio: esVacio(fecha_inicio) ? 'Selecciona la fecha de inicio.' : undefined,
    fecha_fin: errorFin,
    estado: esVacio(valores.estado) ? 'Selecciona el estado.' : undefined,
    id_empresa: esVacio(valores.id_empresa) ? 'Selecciona la empresa.' : undefined,
    id_categoria: esVacio(valores.id_categoria) ? 'Selecciona la categoría.' : undefined,
    id_prioridad: esVacio(valores.id_prioridad) ? 'Selecciona la prioridad.' : undefined,
  }
}

export function normalizarReto(valores) {
  return {
    nombre: limpiar(valores.nombre),
    descripcion: limpiar(valores.descripcion),
    fecha_inicio: valores.fecha_inicio, // formato ISO: AAAA-MM-DD
    fecha_fin: valores.fecha_fin,
    estado: valores.estado,
    id_empresa: valores.id_empresa,
    id_categoria: valores.id_categoria,
    id_prioridad: valores.id_prioridad,
  }
}
