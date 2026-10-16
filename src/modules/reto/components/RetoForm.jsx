import { useFormulario } from '../../core/hooks/useFormulario'
import Input from '../../core/design-system/Input'
import Select from '../../core/design-system/Select'
import Textarea from '../../core/design-system/Textarea'
import FormActions from '../../core/design-system/FormActions'
import { ESTADOS_RETO } from '../lib/constantes'
import { normalizarReto, validarReto } from '../utils/validarReto'

const VACIO = {
  nombre: '',
  descripcion: '',
  fecha_inicio: '',
  fecha_fin: '',
  estado: 'pendiente',
  id_empresa: '',
  id_categoria: '',
  id_prioridad: '',
}

const OPCIONES_ESTADO = ESTADOS_RETO.map((e) => ({ valor: e, texto: e.charAt(0).toUpperCase() + e.slice(1) }))

export default function RetoForm({ reto, empresas, categorias, prioridades, onGuardar, onCancelar }) {
  // Solo se copian los campos del formulario (el reto de la lista trae objetos relacionados)
  const iniciales = Object.fromEntries(Object.keys(VACIO).map((k) => [k, reto?.[k] ?? VACIO[k]]))

  const { valores, errores, enviando, cambiar, enviar } = useFormulario(iniciales, validarReto, (datos) =>
    onGuardar(normalizarReto(datos)),
  )

  // Solo se pueden elegir empresas activas (o la que ya tenía el reto)
  const opcionesEmpresa = empresas
    .filter((e) => e.activa || e.id === reto?.id_empresa)
    .map((e) => ({ valor: e.id, texto: e.nombre }))
  const opcionesCategoria = categorias.map((c) => ({ valor: c.id, texto: c.nombre }))
  const opcionesPrioridad = [...prioridades]
    .sort((a, b) => b.nivel - a.nivel)
    .map((p) => ({ valor: p.id, texto: `${p.nombre} (${p.dias_max_respuesta} días)` }))

  return (
    <form onSubmit={enviar} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="nombre" etiqueta="Nombre del reto" className="sm:col-span-2" value={valores.nombre} onChange={cambiar} error={errores.nombre} />
        <Textarea name="descripcion" etiqueta="Descripción" className="sm:col-span-2" value={valores.descripcion} onChange={cambiar} error={errores.descripcion} />
        <Select
          name="id_empresa"
          etiqueta="Empresa"
          className="sm:col-span-2"
          opciones={opcionesEmpresa}
          value={valores.id_empresa}
          onChange={cambiar}
          error={errores.id_empresa}
        />
        <Select name="id_categoria" etiqueta="Categoría" opciones={opcionesCategoria} value={valores.id_categoria} onChange={cambiar} error={errores.id_categoria} />
        <Select name="id_prioridad" etiqueta="Prioridad" opciones={opcionesPrioridad} value={valores.id_prioridad} onChange={cambiar} error={errores.id_prioridad} />
        <Input name="fecha_inicio" type="date" etiqueta="Fecha de inicio" value={valores.fecha_inicio} onChange={cambiar} error={errores.fecha_inicio} />
        <Input
          name="fecha_fin"
          type="date"
          etiqueta="Fecha de finalización"
          min={valores.fecha_inicio || undefined}
          value={valores.fecha_fin}
          onChange={cambiar}
          error={errores.fecha_fin}
        />
        <Select name="estado" etiqueta="Estado" opciones={OPCIONES_ESTADO} value={valores.estado} onChange={cambiar} error={errores.estado} />
      </div>
      <FormActions onCancelar={onCancelar} enviando={enviando} error={errores.general} />
    </form>
  )
}
