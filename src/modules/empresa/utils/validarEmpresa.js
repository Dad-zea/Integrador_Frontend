import { esCorreoValido, esVacio } from '../../core/utils/validaciones'
import { limpiar } from '../../core/utils/formato'

// Deja solo los dígitos del NIT: "900.123.456-7" -> "9001234567"
const soloDigitos = (texto) => limpiar(texto).replace(/\D/g, '')

// Formato único para el NIT: 9 dígitos + guion + dígito de verificación.
// Así se evitan las variantes sucias que generaba el script de Python.
export const formatearNit = (nit) => {
  const digitos = soloDigitos(nit)
  return `${digitos.slice(0, 9)}-${digitos.slice(9)}`
}

export function validarEmpresa(valores) {
  const nit = soloDigitos(valores.nit)
  const telefono = soloDigitos(valores.telefono)

  return {
    nombre: limpiar(valores.nombre).length < 3 ? 'El nombre debe tener al menos 3 caracteres.' : undefined,
    nit: nit.length !== 10 ? 'El NIT debe tener 9 dígitos más el dígito de verificación (ej. 900123456-7).' : undefined,
    sector: esVacio(valores.sector) ? 'Selecciona un sector.' : undefined,
    contacto: esVacio(valores.contacto) ? 'Escribe el nombre del contacto.' : undefined,
    correo: !esCorreoValido(limpiar(valores.correo)) ? 'Escribe un correo válido (debe tener @).' : undefined,
    telefono: !/^3\d{9}$/.test(telefono) ? 'El celular debe tener 10 dígitos y empezar por 3.' : undefined,
  }
}

// Limpia los datos antes de guardarlos.
export function normalizarEmpresa(valores) {
  return {
    nombre: limpiar(valores.nombre),
    nit: formatearNit(valores.nit),
    sector: valores.sector,
    contacto: limpiar(valores.contacto),
    correo: limpiar(valores.correo).toLowerCase(),
    telefono: soloDigitos(valores.telefono),
    activa: Boolean(valores.activa),
  }
}
