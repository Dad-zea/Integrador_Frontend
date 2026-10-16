// Colores para los círculos de las tarjetas (como los logos de cada curso en Platzi).
const PALETA = [
  'bg-sky-500 text-white',
  'bg-amber-400 text-[#13161c]',
  'bg-marca-400 text-[#13161c]',
  'bg-rose-500 text-white',
  'bg-violet-500 text-white',
  'bg-teal-500 text-white',
  'bg-orange-500 text-white',
]

// Siempre devuelve el mismo color para el mismo texto.
export function colorPara(texto = '') {
  const suma = [...texto].reduce((acc, letra) => acc + letra.charCodeAt(0), 0)
  return PALETA[suma % PALETA.length]
}

export const iniciales = (nombre = '') =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

export const capitalizar = (texto = '') => texto.charAt(0).toUpperCase() + texto.slice(1)
