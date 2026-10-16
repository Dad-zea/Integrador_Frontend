import { Phone, Trophy } from 'lucide-react'
import Tarjeta, { TarjetaGrid } from '../../core/design-system/Tarjeta'
import Pildora from '../../core/design-system/Pildora'

// Cada empresa se muestra como una tarjeta: nombre, NIT y sector, teléfono,
// cantidad de retos, estado y la persona de contacto.
export default function EmpresaList({ empresas, conteoRetos, onEditar, onEliminar }) {
  return (
    <TarjetaGrid vacio="No se encontraron empresas.">
      {empresas.map((e) => (
        <Tarjeta
          key={e.id}
          titulo={e.nombre}
          descripcion={`NIT ${e.nit} · Sector ${e.sector}`}
          dato={{ icono: Phone, texto: e.telefono }}
          puntaje={{ icono: Trophy, texto: `${conteoRetos[e.id] ?? 0} retos` }}
          insignia={<Pildora barras={e.activa ? 3 : 0}>{e.activa ? 'Activa' : 'Inactiva'}</Pildora>}
          autor={{ nombre: e.contacto, detalle: e.correo }}
          onEditar={() => onEditar(e)}
          onEliminar={() => onEliminar(e)}
        />
      ))}
    </TarjetaGrid>
  )
}
