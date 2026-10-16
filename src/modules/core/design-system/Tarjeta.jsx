import { colorPara, iniciales } from '../utils/colores'

// Círculo de color con un ícono o las iniciales del título.
function Circulo({ icono: Icono, texto, color }) {
  return (
    <span className={`grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold ${color ?? colorPara(texto)}`}>
      {Icono ? <Icono className="size-5" aria-hidden="true" /> : iniciales(texto)}
    </span>
  )
}

// Fila con ícono + texto (como "⏰ 40hs" o "⭐ 6.0")
function Dato({ icono: Icono, texto, color = 'text-tinta' }) {
  return (
    <span className="flex min-w-0 items-center gap-2 text-sm text-tinta">
      <Icono className={`size-4 shrink-0 ${color}`} aria-hidden="true" />
      <span className="truncate">{texto}</span>
    </span>
  )
}

// Tarjeta tipo "curso de Platzi", usada por todos los módulos.
export default function Tarjeta({
  icono, // { icono?, color? } para el círculo
  titulo,
  descripcion,
  dato, // { icono, texto } -> fila con reloj
  puntaje, // { icono, texto } -> fila con estrella
  insignia, // <Pildora /> a la derecha del puntaje
  autor, // { nombre, detalle } -> avatar con iniciales
  onEditar,
  onEliminar,
}) {
  return (
    <article className="flex flex-col rounded-2xl bg-superficie p-5 shadow-sm ring-1 ring-slate-200 transition hover:ring-marca-500 dark:shadow-none">
      <header className="flex items-center gap-3">
        <Circulo icono={icono?.icono} color={icono?.color} texto={titulo} />
        <h3 className="line-clamp-2 text-lg font-bold leading-tight text-black">{titulo}</h3>
      </header>

      <p className="mt-4 line-clamp-2 min-h-10 text-sm text-slate-600">{descripcion}</p>

      {dato && (
        <div className="mt-3">
          <Dato {...dato} />
        </div>
      )}

      {(puntaje || insignia) && (
        <div className="mt-3 flex items-center justify-between gap-3">
          {puntaje ? <Dato color="text-amber-400" {...puntaje} /> : <span />}
          {insignia}
        </div>
      )}

      {autor && (
        <div className="mt-5 flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-200 text-xs font-bold text-tinta">
            {iniciales(autor.nombre)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-black">{autor.nombre}</p>
            <p className="truncate text-xs text-slate-500">{autor.detalle}</p>
          </div>
        </div>
      )}

      <footer className="mt-auto flex items-center justify-between gap-3 pt-6">
        <button
          type="button"
          onClick={onEliminar}
          className="text-sm font-medium text-tinta underline underline-offset-4 hover:text-rose-500"
        >
          Eliminar
        </button>
        <button
          type="button"
          onClick={onEditar}
          className="rounded-lg border-[1.5px] border-marca-600 px-5 py-2 text-sm font-bold text-marca-600 transition hover:bg-marca-600 hover:text-sobre-marca"
        >
          Editar
        </button>
      </footer>
    </article>
  )
}

// Rejilla de tarjetas con mensaje cuando no hay resultados.
export function TarjetaGrid({ vacio = 'No hay datos para mostrar.', children }) {
  const hayHijos = Array.isArray(children) ? children.length > 0 : Boolean(children)
  if (!hayHijos) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-superficie/80 px-6 py-14 text-center text-sm text-slate-600">
        {vacio}
      </div>
    )
  }
  return <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
}
