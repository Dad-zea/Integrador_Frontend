import { crearCrudService } from '../../core/lib/crudService'
import { EMPRESAS_INICIALES } from '../lib/datosIniciales'

export const empresaService = crearCrudService('empresas', EMPRESAS_INICIALES)
