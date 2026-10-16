import { Briefcase, Tags, Trophy } from 'lucide-react'
import Tarjeta, { TarjetaGrid } from '../../core/design-system/Tarjeta'

export default function CategoriaList({ categorias, conteoRetos, onEditar, onEliminar }) {
  return (
    <TarjetaGrid vacio="No se encontraron categorías.">
      {categorias.map((c) => (
        <Tarjeta
          key={c.id}
          icono={{ icono: Tags }}
          titulo={c.nombre}
          descripcion={c.descripcion}
          dato={{ icono: Briefcase, texto: c.area_responsable }}
          puntaje={{ icono: Trophy, texto: `${conteoRetos[c.id] ?? 0} retos asignados` }}
          onEditar={() => onEditar(c)}
          onEliminar={() => onEliminar(c)}
        />
      ))}
    </TarjetaGrid>
  )
}
