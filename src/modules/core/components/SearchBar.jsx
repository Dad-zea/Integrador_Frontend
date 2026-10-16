import { Search } from 'lucide-react'
import { useBusqueda } from '../hooks/useBusqueda'

// Buscador blanco del menú lateral. Filtra los datos de la página abierta.
export default function SearchBar({ deshabilitado }) {
  const { busqueda, setBusqueda } = useBusqueda()

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#13161c]" aria-hidden="true" />
      <input
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        disabled={deshabilitado}
        placeholder="Buscar"
        aria-label="Buscar en esta página"
        className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-[#13161c] placeholder:text-[#13161c]/70 focus:border-marca-500 focus:outline-none focus:ring-2 focus:ring-marca-400/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-transparent"
      />
    </div>
  )
}
