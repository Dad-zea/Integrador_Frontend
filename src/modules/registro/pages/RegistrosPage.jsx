import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../core/components/PageHeader'
import FiltroSelect from '../../core/components/FiltroSelect'
import Button from '../../core/design-system/Button'
import Modal from '../../core/design-system/Modal'
import ConfirmDialog from '../../core/design-system/ConfirmDialog'
import Alert from '../../core/design-system/Alert'
import { coincide } from '../../core/utils/formato'
import { capitalizar } from '../../core/utils/colores'
import { useBusqueda } from '../../core/hooks/useBusqueda'
import { useAuth } from '../../auth/hooks/useAuth'
import { useRegistros } from '../hooks/useRegistros'
import { ESTADOS_REGISTRO } from '../lib/constantes'
import RegistroForm from '../components/RegistroForm'
import RegistroList from '../components/RegistroList'

const OPCIONES_ESTADO = ESTADOS_REGISTRO.map((e) => ({ valor: e, texto: capitalizar(e) }))

export default function RegistrosPage() {
  const { usuario } = useAuth()
  const { items: registros, usuarios, retos, crear, actualizar, eliminar } = useRegistros()
  const { busqueda } = useBusqueda()
  const [estado, setEstado] = useState('')
  const [reto, setReto] = useState('')
  const [enEdicion, setEnEdicion] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const [aviso, setAviso] = useState(null)

  const visibles = registros.filter(
    (r) =>
      (!estado || r.estado === estado) &&
      (!reto || r.id_reto === reto) &&
      (coincide(r.reto?.nombre, busqueda) || coincide(r.usuario?.nombre, busqueda) || coincide(r.observacion, busqueda)),
  )

  const guardar = (datos) => {
    if (enEdicion.id) {
      actualizar(enEdicion.id, datos)
      setAviso({ tipo: 'exito', texto: 'Registro actualizado.' })
    } else {
      crear(datos)
      setAviso({ tipo: 'exito', texto: 'Registro creado.' })
    }
    setEnEdicion(null)
  }

  const confirmarEliminar = () => {
    eliminar(porEliminar.id)
    setAviso({ tipo: 'exito', texto: 'Registro eliminado.' })
    setPorEliminar(null)
  }

  return (
    <>
      <PageHeader
        titulo="Registros"
        descripcion="Historial de participación y seguimiento de cada reto."
        filtros={
          <>
            <FiltroSelect etiqueta="Estado" valor={estado} onCambiar={setEstado} opciones={OPCIONES_ESTADO} />
            <FiltroSelect etiqueta="Reto" valor={reto} onCambiar={setReto} opciones={retos.map((r) => ({ valor: r.id, texto: r.nombre }))} />
          </>
        }
      >
        <Button icono={Plus} onClick={() => setEnEdicion({})} disabled={retos.length === 0}>
          Nuevo registro
        </Button>
      </PageHeader>

      {aviso && (
        <div className="mb-5">
          <Alert tipo={aviso.tipo} onCerrar={() => setAviso(null)}>
            {aviso.texto}
          </Alert>
        </div>
      )}

      <RegistroList registros={visibles} onEditar={setEnEdicion} onEliminar={setPorEliminar} />

      <Modal abierto={enEdicion !== null} titulo={enEdicion?.id ? 'Editar registro' : 'Nuevo registro'} onCerrar={() => setEnEdicion(null)} ancho="max-w-2xl">
        {enEdicion && (
          <RegistroForm
            registro={enEdicion.id ? enEdicion : null}
            usuarios={usuarios}
            retos={retos}
            usuarioActual={usuario}
            onGuardar={guardar}
            onCancelar={() => setEnEdicion(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        abierto={porEliminar !== null}
        mensaje={`Se eliminará el registro del reto "${porEliminar?.reto?.nombre ?? ''}".`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPorEliminar(null)}
      />
    </>
  )
}
