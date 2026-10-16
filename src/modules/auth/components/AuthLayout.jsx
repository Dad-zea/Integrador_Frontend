import { Building2, ClipboardList, Trophy } from 'lucide-react'
import Logo from '../../core/components/Logo'
import TemaToggle from '../../core/components/TemaToggle'
import FondoDecorativo from '../../core/components/FondoDecorativo'

const MODULOS = [
  { nombre: 'Empresas', texto: 'Organizaciones que proponen retos reales.', icono: Building2, color: 'bg-sky-500 text-white' },
  { nombre: 'Retos', texto: 'Por categoría, prioridad y fechas.', icono: Trophy, color: 'bg-amber-400 text-[#13161c]' },
  { nombre: 'Registros', texto: 'Seguimiento de cada participación.', icono: ClipboardList, color: 'bg-marca-400 text-[#13161c]' },
]

// Diseño compartido por Login y Registro: título grande en verde, mini tarjetas y el formulario.
export default function AuthLayout({ titulo, subtitulo, children }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <FondoDecorativo />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Logo />
        <TemaToggle />
      </header>

      <main className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 pb-12 sm:px-6 lg:grid-cols-2">
        <section className="hidden lg:block">
          <h2 className="text-5xl font-black leading-tight tracking-tight text-marca-600">Retos empresariales</h2>
          <p className="mt-4 text-lg font-bold text-black">El espacio donde las empresas y el talento BioHackers se encuentran.</p>
          <p className="mt-3 max-w-lg text-slate-600">
            Gestiona las empresas aliadas, los retos que proponen, su categoría y prioridad, y el registro de cada
            participación en un solo lugar.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {MODULOS.map(({ nombre, texto, icono: Icono, color }) => (
              <div key={nombre} className="rounded-2xl bg-superficie p-4 shadow-sm ring-1 ring-slate-200 dark:shadow-none">
                <span className={`grid size-10 place-items-center rounded-full ${color}`}>
                  <Icono className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-3 font-bold text-black">{nombre}</p>
                <p className="mt-1 text-xs text-slate-600">{texto}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-2xl bg-superficie p-6 shadow-lg ring-1 ring-slate-200 sm:p-8 dark:shadow-none">
          <h1 className="text-2xl font-bold text-black">{titulo}</h1>
          <p className="mt-1 text-sm text-slate-600">{subtitulo}</p>
          <div className="mt-6">{children}</div>
        </section>
      </main>
    </div>
  )
}
