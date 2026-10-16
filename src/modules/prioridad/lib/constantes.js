// Relación de simular_prioridad.py: nombre -> nivel -> días máximos de respuesta.
export const NIVELES_PRIORIDAD = [
  { nombre: 'Baja', nivel: 1, dias: 12 },
  { nombre: 'Media', nivel: 2, dias: 7 },
  { nombre: 'Alta', nivel: 3, dias: 4 },
]

// Límite razonable: en Python se ensuciaba con 999 días (valor absurdo).
export const DIAS_MAXIMOS = 90

export const COLOR_POR_NIVEL = { 1: 'verde', 2: 'amarillo', 3: 'rojo' }
