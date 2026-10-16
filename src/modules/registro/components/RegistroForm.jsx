import { useFormulario } from '../../core/hooks/useFormulario'
import Input from '../../core/design-system/Input'
import Select from '../../core/design-system/Select'
import Textarea from '../../core/design-system/Textarea'
import FormActions from '../../core/design-system/FormActions'
import { ESTADOS_REGISTRO } from '../lib/constantes'
import { ahoraLocal, normalizarRegistro, validarRegistro } from '../utils/validarRegistro'

const OPCIONES_ESTADO = ESTADOS_REGISTRO.map((e) => ({ valor: e, texto: e.charAt(0).toUpperCase() + e.slice(1) }))

export default function RegistroForm({ registro, usuarios, retos, usuarioActual, onGuardar, onCancelar }) {
  const { valores, errores, enviando, cambiar, enviar } = useFormulario(
    {
      fecha_registro: registro?.fecha_registro ?? ahoraLocal(),
      observacion: registro?.observacion ?? '',
      estado: registro?.estado ?? 'pendiente',
      id_usuario: registro?.id_usuario ?? usuarioActual.id,
      id_reto: registro?.id_reto ?? '',
    },
    validarRegistro,
    (datos) => onGuardar(normalizarRegistro(datos)),
  )

  const opcionesUsuario = usuarios.map((u) => ({ valor: u.id, texto: `${u.nombre} (${u.rol})` }))
  const opcionesReto = retos.map((r) => ({ valor: r.id, texto: r.nombre }))

  return (
    <form onSubmit={enviar} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select name="id_reto" etiqueta="Reto" className="sm:col-span-2" opciones={opcionesReto} value={valores.id_reto} onChange={cambiar} error={errores.id_reto} />
        <Select name="id_usuario" etiqueta="Usuario" opciones={opcionesUsuario} value={valores.id_usuario} onChange={cambiar} error={errores.id_usuario} />
        <Select name="estado" etiqueta="Estado" opciones={OPCIONES_ESTADO} value={valores.estado} onChange={cambiar} error={errores.estado} />
        <Input
          name="fecha_registro"
          type="datetime-local"
          etiqueta="Fecha y hora"
          max={ahoraLocal()}
          value={valores.fecha_registro}
          onChange={cambiar}
          error={errores.fecha_registro}
        />
        <Textarea
          name="observacion"
          etiqueta="Observación (opcional)"
          className="sm:col-span-2"
          value={valores.observacion}
          onChange={cambiar}
          error={errores.observacion}
        />
      </div>
      <FormActions onCancelar={onCancelar} enviando={enviando} error={errores.general} />
    </form>
  )
}
