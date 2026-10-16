import { useCrud } from '../../core/hooks/useCrud'
import { categoriaService } from '../services/categoriaService'

export function useCategorias() {
  return useCrud(categoriaService)
}
