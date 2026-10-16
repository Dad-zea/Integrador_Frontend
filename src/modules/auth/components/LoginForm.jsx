import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormulario } from '../../core/hooks/useFormulario'
import Input from '../../core/design-system/Input'
import Button from '../../core/design-system/Button'
import Alert from '../../core/design-system/Alert'
import { useAuth } from '../hooks/useAuth'
import { validarLogin } from '../utils/validarAuth'

export default function LoginForm() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // Si venía de una ruta privada, volver a ella después de entrar
  const destino = location.state?.desde ?? '/dashboard'

  const { valores, errores, enviando, cambiar, enviar } = useFormulario(
    { correo: '', contrasena: '' },
    validarLogin,
    async ({ correo, contrasena }) => {
      await iniciarSesion(correo, contrasena)
      navigate(destino, { replace: true })
    },
  )

  return (
    <form onSubmit={enviar} noValidate className="space-y-5">
      {errores.general && <Alert>{errores.general}</Alert>}

      <Input
        name="correo"
        type="email"
        etiqueta="Correo electrónico"
        placeholder="tucorreo@ejemplo.com"
        autoComplete="email"
        value={valores.correo}
        onChange={cambiar}
        error={errores.correo}
      />
      <Input
        name="contrasena"
        type="password"
        etiqueta="Contraseña"
        placeholder="••••••••"
        autoComplete="current-password"
        value={valores.contrasena}
        onChange={cambiar}
        error={errores.contrasena}
      />

      <Button type="submit" tamano="lg" className="w-full" disabled={enviando}>
        {enviando ? 'Ingresando…' : 'Iniciar sesión'}
      </Button>

      <p className="text-center text-sm text-slate-600">
        ¿No tienes cuenta?{' '}
        <Link to="/registro" className="font-semibold text-marca-600 hover:text-marca-700">
          Regístrate
        </Link>
      </p>

      <div className="rounded-lg bg-marca-50 px-3 py-2.5 text-xs text-slate-700">
        <p className="font-bold text-marca-700 dark:text-marca-300">Usuario de prueba</p>
        admin@cesde.edu.co · Admin123*
      </div>
    </form>
  )
}
