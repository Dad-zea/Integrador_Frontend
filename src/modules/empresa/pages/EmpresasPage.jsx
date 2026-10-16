import { useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../core/components/PageHeader'
import FiltroSelect from '../../core/components/FiltroSelect'
import Button from '../../core/design-system/Button'
import Modal from '../../core/design-system/Modal'
import ConfirmDialog from '../../core/design-system/ConfirmDialog'
import Alert from '../../core/design-system/Alert'
import { coincide } from '../../core/utils/formato'
import { useBusqueda } from '../../core/hooks/useBusqueda'
import { retoService } from '../../reto/services/retoService'
import { useEmpresas } from '../hooks/useEmpresas'
import { SECTORES } from '../lib/constantes'
import EmpresaForm from '../components/EmpresaForm'
import EmpresaList from '../components/EmpresaList'

const OPCIONES_ESTADO = [
  { valor: 'activas', texto: 'Activas' },
  { valor: 'inactivas', texto: 'Inactivas' },
]
const OPCIONES_SECTOR = SECTORES.map((s) => ({ valor: s, texto: s }))

export default function EmpresasPage() {
  const { items: empresas, crear, actualizar, eliminar } = useEmpresas()
  const { busqueda } = useBusqueda()
  const [estado, setEstado] = useState('')
  const [sector, setSector] = useState('')
  const [enEdicion, setEnEdicion] = useState(null) // null = cerrado, {} = nueva, objeto = editar
  const [porEliminar, setPorEliminar] = useState(null)
  const [aviso, setAviso] = useState(null)

  // Cuántos retos tiene cada empresa: { idEmpresa: cantidad }
  const conteoRetos = retoService.obtenerTodos().reduce((acc, r) => {
    acc[r.id_empresa] = (acc[r.id_empresa] ?? 0) + 1
    return acc
  }, {})

  const visibles = empresas.filter((e) => {
    const pasaEstado = !estado || (estado === 'activas' ? e.activa : !e.activa)
    const pasaSector = !sector || e.sector === sector
    const pasaBusqueda = coincide(e.nombre, busqueda) || coincide(e.nit, busqueda) || coincide(e.contacto, busqueda)
    return pasaEstado && pasaSector && pasaBusqueda
  })

  const guardar = (datos) => {
    const duplicada = empresas.some((e) => e.nit === datos.nit && e.id !== enEdicion.id)
    if (duplicada) throw new Error('Ya existe una empresa registrada con ese NIT.')

    if (enEdicion.id) {
      actualizar(enEdicion.id, datos)
      setAviso({ tipo: 'exito', texto: `Empresa "${datos.nombre}" actualizada.` })
    } else {
      crear(datos)
      setAviso({ tipo: 'exito', texto: `Empresa "${datos.nombre}" creada.` })
    }
    setEnEdicion(null)
  }

  const pedirEliminar = (empresa) => {
    // No se puede borrar una empresa que tiene retos asociados
    const retos = conteoRetos[empresa.id] ?? 0
    if (retos > 0) {
      setAviso({ tipo: 'error', texto: `"${empresa.nombre}" tiene ${retos} reto(s) asociados. Elimínalos o reasígnalos primero.` })
      return
    }
    setPorEliminar(empresa)
  }

  const confirmarEliminar = () => {
    eliminar(porEliminar.id)
    setAviso({ tipo: 'exito', texto: `Empresa "${porEliminar.nombre}" eliminada.` })
    setPorEliminar(null)
  }

  return (
    <>
      <PageHeader
        titulo="Empresas"
        descripcion="Organizaciones que proponen retos al programa."
        filtros={
          <>
            <FiltroSelect etiqueta="Estado" valor={estado} onCambiar={setEstado} opciones={OPCIONES_ESTADO} />
            <FiltroSelect etiqueta="Sector" valor={sector} onCambiar={setSector} opciones={OPCIONES_SECTOR} />
          </>
        }
      >
        <Button icono={Plus} onClick={() => setEnEdicion({})}>
          Nueva empresa
        </Button>
      </PageHeader>

      {aviso && (
        <div className="mb-5">
          <Alert tipo={aviso.tipo} onCerrar={() => setAviso(null)}>
            {aviso.texto}
          </Alert>
        </div>
      )}

      <EmpresaList empresas={visibles} conteoRetos={conteoRetos} onEditar={setEnEdicion} onEliminar={pedirEliminar} />

      <Modal abierto={enEdicion !== null} titulo={enEdicion?.id ? 'Editar empresa' : 'Nueva empresa'} onCerrar={() => setEnEdicion(null)}>
        {enEdicion && <EmpresaForm empresa={enEdicion} onGuardar={guardar} onCancelar={() => setEnEdicion(null)} />}
      </Modal>

      <ConfirmDialog
        abierto={porEliminar !== null}
        mensaje={`Se eliminará la empresa "${porEliminar?.nombre}". Esta acción no se puede deshacer.`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setPorEliminar(null)}
      />
    </>
  )
}
