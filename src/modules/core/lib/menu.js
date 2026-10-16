import { Building2, ClipboardList, Flag, Tags, Trophy } from 'lucide-react'

// Página de inicio del panel
export const INICIO = { ruta: '/dashboard', texto: 'Dashboard' }

// Módulos del proyecto: aparecen agrupados en el menú lateral
export const MODULOS = [
  { ruta: '/empresas', texto: 'Empresas', icono: Building2 },
  { ruta: '/retos', texto: 'Retos', icono: Trophy },
  { ruta: '/categorias', texto: 'Categorías', icono: Tags },
  { ruta: '/prioridades', texto: 'Prioridades', icono: Flag },
  { ruta: '/registros', texto: 'Registros', icono: ClipboardList },
]
