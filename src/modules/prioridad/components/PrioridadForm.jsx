import { useFormulario } from '../../core/hooks/useFormulario'
import Input from '../../core/design-system/Input'
import Select from '../../core/design-system/Select'
import FormActions from '../../core/design-system/FormActions'
import { DIAS_MAXIMOS, NIVELES_PRIORIDAD } from '../lib/constantes'
import { normalizarPrioridad, validarPrioridad } from '../utils/validarPrioridad'

const VACIA = { nombre: '', nivel: '', dias_max_respuesta: '' }
const OPCIONES = NIVELES_PRIORIDAD.map((p) => ({ valor: p.nombre, texto: p.nombre }))

export default function PrioridadForm({ prioridad, onGuardar, onCancelar }) {
  const { valores, errores, enviando, cambiar, asignar, enviar } = useFormulario(
    { ...VACIA, ...prioridad },
    validarPrioridad,
    (datos) => onGuardar(normalizarPrioridad(datos)),
  )

  // Al elegir el nombre, se sugieren el nivel y los días de respuesta
  const cambiarNombre = (e) => {
    cambiar(e)
    const sugerida = NIVELES_PRIORIDAD.find((p) => p.nombre === e.target.value)
    if (sugerida) asignar({ nivel: sugerida.nivel, dias_max_respuesta: sugerida.dias })
  }

  return (
    <form onSubmit={enviar} noValidate>
      <div className="grid gap-4 sm:grid-cols-3">
        <Select name="nombre" etiqueta="Nombre" opciones={OPCIONES} value={valores.nombre} onChange={cambiarNombre} error={errores.nombre} />
        <Input name="nivel" type="number" min="1" max="3" etiqueta="Nivel" value={valores.nivel} onChange={cambiar} error={errores.nivel} />
        <Input
          name="dias_max_respuesta"
          type="number"
          min="1"
          max={DIAS_MAXIMOS}
          etiqueta="Días máx. respuesta"
          value={valores.dias_max_respuesta}
          onChange={cambiar}
          error={errores.dias_max_respuesta}
        />
      </div>
      <FormActions onCancelar={onCancelar} enviando={enviando} error={errores.general} />
    </form>
  )
}
