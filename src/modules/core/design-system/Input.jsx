import Campo, { claseControl } from './Campo'

export default function Input({ id, name, etiqueta, error, ayuda, className, ...props }) {
  const idCampo = id ?? name
  return (
    <Campo id={idCampo} etiqueta={etiqueta} error={error} ayuda={ayuda} className={className}>
      <input id={idCampo} name={name} className={claseControl(error)} aria-invalid={!!error} {...props} />
    </Campo>
  )
}
