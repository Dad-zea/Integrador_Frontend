// Encabezado de cada página: título grande en verde, botón de acción y fila de filtros.
export default function PageHeader({ titulo, descripcion, filtros, children }) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-4xl font-black tracking-tight text-marca-600 sm:text-5xl">{titulo}</h1>
        {children && <div className="flex shrink-0 gap-2">{children}</div>}
      </div>
      {descripcion && <p className="mt-2 max-w-2xl text-slate-600">{descripcion}</p>}
      {filtros && <div className="mt-6 flex flex-wrap items-center justify-end gap-x-8 gap-y-3">{filtros}</div>}
    </div>
  )
}
