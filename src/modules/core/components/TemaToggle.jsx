import { Moon, Sun } from 'lucide-react'
import { useTema } from '../hooks/useTema'

// Botón sol / luna para cambiar entre modo claro y oscuro.
export default function TemaToggle() {
  const { tema, alternar } = useTema()
  const oscuro = tema === 'oscuro'

  return (
    <button
      type="button"
      onClick={alternar}
      className="grid size-9 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-marca-600"
      aria-label={oscuro ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={oscuro ? 'Modo claro' : 'Modo oscuro'}
    >
      {oscuro ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}
