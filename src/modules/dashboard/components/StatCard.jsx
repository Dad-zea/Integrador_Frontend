import { Link } from 'react-router-dom'

// Tarjeta de un módulo con el estilo de las tarjetas de curso: círculo de color,
// título, número grande y botón con borde verde.
export default function StatCard({ titulo, valor, detalle, icono: Icono, ruta, color }) {
  return (
    <article className="flex flex-col rounded-2xl bg-superficie p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-marca-500 dark:shadow-none">
      <header className="flex items-center gap-3">
        <span className={`grid size-11 place-items-center rounded-full ${color}`}>
          <Icono className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold text-black">{titulo}</h3>
      </header>
      <p className="mt-5 text-4xl font-black tabular-nums text-black">{valor}</p>
      {detalle && <p className="mt-1 text-sm text-slate-600">{detalle}</p>}
      <Link
        to={ruta}
        className="mt-5 self-end rounded-lg border-[1.5px] border-marca-600 px-5 py-2 text-sm font-bold text-marca-600 transition hover:bg-marca-600 hover:text-sobre-marca"
      >
        Ver módulo
      </Link>
    </article>
  )
}
