import { useFormulario } from '../../core/hooks/useFormulario'
import Select from '../../core/design-system/Select'
import Textarea from '../../core/design-system/Textarea'
import FormActions from '../../core/design-system/FormActions'
import { AREAS, CATEGORIAS } from '../lib/constantes'
import { normalizarCategoria, validarCategoria } from '../utils/validarCategoria'

const VACIA = { nombre: '', descripcion: '', area_responsable: '' }
const aOpciones = (lista) => lista.map((x) => ({ valor: x, texto: x }))

export default function CategoriaForm({ categoria, onGuardar, onCancelar }) {
  const { valores, errores, enviando, cambiar, enviar } = useFormulario(
    { ...VACIA, ...categoria },
    validarCategoria,
    (datos) => onGuardar(normalizarCategoria(datos)),
  )

  return (
    <form onSubmit={enviar} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select name="nombre" etiqueta="Categoría" opciones={aOpciones(CATEGORIAS)} value={valores.nombre} onChange={cambiar} error={errores.nombre} />
        <Select
          name="area_responsable"
          etiqueta="Área responsable"
          opciones={aOpciones(AREAS)}
          value={valores.area_responsable}
          onChange={cambiar}
          error={errores.area_responsable}
        />
        <Textarea name="descripcion" etiqueta="Descripción" className="sm:col-span-2" value={valores.descripcion} onChange={cambiar} error={errores.descripcion} />
      </div>
      <FormActions onCancelar={onCancelar} enviando={enviando} error={errores.general} />
    </form>
  )
}
