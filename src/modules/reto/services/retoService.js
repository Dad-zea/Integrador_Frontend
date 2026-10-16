import { crearCrudService } from '../../core/lib/crudService'
import { RETOS_INICIALES } from '../lib/datosIniciales'

export const retoService = crearCrudService('retos', RETOS_INICIALES)
