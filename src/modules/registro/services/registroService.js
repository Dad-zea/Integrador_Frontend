import { crearCrudService } from '../../core/lib/crudService'
import { REGISTROS_INICIALES } from '../lib/datosIniciales'

export const registroService = crearCrudService('registros', REGISTROS_INICIALES)
