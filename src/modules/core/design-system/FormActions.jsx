import Button from './Button'
import Alert from './Alert'

// Pie de los formularios de los módulos: error general + botones Cancelar / Guardar.
export default function FormActions({ onCancelar, enviando, error, textoGuardar = 'Guardar' }) {
  return (
    <div className="mt-6 space-y-4 border-t border-slate-100 pt-4">
      {error && <Alert>{error}</Alert>}
      <div className="flex justify-end gap-2">
        <Button variante="secundario" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button type="submit" disabled={enviando}>
          {enviando ? 'Guardando…' : textoGuardar}
        </Button>
      </div>
    </div>
  )
}
