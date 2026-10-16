import { crearCrudService } from '../../core/lib/crudService'
import { PRIORIDADES_INICIALES } from '../lib/datosIniciales'

export const prioridadService = crearCrudService('prioridades', PRIORIDADES_INICIALES)
