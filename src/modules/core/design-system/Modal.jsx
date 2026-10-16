import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ abierto, titulo, onCerrar, children, ancho = 'max-w-lg' }) {
  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!abierto) return
    const alPresionar = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [abierto, onCerrar])

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-barra/60" onClick={onCerrar} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal"
        className={`relative max-h-[90vh] w-full ${ancho} overflow-y-auto rounded-2xl bg-superficie shadow-xl`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-superficie px-5 py-4">
          <h2 id="titulo-modal" className="text-lg font-bold text-black">
            {titulo}
          </h2>
          <button
            type="button"
            onClick={onCerrar}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  )
}
