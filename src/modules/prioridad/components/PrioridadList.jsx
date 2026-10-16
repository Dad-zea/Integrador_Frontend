import { Clock, Flag, Trophy } from 'lucide-react'
import Tarjeta, { TarjetaGrid } from '../../core/design-system/Tarjeta'
import Pildora from '../../core/design-system/Pildora'

// Color del círculo según el nivel: Baja verde, Media ámbar, Alta rojo
const CIRCULO_POR_NIVEL = {
  1: 'bg-marca-400 text-[#13161c]',
  2: 'bg-amber-400 text-[#13161c]',
  3: 'bg-rose-500 text-white',
}

export default function PrioridadList({ prioridades, conteoRetos, onEditar, onEliminar }) {
  return (
    <TarjetaGrid vacio="No hay prioridades registradas.">
      {prioridades.map((p) => (
        <Tarjeta
          key={p.id}
          icono={{ icono: Flag, color: CIRCULO_POR_NIVEL[p.nivel] }}
          titulo={p.nombre}
          descripcion={`Los retos con prioridad ${p.nombre.toLowerCase()} deben responderse en máximo ${p.dias_max_respuesta} días.`}
          dato={{ icono: Clock, texto: `${p.dias_max_respuesta} días de respuesta` }}
          puntaje={{ icono: Trophy, texto: `${conteoRetos[p.id] ?? 0} retos` }}
          insignia={<Pildora barras={p.nivel}>Nivel {p.nivel}</Pildora>}
          onEditar={() => onEditar(p)}
          onEliminar={() => onEliminar(p)}
        />
      ))}
    </TarjetaGrid>
  )
}
