// Etiqueta con borde redondeado y barras de nivel opcionales (como "BÁSICO" / "Intermedio" en Platzi).
// barras: cuántas de las 3 barras van rellenas (0 a 3); si no se envía, no se dibujan.
export default function Pildora({ barras, children }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-400 px-2.5 py-1 text-xs font-medium uppercase text-tinta">
      {barras !== undefined && (
        <span className="flex items-end gap-[2px]" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span key={n} className={`w-[3px] rounded-sm ${n <= barras ? 'bg-tinta' : 'bg-slate-300'}`} style={{ height: 3 + n * 3 }} />
          ))}
        </span>
      )}
      {children}
    </span>
  )
}
