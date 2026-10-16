import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Plus, UserRound } from 'lucide-react'
import { useAuth } from '../../auth/hooks/useAuth'
import { INICIO, MODULOS } from '../lib/menu'
import Logo from './Logo'
import SearchBar from './SearchBar'
import TemaToggle from './TemaToggle'

const claseIcono = 'grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-marca-600'

// Menú lateral al estilo Platzi: logo, íconos, buscador y el grupo "Módulos" con borde verde.
export default function Sidebar({ abierto, onCerrar }) {
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [grupoAbierto, setGrupoAbierto] = useState(true)

  const salir = () => {
    cerrarSesion()
    navigate('/login', { replace: true })
  }

  return (
    <>
      {abierto && <div className="fixed inset-0 z-30 bg-barra/60 lg:hidden" onClick={onCerrar} aria-hidden="true" />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto border-r border-slate-200 bg-lateral px-3 py-6 transition-transform lg:translate-x-0 ${
          abierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className={claseIcono} title={`${usuario.nombre} (${usuario.rol})`}>
            <UserRound className="size-5" aria-label={`Sesión de ${usuario.nombre}`} />
          </span>
          <TemaToggle />
          <button type="button" onClick={salir} className={claseIcono} aria-label="Cerrar sesión" title="Cerrar sesión">
            <LogOut className="size-5" />
          </button>
        </div>

        <div className="mt-5">
          <SearchBar deshabilitado={pathname === INICIO.ruta} />
        </div>

        <nav className="mt-5 flex-1" aria-label="Menú principal">
          <NavLink
            to={INICIO.ruta}
            onClick={onCerrar}
            className={({ isActive }) =>
              `block border-b border-slate-200 px-2 py-2.5 text-[15px] font-bold ${isActive ? 'text-marca-600' : 'text-black hover:text-marca-600'}`
            }
          >
            {INICIO.texto}
          </NavLink>

          {/* Grupo de módulos con borde verde (como "Cursos" en Platzi) */}
          <div className={`mt-3 rounded-lg ${grupoAbierto ? 'border border-marca-500' : ''}`}>
            <button
              type="button"
              onClick={() => setGrupoAbierto(!grupoAbierto)}
              aria-expanded={grupoAbierto}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-bold ${
                grupoAbierto ? 'bg-marca-50 text-marca-600' : 'text-black hover:text-marca-600'
              }`}
            >
              Módulos
              <ChevronDown className={`size-5 transition-transform ${grupoAbierto ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {grupoAbierto && (
              <ul className="space-y-0.5 px-2 pb-2 pt-1">
                {MODULOS.map(({ ruta, texto, icono: Icono }) => (
                  <li key={ruta}>
                    <NavLink
                      to={ruta}
                      onClick={onCerrar}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md px-2 py-2.5 text-sm ${
                          isActive ? 'font-bold text-marca-600' : 'text-tinta hover:bg-slate-100'
                        }`
                      }
                    >
                      <Icono className="size-[18px]" aria-hidden="true" />
                      {texto}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <NavLink
            to="/retos?nuevo=1"
            onClick={onCerrar}
            className="mt-4 flex items-center gap-2 border-b border-t border-slate-200 px-2 py-2.5 text-[15px] font-bold text-black hover:text-marca-600"
          >
            <Plus className="size-4" aria-hidden="true" />
            Proponer reto
          </NavLink>
        </nav>

        <div className="mt-6 rounded-lg bg-slate-50 px-3 py-3">
          <p className="truncate text-sm font-bold text-black">{usuario.nombre}</p>
          <p className="text-xs capitalize text-slate-500">{usuario.rol}</p>
        </div>
      </aside>
    </>
  )
}
