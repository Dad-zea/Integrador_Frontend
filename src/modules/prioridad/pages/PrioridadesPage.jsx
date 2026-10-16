import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../core/components/PageHeader'
import Button from '../../core/design-system/Button'
import Modal from '../../core/design-system/Modal'
import ConfirmDialog from '../../core/design-system/ConfirmDialog'
import Alert from '../../core/design-system/Alert'
import { coincide } from '../../core/utils/formato'
import { useBusqueda } from '../../core/hooks/useBusqueda'
import { retoService } from '../../reto/services/retoService'
import { usePrioridades } from '../hooks/usePrioridades'
import PrioridadForm from '../components/PrioridadForm'
import PrioridadList from '../components/PrioridadList'

export default function PrioridadesPage() {
  const { items: prioridades, crear, actualizar, eliminar } = usePrioridades()
  const { busqueda } = useBusqueda()
  const [enEdicion, setEnEdicion] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const [aviso, setAviso] = useState(null)

  const conteoRetos = retoService.obtenerTodos().reduce((acc, r) => {
    acc[r.id_prioridad] = (acc[r.id_prioridad] ?? 0) + 1
    return acc
  }, {})

  const guardar = (datos) => {
    const repetida = prioridades.some((p) => p.nombre === datos.nombre && p.id !== enEdicion.id)
    if (repetida) throw new Error(`La prioridad "${datos.nombre}" ya existe.`)

    if (enEdicion.id) {
      actualizar(enEdicion.id, datos)
      setAviso({ tipo: 'exito', texto: `Prioridad "${datos.nombre}" actualizada.` })
    } else {
      crear(datos)
      setAviso({ tipo: 'exito', texto: `Prioridad "${datos.nombre}" creada.` })
    }
    setEnEdicion(null)
  }

  const pedirEliminar = (prioridad) => {
    const retos = conteoRetos[prioridad.id] ?? 0
    if (retos > 0) {
      setAviso({ tipo: 'error', texto: `La prioridad "${prioridad.nombre}" está asignada a ${retos} reto(s). No se puede eliminar.` })
      return
    }
    setPorEliminar(prioridad)
  }

  const confirmarEliminar = () => {
    eliminar(porEliminar.id)
    setAviso({ tipo: 'exito', texto: `Prioridad "${porEliminar.nombre}" eliminada.` })
    setPorEliminar(null)
  }

  return (
    <>
      <PageHeader titulo="Prioridades" descripcion="Nivel de urgencia de un reto y el tiempo máximo para responderlo.">
        <Button icono={Plus} onClick={() => setEnEdicion({})} disabled={prioridades.length >= 3}>
          Nueva prioridad
        </Button>
      </PageHeader>

      {aviso && (
        <div className="mb-4">
          <Alert tipo={aviso.tipo} onCerrar={() => setAviso(null)}>
            {aviso.texto}
          </Alert>
        </div>
      )}

      <PrioridadList prioridades={prioridades.filter((p) => coincide(p.nombre, busqueda))} conteoRetos={conteoRetos} onEditar={setEnEdicion} onEliminar={pedirEliminar} />

      <Modal abierto={enEdicion !== null} titulo={enEdicion?.id ? 'Editar prioridad' : 'Nueva prioridad'} onCerrar={() => setEnEdicion(null)}>
        {enEdicion && <PrioridadForm prioridad={enEdicion} onGuardar={guardar} onCancelar={() => setEnEdicion(null)} />}
      </Modal>

      <ConfirmDialog
        abierto={porEliminar !== null}
        mensaje={`Se eliminará la prioridad "${porEliminar?.nombre}".`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPorEliminar(null)}
      />
    </>
  )
}
