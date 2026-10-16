import { esVacio } from '../../core/utils/validaciones'
import { DIAS_MAXIMOS } from '../lib/constantes'

export function validarPrioridad(valores) {
  const nivel = Number(valores.nivel)
  const dias = Number(valores.dias_max_respuesta)

  return {
    nombre: esVacio(valores.nombre) ? 'Selecciona el nombre de la prioridad.' : undefined,
    nivel: ![1, 2, 3].includes(nivel) ? 'El nivel debe ser 1, 2 o 3.' : undefined,
    dias_max_respuesta:
      !Number.isInteger(dias) || dias < 1 || dias > DIAS_MAXIMOS
        ? `Escribe un número entero entre 1 y ${DIAS_MAXIMOS}.`
        : undefined,
  }
}

// El nivel y los días se guardan como enteros (en Python a veces llegaban como '3' o 'tres').
export function normalizarPrioridad(valores) {
  return {
    nombre: valores.nombre,
    nivel: Number(valores.nivel),
    dias_max_respuesta: Number(valores.dias_max_respuesta),
  }
}
