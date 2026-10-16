export const esCorreoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)

export const esVacio = (valor) => valor === null || valor === undefined || `${valor}`.trim() === ''
