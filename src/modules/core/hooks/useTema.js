import { useEffect, useState } from 'react'

const CLAVE = 'tema'

// Si el usuario ya eligió un tema se respeta; si no, se usa el del sistema operativo.
function temaInicial() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    if (guardado === 'claro' || guardado === 'oscuro') return guardado
  } catch {
    // localStorage bloqueado (modo privado): se usa el tema del sistema
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro'
}

// Activa o quita la clase "dark" en <html> y recuerda la elección en localStorage.
export function useTema() {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'oscuro')
    localStorage.setItem(CLAVE, tema)
  }, [tema])

  const alternar = () => setTema((actual) => (actual === 'oscuro' ? 'claro' : 'oscuro'))

  return { tema, alternar }
}
