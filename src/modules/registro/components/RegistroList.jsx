import { CircleCheck, CircleDashed, CircleX, ClipboardList, Clock } from 'lucide-react'
import Tarjeta, { TarjetaGrid } from '../../core/design-system/Tarjeta'
import Pildora from '../../core/design-system/Pildora'
import { formatearFechaHora } from '../../core/utils/formato'
import { capitalizar } from '../../core/utils/colores'

// Ícono, color y barras según el estado del registro
const POR_ESTADO = {
  pendiente: { color: 'bg-amber-400 text-[#13161c]', icono: CircleDashed, barras: 1 },
  aprobado: { color: 'bg-marca-400 text-[#13161c]', icono: CircleCheck, barras: 3 },
  rechazado: { color: 'bg-rose-500 text-white', icono: CircleX, barras: 0 },
}

export default function RegistroList({ registros, onEditar, onEliminar }) {
  return (
    <TarjetaGrid vacio="No se encontraron registros.">
      {registros.map((r) => {
        const estado = POR_ESTADO[r.estado]
        return (
          <Tarjeta
            key={r.id}
            icono={{ icono: ClipboardList, color: estado.color }}
            titulo={r.reto?.nombre ?? 'Reto no encontrado'}
            descripcion={r.observacion ?? 'Sin observación.'}
            dato={{ icono: Clock, texto: formatearFechaHora(r.fecha_registro) }}
            puntaje={{ icono: estado.icono, texto: capitalizar(r.estado) }}
            insignia={<Pildora barras={estado.barras}>{r.estado}</Pildora>}
            autor={{ nombre: r.usuario?.nombre ?? 'Usuario no encontrado', detalle: capitalizar(r.usuario?.rol ?? '') }}
            onEditar={() => onEditar(r)}
            onEliminar={() => onEliminar(r)}
          />
        )
      })}
    </TarjetaGrid>
  )
}
