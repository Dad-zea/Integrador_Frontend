// Envoltura común de los campos: etiqueta + control + mensaje de error.
export default function Campo({ id, etiqueta, error, ayuda, className = '', children }) {
  return (
    <div className={className}>
      {etiqueta && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {etiqueta}
        </label>
      )}
      {children}
      {error ? (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      ) : (
        ayuda && <p className="mt-1 text-xs text-slate-500">{ayuda}</p>
      )}
    </div>
  )
}

export const claseControl = (error) =>
  `block w-full rounded-lg border bg-superficie px-3 py-2 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
    error
      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
      : 'border-slate-300 focus:border-marca-500 focus:ring-marca-200'
  }`
