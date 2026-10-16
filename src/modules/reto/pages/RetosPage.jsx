import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
import { registroService } from '../../registro/services/registroService'
import { useRetos } from '../hooks/useRetos'
import { ESTADOS_RETO } from '../lib/constantes'
import RetoForm from '../components/RetoForm'
import RetoList from '../components/RetoList'

const OPCIONES_ESTADO = ESTADOS_RETO.map((e) => ({ valor: e, texto: capitalizar(e) }))

export default function RetosPage() {
  const { items: retos, empresas, categorias, prioridades, crear, actualizar, eliminar } = useRetos()
  const { busqueda } = useBusqueda()
  const [estado, setEstado] = useState('')
  const [categoria, setCategoria] = useState('')
  const [prioridad, setPrioridad] = useState('')
  const [enEdicion, setEnEdicion] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const [aviso, setAviso] = useState(null)
  const [parametros, setParametros] = useSearchParams()

  // El enlace "Proponer reto" del menú llega con ?nuevo=1 y abre el formulario
  useEffect(() => {
    if (parametros.get('nuevo')) {
      setEnEdicion({})
      setParametros({}, { replace: true })
    }
  }, [parametros, setParametros])

  const visibles = retos.filter(
    (r) =>
      (!estado || r.estado === estado) &&
      (!categoria || r.id_categoria === categoria) &&
      (!prioridad || r.id_prioridad === prioridad) &&
      (coincide(r.nombre, busqueda) || coincide(r.empresa?.nombre, busqueda) || coincide(r.descripcion, busqueda)),
  )

  const guardar = (datos) => {
    if (enEdicion.id) {
      actualizar(enEdicion.id, datos)
      setAviso({ tipo: 'exito', texto: `Reto "${datos.nombre}" actualizado.` })
    } else {
      crear(datos)
      setAviso({ tipo: 'exito', texto: `Reto "${datos.nombre}" creado.` })
    }
    setEnEdicion(null)
  }

  const pedirEliminar = (reto) => {
    const registros = registroService.obtenerTodos().filter((r) => r.id_reto === reto.id).length
    if (registros > 0) {
      setAviso({ tipo: 'error', texto: `El reto "${reto.nombre}" tiene ${registros} registro(s). Elimínalos primero.` })
      return
    }
    setPorEliminar(reto)
  }

  const confirmarEliminar = () => {
    eliminar(porEliminar.id)
    setAviso({ tipo: 'exito', texto: `Reto "${porEliminar.nombre}" eliminado.` })
    setPorEliminar(null)
  }

  return (
    <>
      <PageHeader
        titulo="Retos"
        descripcion="Desafíos que proponen las empresas, con su categoría, prioridad y fechas."
        filtros={
          <>
            <FiltroSelect etiqueta="Estado" valor={estado} onCambiar={setEstado} opciones={OPCIONES_ESTADO} />
            <FiltroSelect
              etiqueta="Categoría"
              valor={categoria}
              onCambiar={setCategoria}
              opciones={categorias.map((c) => ({ valor: c.id, texto: c.nombre }))}
            />
            <FiltroSelect
              etiqueta="Prioridad"
              valor={prioridad}
              onCambiar={setPrioridad}
              opciones={prioridades.map((p) => ({ valor: p.id, texto: p.nombre }))}
            />
          </>
        }
      >
        <Button icono={Plus} onClick={() => setEnEdicion({})}>
          Nuevo reto
        </Button>
      </PageHeader>

      {aviso && (
        <div className="mb-5">
          <Alert tipo={aviso.tipo} onCerrar={() => setAviso(null)}>
            {aviso.texto}
          </Alert>
        </div>
      )}

      <RetoList retos={visibles} onEditar={setEnEdicion} onEliminar={pedirEliminar} />

      <Modal abierto={enEdicion !== null} titulo={enEdicion?.id ? 'Editar reto' : 'Nuevo reto'} onCerrar={() => setEnEdicion(null)} ancho="max-w-2xl">
        {enEdicion && (
          <RetoForm
            reto={enEdicion}
            empresas={empresas}
            categorias={categorias}
            prioridades={prioridades}
            onGuardar={guardar}
            onCancelar={() => setEnEdicion(null)}
          />
        )}
      </Modal>

      <ConfirmDialog
        abierto={porEliminar !== null}
        mensaje={`Se eliminará el reto "${porEliminar?.nombre}".`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPorEliminar(null)}
      />
    </>
  )
}
