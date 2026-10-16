import AuthLayout from '../components/AuthLayout'
import RegisterForm from '../components/RegisterForm'

export default function RegisterPage() {
  return (
    <AuthLayout titulo="Crea tu cuenta" subtitulo="Regístrate para gestionar empresas, retos y registros.">
      <RegisterForm />
    </AuthLayout>
  )
}
