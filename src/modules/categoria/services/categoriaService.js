import { crearCrudService } from '../../core/lib/crudService'
import { CATEGORIAS_INICIALES } from '../lib/datosIniciales'

export const categoriaService = crearCrudService('categorias', CATEGORIAS_INICIALES)
