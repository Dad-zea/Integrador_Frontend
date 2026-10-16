import { Building2, ClipboardList, Flag, Tags, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import Badge from '../../core/design-system/Badge'
import { formatearFecha, formatearFechaHora } from '../../core/utils/formato'
import { COLOR_ESTADO_REGISTRO } from '../../registro/lib/constantes'
import { useResumen } from '../hooks/useResumen'
import StatCard from '../components/StatCard'
import Panel from '../components/Panel'
import EstadoResumen from '../components/EstadoResumen'

const ESTADOS_RETO = [
  { nombre: 'pendiente', color: 'amarillo' },
  { nombre: 'en progreso', color: 'azul' },
  { nombre: 'completada', color: 'verde' },
]

const ESTADOS_REGISTRO = [
  { nombre: 'pendiente', color: 'amarillo' },
  { nombre: 'aprobado', color: 'verde' },
  { nombre: 'rechazado', color: 'rojo' },
]

const plural = (n, singular, pluralTexto) => `${n} ${n === 1 ? singular : pluralTexto}`

function textoPlazo(dias) {
  if (dias < 0) return { texto: `Vencido hace ${plural(-dias, 'día', 'días')}`, color: 'rojo' }
  if (dias === 0) return { texto: 'Cierra hoy', color: 'rojo' }
  if (dias <= 15) return { texto: `Faltan ${plural(dias, 'día', 'días')}`, color: 'amarillo' }
  return { texto: `Faltan ${dias} días`, color: 'gris' }
}

export default function DashboardPage() {
  const { usuario } = useAuth()
  const { totales, retosPorEstado, registrosPorEstado, retosPorCategoria, proximosACerrar, ultimosRegistros } = useResumen()

  const enCurso = retosPorEstado['en progreso'] ?? 0
  const pendientesRevision = registrosPorEstado.pendiente ?? 0
  const categoriaLider = retosPorCategoria[0]
  const maxCategoria = Math.max(1, ...retosPorCategoria.map((c) => c.total))

  return (
    <>
      {/* Portada */}
      <section className="grid items-stretch gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-marca-600 sm:text-5xl">Hola, {usuario.nombre.split(' ')[0]}</h1>
          <p className="mt-4 text-lg font-bold text-black">Este es el resumen de los retos empresariales.</p>
          <p className="mt-2 max-w-xl text-slate-600">
            Hay {plural(totales.retos, 'reto registrado', 'retos registrados')}, {enCurso} en progreso, y{' '}
            {plural(pendientesRevision, 'registro espera', 'registros esperan')} revisión.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/retos" className="rounded-lg bg-marca-600 px-6 py-3 text-sm font-bold text-sobre-marca hover:bg-marca-700">
              Ver retos
            </Link>
            <Link
              to="/registros"
              className="rounded-lg border-[1.5px] border-marca-600 px-6 py-3 text-sm font-bold text-marca-600 hover:bg-marca-600 hover:text-sobre-marca"
            >
              Revisar registros
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-marca-600 p-8 text-sobre-marca">
          <div className="absolute -right-10 -top-10 size-40 rotate-45 rounded-3xl bg-white/15" aria-hidden="true" />
          <p className="relative text-sm font-bold uppercase tracking-[0.2em] opacity-80">Retos completados</p>
          <p className="relative mt-2 text-6xl font-black tabular-nums">
            {retosPorEstado.completada ?? 0}
            <span className="text-2xl opacity-70"> / {totales.retos}</span>
          </p>
          <p className="relative mt-4 max-w-xs font-medium opacity-90">
            {totales.empresasActivas} empresas activas proponen retos en {totales.categorias} categorías.
          </p>
        </div>
      </section>

      <h2 className="mb-5 mt-12 text-2xl font-bold text-black">Módulos</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        <StatCard titulo="Empresas" valor={totales.empresas} detalle={`${totales.empresasActivas} activas`} icono={Building2} ruta="/empresas" color="bg-sky-500 text-white" />
        <StatCard titulo="Retos" valor={totales.retos} detalle={`${enCurso} en progreso`} icono={Trophy} ruta="/retos" color="bg-amber-400 text-[#13161c]" />
        <StatCard titulo="Categorías" valor={totales.categorias} detalle="Áreas temáticas" icono={Tags} ruta="/categorias" color="bg-violet-500 text-white" />
        <StatCard titulo="Prioridades" valor={totales.prioridades} detalle="Niveles de urgencia" icono={Flag} ruta="/prioridades" color="bg-rose-500 text-white" />
        <StatCard titulo="Registros" valor={totales.registros} detalle={`${pendientesRevision} pendientes`} icono={ClipboardList} ruta="/registros" color="bg-marca-400 text-[#13161c]" />
      </div>

      <h2 className="mt-12 text-2xl font-bold text-black">Estado del programa</h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          titulo="Estado de los retos"
          conclusion={
            totales.retos === 0
              ? 'Aún no hay retos registrados.'
              : `${retosPorEstado.completada ?? 0} de ${totales.retos} retos ya se completaron.`
          }
        >
          <EstadoResumen estados={ESTADOS_RETO} conteo={retosPorEstado} />
        </Panel>

        <Panel
          titulo="Revisión de registros"
          conclusion={
            pendientesRevision > 0
              ? `Tienes ${plural(pendientesRevision, 'registro', 'registros')} por aprobar o rechazar.`
              : 'No hay registros pendientes de revisión.'
          }
        >
          <EstadoResumen estados={ESTADOS_REGISTRO} conteo={registrosPorEstado} />
        </Panel>

        <Panel
          titulo="Próximos a cerrar"
          conclusion={proximosACerrar.length ? 'Retos sin terminar, ordenados por la fecha de cierre más cercana.' : 'No hay retos abiertos.'}
        >
          <ul className="divide-y divide-slate-100">
            {proximosACerrar.map((r) => {
              const plazo = textoPlazo(r.diasRestantes)
              return (
                <li key={r.id} className="flex items-start justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{r.nombre}</p>
                    <p className="text-xs text-slate-500">
                      {r.empresa ?? '—'} · cierra el {formatearFecha(r.fecha_fin)}
                    </p>
                  </div>
                  <Badge color={plazo.color}>{plazo.texto}</Badge>
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel
          titulo="Retos por categoría"
          conclusion={categoriaLider?.total ? `${categoriaLider.nombre} es la categoría con más retos.` : 'Aún no hay retos por categoría.'}
        >
          <ul className="space-y-3">
            {retosPorCategoria.map((c) => (
              <li key={c.nombre}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-700">{c.nombre}</span>
                  <span className="font-semibold tabular-nums text-slate-900">{c.total}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-marca-500" style={{ width: `${(c.total / maxCategoria) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="mt-6">
        <Panel titulo="Últimos registros">
          {ultimosRegistros.length === 0 ? (
            <p className="text-sm text-slate-500">Todavía no hay registros.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {ultimosRegistros.map((r) => (
                <li key={r.id} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{r.reto ?? 'Reto no encontrado'}</p>
                    <p className="text-xs text-slate-500">{formatearFechaHora(r.fecha_registro)}</p>
                  </div>
                  <Badge color={COLOR_ESTADO_REGISTRO[r.estado]}>
                    <span className="capitalize">{r.estado}</span>
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <Link to="/registros" className="mt-3 inline-block text-sm font-semibold text-marca-600 hover:text-marca-700">
            Ver todos los registros →
          </Link>
        </Panel>
      </div>
    </>
  )
}
