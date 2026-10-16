import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { BusquedaProvider } from '../states/BusquedaContext'
import Sidebar from './Sidebar'
import Logo from './Logo'
import FondoDecorativo from './FondoDecorativo'

// Estructura de las páginas privadas: menú lateral fijo + contenido con fondo decorativo.
export default function DashboardLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <BusquedaProvider>
      <Sidebar abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />

      <div className="relative min-h-screen overflow-hidden lg:pl-64">
        <FondoDecorativo />

        {/* Barra superior solo en celular */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-lateral px-4 lg:hidden">
          <Logo />
          <button
            type="button"
            onClick={() => setMenuAbierto(true)}
            className="rounded-lg p-2 text-tinta hover:bg-slate-100"
            aria-label="Abrir menú"
          >
            <Menu className="size-6" />
          </button>
        </header>

        <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>
    </BusquedaProvider>
  )
}
