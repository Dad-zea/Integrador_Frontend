import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-semibold text-marca-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Página no encontrada</h1>
        <p className="mt-2 text-slate-600">La dirección que buscas no existe.</p>
        <Link to="/dashboard" className="mt-6 inline-block rounded-lg bg-marca-600 px-4 py-2 text-sm font-semibold text-white hover:bg-marca-700">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
