// Botones al estilo CESDE: magenta sólido o con borde magenta, esquinas de 9px.
const VARIANTES = {
  primario: 'bg-marca-600 text-sobre-marca hover:bg-marca-700 focus-visible:outline-marca-600',
  secundario: 'bg-superficie text-marca-600 ring-[1.6px] ring-inset ring-marca-600 hover:bg-marca-50',
  peligro: 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:outline-rose-600',
  fantasma: 'text-slate-600 hover:bg-slate-100 hover:text-tinta',
}

const TAMANOS = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
}

export default function Button({
  variante = 'primario',
  tamano = 'md',
  icono: Icono,
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTES[variante]} ${TAMANOS[tamano]} ${className}`}
      {...props}
    >
      {Icono && <Icono className="size-4 shrink-0" aria-hidden="true" />}
      {children}
    </button>
  )
}
