import { esVacio } from '../../core/utils/validaciones'
import { limpiar } from '../../core/utils/formato'

// Fecha y hora actual en el formato del input datetime-local: AAAA-MM-DDTHH:mm
export function ahoraLocal() {
  const ahora = new Date()
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset())
  return ahora.toISOString().slice(0, 16)
}

export function validarRegistro(valores) {
  let errorFecha
  if (esVacio(valores.fecha_registro)) errorFecha = 'Selecciona la fecha y hora.'
  else if (valores.fecha_registro > ahoraLocal()) errorFecha = 'La fecha de registro no puede estar en el futuro.'

  return {
    fecha_registro: errorFecha,
    id_usuario: esVacio(valores.id_usuario) ? 'Selecciona el usuario.' : undefined,
    id_reto: esVacio(valores.id_reto) ? 'Selecciona el reto.' : undefined,
    estado: esVacio(valores.estado) ? 'Selecciona el estado.' : undefined,
  }
}

// La observación es opcional; si viene vacía se guarda como null.
export function normalizarRegistro(valores) {
  return {
    fecha_registro: valores.fecha_registro,
    observacion: limpiar(valores.observacion) || null,
    estado: valores.estado,
    id_usuario: valores.id_usuario,
    id_reto: valores.id_reto,
  }
}
