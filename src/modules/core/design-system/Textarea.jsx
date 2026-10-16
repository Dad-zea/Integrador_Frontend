import Campo, { claseControl } from './Campo'

export default function Textarea({ id, name, etiqueta, error, ayuda, className, rows = 3, ...props }) {
  const idCampo = id ?? name
  return (
    <Campo id={idCampo} etiqueta={etiqueta} error={error} ayuda={ayuda} className={className}>
      <textarea id={idCampo} name={name} rows={rows} className={claseControl(error)} aria-invalid={!!error} {...props} />
    </Campo>
  )
}
