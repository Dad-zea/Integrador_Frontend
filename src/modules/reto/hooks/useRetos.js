import { useCrud } from '../../core/hooks/useCrud'
import { empresaService } from '../../empresa/services/empresaService'
import { categoriaService } from '../../categoria/services/categoriaService'
import { prioridadService } from '../../prioridad/services/prioridadService'
import { retoService } from '../services/retoService'

// Además del CRUD, entrega las listas relacionadas para los selects
// y un "detalle" de cada reto con los nombres de empresa, categoría y prioridad.
export function useRetos() {
  const crud = useCrud(retoService)

  const empresas = empresaService.obtenerTodos()
  const categorias = categoriaService.obtenerTodos()
  const prioridades = prioridadService.obtenerTodos()

  const buscar = (lista, id) => lista.find((x) => x.id === id)

  const items = crud.items.map((reto) => ({
    ...reto,
    empresa: buscar(empresas, reto.id_empresa),
    categoria: buscar(categorias, reto.id_categoria),
    prioridad: buscar(prioridades, reto.id_prioridad),
  }))

  return { ...crud, items, empresas, categorias, prioridades }
}
