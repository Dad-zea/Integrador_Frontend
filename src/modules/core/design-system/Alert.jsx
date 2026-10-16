import { CircleAlert, CircleCheck } from 'lucide-react'

export default function Alert({ tipo = 'error', children, onCerrar }) {
  const esError = tipo === 'error'
  const Icono = esError ? CircleAlert : CircleCheck
  return (
    <div
      role={esError ? 'alert' : 'status'}
      className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm ${
        esError
          ? 'bg-rose-50 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300'
          : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300'
      }`}
    >
      <Icono className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div className="flex-1">{children}</div>
      {onCerrar && (
        <button type="button" onClick={onCerrar} className="font-semibold opacity-70 hover:opacity-100" aria-label="Cerrar">
          ×
        </button>
      )}
    </div>
  )
}
