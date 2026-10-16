// Forma diagonal verde detrás del contenido (como el fondo de la página de Platzi).
export default function FondoDecorativo() {
  return (
    <div
      className="pointer-events-none absolute -right-40 top-24 h-[720px] w-[900px] bg-marca-200/60 dark:bg-marca-500/25"
      style={{ clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 0 100%)' }}
      aria-hidden="true"
    />
  )
}
