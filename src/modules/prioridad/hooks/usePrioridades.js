import { useCrud } from '../../core/hooks/useCrud'
import { prioridadService } from '../services/prioridadService'

export function usePrioridades() {
  const crud = useCrud(prioridadService)
  // Siempre ordenadas de mayor a menor nivel (Alta, Media, Baja)
  const items = [...crud.items].sort((a, b) => b.nivel - a.nivel)
  return { ...crud, items }
}
