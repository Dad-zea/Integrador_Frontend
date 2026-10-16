import { useFormulario } from '../../core/hooks/useFormulario'
import Input from '../../core/design-system/Input'
import Select from '../../core/design-system/Select'
import FormActions from '../../core/design-system/FormActions'
import { SECTORES } from '../lib/constantes'
import { normalizarEmpresa, validarEmpresa } from '../utils/validarEmpresa'

const VACIA = { nombre: '', nit: '', sector: '', contacto: '', correo: '', telefono: '', activa: true }
const OPCIONES_SECTOR = SECTORES.map((s) => ({ valor: s, texto: s }))

export default function EmpresaForm({ empresa, onGuardar, onCancelar }) {
  const { valores, errores, enviando, cambiar, enviar } = useFormulario(
    { ...VACIA, ...empresa },
    validarEmpresa,
    (datos) => onGuardar(normalizarEmpresa(datos)),
  )

  return (
    <form onSubmit={enviar} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="nombre" etiqueta="Nombre" className="sm:col-span-2" value={valores.nombre} onChange={cambiar} error={errores.nombre} />
        <Input name="nit" etiqueta="NIT" placeholder="900123456-7" value={valores.nit} onChange={cambiar} error={errores.nit} />
        <Select name="sector" etiqueta="Sector" opciones={OPCIONES_SECTOR} value={valores.sector} onChange={cambiar} error={errores.sector} />
        <Input name="contacto" etiqueta="Persona de contacto" value={valores.contacto} onChange={cambiar} error={errores.contacto} />
        <Input name="telefono" etiqueta="Celular" inputMode="numeric" placeholder="3001234567" value={valores.telefono} onChange={cambiar} error={errores.telefono} />
        <Input name="correo" type="email" etiqueta="Correo" className="sm:col-span-2" value={valores.correo} onChange={cambiar} error={errores.correo} />
        <label className="flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
          <input type="checkbox" name="activa" checked={valores.activa} onChange={cambiar} className="size-4 rounded border-slate-300 accent-marca-600" />
          Empresa activa
        </label>
      </div>
      <FormActions onCancelar={onCancelar} enviando={enviando} error={errores.general} />
    </form>
  )
}
