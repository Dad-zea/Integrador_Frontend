import { Link, useNavigate } from 'react-router-dom'
import { useFormulario } from '../../core/hooks/useFormulario'
import Input from '../../core/design-system/Input'
import Select from '../../core/design-system/Select'
import Button from '../../core/design-system/Button'
import Alert from '../../core/design-system/Alert'
import { useAuth } from '../hooks/useAuth'
import { validarRegistro } from '../utils/validarAuth'
import { ROLES } from '../lib/usuariosIniciales'

const OPCIONES_ROL = ROLES.map((rol) => ({ valor: rol, texto: rol.charAt(0).toUpperCase() + rol.slice(1) }))

export default function RegisterForm() {
  const { registrar } = useAuth()
  const navigate = useNavigate()

  const { valores, errores, enviando, cambiar, enviar } = useFormulario(
    { nombre: '', correo: '', rol: '', contrasena: '', confirmar: '' },
    validarRegistro,
    async (datos) => {
      await registrar(datos)
      navigate('/dashboard', { replace: true })
    },
  )

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      {errores.general && <Alert>{errores.general}</Alert>}

      <Input name="nombre" etiqueta="Nombre completo" autoComplete="name" value={valores.nombre} onChange={cambiar} error={errores.nombre} />
      <Input
        name="correo"
        type="email"
        etiqueta="Correo electrónico"
        autoComplete="email"
        value={valores.correo}
        onChange={cambiar}
        error={errores.correo}
      />
      <Select name="rol" etiqueta="Rol" opciones={OPCIONES_ROL} value={valores.rol} onChange={cambiar} error={errores.rol} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="contrasena"
          type="password"
          etiqueta="Contraseña"
          autoComplete="new-password"
          value={valores.contrasena}
          onChange={cambiar}
          error={errores.contrasena}
        />
        <Input
          name="confirmar"
          type="password"
          etiqueta="Confirmar contraseña"
          autoComplete="new-password"
          value={valores.confirmar}
          onChange={cambiar}
          error={errores.confirmar}
        />
      </div>
      {!errores.contrasena && <p className="-mt-2 text-xs text-slate-500">Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.</p>}

      <Button type="submit" tamano="lg" className="w-full" disabled={enviando}>
        {enviando ? 'Creando cuenta…' : 'Crear cuenta'}
      </Button>

      <p className="text-center text-sm text-slate-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-marca-600 hover:text-marca-700">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
