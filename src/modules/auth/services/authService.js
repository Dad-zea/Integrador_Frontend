import { borrar, guardar, leer } from '../../core/lib/storage'
import { generarId } from '../../core/utils/id'
import { USUARIOS_INICIALES } from '../lib/usuariosIniciales'

const CLAVE_USUARIOS = 'usuarios'
const CLAVE_SESION = 'sesion'

// SHA-256 de la contraseña: nunca se guarda la contraseña en texto plano.
async function hashear(texto) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto))
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// Quita el hash antes de guardar el usuario en la sesión.
function sinContrasena({ contrasena_hash, ...usuario }) {
  return usuario
}

export function obtenerUsuarios() {
  const usuarios = leer(CLAVE_USUARIOS)
  if (usuarios === null) {
    guardar(CLAVE_USUARIOS, USUARIOS_INICIALES)
    return USUARIOS_INICIALES
  }
  return usuarios
}

export function obtenerSesion() {
  return leer(CLAVE_SESION)
}

export async function iniciarSesion(correo, contrasena) {
  const usuario = obtenerUsuarios().find((u) => u.correo === correo.trim().toLowerCase())
  const hash = await hashear(contrasena)

  if (!usuario || usuario.contrasena_hash !== hash) {
    throw new Error('Correo o contraseña incorrectos.')
  }
  if (!usuario.activo) {
    throw new Error('Tu cuenta está inactiva. Contacta al administrador.')
  }

  const sesion = sinContrasena(usuario)
  guardar(CLAVE_SESION, sesion)
  return sesion
}

export async function registrar({ nombre, correo, contrasena, rol }) {
  const usuarios = obtenerUsuarios()
  const correoLimpio = correo.trim().toLowerCase()

  if (usuarios.some((u) => u.correo === correoLimpio)) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }

  const nuevo = {
    id: generarId(),
    nombre: nombre.trim(),
    correo: correoLimpio,
    contrasena_hash: await hashear(contrasena),
    rol,
    activo: true,
    fecha_registro: new Date().toISOString(),
  }
  guardar(CLAVE_USUARIOS, [...usuarios, nuevo])

  // Después de registrarse queda con la sesión iniciada
  const sesion = sinContrasena(nuevo)
  guardar(CLAVE_SESION, sesion)
  return sesion
}

export function cerrarSesion() {
  borrar(CLAVE_SESION)
}
