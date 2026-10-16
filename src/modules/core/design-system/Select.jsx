import Campo, { claseControl } from './Campo'

// opciones: [{ valor, texto }]
export default function Select({
  id,
  name,
  etiqueta,
  error,
  ayuda,
  opciones = [],
  placeholder = 'Selecciona una opción',
  className,
  ...props
}) {
  const idCampo = id ?? name
  return (
    <Campo id={idCampo} etiqueta={etiqueta} error={error} ayuda={ayuda} className={className}>
      <select id={idCampo} name={name} className={claseControl(error)} aria-invalid={!!error} {...props}>
        <option value="">{placeholder}</option>
        {opciones.map((op) => (
          <option key={op.valor} value={op.valor}>
            {op.texto}
          </option>
        ))}
      </select>
    </Campo>
  )
}
