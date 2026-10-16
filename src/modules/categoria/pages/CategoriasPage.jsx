import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../core/components/PageHeader'
import FiltroSelect from '../../core/components/FiltroSelect'
import Button from '../../core/design-system/Button'
import Modal from '../../core/design-system/Modal'
import ConfirmDialog from '../../core/design-system/ConfirmDialog'
import Alert from '../../core/design-system/Alert'
import { coincide, normalizar } from '../../core/utils/formato'
import { useBusqueda } from '../../core/hooks/useBusqueda'
import { retoService } from '../../reto/services/retoService'
import { useCategorias } from '../hooks/useCategorias'
import { AREAS } from '../lib/constantes'
import CategoriaForm from '../components/CategoriaForm'
import CategoriaList from '../components/CategoriaList'

const OPCIONES_AREA = AREAS.map((a) => ({ valor: a, texto: a }))

export default function CategoriasPage() {
  const { items: categorias, crear, actualizar, eliminar } = useCategorias()
  const { busqueda } = useBusqueda()
  const [area, setArea] = useState('')
  const [enEdicion, setEnEdicion] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const [aviso, setAviso] = useState(null)

  // Cuántos retos usa cada categoría: { idCategoria: cantidad }
  const conteoRetos = retoService.obtenerTodos().reduce((acc, r) => {
    acc[r.id_categoria] = (acc[r.id_categoria] ?? 0) + 1
    return acc
  }, {})

  const visibles = categorias.filter(
    (c) =>
      (!area || c.area_responsable === area) &&
      (coincide(c.nombre, busqueda) || coincide(c.area_responsable, busqueda) || coincide(c.descripcion, busqueda)),
  )

  const guardar = (datos) => {
    // Evita categorías repetidas (en Python había 'Logística', 'LOGISTICA', ' logistica ')
    const repetida = categorias.some((c) => normalizar(c.nombre) === normalizar(datos.nombre) && c.id !== enEdicion.id)
    if (repetida) throw new Error(`La categoría "${datos.nombre}" ya existe.`)

    if (enEdicion.id) {
      actualizar(enEdicion.id, datos)
      setAviso({ tipo: 'exito', texto: `Categoría "${datos.nombre}" actualizada.` })
    } else {
      crear(datos)
      setAviso({ tipo: 'exito', texto: `Categoría "${datos.nombre}" creada.` })
    }
    setEnEdicion(null)
  }

  const pedirEliminar = (categoria) => {
    const retos = conteoRetos[categoria.id] ?? 0
    if (retos > 0) {
      setAviso({ tipo: 'error', texto: `"${categoria.nombre}" está asignada a ${retos} reto(s). No se puede eliminar.` })
      return
    }
    setPorEliminar(categoria)
  }

  const confirmarEliminar = () => {
    eliminar(porEliminar.id)
    setAviso({ tipo: 'exito', texto: `Categoría "${porEliminar.nombre}" eliminada.` })
    setPorEliminar(null)
  }

  return (
    <>
      <PageHeader
        titulo="Categorías"
        descripcion="Clasificación temática de los retos y su área responsable."
        filtros={<FiltroSelect etiqueta="Área responsable" valor={area} onCambiar={setArea} opciones={OPCIONES_AREA} />}
      >
        <Button icono={Plus} onClick={() => setEnEdicion({})}>
          Nueva categoría
        </Button>
      </PageHeader>

      {aviso && (
        <div className="mb-5">
          <Alert tipo={aviso.tipo} onCerrar={() => setAviso(null)}>
            {aviso.texto}
          </Alert>
        </div>
      )}

      <CategoriaList categorias={visibles} conteoRetos={conteoRetos} onEditar={setEnEdicion} onEliminar={pedirEliminar} />

      <Modal abierto={enEdicion !== null} titulo={enEdicion?.id ? 'Editar categoría' : 'Nueva categoría'} onCerrar={() => setEnEdicion(null)}>
        {enEdicion && <CategoriaForm categoria={enEdicion} onGuardar={guardar} onCancelar={() => setEnEdicion(null)} />}
      </Modal>

      <ConfirmDialog
        abierto={porEliminar !== null}
        mensaje={`Se eliminará la categoría "${porEliminar?.nombre}".`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPorEliminar(null)}
      />
    </>
  )
}
