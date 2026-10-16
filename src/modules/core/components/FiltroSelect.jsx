import { ChevronDown } from 'lucide-react'

// Filtro desplegable sin borde: "Estado ⌄", "Sector ⌄"...
// opciones: [{ valor, texto }]. Con valor vacío muestra la etiqueta.
export default function FiltroSelect({ etiqueta, valor, onCambiar, opciones }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{etiqueta}</span>
      <select
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        className={`cursor-pointer appearance-none bg-transparent py-1 pr-7 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-marca-400 ${
          valor ? 'font-bold text-marca-600' : 'text-tinta'
        }`}
      >
        <option value="">{etiqueta}</option>
        {opciones.map((op) => (
          <option key={op.valor} value={op.valor}>
            {op.texto}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-0 size-4 text-tinta" aria-hidden="true" />
    </label>
  )
}
