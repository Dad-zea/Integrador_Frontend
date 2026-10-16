import { useCrud } from '../../core/hooks/useCrud'
import { obtenerUsuarios } from '../../auth/services/authService'
import { retoService } from '../../reto/services/retoService'
import { registroService } from '../services/registroService'

// CRUD de registros + usuarios y retos para mostrar nombres y llenar los selects.
export function useRegistros() {
  const crud = useCrud(registroService)

  const usuarios = obtenerUsuarios()
  const retos = retoService.obtenerTodos()

  const items = crud.items
    .map((registro) => ({
      ...registro,
      usuario: usuarios.find((u) => u.id === registro.id_usuario),
      reto: retos.find((r) => r.id === registro.id_reto),
    }))
    // Los más recientes primero
    .sort((a, b) => b.fecha_registro.localeCompare(a.fecha_registro))

  return { ...crud, items, usuarios, retos }
}
