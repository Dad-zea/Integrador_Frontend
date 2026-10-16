const COLORES = {
  verde: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  amarillo: 'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  azul: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  rojo: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
}

// Fila de mini-tarjetas: una por estado, con su cantidad.
// estados: [{ nombre, color }], conteo: { nombre: cantidad }
export default function EstadoResumen({ estados, conteo }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {estados.map(({ nombre, color }) => (
        <div key={nombre} className={`rounded-lg px-3 py-3 ${COLORES[color]}`}>
          <p className="text-2xl font-bold tabular-nums">{conteo[nombre] ?? 0}</p>
          <p className="text-xs font-medium capitalize">{nombre}</p>
        </div>
      ))}
    </div>
  )
}
