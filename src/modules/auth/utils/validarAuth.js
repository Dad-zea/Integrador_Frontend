import { esCorreoValido, esVacio } from '../../core/utils/validaciones'

// Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.
export const POLITICA_CONTRASENA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

export function validarLogin({ correo, contrasena }) {
  return {
    correo: esVacio(correo) ? 'Ingresa tu correo.' : !esCorreoValido(correo.trim()) ? 'El correo no es válido.' : undefined,
    contrasena: esVacio(contrasena) ? 'Ingresa tu contraseña.' : undefined,
  }
}

export function validarRegistro({ nombre, correo, contrasena, confirmar, rol }) {
  return {
    nombre: nombre.trim().length < 3 ? 'Escribe tu nombre completo.' : undefined,
    correo: esVacio(correo) ? 'Ingresa tu correo.' : !esCorreoValido(correo.trim()) ? 'El correo no es válido.' : undefined,
    rol: esVacio(rol) ? 'Selecciona un rol.' : undefined,
    contrasena: !POLITICA_CONTRASENA.test(contrasena)
      ? 'Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.'
      : undefined,
    confirmar: confirmar !== contrasena ? 'Las contraseñas no coinciden.' : undefined,
  }
}
