import AuthLayout from '../components/AuthLayout'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout titulo="Bienvenido de nuevo" subtitulo="Ingresa tus datos para entrar al panel.">
      <LoginForm />
    </AuthLayout>
  )
}
