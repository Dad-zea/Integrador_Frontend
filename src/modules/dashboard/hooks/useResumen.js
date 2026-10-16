import { empresaService } from '../../empresa/services/empresaService'
import { retoService } from '../../reto/services/retoService'
import { categoriaService } from '../../categoria/services/categoriaService'
import { prioridadService } from '../../prioridad/services/prioridadService'
import { registroService } from '../../registro/services/registroService'

const contarPor = (lista, campo) =>
  lista.reduce((acc, item) => {
    acc[item[campo]] = (acc[item[campo]] ?? 0) + 1
    return acc
  }, {})

const diasEntre = (desde, hasta) => Math.ceil((new Date(`${hasta}T00:00:00`) - desde) / 86_400_000)

// Reúne los datos de todos los módulos para mostrarlos en el dashboard.
export function useResumen() {
  const empresas = empresaService.obtenerTodos()
  const retos = retoService.obtenerTodos()
  const categorias = categoriaService.obtenerTodos()
  const prioridades = prioridadService.obtenerTodos()
  const registros = registroService.obtenerTodos()

  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  // Retos sin terminar ordenados por la fecha de cierre más cercana
  const proximosACerrar = retos
    .filter((r) => r.estado !== 'completada' && r.fecha_fin)
    .map((r) => ({
      ...r,
      empresa: empresas.find((e) => e.id === r.id_empresa)?.nombre,
      diasRestantes: diasEntre(hoy, r.fecha_fin),
    }))
    .sort((a, b) => a.diasRestantes - b.diasRestantes)
    .slice(0, 4)

  const retosPorCategoria = categorias
    .map((c) => ({ nombre: c.nombre, total: retos.filter((r) => r.id_categoria === c.id).length }))
    .sort((a, b) => b.total - a.total)

  const ultimosRegistros = [...registros]
    .sort((a, b) => b.fecha_registro.localeCompare(a.fecha_registro))
    .slice(0, 5)
    .map((r) => ({ ...r, reto: retos.find((x) => x.id === r.id_reto)?.nombre }))

  return {
    totales: {
      empresas: empresas.length,
      empresasActivas: empresas.filter((e) => e.activa).length,
      retos: retos.length,
      categorias: categorias.length,
      prioridades: prioridades.length,
      registros: registros.length,
    },
    retosPorEstado: contarPor(retos, 'estado'),
    registrosPorEstado: contarPor(registros, 'estado'),
    retosPorCategoria,
    proximosACerrar,
    ultimosRegistros,
  }
}
