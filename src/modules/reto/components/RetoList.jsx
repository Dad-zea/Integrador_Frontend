import { CalendarDays, Flag, Trophy } from 'lucide-react'
import Tarjeta, { TarjetaGrid } from '../../core/design-system/Tarjeta'
import Pildora from '../../core/design-system/Pildora'
import { formatearFecha } from '../../core/utils/formato'

// Barras de avance según el estado del reto
const BARRAS_POR_ESTADO = { pendiente: 1, 'en progreso': 2, completada: 3 }

const duracionDias = (inicio, fin) =>
  Math.round((new Date(`${fin}T00:00:00`) - new Date(`${inicio}T00:00:00`)) / 86_400_000)

export default function RetoList({ retos, onEditar, onEliminar }) {
  return (
    <TarjetaGrid vacio="No se encontraron retos.">
      {retos.map((r) => (
        <Tarjeta
          key={r.id}
          icono={{ icono: Trophy }}
          titulo={r.nombre}
          descripcion={r.descripcion}
          dato={{ icono: CalendarDays, texto: `${duracionDias(r.fecha_inicio, r.fecha_fin)} días · cierra ${formatearFecha(r.fecha_fin)}` }}
          puntaje={{ icono: Flag, texto: r.prioridad ? `Prioridad ${r.prioridad.nombre}` : 'Sin prioridad' }}
          insignia={<Pildora barras={BARRAS_POR_ESTADO[r.estado]}>{r.estado}</Pildora>}
          autor={{ nombre: r.empresa?.nombre ?? 'Empresa no encontrada', detalle: r.categoria?.nombre ?? 'Sin categoría' }}
          onEditar={() => onEditar(r)}
          onEliminar={() => onEliminar(r)}
        />
      ))}
    </TarjetaGrid>
  )
}
